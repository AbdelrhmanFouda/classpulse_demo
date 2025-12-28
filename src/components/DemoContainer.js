"use client";
import TeacherQuizDemo from "./TeacherQuizDemo";
import TeacherAssignDemo from "./TeacherAssignDemo";
import TeacherGradesDemo from "./TeacherGradesDemo";
import StudentClickerDemo from "./StudentClickerDemo";
import StudentSubmitDemo from "./StudentSubmitDemo";
import StudentSpeakingDemo from "./StudentSpeakingDemo";

export default function DemoContainer({ activeRole, activeFeature }) {

  const renderDemo = () => {
    if (activeRole === 'teacher') {
      switch (activeFeature) {
        case 'quiz': return <TeacherQuizDemo />;
        case 'assign': return <TeacherAssignDemo />;
        case 'grades': return <TeacherGradesDemo />;
        default: return <TeacherQuizDemo />;
      }
    } else {
      switch (activeFeature) {
        case 'clicker': return <StudentClickerDemo />;
        case 'submit': return <StudentSubmitDemo />;
        case 'speaking': return <StudentSpeakingDemo />;
        default: return <StudentClickerDemo />;
      }
    }
  };

  return (
    <div className="demo-container">
      {renderDemo()}

      <style jsx>{`
        .demo-container {
          position: relative;
          width: 100%;
          /* Remove aspect-ratio; let inner content determine height or fixed height from CSS */
          min-height: 520px; 
          background: white;
          /* Rounded corners handled by parent Unified Module */
          border-radius: 0 0 24px 24px;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        @media (max-width: 768px) {
          .demo-container {
            min-height: 500px;
          }
        }
      `}</style>
    </div>
  );
}
