"use client";
import { useState } from "react";
import { Check, BarChart2, Brain, Shield, TrendingUp, Users } from "lucide-react";
import ContactModal from "./ContactModal";

export default function SchoolHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const benefits = [
    { icon: <TrendingUp size={16} />, text: "School-wide performance visibility" },
    { icon: <Check size={16} />, text: "Standardized assessment quality" },
    { icon: <Users size={16} />, text: "Teacher effectiveness insights" },
    { icon: <Shield size={16} />, text: "No phones. No distractions." },
  ];

  return (
    <div className="school-header">
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="header-content">
        <div className="badge">Built to Improve Schools • Eliminate Distractions</div>
        <h1>
          One system to manage engagement, assessment, and insight <span className="text-gradient">across your school.</span>
        </h1>
        <p>
          ClassPulse gives school leadership real-time visibility into classroom engagement, student performance, and teaching quality — without adding phones, apps, or disruption.
        </p>

        <div className="cta-group">
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>Request School Demo</button>
          <button className="btn-secondary" onClick={() => alert("This would open the ClassPulse explainer video overlay.")}>Watch ClassPulse Explainer</button>
        </div>

        <div className="benefits-list">
          {benefits.map((b, i) => (
            <div key={i} className="benefit-item">
              <span className="benefit-icon">{b.icon}</span>
              <span>{b.text}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .school-header {
          margin-bottom: 3rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .header-content {
          max-width: 900px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .badge {
            background: #f1f5f9;
            color: #475569;
            font-size: 0.85rem;
            font-weight: 600;
            padding: 6px 12px;
            border-radius: 99px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 1.5rem;
            display: inline-block;
        }
        
        h1 {
          font-size: 3rem;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          color: var(--text-main);
          letter-spacing: -0.03em;
          font-weight: 800;
        }

        .text-gradient {
            background: linear-gradient(135deg, #2563eb, #7c3aed);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        p {
          font-size: 1.25rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          max-width: 700px;
          line-height: 1.6;
        }

        .cta-group {
            display: flex;
            gap: 1rem;
            margin-bottom: 3rem;
        }

        .btn-primary {
            background: #2563eb;
            color: white;
            padding: 0.85rem 1.5rem;
            border-radius: 8px;
            font-weight: 600;
            font-size: 1rem;
            border: none;
            cursor: pointer;
            transition: transform 0.2s;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
        }
        .btn-primary:hover { transform: translateY(-2px); background: #1d4ed8; }

        .btn-secondary {
            background: white;
            color: #475569;
            padding: 0.85rem 1.5rem;
            border-radius: 8px;
            font-weight: 600;
            font-size: 1rem;
            border: 1px solid #e2e8f0;
            cursor: pointer;
            transition: all 0.2s;
        }
        .btn-secondary:hover { background: #f8fafc; border-color: #cbd5e1; }

        .benefits-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem;
        }

        .benefit-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: white;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          font-weight: 500;
          color: #334155;
          font-size: 0.9rem;
          box-shadow: 0 1px 2px rgba(0,0,0,0.02);
        }

        .benefit-icon {
          color: #2563eb;
          display: flex;
        }

        @media (max-width: 768px) {
          h1 { font-size: 1.25rem !important; margin-bottom: 0.75rem; } /* Half size */
          p { font-size: 0.9rem; line-height: 1.4; margin-bottom: 1.5rem; }
          .badge { font-size: 0.65rem; padding: 4px 8px; margin-bottom: 1rem; }
          .school-header { margin-bottom: 1.5rem; }
          
          .cta-group { flex-direction: column; width: 100%; gap: 0.5rem; margin-bottom: 1.5rem; }
          .btn-primary, .btn-secondary { width: 100%; padding: 0.75rem 1rem; font-size: 0.9rem; }
          
          .benefits-list { display: grid; grid-template-columns: 1fr 1fr; width: 100%; gap: 0.5rem; }
          .benefit-item { width: auto; justify-content: start; font-size: 0.75rem; padding: 0.5rem; }
        }
      `}</style>
    </div>
  );
}
