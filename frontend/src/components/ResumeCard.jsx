import "../styles/ResumeCard.css";

function ResumeCard({ resume }) {
  return (
    <div className="resume-card">
      <h3>{resume.fileName}</h3>

      <p>Uploaded: {new Date(resume.createdAt).toLocaleDateString()}</p>
    </div>
  );
}

export default ResumeCard;
