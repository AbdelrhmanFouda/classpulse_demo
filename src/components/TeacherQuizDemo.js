"use client";
import { useState, useEffect } from "react";
import { Bot, Check, Play } from "lucide-react";

export default function TeacherQuizDemo() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        // Sequence:
        // 0: Initial state (1s)
        // 1: Select Topic (1s)
        // 2: Click AI Generate (1.5s)
        // 3: Loading (2s)
        // 4: Questions Appear (2s)
        // 5: Start Session (1s)
        // 6: Live (3s)
        // Loop
        const timeline = [1000, 1000, 1500, 2000, 2000, 1000, 4000];
        let currentStep = 0;

        const runLoop = () => {
            setTimeout(() => {
                currentStep = (currentStep + 1) % timeline.length;
                setStep(currentStep);
                runLoop();
            }, timeline[currentStep]);
        };

        runLoop();
        return () => { }; // Cleanup difficult with recursive timeout, ignoring for demo
    }, []);

    return (
        <div className="demo-content teacher-quiz">
            <div className="ui-header">
                <div className="ui-title">Create New Quiz</div>
            </div>

            <div className="ui-body">
                {step >= 0 && (
                    <div className="form-group slide-up">
                        <label>Topic</label>
                        <div className={`input-fake ${step >= 1 ? 'filled' : ''}`}>
                            {step >= 1 ? "Fractions & Decimals" : "Type a topic..."}
                        </div>
                    </div>
                )}

                <div className="ai-actions fade-in">
                    <button className={`btn-ai ${step === 2 ? 'clicking' : ''}`}>
                        <Bot size={16} /> Generate with AI
                    </button>
                    <button className="btn-secondary">Upload PDF</button>
                </div>

                {step === 3 && (
                    <div className="loading-state fade-in">
                        <Bot size={32} className="pulse-icon" />
                        <span>Generating questions...</span>
                    </div>
                )}

                {step >= 4 && (
                    <div className="questions-list slide-up">
                        <div className="q-item">
                            <span className="q-num">1</span>
                            <div className="q-lines">
                                <div className="line l-long"></div>
                                <div className="line l-short"></div>
                            </div>
                        </div>
                        <div className="q-item">
                            <span className="q-num">2</span>
                            <div className="q-lines">
                                <div className="line l-long"></div>
                            </div>
                        </div>
                        <div className="q-item">
                            <span className="q-num">3</span>
                            <div className="q-lines">
                                <div className="line l-long"></div>
                            </div>
                        </div>
                    </div>
                )}

                {step >= 5 && (
                    <div className="bottom-bar slide-up">
                        <button className={`btn-start ${step === 5 ? 'clicking' : ''}`}>
                            {step >= 6 ? "Session Live" : "Start Session"} <Play size={16} />
                        </button>
                    </div>
                )}
            </div>

            <style jsx>{`
        .demo-content {
          padding: 2rem;
          height: 100%;
          background: #f8fafc;
          position: relative;
        }

        .ui-header {
          margin-bottom: 2rem;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 1rem;
        }

        .ui-title {
          font-family: var(--font-outfit);
          font-size: 1.25rem;
          font-weight: 600;
          color: #1e293b;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        label {
          display: block;
          font-size: 0.85rem;
          color: #64748b;
          margin-bottom: 0.5rem;
        }

        .input-fake {
          background: white;
          border: 1px solid #cbd5e1;
          padding: 0.75rem;
          border-radius: 8px;
          color: #94a3b8;
          font-size: 0.9rem;
          transition: all 0.3s;
        }

        .input-fake.filled {
          color: #334155;
          border-color: var(--primary);
          background: var(--primary-light);
        }

        .ai-actions {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.25rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          transition: transform 0.1s;
        }

        .btn-ai {
          background: var(--primary);
          color: white;
          box-shadow: 0 4px 6px -1px var(--primary-light);
        }

        .btn-secondary {
          background: white;
          border: 1px solid #cbd5e1;
          color: #64748b;
        }

        .clicking {
          transform: scale(0.95);
        }

        .loading-state {
          text-align: center;
          color: var(--primary);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .pulse-icon {
          animation: pulse 1s infinite;
        }

        .questions-list {
          background: white;
          border-radius: 12px;
          padding: 1rem;
          box-shadow: var(--shadow-sm);
        }

        .q-item {
          display: flex;
          gap: 1rem;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f1f5f9;
        }

        .q-num {
          background: #f1f5f9;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          color: #64748b;
        }

        .q-lines {
          flex: 1;
        }

        .line {
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          margin-bottom: 6px;
        }
        .l-long { width: 80%; }
        .l-short { width: 40%; }

        .bottom-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 1.5rem;
          background: white;
          border-top: 1px solid #e2e8f0;
          display: flex;
          justify-content: flex-end;
        }

        .btn-start {
          background: #10b981;
          color: white;
          padding: 0.75rem 2rem;
        }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }

        .slide-up {
          animation: slideUp 0.4s ease-out;
        }
        
        .fade-in {
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes slideUp {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
      `}</style>
        </div>
    );
}
