import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Download, Loader2 } from "lucide-react";
import { PageHero, Section, IconBullet, Button, RevealOnScroll } from "../components/ui";
import { usePaymentGateway } from "../services/usePaymentGateway";
import qrCodeImg from "../assets/qr code tap new.png";
import PaymentProcessingOverlay from "../components/PaymentProcessingOverlay";

const DONATION_TIERS = [
  "₹500 — Cover local transport from a remote village to Ability Rehabilitation Center",
  "₹800 — Printing and putting up road safety awareness posters",
  "₹1,000 — Providing one week of therapy sessions for an SCI patient",
  "₹1,000 — Fund a custom orthotic support/splint for a child with CP or PPRP",
  "₹1,800 — Sponsor a mobile rehab team home visit to a tribal hamlet",
  "₹2,500 — Provide a mobility device (walker/crutches)",
  "₹3,300 — Enable 1 month of inpatient rehabilitation",
  "₹5,000 — Comprehensive nutrition pack for a bedridden rehab patient",
  "₹9,500 — Contribute to a modified wheelchair",
  "Custom Amount"
];

export default function Donate() {
  const [step, setStep] = useState(1);
  const [donorType, setDonorType] = useState(null); // 'individual' | 'institutional'
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    noPan: false,
    pan: "",
    aadhar: "",
    city: "",
    postalCode: "",
    orgName: "",
    gstin: "",
    designation: "",
    amount: DONATION_TIERS[0],
    customAmount: "",
  });
  
  const [errors, setErrors] = useState({});
  const [paymentDetails, setPaymentDetails] = useState(null); // Store successful payment info
  
  const { processPayment, isProcessing, paymentError, showMockModal, mockContext, simulateSuccess, simulateFailure, isVerifying, isVerifyingSuccess } = usePaymentGateway();

  const validateField = (name, value, currentFormData = formData) => {
    switch (name) {
      case 'name':
        return (!value || !value.trim()) ? "Please enter your full name." : "";
      case 'email':
        return (!value || !value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) ? "Please enter a valid email address." : "";
      case 'phone':
        return (!value || !/^[6-9]\d{9}$/.test(value)) ? "Please enter a valid 10-digit phone number." : "";
      case 'pan':
        if (!currentFormData.noPan) {
          return (!value || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(value)) ? "Please enter a valid PAN number (e.g. ABCDE1234F)." : "";
        }
        return "";
      case 'city':
        return (!value || !value.trim()) ? "Please enter your city." : "";
      case 'postalCode':
        return (!value || !/^[1-9][0-9]{5}$/.test(value)) ? "Please enter a valid 6-digit postal code." : "";
      case 'amount':
      case 'customAmount':
        if (currentFormData.amount === "Custom Amount") {
           const num = Number(currentFormData.customAmount);
           return (!currentFormData.customAmount || isNaN(num) || num <= 0) ? "Please enter a donation amount." : "";
        }
        return "";
      case 'orgName':
        if (donorType === 'institutional') {
          return (!value || !value.trim()) ? "Please enter your organization name." : "";
        }
        return "";
      case 'designation':
        if (donorType === 'institutional') {
          return (!value || !value.trim()) ? "Please enter your designation." : "";
        }
        return "";
      default:
        return "";
    }
  };

  const handleDonorSelect = (type) => {
    setDonorType(type);
    setStep(2);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => {
      const newData = { ...prev, [name]: finalValue };
      // If noPan is checked, clear the pan value and its error
      if (name === 'noPan' && checked) {
        newData.pan = "";
        setErrors(prevErrors => {
          const newErrors = { ...prevErrors };
          delete newErrors.pan;
          return newErrors;
        });
      }
      
      // Real-time re-validation on change if field already has an error
      if (errors[name]) {
         const errorMsg = validateField(name, finalValue, newData);
         if (!errorMsg) {
            setErrors(prevErrors => {
               const newErrors = { ...prevErrors };
               delete newErrors[name];
               return newErrors;
            });
         } else {
            setErrors(prevErrors => ({ ...prevErrors, [name]: errorMsg }));
         }
      }
      return newData;
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const errorMsg = validateField(name, value, formData);
    if (errorMsg) {
      setErrors(prev => ({ ...prev, [name]: errorMsg }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const fieldsToValidate = ['name', 'email', 'phone', 'pan', 'city', 'postalCode', 'amount', 'customAmount'];
    if (donorType === 'institutional') {
      fieldsToValidate.push('orgName', 'designation');
    }
    
    const newErrors = {};
    for (const field of fieldsToValidate) {
       const errorMsg = validateField(field, formData[field], formData);
       if (errorMsg) newErrors[field] = errorMsg;
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
       const firstInvalidField = Object.keys(newErrors)[0];
       const element = document.querySelector(`[name="${firstInvalidField}"]`);
       if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
       }
       return false;
    }
    return true;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Trigger Razorpay Checkout
      processPayment({
        amount: formData.amount === "Custom Amount" ? formData.customAmount : formData.amount,
        donorDetails: formData,
        onSuccess: (paymentInfo) => {
          setPaymentDetails(paymentInfo);
          setStep(3); // Move to Success Screen
        }
      });
    }
  };

  const getInputClass = (errorMsg, additionalBase = "") => {
    const base = `w-full px-3.5 sm:px-4 py-2.5 sm:py-3 min-h-[44px] bg-cream/30 border rounded-lg focus:outline-none transition-colors ${additionalBase}`;
    return errorMsg 
      ? `${base} border-[#D32F2F] focus:border-[#D32F2F]` 
      : `${base} border-line focus:border-teal`;
  };

  const handleDownloadReceipt = () => {
    if (paymentDetails && paymentDetails.receiptBase64) {
      const link = document.createElement("a");
      link.href = `data:application/pdf;base64,${paymentDetails.receiptBase64}`;
      link.download = `TAP_Donation_Receipt_${paymentDetails.transactionId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (paymentDetails) {
      alert("Receipt PDF is not available for this transaction.");
    }
  };

  return (
    <div>
      <PageHero
        trail={[{ label: "Donate" }]}
        eyebrow="Support our work"
        title="Donate"
        desc="Your contribution funds rehabilitation therapy, assistive devices and outreach across Andhra Pradesh."
      />
      
      <Section tight revealChildren>
        <div className="max-w-4xl mx-auto">
          
          <RevealOnScroll>
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-3 mb-8 sm:mb-10 max-w-sm mx-auto">
             <StepBubble number={1} active={step >= 1} current={step === 1} label="Donor" clickable={true && step !== 3} onClick={() => setStep(1)} />
             <div className={`h-px w-6 sm:w-10 ${step >= 2 ? 'bg-teal' : 'bg-line'}`} />
             <StepBubble number={2} active={step >= 2} current={step === 2} label="Details" clickable={donorType !== null && step !== 3} onClick={() => setStep(2)} />
             <div className={`h-px w-6 sm:w-10 ${step >= 3 ? 'bg-teal' : 'bg-line'}`} />
             <StepBubble number={3} active={step >= 3} current={step === 3} label="Payment" clickable={false} onClick={() => {}} />
          </div>
          </RevealOnScroll>

          {/* STEP 1: DONOR TYPE */}
          {step === 1 && (
            <div className="animate-fadeUp">
              <RevealOnScroll>
              <h2 className="text-[20px] sm:text-[24px] text-teal-deep mb-6 text-center">Select Donor Type</h2>
              </RevealOnScroll>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
                <RevealOnScroll delay={0.15}>
                <button 
                  onClick={() => handleDonorSelect('individual')}
                  className="flex flex-col items-center justify-center p-6 sm:p-8 bg-white border border-line rounded-xl2 hover:border-teal hover:shadow-md transition-all text-center group cursor-pointer w-full"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-cream flex items-center justify-center text-teal-deep mb-4 group-hover:bg-teal group-hover:text-white transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                  <h3 className="text-[17px] sm:text-[18px] font-bold text-teal-deep mb-2">Individual Donor</h3>
                  <p className="text-[13.5px] sm:text-[14px] text-stone">I am donating from my personal account.</p>
                </button>
                </RevealOnScroll>
                <RevealOnScroll delay={0.3}>
                <button 
                  onClick={() => handleDonorSelect('institutional')}
                  className="flex flex-col items-center justify-center p-6 sm:p-8 bg-white border border-line rounded-xl2 hover:border-teal hover:shadow-md transition-all text-center group cursor-pointer w-full"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-cream flex items-center justify-center text-teal-deep mb-4 group-hover:bg-teal group-hover:text-white transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
                  </div>
                  <h3 className="text-[17px] sm:text-[18px] font-bold text-teal-deep mb-2">Institutional / Corporate</h3>
                  <p className="text-[13.5px] sm:text-[14px] text-stone">We are donating on behalf of an organization.</p>
                </button>
                </RevealOnScroll>
              </div>
            </div>
          )}

          {/* STEP 2: DETAILS FORM */}
          {step === 2 && (
            <RevealOnScroll>
            <div className="bg-white border border-line rounded-xl2 p-4 sm:p-6 md:p-10 shadow-sm max-w-3xl mx-auto animate-fadeUp relative">
              
              {/* Payment Error Banner */}
              {paymentError && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-[14px] flex justify-between items-center">
                  <span>{paymentError}</span>
                  <button onClick={() => setErrors({})} className="text-red-700 font-bold underline hover:text-red-900">Dismiss</button>
                </div>
              )}

              {/* Overlay while processing */}
              {isProcessing && (
                <div className="absolute inset-0 bg-white/80 z-10 flex flex-col items-center justify-center rounded-xl2 backdrop-blur-[1px]">
                  <Loader2 size={40} className="text-teal animate-spin mb-4" />
                  <p className="text-teal-deep font-bold">Initializing Secure Payment...</p>
                  <p className="text-[13px] text-stone mt-2">Please don't close this window.</p>
                </div>
              )}

              <div className="flex items-center justify-between mb-8 pb-4 border-b border-line">
                <h2 className="text-[20px] sm:text-[22px] font-bold text-teal-deep font-display">Donation Details</h2>
                <button 
                  onClick={() => setStep(1)} 
                  disabled={isProcessing}
                  className="text-[13px] font-bold text-stone hover:text-teal flex items-center gap-1 disabled:opacity-50 min-h-[44px] px-2"
                >
                  <ArrowLeft size={14} /> Back
                </button>
              </div>
              
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <FormField label="Full Name *" error={errors.name}>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} onBlur={handleBlur} className={getInputClass(errors.name)} placeholder="Your name" />
                  </FormField>
                  <FormField label="Email Address *" error={errors.email}>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} onBlur={handleBlur} className={getInputClass(errors.email)} placeholder="you@example.com" />
                  </FormField>
                  
                  <FormField label="Phone Number *" error={errors.phone}>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} onBlur={handleBlur} className={getInputClass(errors.phone)} placeholder="Phone number" />
                  </FormField>
                  
                  <div className="space-y-3">
                    {!formData.noPan && (
                      <FormField label="PAN Number *" error={errors.pan}>
                        <input type="text" name="pan" value={formData.pan} onChange={handleInputChange} onBlur={handleBlur} className={getInputClass(errors.pan, "uppercase")} placeholder="ABCDE1234F" />
                      </FormField>
                    )}
                    <label className="flex items-center gap-2 text-[13px] text-stone cursor-pointer w-fit mt-1">
                      <input type="checkbox" name="noPan" checked={formData.noPan} onChange={handleInputChange} className="accent-teal w-4 h-4" />
                      I don't have a PAN number
                    </label>
                  </div>

                  <FormField label="City *" error={errors.city}>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} onBlur={handleBlur} className={getInputClass(errors.city)} placeholder="City" />
                  </FormField>
                  <FormField label="Postal Code *" error={errors.postalCode}>
                    <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} onBlur={handleBlur} className={getInputClass(errors.postalCode)} placeholder="PIN Code" />
                  </FormField>
                </div>

                {donorType === 'institutional' && (
                  <div className="pt-6 mt-6 border-t border-line border-dashed">
                    <h3 className="text-[16px] font-bold text-teal-deep mb-4">Organization Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <FormField label="Organization Name *" error={errors.orgName}>
                        <input type="text" name="orgName" value={formData.orgName} onChange={handleInputChange} onBlur={handleBlur} className={getInputClass(errors.orgName)} placeholder="Company Ltd." />
                      </FormField>
                      <FormField label="Contact Person Designation *" error={errors.designation}>
                        <input type="text" name="designation" value={formData.designation} onChange={handleInputChange} onBlur={handleBlur} className={getInputClass(errors.designation)} placeholder="e.g. CSR Head" />
                      </FormField>
                      <FormField label="GSTIN (Optional)">
                        <input type="text" name="gstin" value={formData.gstin} onChange={handleInputChange} className={getInputClass(null, "uppercase")} placeholder="GSTIN" />
                      </FormField>
                    </div>
                  </div>
                )}

                <div className="pt-6 mt-6 border-t border-line border-dashed">
                  <FormField label="Donation Amount & Purpose" error={errors.amount}>
                    <select 
                      name="amount" 
                      value={formData.amount} 
                      onChange={handleInputChange} 
                      onBlur={handleBlur}
                      className={getInputClass(errors.amount, "text-[14.5px] text-stone appearance-none")}
                    >
                      {DONATION_TIERS.map(tier => (
                        <option key={tier} value={tier}>{tier}</option>
                      ))}
                    </select>
                  </FormField>
                  
                  {formData.amount === "Custom Amount" && (
                    <div className="mt-4">
                      <FormField label="Enter Custom Amount *" error={errors.customAmount}>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone font-bold">₹</span>
                          <input type="number" name="customAmount" value={formData.customAmount} onChange={handleInputChange} onBlur={handleBlur} className={getInputClass(errors.customAmount, "pl-9 pr-4")} placeholder="Amount" />
                        </div>
                      </FormField>
                    </div>
                  )}
                </div>

                <div className="pt-6 flex justify-end">
                  <button 
                    type="submit" 
                    disabled={isProcessing}
                    className="px-8 py-3 bg-gold text-teal-deep font-bold rounded-full hover:-translate-y-0.5 transition-transform flex items-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    Proceed to Payment <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            </div>
            </RevealOnScroll>
          )}

          {/* STEP 3: SUCCESS SCREEN */}
          {step === 3 && paymentDetails && (
            <RevealOnScroll>
            <div className="animate-fadeUp max-w-2xl mx-auto space-y-6">
              <div className="bg-teal-deep text-white p-8 md:p-12 rounded-xl2 text-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gold"></div>
                <CheckCircle2 size={48} className="mx-auto text-gold mb-4" />
                <h2 className="text-[28px] font-bold font-display mb-3">Donation Successful!</h2>
                <p className="text-[16px] text-cream/90 max-w-lg mx-auto mb-8">
                  Thank you, {formData.name.split(' ')[0]}. Your generous contribution of ₹{paymentDetails.amount} has been successfully processed. 
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button 
                    onClick={handleDownloadReceipt}
                    className="w-full sm:w-auto px-6 py-3 bg-gold text-teal-deep font-bold rounded-full hover:-translate-y-0.5 transition-transform flex items-center justify-center gap-2"
                  >
                    <Download size={18} /> Download 80G Receipt
                  </button>
                </div>
                
                {paymentDetails.emailSent && (
                  <p className="text-[13px] text-white/60 mt-6 animate-fadeUp">
                    A copy of this receipt has also been emailed to {formData.email}.
                  </p>
                )}
                
                <div className="mt-8 pt-6 border-t border-white/20 text-[14px] flex flex-col items-center gap-2 text-white/80">
                  <p>Transaction ID: <span className="font-mono font-bold text-white">{paymentDetails.transactionId}</span></p>
                  <p>Date: {new Date(paymentDetails.date).toLocaleString()}</p>
                </div>
              </div>
            </div>
            </RevealOnScroll>
          )}

          {/* Footer sections (Always show these at the bottom) */}
          <div className="mt-16 pt-12 border-t border-line/60 space-y-10">
            {/* Corporate & CSR Section */}
            <RevealOnScroll>
            <div className="bg-white p-6 border border-line rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-[18px] text-teal-deep font-bold mb-1">Looking to make a Corporate CSR grant?</h3>
                <p className="text-[14px] text-stone">Partner with TAP on a project with defined outcomes and reporting.</p>
              </div>
              <Button to="/contact" variant="outline" size="sm" className="whitespace-nowrap">Talk to our partnerships team</Button>
            </div>
            </RevealOnScroll>

            {/* Volunteer & Fundraise Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-center">
              <RevealOnScroll delay={0.15}>
              <div className="p-8 border border-line rounded-xl2 bg-white hover:border-teal-light hover:-translate-y-1 hover:shadow-card transition-all duration-300 h-full flex flex-col items-center">
                <h3 className="text-[18px] text-teal-deep mb-2 font-bold">Volunteer</h3>
                <p className="text-[14px] text-stone mb-5">Contribute your time and skills to our programmes.</p>
                <Button to="/volunteer" variant="outline" size="sm">Volunteer with us</Button>
              </div>
              </RevealOnScroll>
              <RevealOnScroll delay={0.3}>
              <div className="p-8 border border-line rounded-xl2 bg-white hover:border-teal-light hover:-translate-y-1 hover:shadow-card transition-all duration-300 h-full flex flex-col items-center">
                <h3 className="text-[18px] text-teal-deep mb-2 font-bold">Fundraise</h3>
                <p className="text-[14px] text-stone mb-5 flex-1">Run a campaign or event in support of TAP.</p>
                <Button to="/contact" variant="outline" size="sm">Start a fundraiser</Button>
              </div>
              </RevealOnScroll>
            </div>
          </div>

        </div>
      </Section>

      {/* VERIFICATION OVERLAY */}
      <PaymentProcessingOverlay 
        isProcessing={isVerifying} 
        isSuccess={isVerifyingSuccess} 
      />

      {/* MOCK PAYMENT MODAL OVERLAY */}
      {showMockModal && (
        <MockPaymentModal 
          mockContext={mockContext}
          simulateSuccess={simulateSuccess} 
          simulateFailure={simulateFailure} 
        />
      )}

    </div>
  );
}

// Subcomponents

function StepBubble({ number, label, active, current, clickable, onClick }) {
  return (
    <div 
      className={`flex flex-col items-center gap-2 ${active ? 'text-teal' : 'text-stone/50'} ${clickable ? 'cursor-pointer hover:opacity-80' : 'cursor-not-allowed opacity-60'}`}
      onClick={clickable ? onClick : undefined}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[14px] font-bold border-2 transition-colors ${
        current ? 'border-teal bg-teal text-white' : 
        active ? 'border-teal bg-white' : 'border-line bg-cream'
      }`}>
        {number}
      </div>
      <span className={`text-[12px] font-bold tracking-wide uppercase ${current ? 'text-teal-deep' : ''}`}>{label}</span>
    </div>
  );
}

function FormField({ label, error, children }) {
  return (
    <div className="space-y-1.5 w-full">
      <label className="text-[13.5px] font-bold text-teal-deep tracking-wide block">
        {label}
      </label>
      {children}
      {error && <p className="text-[#D32F2F] text-[12px] mt-1">{error}</p>}
    </div>
  );
}

function MockPaymentModal({ mockContext, simulateSuccess, simulateFailure }) {
  const [method, setMethod] = useState('UPI');
  const [step, setStep] = useState('methods'); // 'methods', 'confirming', 'success'

  // Log tab changes for debugging
  useEffect(() => {
    console.log("Mock Payment Tab Switched to:", method);
  }, [method]);

  const amount = mockContext?.amount || 0;
  const email = mockContext?.donorDetails?.email || 'donor@example.com';
  const phone = mockContext?.donorDetails?.phone || '+91 9876543210';

  const handleSimulate = (success) => {
    if (!success) {
      simulateFailure();
      return;
    }
    
    setStep('confirming');
    
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        simulateSuccess();
      }, 3000);
    }, 1500);
  };

  const methods = ['UPI', 'Cards', 'Netbanking', 'Wallet'];

  if (step === 'confirming') {
    return (
      <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center">
         <Loader2 size={48} className="text-teal animate-spin mb-4" />
         <h2 className="text-[20px] font-bold text-teal-deep font-display">Confirming Payment...</h2>
         <p className="text-[14px] text-stone mt-2">Please do not close this window</p>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="fixed inset-0 bg-teal z-[9999] flex flex-col items-center justify-center text-white animate-fadeUp">
         <CheckCircle2 size={64} className="mb-6 text-gold animate-bounce" />
         <h2 className="text-[32px] font-bold mb-2 font-display">Payment Successful</h2>
         <p className="text-[20px] font-bold text-gold mb-10">₹{amount}</p>
         
         <div className="bg-white/10 border border-white/20 p-8 rounded-xl2 text-left space-y-4 mb-10 min-w-[350px]">
           <p className="text-[15px] flex justify-between"><span>Method:</span> <span className="font-bold">{method}</span></p>
           <p className="text-[15px] flex justify-between"><span>Date:</span> <span className="font-bold">{new Date().toLocaleDateString()}</span></p>
           <p className="text-[15px] flex justify-between"><span>Payment ID:</span> <span className="font-bold font-mono">mock_pay_{Date.now().toString().slice(-6)}</span></p>
         </div>

         <p className="text-[15px] opacity-80 animate-pulse font-bold">You will be redirected in 3 seconds...</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-stone/40 z-[9999] flex justify-center items-center p-4 backdrop-blur-sm">
      <div className="absolute top-0 left-0 w-full bg-gold text-teal-deep text-[12px] font-bold py-1.5 text-center uppercase tracking-widest z-10 shadow-sm">
        TEST MODE (MOCK)
      </div>

      <div className="max-w-4xl w-full h-[600px] bg-white rounded-xl2 shadow-2xl flex overflow-hidden mt-6">
        
        {/* Left Sidebar - Summary */}
        <div className="w-1/3 bg-cream/30 border-r border-line p-8 flex flex-col relative">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-teal-deep text-white rounded-lg flex items-center justify-center font-bold text-xl shadow-md">T</div>
            <span className="font-bold text-[18px] text-teal-deep leading-tight">The Ability<br/>People</span>
          </div>
          
          <div className="mb-auto">
             <p className="text-[13px] text-stone font-bold uppercase mb-1 tracking-wide">Amount to pay</p>
             <p className="text-[36px] font-bold text-teal-deep mb-10">₹{amount}</p>

             <p className="text-[13px] text-stone font-bold uppercase mb-2 tracking-wide">Contact Details</p>
             <p className="text-[15px] font-bold text-teal-deep">{phone}</p>
             <p className="text-[14px] text-stone mt-0.5">{email}</p>
          </div>

          <div className="text-[12px] text-stone/60 font-bold flex items-center gap-2 mt-8">
            <span className="w-3 h-3 rounded-full bg-teal shadow-sm"></span> Secured by Razorpay (Mock)
          </div>
        </div>

        {/* Right Panel - Methods */}
        <div className="w-2/3 flex flex-col bg-white">
          <div className="p-6 border-b border-line flex justify-between items-center bg-white">
            <h3 className="text-[20px] font-bold text-teal-deep font-display">Payment Options</h3>
            <button onClick={() => handleSimulate(false)} className="text-stone/50 hover:text-red-500 hover:bg-red-50 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xl transition-colors">&times;</button>
          </div>
          
          <div className="flex flex-1 overflow-hidden">
            {/* Method Tabs */}
            <div className="w-1/3 bg-cream/10 border-r border-line flex flex-col">
              {methods.map(m => (
                <button 
                  key={m} 
                  onClick={() => setMethod(m)}
                  className={`py-5 px-5 text-[14px] font-bold text-left border-l-[3px] transition-all ${method === m ? 'border-teal bg-white text-teal-deep shadow-sm' : 'border-transparent text-stone hover:bg-cream/50'}`}
                >
                  {m}
                </button>
              ))}
            </div>
            
            {/* Method Content */}
            <div className="w-2/3 p-8 flex flex-col bg-white">
              
              <div className="flex-1">
                {method.toLowerCase() === 'upi' && (
                  <div className="text-center animate-fadeUp">
                    <div className="w-40 h-40 border-2 border-dashed border-line bg-white p-2 overflow-hidden flex items-center justify-center rounded-xl mx-auto mb-4">
                      <img src={qrCodeImg} alt="Mock QR" className="w-full h-full object-cover" style={{ objectPosition: '50% 38%', transform: 'scale(1.75)' }} />
                    </div>
                    <p className="text-[13px] font-bold text-stone">Scan QR with any UPI app</p>
                  </div>
                )}
                
                {method.toLowerCase() === 'cards' && (
                  <div className="space-y-4 animate-fadeUp">
                    <input type="text" placeholder="Card Number" className="w-full px-4 py-3 border border-line rounded-lg text-[14px] focus:outline-none focus:border-teal bg-cream/20" />
                    <div className="flex gap-3">
                       <input type="text" placeholder="MM/YY" className="w-1/2 px-4 py-3 border border-line rounded-lg text-[14px] focus:outline-none focus:border-teal bg-cream/20" />
                       <input type="password" placeholder="CVV" className="w-1/2 px-4 py-3 border border-line rounded-lg text-[14px] focus:outline-none focus:border-teal bg-cream/20" />
                    </div>
                    <input type="text" placeholder="Cardholder Name" className="w-full px-4 py-3 border border-line rounded-lg text-[14px] focus:outline-none focus:border-teal bg-cream/20" />
                  </div>
                )}
                
                {method.toLowerCase() === 'netbanking' && (
                  <div className="space-y-4 animate-fadeUp">
                    <select className="w-full px-4 py-3 border border-line rounded-lg text-[14px] text-stone focus:outline-none focus:border-teal bg-cream/20">
                      <option>State Bank of India</option>
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                      <option>Kotak Mahindra Bank</option>
                    </select>
                  </div>
                )}
                
                {method.toLowerCase() === 'wallet' && (
                  <div className="grid grid-cols-2 gap-4 animate-fadeUp">
                     {['Paytm', 'PhonePe', 'Amazon Pay', 'MobiKwik'].map(wallet => (
                       <label key={wallet} className="border border-line rounded-xl p-4 text-[13px] flex items-center gap-3 cursor-pointer hover:border-teal transition-colors font-bold text-stone bg-cream/10 hover:bg-cream/30">
                         <input type="radio" name="wallet" className="accent-teal w-4 h-4" defaultChecked={wallet==='Paytm'} /> {wallet}
                       </label>
                     ))}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4">
                 <button onClick={() => handleSimulate(true)} className="w-full py-4 bg-teal text-white text-[15px] font-bold rounded-lg hover:bg-teal-deep hover:-translate-y-0.5 transition-all shadow-md">
                   Pay ₹{amount}
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
