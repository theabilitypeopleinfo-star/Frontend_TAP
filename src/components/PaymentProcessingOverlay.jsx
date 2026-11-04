import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

export default function PaymentProcessingOverlay({ 
  isProcessing = false, 
  statusText = "Verifying Payment", 
  isSuccess = false 
}) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (!isProcessing || isSuccess) return;
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);
    return () => clearInterval(interval);
  }, [isProcessing, isSuccess]);

  if (!isProcessing) return null;

  return (
    <div 
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0F4C4C]/85 backdrop-blur-sm transition-opacity"
      role="status" 
      aria-live="polite"
    >
      <style>{`
        .coin-container {
          perspective: 1000px;
          width: 90px;
          height: 90px;
          margin-bottom: 24px;
        }
        
        .coin-spin {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: spin-coin 1.5s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .coin-spin {
            animation: none;
          }
        }

        .coin-face {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          backface-visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Fraunces', serif;
          font-weight: bold;
          font-size: 36px;
          color: #0F4C4C;
          background: radial-gradient(circle at 30% 30%, #F4D998 0%, #C08A2E 50%, #8C630F 100%);
          box-shadow: inset 0 0 0 4px rgba(255,255,255,0.2), 0 4px 15px rgba(0,0,0,0.3);
          border: 2px solid #C08A2E;
        }

        .coin-back {
          transform: rotateY(180deg);
          font-size: 26px;
        }

        @keyframes spin-coin {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
      `}</style>

      <div className="coin-container">
        {isSuccess ? (
          <div className="coin-face shadow-lg">
            <Check size={48} className="text-[#0F4C4C]" strokeWidth={3} />
          </div>
        ) : (
          <div className="coin-spin">
            <div className="coin-face">₹</div>
            <div className="coin-face coin-back">TAP</div>
          </div>
        )}
      </div>

      <div className="text-center font-body text-[#FBF6EC]">
        <h3 className="text-2xl font-bold font-display mb-2 min-w-[200px] flex items-center justify-center gap-1">
          {isSuccess ? "Payment Confirmed!" : <>{statusText}<span className="inline-block w-6 text-left">{dots}</span></>}
        </h3>
        {!isSuccess && (
          <p className="text-[14px] opacity-80 animate-pulse mt-1">
            Please don't close or refresh this window
          </p>
        )}
      </div>
    </div>
  );
}
