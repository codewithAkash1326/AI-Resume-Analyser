import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Resume Analyzer</h2>

      <Link to="/">Dashboard</Link>

      <Link to="/upload">Upload Resume</Link>

      <Link to="/history">History</Link>
    </div>
  );
}

export default Sidebar;
