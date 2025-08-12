import React, { useRef, useEffect, useState } from "react";
import "./RegisterModal.css"; // reuse your modal CSS for consistency

export default function OTPModal({ open, type = "email", to, onSubmit, onClose }) {
  const modalRef = useRef();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  // Disable background scroll while modal is open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "visible"; };
  }, [open]);

  // Close on ESC key
  useEffect(() => {
    function onKeyDown(e) { if (e.key === "Escape") onClose(); }
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Handle single box input & auto-focus next
  const handleInput = (val, idx) => {
    if (!/^[0-9]?$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);
    if (val && idx < otp.length - 1) {
      document.getElementById(`otp-${idx+1}`).focus();
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (otp.some(x => x === "")) {
      setError("Enter full OTP.");
      return;
    }
    setError("");
    onSubmit(otp.join(""));
  };

  if (!open) return null;

  return (
    <div
      className="register-modal-overlay"
      ref={modalRef}
      onClick={e => e.target === modalRef.current && onClose()}
    >
      <div className="register-modal">
        <button className="register-modal-close" onClick={onClose} aria-label="Close">&times;</button>
        <div className="register-modal-title">Email Verification</div>
        <div style={{marginBottom:17,paddingRight:15, fontSize:15.3, color:"#000000"}}>
          We sent a verification code to:<br />
          <span style={{fontWeight:500, color:"#C28B6B"}}>{to}</span>
        </div>

        <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", alignItems:"center", gap:12, width:"100%"}}>
          <div style={{display:"flex", gap:10}}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                value={digit}
                onChange={e => handleInput(e.target.value, idx)}
                inputMode="numeric"
                maxLength={1}
                style={{
                  width: 38,
                  height: 26,
                  border: "1.2px solid #d6c1af",
                  borderRadius: 5,
                  fontSize: 22,
                  textAlign: "center"
                }}
                autoFocus={idx === 0}
              />
            ))}
          </div>
          {error && <div style={{color: "#b9402a", fontSize:13, minHeight: 18}}>{error}</div>}
          <button type="submit" className="signup-email-btn" style={{marginTop: 13, width: 244,backgroundColor: '#C28B6B',borderRadius:'0'}}>
            Verify
          </button>
        </form>

        <div className="register-modal-footer" style={{marginTop:18}}>
          Didn't receive a code? <a href="#" style={{color:'#c28b6b'}}>Resend</a>
        </div>
      </div>
    </div>
  );
}
