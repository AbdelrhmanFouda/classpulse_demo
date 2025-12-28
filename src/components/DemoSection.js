"use client";
import { useState } from "react";
import SchoolHeader from "./SchoolHeader";
import FeatureTabs from "./FeatureTabs";
import DemoContainer from "./DemoContainer";
import { ChevronDown, ChevronUp, Code2 } from "lucide-react";

export default function DemoSection() {
  const [activeFeature, setActiveFeature] = useState("clicker");

  // Technical section state
  const [showTechnical, setShowTechnical] = useState(false);
  const [technicalFeature, setTechnicalFeature] = useState("quiz");

  const studentFeatures = [
    { id: 'clicker', label: 'Clicker Session' },
    { id: 'submit', label: 'Submit Assignment' },
    { id: 'speaking', label: 'Speaking Practice' }
  ];

  const teacherFeatures = [
    { id: 'quiz', label: 'Create Quiz' },
    { id: 'assign', label: 'Create Assignment' },
    { id: 'grades', label: 'View Grades' }
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-12 py-24 overflow-hidden">
      <div className="container">

        {/* 1. Static School Header */}
        <SchoolHeader />

        {/* 2. Unified Interactive Demo Module */}
        <div className="unified-demo-module">

          {/* Main Feature Navigation */}
          <div className="module-header">
            <h2 className="section-title">ClassPulse Features</h2>
            <div className="feature-group">
              <FeatureTabs
                features={studentFeatures}
                activeFeature={activeFeature}
                onSelectFeature={setActiveFeature}
              />
            </div>
          </div>

          {/* Main Demo Canvas (Student Role) */}
          <div className="demo-canvas">
            <DemoContainer activeRole="student" activeFeature={activeFeature} />
          </div>

          {/* Technical / "How is this made?" Section */}
          <div className="technical-section">
            <button
              className={`tech-toggle-btn ${showTechnical ? 'active' : ''}`}
              onClick={() => setShowTechnical(!showTechnical)}
            >
              <Code2 size={16} />
              <span>How is this made?</span>
              {showTechnical ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            <div className={`technical-content ${showTechnical ? 'expanded' : ''}`}>
              <div className="tech-controls">
                <span className="tech-label">Teacher & Admin View</span>
                <FeatureTabs
                  features={teacherFeatures}
                  activeFeature={technicalFeature}
                  onSelectFeature={setTechnicalFeature}
                />
              </div>
              <div className="tech-canvas">
                <DemoContainer activeRole="teacher" activeFeature={technicalFeature} />
              </div>
            </div>
          </div>

        </div>

      </div>

      <style jsx>{`
        .demo-section {
          padding: 4rem 0;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: 'Inter', sans-serif;
        }

        .unified-demo-module {
            background: white;
            border-radius: 24px;
            box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1);
            border: 1px solid #e2e8f0;
            overflow: hidden;
            max-width: 1100px;
            margin: 0 auto;
            animation: slideUp 0.6s ease-out;
        }

        .module-header {
            padding: 1.5rem 2rem;
            border-bottom: 1px solid #f1f5f9;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #ffffff;
            flex-wrap: wrap;
            gap: 1.5rem;
        }

        .section-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }

        .demo-canvas {
            background: #f8fafc;
            min-height: 520px;
            padding: 0;
            border-bottom: 1px solid #f1f5f9;
        }

        /* Technical Section Styling */
        .technical-section {
          background: #f8fafc;
        }

        .tech-toggle-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem;
          background: white;
          border: none;
          border-top: 1px solid #e2e8f0;
          color: #64748b;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tech-toggle-btn:hover {
          color: #2563eb;
          background: #f1f5f9;
        }

        .tech-toggle-btn.active {
          border-bottom: 1px solid #e2e8f0;
          color: #2563eb;
          font-weight: 600;
        }

        .technical-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease-in-out, opacity 0.4s ease-in-out;
          opacity: 0;
          background: #f1f5f9;
        }

        .technical-content.expanded {
          max-height: 800px; /* Arbitrary large height to allow expansion */
          opacity: 1;
        }

        .tech-controls {
          padding: 1.5rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #e2e8f0;
          background: #f8fafc;
        }

        .tech-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .tech-canvas {
          background: white;
          min-height: 400px;
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @media (max-width: 768px) {
            .module-header { flex-direction: column; align-items: flex-start; }
            .tech-controls { flex-direction: column; align-items: flex-start; gap: 1rem; }
        }
      `}</style>
    </section>
  );
}
