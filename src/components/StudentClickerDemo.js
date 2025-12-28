"use client";
import { useState } from "react";
import { Check, Wifi, Power } from "lucide-react";

export default function StudentClickerDemo() {
  const [selected, setSelected] = useState(null); // 'A', 'B', 'C', 'D'
  const [studentCount, setStudentCount] = useState(0); // ✅ now 0/5 by default
  const [wifiOn, setWifiOn] = useState(false); // ✅ wifi LED only when pressed

  // Auto-reset logic
  const handleSelect = (option) => {
    if (selected) return;

    setSelected(option);

    // ✅ When pressed: show wifi signal + 1 student answered
    setWifiOn(true);
    setStudentCount(1);

    setTimeout(() => {
      // ✅ Reset back
      setSelected(null);
      setStudentCount(0);
      setWifiOn(false);
    }, 2500);
  };

  return (
    <div className="demo-content">
      {/* Main Board UI */}
      <div className="board-ui">
        <div className="header-row">
          <div className="brand">
            <div className="logo-icon"></div>
          </div>
          <div className="dots">•••</div>
        </div>

        <div className="board-grid">
          {/* Question Card */}
          <div className="question-card">
            <h3>What is 1/4 + 3/8?</h3>
            <div className="options-grid">
              {[
                { id: "A", val: "5/8", color: "blue" },
                { id: "B", val: "3/12", color: "purple" },
                { id: "C", val: "5/12", color: "teal" },
                { id: "D", val: "7/8", color: "orange" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  className={`option-btn ${opt.color} ${selected === opt.id ? "active" : ""
                    }`}
                  onClick={() => handleSelect(opt.id)}
                >
                  <span className="opt-letter">{opt.id}</span>
                  <span className="opt-val">{opt.val}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Student List */}
          <div className="student-list-card">
            <div className="list-header">
              {/* ✅ 0/5 then 1/5 */}
              <span>Students {studentCount} / 5</span>
              <span className="dots">••••</span>
            </div>

            <div className="list-rows">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="s-row">
                  <div className={`checkbox ${i === 1 && selected ? "checked" : ""}`}>
                    {i === 1 && selected && <Check size={12} strokeWidth={4} />}
                  </div>
                  <span className={i === 1 ? "me" : ""}>
                    Student {i} {i === 1 && <span className="you-tag">(you)</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Remote Overlay */}
      <div className="remote-wrapper">
        <div className="remote-body">
          {/* Top Section */}
          <div className="remote-top">
            <div className="brand-area">
              <div className="brand-icon">🎓</div>
              <div className="brand-text">Class Pulse</div>
            </div>

            <div className="sensor-area">
              <div className="ir-sensor"></div>

              <div className="status-group">
                {/* ✅ Wifi LED only when pressed */}
                <div className="status-row">
                  <Wifi size={10} color="#64748b" strokeWidth={3} />
                  <span className={`s-dot wifi ${wifiOn ? "on" : ""}`}></span>
                </div>

                {/* keep as-is */}
                <div className="status-row">
                  <div className="icon-slash"></div>
                  <span className="s-dot"></span>
                </div>

                {/* keep power always on (your choice) */}
                <div className="status-row">
                  <Power size={10} color="#64748b" strokeWidth={3} />
                  <span className="s-dot lit"></span>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons Area */}
          <div className="btn-zone">
            {["A", "B", "C", "D"].map((btn) => (
              <div key={btn} className="btn-row">
                <div className={`btn-led ${selected === btn ? "lit" : ""}`}></div>

                <button
                  className={`clicker-btn ${selected === btn ? "pressed" : ""}`}
                  onClick={() => handleSelect(btn)}
                  aria-label={`Select ${btn}`}
                ></button>

                <span className="btn-label">{btn}</span>
              </div>
            ))}
          </div>

          <div className="remote-footer">Student 1</div>
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
          position: relative;
          overflow: hidden;
        }

        /* --- Board UI Styles --- */
        .board-ui {
          background: white;
          width: 90%;
          max-width: 800px;
          border-radius: 1.5rem;
          padding: 1.5rem;
          padding-bottom: 2rem;
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .header-row {
          display: flex;
          justify-content: space-between;
          color: #64748b;
          font-weight: 500;
          padding-bottom: 0.5rem;
        }
        .brand {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
        .logo-icon {
          width: 20px;
          height: 20px;
          background: #8b5cf6;
          border-radius: 4px;
        }
        .board-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 1.5rem;
        }
        .question-card,
        .student-list-card {
          border: 1px solid #f1f5f9;
          border-radius: 1rem;
          padding: 1.5rem;
        }
        .question-card {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }
        h3 {
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
          color: #1e293b;
        }
        .options-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .option-btn {
          padding: 1.25rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 1rem;
          font-weight: 500;
          font-size: 1.1rem;
          transition: all 0.2s;
          border: 2px solid transparent;
        }
        .option-btn:hover {
          transform: translateY(-2px);
        }
        .option-btn.active {
          border-color: currentColor;
          transform: scale(0.98);
        }
        .blue {
          background: #e0f2fe;
          color: #0369a1;
        }
        .purple {
          background: #f3e8ff;
          color: #7e22ce;
        }
        .teal {
          background: #ccfbf1;
          color: #0f766e;
        }
        .orange {
          background: #ffedd5;
          color: #c2410c;
        }
        .opt-letter {
          font-weight: 700;
          opacity: 0.7;
        }

        .student-list-card {
          background: #fff;
        }
        .list-header {
          display: flex;
          justify-content: space-between;
          color: #64748b;
          font-weight: 600;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }
        .list-rows {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .s-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #64748b;
        }
        .me {
          color: #1e293b;
          font-weight: 500;
        }
        .checkbox {
          width: 20px;
          height: 20px;
          border: 2px solid #e2e8f0;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: all 0.2s;
        }
        .checkbox.checked {
          background: #22c55e;
          border-color: #22c55e;
        }

        /* --- Remote UI --- */
        .remote-wrapper {
          position: absolute;
          bottom: -10px;
          right: 8%;
          transform: rotate(-3deg);
          transition: transform 0.3s;
          z-index: 5;
        }
        .remote-wrapper:hover {
          transform: rotate(0deg) translateY(-20px);
        }

        .remote-body {
          width: 155px;
          height: 330px;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2),
            inset 0 0 0 1px #e2e8f0;
          padding: 1.25rem 1.1rem;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .remote-top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1.1rem;
          align-items: flex-start;
        }

        .brand-area {
          display: flex;
          gap: 8px;
          align-items: center;
          margin-top: 4px;
        }
        .brand-icon {
          font-size: 1.35rem;
          color: #64748b;
        }
        .brand-text {
          font-size: 0.8rem;
          font-weight: 600;
          color: #475569;
          letter-spacing: -0.5px;
        }

        .sensor-area {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
        }

        .ir-sensor {
          width: 21px;
          height: 21px;
          background: #1e293b;
          border-radius: 50%;
          border: 2px solid #e2e8f0;
        }

        .status-group {
          display: flex;
          flex-direction: column;
          gap: 7px;
          align-items: flex-end;
        }

        .status-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .s-dot {
          width: 5px;
          height: 5px;
          background: #cbd5e1;
          border-radius: 50%;
          transition: all 0.2s;
        }
        .s-dot.lit {
          background: #f04438;
          box-shadow: 0 0 4px #f04438;
        }
        .s-dot.wifi{
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #cbd5e1;          /* OFF */
          transition: all 0.2s ease;
        }

        .s-dot.wifi.on{
          background: #227cc5ff;          /* ON */
          box-shadow:
            0 0 4px #227cc5ff,
            0 0 10px rgba(34,197,94,0.8);
        }


        .icon-slash {
          width: 10px;
          height: 10px;
          background: #94a3b8;
          mask: url('data:image/svg+xml;utf8,<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>')
            no-repeat center;
          -webkit-mask: url('data:image/svg+xml;utf8,<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>')
            no-repeat center;
        }

        .btn-zone {
          display: flex;
          flex-direction: column;
          gap: 18px;
          margin-top: 0.4rem;
          padding: 0 0.35rem;
        }

        .btn-row {
          display: grid;
          grid-template-columns: 10px 1fr 18px;
          align-items: center;
          gap: 12px;
        }

        .btn-led {
          width: 6px;
          height: 6px;
          background: #cbd5e1;
          border-radius: 50%;
          transition: all 0.2s;
          justify-self: center;
        }

        .btn-led.lit {
          background: #0cea47d1;
          box-shadow: 0 0 6px #0cea47d1;
        }

        .clicker-btn {
          width: 100%;
          height: 18px;
          background: #0f172a;
          border-radius: 13px;
          border: none;
          box-shadow: 0 4px 0 #0b1220;
          transition: transform 0.1s, box-shadow 0.1s;
          cursor: pointer;
        }

        .clicker-btn.pressed,
        .clicker-btn:active {
          transform: translateY(4px);
          box-shadow: 0 0 0 #0b1220;
        }

        .btn-label {
          width: 18px;
          font-size: 1rem;
          font-weight: 700;
          color: #334155;
          text-align: left;
        }

        .remote-footer {
          margin-top: auto;
          text-align: center;
          font-size: 0.75rem;
          color: #343537ff;
          padding-top: 10px;
        }

        @media (max-width: 768px) {
          .demo-content {
            flex-direction: column;
            padding: 1rem 0.5rem;
            justify-content: flex-start;
            gap: 1rem;
            overflow-y: auto;
          }

          .board-ui {
            width: 100%;
            padding: 1rem;
            gap: 1rem;
            border-radius: 1rem;
          }

          /* Force Horizontal/Grid layout for board on mobile */
          .board-grid {
            grid-template-columns: 1fr; /* Stacked, but contents compact */
            gap: 1rem;
          }

          .header-row { padding-bottom: 0; }
          .logo-icon { width: 16px; height: 16px; }

          /* Compact Question Card */
          .question-card, .student-list-card {
            padding: 0.75rem;
          }
          h3 { font-size: 1rem; margin-bottom: 0.75rem; }

          /* KEEP OPTIONS HORIZONTAL (2x2 Grid) */
          .options-grid {
            grid-template-columns: 1fr 1fr; 
            gap: 0.5rem;
          }
          .option-btn {
            padding: 0.6rem;
            font-size: 0.9rem;
            border-radius: 8px;
          }
          .opt-letter { font-size: 0.8rem; }

          /* Remote: Way smaller under it */
          .remote-wrapper {
            position: relative;
            transform: scale(0.55); /* SUPER SMALL */
            transform-origin: top center;
            margin: -0.5rem auto -80px; /* Pull up tight */
            right: auto;
            bottom: auto;
          }
          
          /* Tighten board font */
          .board-ui {
             padding: 0.75rem;
          }
          .option-btn {
             padding: 0.5rem;
             font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
}