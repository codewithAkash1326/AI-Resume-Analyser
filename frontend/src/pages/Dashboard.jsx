import { useEffect, useState } from "react";

import api from "../api/axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ATSScoreCard from "../components/ATSScoreCard";
import TrendChart from "../components/TrendChart";
import RecentAnalysisTable from "../components/RecentAnalysisTable";

import "../styles/Dashboard.css";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/dashboard");

      setDashboardData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!dashboardData) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <div className="dashboard-content">
          <h1>Dashboard</h1>

          <div className="cards">
            <ATSScoreCard
              title="Average ATS Score"
              value={dashboardData.stats.averageATSScore}
            />

            <ATSScoreCard
              title="Highest Score"
              value={dashboardData.stats.highestATSScore}
            />

            <ATSScoreCard
              title="Keyword Match"
              value={dashboardData.stats.averageKeywordMatch + "%"}
            />

            <ATSScoreCard
              title="Total Analyses"
              value={dashboardData.stats.totalAnalyses}
            />
          </div>

          <div className="chart-section">
            <TrendChart data={dashboardData.scoreTrend} />
          </div>

          <div className="table-section">
            <RecentAnalysisTable
              recentAnalyses={dashboardData.recentAnalyses}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
