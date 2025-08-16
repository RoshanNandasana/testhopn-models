import React, { useEffect, useRef } from "react";
import "./RegisterModal.css"; // reuse shared modal styles

export default function ClientAccountTypeModal({
  open,
  onClose,
  onIndividualClick,
  onCompanyClick
}) {
  const modalRef = useRef();

  // Prevent background scroll
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "visible"; };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    function onKeyDown(e) { if (e.key === "Escape") onClose(); }
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  // Close if clicking backdrop
  const handleBackdropClick = (e) => {
    if (modalRef.current && e.target === modalRef.current) onClose();
  };

  return (
    <div
      className="register-modal-overlay"
      ref={modalRef}
      onClick={handleBackdropClick}
    >
      <div className="register-modal">
        {/* Close */}
        <button
          className="register-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        {/* Title */}
        <div className="register-modal-title">Sign Up as</div>

        {/* Action Buttons */}
        <div className="register-modal-actions">
          <button className="register-modal-btn" onClick={onIndividualClick}>
            Individual
          </button>
          <button className="register-modal-btn" onClick={onCompanyClick}>
            Company
          </button>
        </div>

        {/* Footer */}
        <div className="register-modal-footer">
          Already have an account?{" "}
          <a href="/login" style={{ color: "#c28b6b" }}>
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
