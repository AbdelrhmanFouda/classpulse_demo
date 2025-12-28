"use client";
import { useState, useEffect, useRef } from "react";
import { CheckCircle, AlertTriangle, PenLine, Sparkles, Send } from "lucide-react";

export default function StudentSubmitDemo() {
    const [phase, setPhase] = useState("typing"); // typing, waiting, submitting, feedback
    const [typedChars, setTypedChars] = useState([0, 0, 0]);

    const questions = [
        {
            id: 1,
            q: "What was the main purpose of the pyramids in Ancient Egypt?",
            fullAnswer: "The pyramids were built as tombs for pharaohs and important leaders to help them in the afterlife.",
            status: "correct",
            feedback: "Excellent. You correctly identified both the function (tombs) and the cultural significance (afterlife)."
        },
        {
            id: 2,
            q: "Who was Julius Caesar and why was he important?",
            fullAnswer: "Julius Caesar was a Roman general who expanded the empire and became a dictator, leading to the end of the Republic.",
            status: "improvement",
            feedback: "Good summary. To improve, mention the Senate's reaction or the specific date of his assassination."
        },
        {
            id: 3,
            q: "What caused the start of World War I?",
            fullAnswer: "The war started after the assassination of Archduke Franz Ferdinand, which triggered a chain of alliances.",
            status: "improvement",
            feedback: "Accurate trigger. For full marks, explain *why* the alliances led to global conflict."
        }
    ];

    // Typing Loop
    useEffect(() => {
        let interval;
        if (phase === "typing") {
            interval = setInterval(() => {
                setTypedChars((prev) => {
                    const newChars = [...prev];
                    let updated = false;

                    questions.forEach((q, i) => {
                        if (newChars[i] < q.fullAnswer.length) {
                            newChars[i] += 1; // Type 1 char
                            updated = true;
                        }
                    });

                    if (!updated) {
                        setPhase("waiting"); // All typed
                    }
                    return newChars;
                });
            }, 20); // Speed of typing
        }
        return () => clearInterval(interval);
    }, [phase]);

    // Reset Loop logic
    useEffect(() => {
        if (phase === "feedback") {
            const timer = setTimeout(() => {
                // Reset everything
                setPhase("typing");
                setTypedChars([0, 0, 0]);
            }, 8000); // Show feedback for longer (8s)
            return () => clearTimeout(timer);
        }
    }, [phase]);

    const handleSubmit = () => {
        if (phase === "submitting" || phase === "feedback") return;

        // Auto-complete typing if user clicks early
        setTypedChars(questions.map(q => q.fullAnswer.length));

        setPhase("submitting");
        setTimeout(() => {
            setPhase("feedback");
        }, 1200);
    };

    return (
        <div className="demo-content">
            <div className="layout-grid">

                {/* Left Column: Assignment */}
                <div className="col-left">
                    <div className="assignment-header">
                        <div className="subject-tag">History 101</div>
                        <h3>Ancient Civilizations</h3>
                    </div>

                    <div className="questions-list">
                        {questions.map((q, i) => (
                            <div key={q.id} className="question-card">
                                <div className="q-label">Question {q.id}</div>
                                <div className="q-text">{q.q}</div>
                                <div className="answer-input">
                                    <PenLine size={14} className="icon-pen" />
                                    <div className="text-content">
                                        {q.fullAnswer.substring(0, typedChars[i])}
                                        {phase === 'typing' && typedChars[i] < q.fullAnswer.length && <span className="cursor">|</span>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="action-bar">
                        <button
                            className={`btn-submit ${phase === 'submitting' ? 'loading' : ''} ${phase === 'feedback' ? 'disabled' : ''}`}
                            onClick={handleSubmit}
                        >
                            {phase === 'submitting' ? "Submitting..." :
                                phase === 'feedback' ? "Submitted" :
                                    <>Submit Assignment <Send size={16} /></>}
                        </button>
                    </div>
                </div>

                {/* Right Column: AI Feedback */}
                <div className="col-right">
                    <div className="feedback-header">
                        <Sparkles size={18} className="ai-icon" />
                        <span>AI Grading Analysis</span>
                    </div>

                    <div className="feedback-list">
                        {phase === 'feedback' ? (
                            questions.map((q, i) => (
                                <div key={q.id} className="feedback-card slide-in" style={{ animationDelay: `${i * 150}ms` }}>
                                    <div className="fb-meta">
                                        <span className="fb-label">Feedback for Q{q.id}</span>
                                        {q.status === 'correct'
                                            ? <span className="grade-pill high">Full Marks</span>
                                            : <span className="grade-pill mid">Partial Credit</span>
                                        }
                                    </div>
                                    <p className="fb-text">{q.feedback}</p>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <div className="empty-icon"></div>
                                <p>Waiting for submission...</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            <style jsx>{`
        .demo-content {
          background: #f8fafc;
          height: 100%;
          padding: 1.5rem;
          font-family: 'Inter', sans-serif;
          overflow: hidden;
        }

        .layout-grid {
            display: grid;
            grid-template-columns: 1fr 340px; /* Split pane */
            gap: 1.5rem;
            height: 100%;
            max-width: 1000px;
            margin: 0 auto;
        }

        /* Left Column */
        .col-left {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            height: 100%;
            overflow-y: auto;
            padding-right: 4px; /* Scrollbar space */
        }

        .assignment-header {
            background: white;
            padding: 1.25rem;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 1px 2px rgba(0,0,0,0.02);
        }
        .subject-tag {
            font-size: 0.75rem;
            font-weight: 700;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 0.25rem;
        }
        .assignment-header h3 {
            font-size: 1.25rem;
            color: #1e293b;
            font-weight: 700;
        }

        .questions-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .question-card {
            background: white;
            padding: 1.25rem;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
        }
        .q-label { font-size: 0.8rem; font-weight: 600; color: #94a3b8; margin-bottom: 0.5rem; }
        .q-text { font-size: 0.95rem; font-weight: 500; color: #334155; margin-bottom: 1rem; }
        
        .answer-input {
            background: #f8fafc;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            padding: 0.75rem;
            min-height: 3rem;
            display: flex;
            gap: 0.75rem;
            font-size: 0.9rem;
            color: #475569;
            align-items: flex-start;
        }
        .icon-pen { color: #94a3b8; margin-top: 2px; flex-shrink: 0; }
        .cursor { animation: blink 1s infinite; color: #3b82f6; }

        .action-bar {
            position: sticky;
            bottom: 0;
            padding-bottom: 1rem;
            margin-top: auto;
        }

        .btn-submit {
            width: 100%;
            background: #2563eb;
            color: white;
            padding: 1rem;
            border-radius: 10px;
            font-weight: 600;
            border: none;
            cursor: pointer;
            display: flex; align-items: center; justify-content: center; gap: 8px;
            transition: all 0.2s;
            box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
        }
        .btn-submit:hover { background: #1d4ed8; }
        .btn-submit.disabled { background: #94a3b8; cursor: default; box-shadow: none; }

        /* Right Column */
        .col-right {
            background: white;
            border-radius: 16px;
            border: 1px solid #e2e8f0;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
        }

        .feedback-header {
            padding: 1rem;
            background: #f8fafc;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.9rem;
            font-weight: 600;
            color: #475569;
        }
        .ai-icon { color: #8b5cf6; }

        .feedback-list {
            flex: 1;
            overflow-y: auto;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            background: #fff;
        }

        .feedback-card {
            background: #fff;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 1rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.02);
            border-left: 3px solid #8b5cf6;
        }

        .fb-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.5rem;
        }
        .fb-label { font-size: 0.75rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; }
        
        .grade-pill {
            font-size: 0.7rem; padding: 2px 8px; border-radius: 99px; font-weight: 600;
        }
        .high { background: #dcfce7; color: #166534; }
        .mid { background: #ffedd5; color: #9a3412; }

        .fb-text {
            font-size: 0.85rem; color: #334155; line-height: 1.5;
        }

        .empty-state {
            height: 100%;
            display: flex; 
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #cbd5e1;
            font-size: 0.9rem;
            gap: 1rem;
        }
        .empty-icon {
            width: 48px; height: 48px; background: #f1f5f9; border-radius: 50%;
        }

        /* Animations */
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: translateX(0); } }
        .slide-in { animation: slideIn 0.4s ease-out backwards; }

        @media (max-width: 800px) {
            .layout-grid { grid-template-columns: 1fr; }
            .col-right { height: 300px; }
        }
      `}</style>
        </div>
    );
}
