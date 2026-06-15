import "../styles/RecentAnalysisTable.css";

function RecentAnalysisTable({ recentAnalyses }) {
  return (
    <table className="recent-table">
      <thead>
        <tr>
          <th>Resume</th>
          <th>ATS Score</th>
          <th>Keyword Match</th>
        </tr>
      </thead>

      <tbody>
        {recentAnalyses.map((analysis) => (
          <tr key={analysis._id}>
            <td>{analysis.resume.fileName}</td>

            <td>{analysis.atsScore}</td>

            <td>{analysis.keywordMatch}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RecentAnalysisTable;
