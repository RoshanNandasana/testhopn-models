import React, { useEffect, useRef, useState } from "react";
import "./RegisterModal.css";

export default function EmailSignUpModal({ open, onClose, onEmailSignup }) {
  const modalRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "visible"; };
  }, [open]);

  useEffect(() => {
    function onKeyDown(e) { if (e.key === "Escape") onClose(); }
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const handleBackdropClick = (e) => {
    if (modalRef.current && e.target === modalRef.current) onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password || !confirm) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    onEmailSignup(email); // parent handler (opens next step / route)
    setEmail(""); setPassword(""); setConfirm(""); setError("");
  };

  if (!open) return null;

  return (
    <div
      className="register-modal-overlay"
      ref={modalRef}
      onClick={handleBackdropClick}
    >
      <div className="register-modal">
        <button className="register-modal-close" onClick={onClose} aria-label="Close">&times;</button>
        <div className="register-modal-title">Sign Up</div>
        <form className="email-signup-form" onSubmit={handleSubmit} noValidate>
          <input
            type="email"
            placeholder="Email"
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
          />
          {error && <div className="error-text">{error}</div>}
          <button type="submit" className="signup-email-btn" style={{marginTop: '8px'}}>Sign Up</button>
        </form>
        <div className="register-modal-footer" style={{marginTop:15}}>
          Already have an account? <a href="/login">Sign in</a>
        </div>
      </div>
    </div>
  );
}
