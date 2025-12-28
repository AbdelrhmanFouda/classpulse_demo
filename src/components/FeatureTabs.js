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
          flex-direction: column;
          justify-content: center;
          gap: 1rem;
          background-color: rgba(255, 255, 255, 0.05);
          padding: 0.5rem;
          border-radius: 1rem;
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .tab-btn {
          padding: 0.75rem 1.5rem;
          border-radius: 0.75rem;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 300ms;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          border: 1px solid transparent; /* Reserve space for border */
        }

        .active {
          background-color: #2563eb; /* blue-600 */
          border-color: #2563eb;
          color: white;
          box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.25);
          transform: scale(1.02);
        }

        .inactive {
          color: #0f172a; /* Dark text for visibility */
          border-color: #000000; /* Black border as requested */
          background-color: rgba(255, 255, 255, 0.5);
        }
        .inactive:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }

        @media (min-width: 768px) {
          .tabs-container {
            flex-direction: row;
          }
        }
      `}</style>
    </div>
  );
}
