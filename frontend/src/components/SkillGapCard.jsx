import "../styles/SkillGapCard.css";

function SkillGapCard({ skills }) {
  return (
    <div className="skill-card">
      <h2>Skill Gap</h2>

      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}

export default SkillGapCard;
