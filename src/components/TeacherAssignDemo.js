"use client";
import { useState, useEffect } from "react";
import { FileText, Calendar, Send, Check } from "lucide-react";

export default function TeacherAssignDemo() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        // 0: Init (1s)
        // 1: Type Title (1s)
        // 2: Set Due Date (1s)
        // 3: Click Assign (1s)
        // 4: Assigning... (1s)
        // 5: Assigned Success (3s)
        const timeline = [1000, 1000, 1000, 1000, 1000, 3000];
        let currentStep = 0;

        const runLoop = () => {
            setTimeout(() => {
                currentStep = (currentStep + 1) % timeline.length;
                setStep(currentStep);
                runLoop();
            }, timeline[currentStep]);
        };

        runLoop();
        return () => { };
    }, []);

    return (
        <div className="demo-content teacher-assign">
            <div className="card-ui">
                <div className="card-header">
                    <h3>New Assignment</h3>
                </div>

                <div className="card-body">
                    <div className="input-row">
                        <FileText size={18} color="#64748b" />
                        <div className={`fake-input ${step >= 1 ? 'filled' : ''}`}>
                            {step >= 1 ? "Essay: Shakespeare's Themes" : "Assignment Title"}
                        </div>
                    </div>

                    <div className="input-row">
                        <Calendar size={18} color="#64748b" />
                        <div className={`fake-input ${step >= 2 ? 'filled' : ''}`}>
                            {step >= 2 ? "Due: Next Friday" : "Set Due Date"}
                        </div>
                    </div>

                    <div className="divider"></div>

                    <div className="assign-area">
                        <button className={`btn-assign ${step === 3 ? 'click' : ''} ${step >= 5 ? 'success' : ''}`}>
                            {step < 5 ? (
                                <>
                                    <Send size={16} /> {step === 4 ? "Sending..." : "Assign to Grade 10A"}
                                </>
                            ) : (
                                <>
                                    <Check size={16} /> Assigned Successfully
                                </>
                            )}
                        </button>
                    </div>

                    {step >= 5 && (
                        <div className="ai-badge slide-up">
                            ✨ AI Grading Enabled
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
         .demo-content {
            background: #f1f5f9;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
         }

         .card-ui {
            background: white;
            width: 100%;
            max-width: 400px;
            border-radius: 12px;
            box-shadow: var(--shadow-lg);
            overflow: hidden;
         }

         .card-header {
           padding: 1.5rem;
           border-bottom: 1px solid #e2e8f0;
         }
         
         h3 { font-size: 1.1rem; color: #1e293b; }

         .card-body {
           padding: 1.5rem;
           display: flex;
           flex-direction: column;
           gap: 1.25rem;
         }

         .input-row {
           display: flex;
           align-items: center;
           gap: 1rem;
         }

         .fake-input {
           flex: 1;
           height: 40px;
           background: #f8fafc;
           border-radius: 6px;
           border: 1px solid #e2e8f0;
           display: flex;
           align-items: center;
           padding-left: 1rem;
           font-size: 0.9rem;
           color: #94a3b8;
           transition: all 0.3s;
         }

         .fake-input.filled {
           color: #334155;
           background: white;
           border-color: #cbd5e1;
         }

         .divider {
           height: 1px;
           background: #e2e8f0;
           margin: 0.5rem 0;
         }

         .btn-assign {
           width: 100%;
           background: var(--primary);
           color: white;
           padding: 0.75rem;
           border-radius: 8px;
           font-weight: 500;
           display: flex;
           align-items: center;
           justify-content: center;
           gap: 0.5rem;
           transition: transform 0.1s;
         }

         .btn-assign.click {
            transform: scale(0.96);
         }

         .btn-assign.success {
            background: #10b981;
         }

         .ai-badge {
           text-align: center;
           font-size: 0.8rem;
           color: var(--primary);
           background: var(--primary-light);
           padding: 0.4rem;
           border-radius: 99px;
           align-self: center;
         }

         .slide-up { animation: slideUp 0.3s ease-out; }
         @keyframes slideUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
         }
       `}</style>
        </div>
    )
}
