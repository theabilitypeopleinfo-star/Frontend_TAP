import { useState } from 'react';

// Utility to load Razorpay script dynamically
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      return resolve(true);
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export function usePaymentGateway() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerifyingSuccess, setIsVerifyingSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [showMockModal, setShowMockModal] = useState(false);
  const [mockContext, setMockContext] = useState(null);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

  const processPayment = async ({ amount, donorDetails, onSuccess }) => {
    setIsProcessing(true);
    setPaymentError(null);

    try {
      // 1. Extract numeric amount first (used by both Live and Mock)
      // The amount comes in as "₹500 — Cover local transport..." or "Custom Amount"
      let numericAmount = amount;
      if (typeof amount === 'string') {
        const match = amount.match(/₹([\d,]+)/);
        if (match) {
          numericAmount = parseInt(match[1].replace(/,/g, ''), 10);
        } else {
          // fallback if passed purely as string number
          numericAmount = parseInt(amount, 10);
        }
      }

      // MOCK MODE CHECK
      // NOTE: This mock mode is temporary for UI testing without a live backend.
      // Must change VITE_PAYMENT_MODE to 'live' before connecting real Razorpay keys.
      if (import.meta.env.VITE_PAYMENT_MODE === 'mock') {
        // Simulate a backend order creation delay
        setTimeout(() => {
          setIsProcessing(false);
          setShowMockModal(true);
          setMockContext({ amount: numericAmount, donorDetails, onSuccess });
        }, 1500);
        return;
      }

      // 2. Load Razorpay script (Live Mode)
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error('Razorpay SDK failed to load. Are you online?');
      }

      // 3. Create Order on Backend
      const orderRes = await fetch(`${API_BASE}/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: numericAmount, currency: 'INR' }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        throw new Error(orderData.error || 'Failed to create payment order');
      }

      // 4. Initialize Razorpay Modal
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_dummykey123',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'The Ability People',
        description: 'Donation',
        order_id: orderData.id,
        handler: async function (response) {
          console.log("processing started");
          setIsVerifying(true);
          // 5. Verification on Success
          try {
            const verifyRes = await fetch(`${API_BASE}/verify-payment`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                donorDetails,
                amount: numericAmount,
              }),
            });

            const verifyData = await verifyRes.json();

            // Artificial delay for debugging
            await new Promise(r => setTimeout(r, 1500));

            if (verifyData.success) {
              setIsVerifyingSuccess(true);
              setTimeout(() => {
                console.log("processing ended (success)");
                setIsVerifying(false);
                setIsVerifyingSuccess(false);
                onSuccess({
                  transactionId: response.razorpay_payment_id,
                  amount: numericAmount,
                  date: new Date().toISOString(),
                  emailSent: verifyData.emailSent,
                  receiptBase64: verifyData.receiptBase64
                });
              }, 600);
            } else {
              setPaymentError('Payment verification failed. Please contact support.');
              console.log("processing ended (error)");
              setIsVerifying(false);
            }
          } catch (err) {
            setPaymentError('Error verifying payment on server.');
            console.log("processing ended (catch)");
            setIsVerifying(false);
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: donorDetails.name,
          email: donorDetails.email,
          contact: donorDetails.phone,
        },
        theme: {
          color: '#0D9488', // Teal-600
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.on('payment.failed', function (response) {
        setPaymentError(`Payment Failed: ${response.error.description}`);
        setIsProcessing(false);
      });

      // Handle user closing modal before payment completes
      paymentObject.on('modal.closed', function () {
        setIsProcessing(false);
        setIsVerifying(false);
      });

      paymentObject.open();

    } catch (error) {
      console.error(error);
      setPaymentError(error.message || 'Something went wrong during payment initialization.');
      setIsProcessing(false);
    }
  };

  const simulateSuccess = () => {
    if (mockContext) {
      setShowMockModal(false);
      mockContext.onSuccess({
        transactionId: `mock_pay_${Date.now()}`,
        amount: mockContext.amount,
        date: new Date().toISOString()
      });
    }
  };

  const simulateFailure = () => {
    setShowMockModal(false);
    setPaymentError('Payment Failed: Simulated failure in mock mode');
  };

  return {
    processPayment,
    isProcessing,
    paymentError,
    showMockModal,
    mockContext,
    simulateSuccess,
    simulateFailure,
    isVerifying,
    isVerifyingSuccess
  };
}
