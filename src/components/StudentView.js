import { CheckCircle } from "lucide-react";

export default function StudentView({ progress }) {
    // Syncs with Teacher View timeline
    // 0-70: Waiting...
    // 70-85: Answering
    // 85-100: Submitted/Feedback

    const step = progress < 70 ? 'waiting'
        : progress < 90 ? 'answering'
            : 'submitted';

    return (
        <div className="student-ui">
            <div className="s-notch"></div>

            <div className="s-screen">
                {step === 'waiting' && (
                    <div className="s-center-msg fade-in">
                        <div className="pulse-ring"></div>
                        <h3>Waiting for teacher...</h3>
                    </div>
                )}

                {step === 'answering' && (
                    <div className="question-screen slide-in">
                        <div className="s-header">
                            <span>Q1</span>
                            <span className="timer-pill">0:12</span>
                        </div>
                        <h3 className="q-text">What is 1/2 + 1/4?</h3>

                        <div className="options-list">
                            <div className="s-option">A. 3/4</div>
                            <div className="s-option active-tap">B. 2/6</div>
                            <div className="s-option">C. 1.25</div>
                            <div className="s-option">D. 1/8</div>
                        </div>
                    </div>
                )}

                {step === 'submitted' && (
                    <div className="feedback-screen scale-in">
                        <CheckCircle size={48} className="success-icon" />
                        <h2>Answer Submitted!</h2>
                        <p>Waiting for next question...</p>
                    </div>
                )}
            </div>

            <style jsx>{`
        .student-ui {
          width: 80%;
          height: 90%;
          background: #1e293b;
          border-radius: 2rem;
          margin: auto;
          position: relative;
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2);
          border: 4px solid #334155;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-family: var(--font-inter);
        }

        .s-notch {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 40%;
          height: 20px;
          background: #334155;
          border-radius: 0 0 12px 12px;
          z-index: 10;
        }

        .s-screen {
          width: 100%;
          height: 100%;
          border-radius: 1.7rem;
          overflow: hidden;
          background: #0f172a;
          position: relative;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
        }

        .s-center-msg {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          color: #94a3b8;
        }

        .pulse-ring {
          width: 40px;
          height: 40px;
          border: 3px solid var(--secondary);
          border-radius: 50%;
          animation: ringPulse 2s infinite;
        }

        .question-screen {
          animation: slideUp 0.3s ease-out;
        }

        .s-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2rem;
          margin-top: 1rem;
          font-weight: 600;
        }

        .timer-pill {
           background: #334155;
           padding: 0.2rem 0.6rem;
           border-radius: 99px;
           font-size: 0.8rem;
        }

        .q-text {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          line-height: 1.4;
        }

        .options-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .s-option {
          padding: 1rem;
          background: #1e293b;
          border-radius: 12px;
          font-weight: 500;
          transition: all 0.2s;
        }

        .active-tap {
           background: var(--primary);
           transform: scale(0.98);
        }

        .feedback-screen {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 1rem;
        }

        .success-icon {
          color: #4ade80;
          animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes ringPulse {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        
        @keyframes popIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
      `}</style>
        </div>
    );
}
