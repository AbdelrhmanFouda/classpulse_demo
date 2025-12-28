"use client";
import { X, Mail, Phone, CheckCircle } from "lucide-react";

export default function ContactModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="modal-header">
                    <div className="icon-badge">
                        <CheckCircle size={32} />
                    </div>
                    <h2>Get ClassPulse for Your School</h2>
                    <p>We're currently onboarding select partner schools. Contact our founders directly to schedule a demo.</p>
                </div>

                <div className="contact-details">
                    <div className="contact-item">
                        <div className="c-icon"><Mail size={20} /></div>
                        <div>
                            <div className="label">Email Founders</div>
                            <a href="mailto:founders@classpulse.ai" className="value">founders@classpulse.ai</a>
                        </div>
                    </div>

                    <div className="contact-item">
                        <div className="c-icon"><Phone size={20} /></div>
                        <div>
                            <div className="label">Direct Line</div>
                            <a href="tel:+201069800643" className="value">+20 106 980 0643</a>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="done-btn" onClick={onClose}>Got it</button>
                </div>
            </div>

            <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.2s ease-out;
          padding: 1rem;
        }

        .modal-content {
          background: white;
          width: 100%;
          max-width: 450px;
          border-radius: 24px;
          padding: 2rem;
          position: relative;
          box-shadow: 0 20px 50px rgba(0,0,0,0.2);
          animation: slideUp 0.3s ease-out;
        }

        .close-btn {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: transparent;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          transition: color 0.2s;
        }
        .close-btn:hover { color: #1e293b; }

        .modal-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .icon-badge {
          width: 64px;
          height: 64px;
          background: #dbeafe;
          color: #2563eb;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem auto;
        }

        h2 {
          font-size: 1.5rem;
          color: #0f172a;
          margin-bottom: 0.75rem;
          font-weight: 700;
        }

        p {
          color: #64748b;
          line-height: 1.5;
        }

        .contact-details {
          background: #f8fafc;
          border-radius: 16px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .c-icon {
          width: 40px;
          height: 40px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3b82f6;
        }

        .label {
          font-size: 0.8rem;
          color: #64748b;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 2px;
        }

        .value {
          color: #1e293b;
          font-weight: 600;
          font-size: 1.1rem;
          text-decoration: none;
        }
        .value:hover { color: #2563eb; text-decoration: underline; }

        .modal-footer {
          display: flex;
          justify-content: center;
        }

        .done-btn {
          width: 100%;
          background: #0f172a;
          color: white;
          padding: 1rem;
          border-radius: 12px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: background 0.2s;
        }
        .done-btn:hover { background: #334155; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
        </div>
    );
}
