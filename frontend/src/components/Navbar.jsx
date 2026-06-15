import "../styles/Navbar.css";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

function Navbar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());

    window.location.href = "/login";
  };

  return (
    <div className="navbar">
      <h2>AI Resume Analyzer</h2>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;
