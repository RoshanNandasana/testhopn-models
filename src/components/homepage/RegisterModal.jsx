import React, { useEffect, useRef } from "react";
import "./RegisterModal.css";

export default function RegisterModal({ open, onClose, onModelClick, onClientClick, onOpenLogin }) {
  const modalRef = useRef();

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

  if (!open) return null;

  return (
    <div
      className="register-modal-overlay"
      ref={modalRef}
      onClick={handleBackdropClick}
    >
      <div className="register-modal">
        <button
          className="register-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="register-modal-title">Sign Up as</div>
        <div className="register-modal-actions">
          <button className="register-modal-btn" onClick={onModelClick}>Model</button>
          <button className="register-modal-btn" onClick={onClientClick}>Client</button>
        </div>
        <div className="register-modal-footer">
          Already have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onOpenLogin();  // open login modal from parent
            }}
            style={{ color: '#c28b6b', textDecoration: 'underline' }}
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
