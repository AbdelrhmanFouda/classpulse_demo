"use client";
import { Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer-root">
      <div className="footer-content">
        <div className="copyright">
          © 2024 ClassPulse. All rights reserved.
        </div>

        <div className="contact-links">
          <a
            href="mailto:founders@classpulse.ai"
            className="link"
          >
            <Mail size={16} />
            <span>founders@classpulse.ai</span>
          </a>
          <a
            href="tel:+201069800643"
            className="link"
          >
            <Phone size={16} />
            <span>+20 106 980 0643</span>
          </a>
        </div>
      </div>

      <style jsx>{`
        .footer-root {
          width: 100%;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          background-color: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(24px);
          margin-top: auto;
          position: relative;
          z-index: 50;
        }

        .footer-content {
          max-width: 80rem; /* max-w-7xl */
          margin: 0 auto;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .copyright {
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.875rem;
        }

        .contact-links {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: color 0.15s;
        }
        .link:hover {
          color: white;
        }

        @media (min-width: 768px) {
          .footer-content {
            flex-direction: row;
            height: 6rem;
            padding: 0 1.5rem;
            padding-bottom: 0;
            padding-top: 0;
            gap: 0;
          }
          .contact-links {
            flex-direction: row;
            gap: 1.5rem;
          }
        }
      `}</style>
    </footer>
  );
}
