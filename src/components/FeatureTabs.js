"use client";
import React from 'react';

export default function FeatureTabs({ features, activeFeature, onSelectFeature }) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <div className="tabs-container">
        {features.map((feature) => {
          const isActive = activeFeature === feature.id;
          return (
            <button
              key={feature.id}
              onClick={() => onSelectFeature(feature.id)}
              className={`tab-btn ${isActive ? 'active' : 'inactive'}`}
            >
              {feature.icon}
              {feature.label}
            </button>
          );
        })}
      </div>

      <style jsx>{`
        .tabs-container {
          display: flex;
          flex-direction: row; /* Horizontal */
          width: 100%; /* Full width */
          gap: 0.25rem; /* Tiny gap */
          background-color: transparent;
          padding: 0;
          border: none;
        }

        .tab-btn {
          flex: 1; /* Force equal width to FIT ALL */
          padding: 0.5rem 0.25rem;
          border-radius: 8px; /* Slightly squarer for space */
          font-size: 0.7rem; /* Small text to fit */
          line-height: 1.1;
          font-weight: 600;
          transition: all 200ms;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.25rem;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(0,0,0,0.1);
          color: #334155;
          text-align: center;
          white-space: normal; /* Allow wrap/multiline if needed */
        }

        .active {
          background-color: #2563eb;
          border-color: #2563eb;
          color: white;
          box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
        }

        .inactive {
          background: white;
          color: #475569;
        }

        @media (min-width: 768px) {
          .tabs-container {
            flex-direction: row;
            justify-content: center;
            background-color: white; /* Clean white bg */
            padding: 0.5rem;
            border-radius: 99px;
            border: 1px solid #e2e8f0; /* Visible container border */
          }
          .tab-btn {
            border-radius: 99px;
            background: transparent;
            border: 1px solid #cbd5e1; /* RESTORED BORDER */
            color: #64748b;
            padding: 0.6rem 1.2rem;
          }
          .active {
             background-color: #2563eb;
             color: white;
             border-color: #2563eb;
          }
          .inactive:hover {
            color: #1e293b;
            background-color: #f1f5f9;
            border-color: #94a3b8;
          }
        }
      `}</style>
    </div>
  );
}
