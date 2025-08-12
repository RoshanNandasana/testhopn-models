import React, { useEffect, useRef } from "react";
import "./LoginModal.css";

export default function LoginModal({ open, onClose, onOpenRegister }) {
  const modalRef = useRef();

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    }
    return () => {
      document.body.style.overflow = "visible";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const handleBackdropClick = (e) => {
    if (modalRef.current && e.target === modalRef.current) onClose();
  };

  if (!open) return null;

  return (
    <div
      className="login-modal-overlay"
      ref={modalRef}
      onClick={handleBackdropClick}
    >
      <div className="login-modal">
        <button
          className="login-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="login-modal-title">Sign In</div>
        <form className="login-modal-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Email" required autoFocus />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="login-modal-submit">Login</button>
          <div className="login-modal-options">
            <span style={{ fontSize: "14px", color: "#98623e", cursor: "pointer" }}>
              Forgot password?
            </span>
            <span style={{ fontSize: "14px", float: 'right' }}>
              No account?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenRegister(); // open register modal from parent
                }}
                style={{ color: '#c28b6b', textDecoration: 'underline' }}
              >
                Register
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
