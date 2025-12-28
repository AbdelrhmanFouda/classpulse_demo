import { Bot, Users } from "lucide-react";

export default function TeacherView({ progress }) {
    // Progress determines the state:
    // 0-20: Class Select
    // 20-40: Create Quiz Options
    // 40-70: AI Generating
    // 70-100: Live Session

    const step = progress < 20 ? 'class'
        : progress < 40 ? 'create'
            : progress < 70 ? 'ai'
                : 'live';

    return (
        <div className="teacher-ui scale-in">
            <div className="t-header">
                <div className="t-logo">CP</div>
                <div className="t-user">Ms. Johnson</div>
            </div>

            <div className="t-body">
                {step === 'class' && (
                    <div className="step-card fade-in">
                        <h3>Select Class</h3>
                        <div className="selection-grid">
                            <div className="select-option active">Grade 6A</div>
                            <div className="select-option">Grade 6B</div>
                        </div>
                    </div>
                )}

                {step === 'create' && (
                    <div className="step-card fade-in">
                        <h3>Create Quiz: Fractions</h3>
                        <div className="action-list">
                            <div className="action-btn active">
                                <Bot size={16} /> Generate with AI
                            </div>
                            <div className="action-btn">Question Bank</div>
                        </div>
                    </div>
                )}

                {step === 'ai' && (
                    <div className="step-card fade-in ai-generating">
                        <Bot size={32} className="pulse-icon" />
                        <div className="typing-text">Generating questions on fractions...</div>
                        <div className="gen-preview">
                            <div className="gen-line" style={{ width: '80%' }}></div>
                            <div className="gen-line" style={{ width: '60%' }}></div>
                            <div className="gen-line" style={{ width: '90%' }}></div>
                        </div>
                    </div>
                )}

                {step === 'live' && (
                    <div className="live-dashboard fade-in">
                        <div className="live-header">
                            <span className="live-badge">LIVE</span>
                            <span>32/32 Students</span>
                        </div>

                        <div className="question-card">
                            <h4>Q1: What is 1/2 + 1/4?</h4>
                            <div className="responses-grid">
                                <div className="response-bar" style={{ height: '60%', background: 'var(--primary)' }}>A</div>
                                <div className="response-bar" style={{ height: '20%' }}>B</div>
                                <div className="response-bar" style={{ height: '10%' }}>C</div>
                                <div className="response-bar" style={{ height: '10%' }}>D</div>
                            </div>
                        </div>

                        <div className="student-list">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="s-avatar"><Users size={12} /></div>
                            ))}
                            <span>+28</span>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
        .teacher-ui {
          width: 100%;
          height: 100%;
          background: #f1f5f9;
          display: flex;
          flex-direction: column;
          font-family: var(--font-inter);
          color: #334155;
        }

        .t-header {
          padding: 1rem;
          background: white;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
        }

        .t-logo {
          width: 32px;
          height: 32px;
          background: var(--primary);
          color: white;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
        }

        .t-body {
          flex: 1;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .step-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 320px;
          animation: slideUp 0.3s ease-out;
        }

        .selection-grid, .action-list {
          display: grid;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .select-option, .action-btn {
          padding: 0.75rem;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s;
        }

        .active {
          border-color: var(--primary);
          background: var(--primary-light);
          color: var(--primary);
        }

        .ai-generating {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .pulse-icon {
          color: var(--primary);
          animation: pulse 1.5s infinite;
        }

        .gen-line {
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          margin-bottom: 0.5rem;
          animation: shimmer 1s infinite linear;
        }

        .live-dashboard {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          animation: fadeIn 0.5s;
        }

        .live-header {
           display: flex;
           justify-content: space-between;
           font-size: 0.8rem;
           font-weight: 600;
        }

        .live-badge {
          background: #ef4444;
          color: white;
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
          font-size: 0.7rem;
        }

        .question-card {
           background: white;
           padding: 1rem;
           border-radius: 8px;
           flex: 1;
           display: flex;
           flex-direction: column;
        }
        
        h4 { margin-bottom: 1rem; }

        .responses-grid {
          flex: 1;
          display: flex;
          align-items: flex-end;
          justify-content: space-around;
          padding-top: 1rem;
          gap: 0.5rem;
        }

        .response-bar {
          width: 100%;
          background: #cbd5e1;
          border-radius: 4px 4px 0 0;
          position: relative;
          min-height: 10%;
          transition: height 0.5s ease;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          padding-bottom: 4px;
          font-size: 0.7rem;
          color: white;
        }

        .student-list {
          display: flex;
          gap: -0.5rem;
        }
        
        .s-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @keyframes slideUp {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
      `}</style>
        </div>
    );
}
