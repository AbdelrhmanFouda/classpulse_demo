"use client";

import React, { useEffect, useRef, useState } from "react";
import { Mic, Check, RotateCcw } from "lucide-react";

const CONVERSATION_SCRIPT = [
  {
    student: "My vacation was amazing. I went to Italy with my family.",
    ai: "That sounds wonderful! What was your favorite city you visited?",
  },
  {
    student: "I loved Rome the most. The food was incredible.",
    ai: "Rome is beautiful. Tell me about one problem you faced.",
  },
  {
    student: "We lost our luggage at the airport for two days.",
    ai: "Oh no! That is stressful. Here is your feedback.",
  },
];

const REQUIRED_SECONDS = 10;

export default function StudentSpeakingDemo() {
  const [turnIndex, setTurnIndex] = useState(0);
  const [status, setStatus] = useState("idle"); // 'idle' | 'recording' | 'processing' | 'ai_reply' | 'grading'
  const [chatHistory, setChatHistory] = useState([]);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasUserStarted, setHasUserStarted] = useState(false);

  // Timers & Guards
  const intervalRef = useRef(null);
  const timeoutsRef = useRef([]);
  const processedSegments = useRef(new Set());

  // Cumulative targets for each turn: 3s, 3+4=7s, 7+3=10s
  const SEGMENT_TARGETS = [3, 7, 10];

  const clearAllTimers = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutsRef.current.length) {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current = [];
    }
  };

  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  const pad2 = (n) => String(n).padStart(2, "0");

  const startNextSegment = (segmentIdx) => {
    clearAllTimers();
    setStatus("recording");
    setTurnIndex(segmentIdx);

    const targetTime = SEGMENT_TARGETS[segmentIdx];

    intervalRef.current = setInterval(() => {
      setRecordingTime((prev) => {
        const next = prev + 1;
        if (next >= targetTime) {
          clearInterval(intervalRef.current);
          handleSegmentComplete(segmentIdx);
          return targetTime;
        }
        return next;
      });
    }, 1000);
  };

  const handleSegmentComplete = (segmentIdx) => {
    // Guard against duplicate execution for the same segment
    if (processedSegments.current.has(segmentIdx)) return;
    processedSegments.current.add(segmentIdx);

    setStatus("processing");

    const t1 = setTimeout(() => {
      // 1. Add Student Message
      const currentTurn = CONVERSATION_SCRIPT[segmentIdx];
      setChatHistory((prev) => [
        ...prev,
        { role: "student", text: currentTurn.student },
      ]);

      // 2. AI Reply State
      setStatus("ai_reply");

      const t2 = setTimeout(() => {
        // 3. Add AI Message
        setChatHistory((prev) => [...prev, { role: "ai", text: currentTurn.ai }]);

        const t3 = setTimeout(() => {
          const isLast = segmentIdx >= SEGMENT_TARGETS.length - 1;

          if (isLast) {
            setStatus("grading");
          } else {
            // Auto-start next segment
            startNextSegment(segmentIdx + 1);
          }
        }, 1500); // 1.5s delay after AI text appears before next user turn

        timeoutsRef.current.push(t3);
      }, 1500); // 1.5s "AI typing/speaking" delay

      timeoutsRef.current.push(t2);
    }, 800); // 0.8s processing delay

    timeoutsRef.current.push(t1);
  };

  const handleFirstMicClick = () => {
    if (hasUserStarted) return;

    // Reset processed segments on new start just in case
    processedSegments.current.clear();
    setHasUserStarted(true);
    startNextSegment(0);
  };

  const resetDemo = () => {
    clearAllTimers();
    processedSegments.current.clear();
    setTurnIndex(0);
    setChatHistory([]);
    setStatus("idle");
    setRecordingTime(0);
    setHasUserStarted(false);
  };

  const isMicEnabled = status === "idle" && !hasUserStarted;

  return (
    <div className="demo-content">
      <div className="layout-grid">
        {/* Left Column */}
        <div className="col-left">
          <div className="board-card">
            <div className="header-row">
              <div className="brand">
                <div className="logo-icon" />
                <span>ClassPulse</span>
              </div>
              <div className="dots">•••</div>
            </div>

            <div className="prompt-content">
              <span className="sc-badge">Speaking Practice • English</span>
              <h3>"Talk about your vacation."</h3>
              <p className="sub-prompt">Topic: Vacation Story</p>
            </div>

            {/* Requirement instead of student name */}
            <div className="student-list-row">
              <div className="list-label">Response Requirement</div>
              <div className="s-row">
                <div className="avatar">⏱</div>
                <div className="s-info">
                  <span className="s-name">Required: {REQUIRED_SECONDS}s response</span>
                  <span className="s-status">
                    {status === "idle" && !hasUserStarted && (
                      <span className="st-ready">Waiting to start</span>
                    )}
                    {status === "recording" && (
                      <span className="st-rec">
                        <span className="mini-wave" /> Speaking...
                      </span>
                    )}
                    {status === "processing" && <span className="st-proc">Analyzing...</span>}
                    {status === "ai_reply" && <span className="st-proc">AI Replying...</span>}
                    {status === "grading" && (
                      <span className="st-done">
                        <Check size={14} /> Submitted
                      </span>
                    )}
                  </span>
                </div>
              </div>

              <div className="req-footnote">
                Flow: Student speaks → timer pauses → AI replies → student auto-resumes.
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Phone */}
        <div className="col-right">
          <div className="phone-frame">
            <div className="phone-notch" />
            <div className="phone-screen">
              <div className="app-header">
                <span className="app-title">Speaking Practice</span>
                <span className="app-lang">English</span>
              </div>

              <div className="chat-area">
                <div className="ai-bubble">
                  Hi there! Let's practice. Where did you go on your last vacation?
                </div>

                {chatHistory.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`msg-bubble ${msg.role === "student" ? "student" : "ai"} slide-up`}
                  >
                    {msg.text}
                  </div>
                ))}

                {status === "processing" && (
                  <div className="typing-indicator fade-in">
                    <span>•</span>
                    <span>•</span>
                    <span>•</span>
                  </div>
                )}
              </div>

              <div className="phone-bottom-sect">
                {status === "grading" ? (
                  <div className="grading-panel slide-up">
                    <div className="score-row">
                      <div className="score-big">8.5</div>
                      <div className="score-label">Overall Score</div>
                    </div>
                    <div className="rubric-chips">
                      <div className="chip">Pronunc. 8/10</div>
                      <div className="chip">Grammar 9/10</div>
                    </div>
                    <button className="reset-btn" onClick={resetDemo}>
                      <RotateCcw size={14} /> Try Again
                    </button>
                  </div>
                ) : (
                  <div className="controls-panel">
                    {/* timer stays visible ALWAYS (paused when not recording) */}
                    <div className="recording-ui">
                      {status === "recording" ? (
                        <>
                          <div className="waveform-active">
                            <div className="bar b1" />
                            <div className="bar b2" />
                            <div className="bar b3" />
                            <div className="bar b2" />
                            <div className="bar b1" />
                          </div>
                          <span className="timer">
                            00:{pad2(recordingTime)} / 00:{pad2(REQUIRED_SECONDS)}
                          </span>
                        </>
                      ) : (
                        <span className="timer idle-timer">
                          00:{pad2(recordingTime)} / 00:{pad2(REQUIRED_SECONDS)}
                        </span>
                      )}
                    </div>

                    <span className="hint-text">
                      {status === "processing"
                        ? "Analyzing... (timer paused)"
                        : status === "ai_reply"
                          ? "AI reply... (timer paused)"
                          : !hasUserStarted
                            ? "Tap mic to start"
                            : "Student auto-recording next answer..."}
                    </span>

                    {/* Only first click */}
                    <button
                      className={`mic-btn ${status === "recording" ? "active" : ""} ${!isMicEnabled ? "disabled" : ""
                        }`}
                      onClick={handleFirstMicClick}
                      disabled={!isMicEnabled}
                    >
                      <Mic size={24} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .demo-content {
          background: #f8fafc;
          height: 100%;
          padding: 1.5rem;
          font-family: "Inter", sans-serif;
          overflow: hidden;
        }

        .layout-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 1.5rem;
          height: 100%;
          max-width: 1000px;
          margin: 0 auto;
        }

        .col-left {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .board-card {
          background: white;
          width: 100%;
          max-width: 600px;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .header-row {
          display: flex;
          justify-content: space-between;
          color: #94a3b8;
          font-weight: 500;
          padding-bottom: 1rem;
          border-bottom: 1px solid #f1f5f9;
        }

        .brand {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          font-weight: 600;
          color: #334155;
        }

        .logo-icon {
          width: 20px;
          height: 20px;
          background: #8b5cf6;
          border-radius: 4px;
        }

        .prompt-content {
          text-align: center;
          padding: 1rem 0;
        }

        .sc-badge {
          background: #dbeafe;
          color: #2563eb;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 99px;
          text-transform: uppercase;
        }

        h3 {
          font-size: 2rem;
          color: #1e293b;
          margin: 1.5rem 0 0.5rem 0;
          line-height: 1.2;
        }

        .sub-prompt {
          color: #64748b;
          font-size: 1rem;
        }

        .student-list-row {
          background: #f8fafc;
          border-radius: 12px;
          padding: 1rem;
          border: 1px solid #e2e8f0;
        }

        .list-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #94a3b8;
          margin-bottom: 0.75rem;
          text-transform: uppercase;
        }

        .s-row {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .avatar {
          width: 40px;
          height: 40px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          font-weight: 700;
          color: #64748b;
        }

        .s-info {
          display: flex;
          flex-direction: column;
        }

        .s-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: #334155;
        }

        .s-status {
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .req-footnote {
          margin-top: 0.75rem;
          font-size: 0.8rem;
          color: #64748b;
        }

        .st-ready {
          color: #10b981;
        }

        .st-rec {
          color: #ef4444;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .st-proc {
          color: #f59e0b;
        }

        .st-done {
          color: #10b981;
          font-weight: 600;
        }

        .mini-wave {
          width: 8px;
          height: 8px;
          background: #ef4444;
          border-radius: 50%;
          animation: pulse 1s infinite;
          display: inline-block;
        }

        .col-right {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 0;
        }

        /* FIX phone ratio */
        .phone-frame {
          width: 280px;
          aspect-ratio: 9 / 19.5;
          height: auto;
          background: #ffffff;
          border-radius: 32px;
          border: 6px solid #1e293b;
          box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
        }

        .phone-notch {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 20px;
          background: #1e293b;
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
          z-index: 10;
        }

        .phone-screen {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding-top: 24px;
          min-height: 0;
        }

        .app-header {
          padding: 0.75rem;
          text-align: center;
          border-bottom: 1px solid #f1f5f9;
        }

        .app-title {
          display: block;
          font-weight: 700;
          color: #0f172a;
          font-size: 0.9rem;
        }

        .app-lang {
          display: block;
          font-size: 0.7rem;
          color: #64748b;
        }

        .chat-area {
          flex: 1;
          background: #f8fafc;
          padding: 1rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          min-height: 0;
        }

        .ai-bubble,
        .msg-bubble {
          max-width: 85%;
          padding: 8px 12px;
          border-radius: 12px;
          font-size: 0.85rem;
          line-height: 1.4;
        }

        .ai-bubble,
        .msg-bubble.ai {
          background: white;
          color: #334155;
          border-bottom-left-radius: 4px;
          align-self: flex-start;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .msg-bubble.student {
          background: #3b82f6;
          color: white;
          border-bottom-right-radius: 4px;
          align-self: flex-end;
        }

        .phone-bottom-sect {
          height: 150px;
          background: white;
          border-top: 1px solid #f1f5f9;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 0;
        }

        .controls-panel {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
        }

        .recording-ui {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .timer {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
            "Courier New", monospace;
          font-size: 0.85rem;
          color: #ef4444;
          font-weight: 700;
        }

        .idle-timer {
          color: #64748b;
          font-weight: 600;
        }

        .waveform-active {
          display: flex;
          gap: 2px;
          height: 16px;
          align-items: center;
        }

        .bar {
          width: 3px;
          background: #ef4444;
          border-radius: 2px;
          animation: wave 0.5s infinite;
        }

        .b1 {
          height: 8px;
          animation-delay: 0s;
        }
        .b2 {
          height: 12px;
          animation-delay: 0.1s;
        }
        .b3 {
          height: 16px;
          animation-delay: 0.2s;
        }

        .hint-text {
          font-size: 0.8rem;
          color: #64748b;
          font-weight: 500;
          text-align: center;
          padding: 0 1rem;
        }

        .mic-btn {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #ef4444;
          color: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(239, 68, 68, 0.3);
          cursor: pointer;
          transition: all 0.2s;
        }

        .mic-btn:hover {
          transform: scale(1.05);
        }
        .mic-btn:active {
          transform: scale(0.95);
        }
        .mic-btn.active {
          animation: pulse-ring 1.5s infinite;
        }
        .mic-btn.disabled {
          background: #e2e8f0;
          color: #94a3b8;
          box-shadow: none;
          cursor: default;
          transform: none;
        }

        .grading-panel {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
        }

        .score-row {
          text-align: center;
        }

        .score-big {
          font-size: 2.5rem;
          font-weight: 800;
          color: #1e293b;
          line-height: 1;
        }

        .score-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          color: #64748b;
          font-weight: 600;
        }

        .rubric-chips {
          display: flex;
          gap: 6px;
        }

        .chip {
          background: #f1f5f9;
          padding: 2px 8px;
          border-radius: 6px;
          font-size: 0.7rem;
          font-weight: 600;
          color: #475569;
        }

        .reset-btn {
          margin-top: 0.5rem;
          background: none;
          border: none;
          color: #64748b;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.5);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }

        @keyframes pulse-ring {
          0% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(239, 68, 68, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
          }
        }

        @keyframes wave {
          0%,
          100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(1.5);
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .slide-up {
          animation: slideUp 0.3s forwards;
        }
        .fade-in {
          animation: fadeIn 0.3s forwards;
        }

        @media (max-width: 800px) {
          .layout-grid {
            grid-template-columns: 1fr;
            height: auto;
            gap: 1.5rem; /* Tighter vertical gap */
            padding-bottom: 3rem;
          }
          .col-left {
            display: flex;
            order: -1; 
          }
          .phone-frame {
            width: 100%;
            max-width: 240px; /* Very compact phone */
            margin: 0 auto;
          }
           /* Tweak internal phone padding if needed */
          .screen {
            padding: 8px !important;
          }
        }
      `}</style>
    </div>
  );
}
