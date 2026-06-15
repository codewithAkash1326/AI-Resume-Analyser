import "../styles/ATSScoreCard.css";

function ATSScoreCard({ title, value }) {
  return (
    <div className="score-card">
      <h3>{title}</h3>

      <h1>{value}</h1>
    </div>
  );
}

export default ATSScoreCard;
