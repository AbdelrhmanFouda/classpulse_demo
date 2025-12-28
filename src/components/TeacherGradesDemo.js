"use client";
import { TrendingUp, Users, AlertCircle } from "lucide-react";

export default function TeacherGradesDemo() {
    const students = [
        { name: "Emma Thompson", score: 92, status: "good" },
        { name: "Liam Wilson", score: 88, status: "good" },
        { name: "Noah Martinez", score: 74, status: "warning" },
        { name: "Olivia Brown", score: 95, status: "good" },
        { name: "William Davis", score: 68, status: "warning" },
    ];

    return (
        <div className="demo-content">
            <div className="dashboard-card slide-up">
                <div className="header">
                    <div className="h-left">
                        <div className="icon-box"><TrendingUp size={20} color="var(--primary)" /></div>
                        <div>
                            <h3>Class Performance</h3>
                            <span className="subtitle">Algebra • Unit 4</span>
                        </div>
                    </div>
                    <div className="avg-badge">
                        <span className="label">Class Avg</span>
                        <span className="value">85%</span>
                    </div>
                </div>

                <div className="list-container">
                    {students.map((s, i) => (
                        <div key={i} className="student-row" style={{ animationDelay: `${i * 0.1}s` }}>
                            <div className="s-info">
                                <div className="avatar">{s.name.charAt(0)}</div>
                                <span>{s.name}</span>
                            </div>
                            <div className="s-score">
                                {s.status === 'warning' && <AlertCircle size={14} color="#f59e0b" />}
                                <span className={`score-val ${s.status}`}>{s.score}%</span>
                                <div className="bar-bg">
                                    <div className="bar-fill" style={{ width: `${s.score}%`, background: s.score < 80 ? '#f59e0b' : '#10b981' }}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="ai-insight fade-in">
                    <div className="insight-icon">✨</div>
                    <p><strong>AI Insight:</strong> 3 students are struggling with "Quadratic Formulas". Recommended review session generated.</p>
                </div>
            </div>

            <style jsx>{`
        .demo-content {
          background: #f8fafc;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .dashboard-card {
           background: white;
           width: 100%;
           max-width: 500px;
           border-radius: 16px;
           box-shadow: var(--shadow-lg);
           overflow: hidden;
           animation: slideUp 0.5s ease-out;
        }

        .header {
           padding: 1.5rem;
           border-bottom: 1px solid #e2e8f0;
           display: flex;
           justify-content: space-between;
           align-items: center;
        }

        .h-left {
           display: flex;
           gap: 1rem;
           align-items: center;
        }

        .icon-box {
           width: 40px;
           height: 40px;
           background: var(--primary-light);
           border-radius: 8px;
           display: flex;
           align-items: center;
           justify-content: center;
        }

        h3 { font-size: 1rem; }
        .subtitle { font-size: 0.85rem; color: #64748b; }

        .avg-badge {
           text-align: right;
        }
        .label { display: block; font-size: 0.75rem; color: #94a3b8; }
        .value { font-size: 1.25rem; font-weight: 700; color: #1e293b; }

        .list-container {
           padding: 1.5rem;
           display: flex;
           flex-direction: column;
           gap: 1rem;
        }

        .student-row {
           display: flex;
           align-items: center;
           justify-content: space-between;
           animation: slideInRight 0.4s ease-out backwards;
        }

        .s-info {
           display: flex;
           align-items: center;
           gap: 0.75rem;
           font-size: 0.9rem;
           font-weight: 500;
        }

        .avatar {
           width: 32px;
           height: 32px;
           background: #f1f5f9;
           border-radius: 50%;
           display: flex;
           align-items: center;
           justify-content: center;
           font-size: 0.8rem;
           color: #64748b;
        }

        .s-score {
           display: flex;
           align-items: center;
           gap: 1rem;
           width: 140px;
           justify-content: flex-end;
        }

        .score-val { font-weight: 700; font-size: 0.9rem; width: 30px; text-align: right; }
        .score-val.warning { color: #f59e0b; }

        .bar-bg {
           width: 80px;
           height: 6px;
           background: #e2e8f0;
           border-radius: 99px;
           overflow: hidden;
        }

        .bar-fill {
           height: 100%;
           border-radius: 99px;
        }

        .ai-insight {
           background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
           margin: 0 1.5rem 1.5rem;
           padding: 1rem;
           border-radius: 12px;
           display: flex;
           gap: 0.75rem;
           font-size: 0.9rem;
           color: #166534;
           animation: fadeIn 0.5s ease-out 0.5s backwards;
        }

        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slideInRight { from { transform: translateX(-10px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
        </div>
    );
}
