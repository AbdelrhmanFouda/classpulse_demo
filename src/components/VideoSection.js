"use client";
import { Play } from "lucide-react";

export default function VideoSection() {
  const videos = [
    { title: "The Teacher Experience", desc: "Create engaging quizzes in seconds, not hours." },
    { title: "The Student Experience", desc: "100% participation without phones or distractions." },
    { title: "School-Wide Insights", desc: "Real-time data on academic performance and engagement." },
  ];

  return (
    <section className="video-section">
      <div className="container">
        <h2>See ClassPulse in Action</h2>
        <div className="video-grid">
          {videos.map((v, i) => (
            <div key={i} className="video-card card" onClick={() => alert("Play video: " + v.title)}>
              <div className="video-thumbnail">
                <div className="play-button">
                  <Play size={24} fill="currentColor" />
                </div>
                <div className="time-badge">1:00</div>
              </div>
              <div className="video-info">
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="section-cta">
          <button className="cta-btn">Request a School Demo</button>
        </div>
      </div>

      <style jsx>{`
        .video-section {
          padding: 6rem 0;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          margin-top: 4rem;
        }

        h2 {
          text-align: center;
          margin-bottom: 3rem;
          font-size: 1.75rem;
          color: #0f172a;
          font-weight: 700;
        }

        .video-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          max-width: 1100px;
          margin: 0 auto 3rem auto;
        }

        .video-card {
          background: white;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
        }

        .video-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -10px rgba(0,0,0,0.1);
        }

        .video-thumbnail {
          aspect-ratio: 16/9;
          background: #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3b82f6;
          position: relative;
        }

        .play-button {
          width: 56px;
          height: 56px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
          color: #2563eb;
          transition: transform 0.2s;
        }
        .video-card:hover .play-button { transform: scale(1.1); }
        
        .time-badge {
            position: absolute;
            bottom: 12px;
            right: 12px;
            background: rgba(0,0,0,0.7);
            color: white;
            font-size: 0.75rem;
            font-weight: 600;
            padding: 2px 8px;
            border-radius: 4px;
        }

        .video-info {
          padding: 1.5rem;
        }

        h3 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          color: #1e293b;
          font-weight: 600;
        }

        p {
          font-size: 0.95rem;
          color: #64748b;
        }

        .section-cta {
            display: flex;
            justify-content: center;
        }
        .cta-btn {
            background: #0f172a;
            color: white;
            padding: 1rem 2rem;
            border-radius: 99px;
            font-weight: 600;
            cursor: pointer;
            border: none;
            transition: all 0.2s;
        }
        .cta-btn:hover { background: #334155; transform: scale(1.02); }
      `}</style>
    </section>
  );
}
