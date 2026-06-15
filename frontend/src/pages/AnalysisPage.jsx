import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import api from "../api/axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SkillGapCard from "../components/SkillGapCard";
import KeywordTable from "../components/KeywordTable";

import "../styles/AnalysisPage.css";

function AnalysisPage() {
  const { id } = useParams();

  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    fetchAnalysis();
  }, []);

  const fetchAnalysis = async () => {
    try {
      const response = await api.get(`/analysis/${id}`);

      setAnalysis(response.data.analysis);
    } catch (error) {
      console.log(error);
    }
  };

  if (!analysis) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Navbar />

      <div className="layout">
        <Sidebar />

        <div className="analysis-page">
          <h1>ATS Score: {analysis.atsScore}</h1>

          <h2>Keyword Match: {analysis.keywordMatch}%</h2>

          <SkillGapCard skills={analysis.skillGap} />

          <br />

          <KeywordTable keywords={analysis.missingKeywords} />

          <br />

          <div className="recommendations">
            <h2>Recommendations</h2>

            <ul>
              {analysis.recommendations.map((recommendation, index) => (
                <li key={index}>{recommendation}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default AnalysisPage;
