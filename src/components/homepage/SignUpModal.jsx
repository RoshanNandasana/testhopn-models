import React, { useEffect, useRef } from "react";
import "./RegisterModal.css"; // Shared modal CSS

export default function SignUpModal({
  open,
  onClose,
  onSignUpWithEmail,
  title = "Sign Up",
}) {
  const modalRef = useRef();

  // Prevent background scrolling when open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [open]);

  // Close on Escape key press
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="register-modal-overlay"
      ref={modalRef}
      onClick={(e) => e.target === modalRef.current && onClose()}
    >
      <div className="register-modal">
        {/* Close button */}
        <button
          className="register-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        {/* Modal Title */}
        <div className="register-modal-title">{title}</div>

        {/* Google SignUp */}
        <button className="signup-google-btn">
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            width={20}
            style={{ marginRight: 9 }}
          />
          Continue with Google
        </button>

        {/* Email SignUp */}
        <button className="signup-email-btn" onClick={onSignUpWithEmail}>
          Sign up with Email
        </button>

        {/* Footer redirect */}
        <div className="register-modal-footer">
          Already have an account?{" "}
          <a href="/login">Sign in</a>
        </div>
      </div>
    </div>
  );
}
