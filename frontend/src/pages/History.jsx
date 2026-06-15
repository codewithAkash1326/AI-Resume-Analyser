import { useEffect, useState } from "react";

import api from "../api/axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "../styles/History.css";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await api.get("/analysis/history");

      setHistory(response.data.history);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="layout">
        <Sidebar />

        <div className="history-page">
          <h1>Analysis History</h1>

          <table>
            <thead>
              <tr>
                <th>Resume</th>
                <th>ATS Score</th>
                <th>Keyword Match</th>
              </tr>
            </thead>

            <tbody>
              {history.map((item) => (
                <tr key={item._id}>
                  <td>{item.resume.fileName}</td>

                  <td>{item.atsScore}</td>

                  <td>{item.keywordMatch}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default History;
