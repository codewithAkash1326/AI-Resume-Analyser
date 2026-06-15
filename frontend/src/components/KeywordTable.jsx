import "../styles/KeywordTable.css";

function KeywordTable({ keywords }) {
  return (
    <table className="keyword-table">
      <thead>
        <tr>
          <th>Missing Keywords</th>
        </tr>
      </thead>

      <tbody>
        {keywords.map((keyword, index) => (
          <tr key={index}>
            <td>{keyword}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default KeywordTable;
