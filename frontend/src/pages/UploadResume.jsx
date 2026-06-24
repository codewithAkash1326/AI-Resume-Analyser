import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "../styles/UploadResume.css";

function UploadResume() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await api.get("/resume");
      setResumes(response.data.resumes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("resume", file);

      await api.post("/resume/upload", formData);

      alert("Resume uploaded successfully");

      setFile(null);

      fetchResumes();
    } catch (error) {
      console.log(error);
    }
  };

  const analyzeResume = async () => {
    if (!selectedResume) {
      alert("Please select a resume");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Please paste a job description");
      return;
    }

    try {
      const response = await api.post("/analysis/analyze", {
        resumeId: selectedResume,
        jobDescription,
      });

      navigate(`/analysis/${response.data.analysis._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="layout">
        <Sidebar />

        <div className="upload-page">
          {/* Upload Section */}
          <div className="section-card">
            <h1>Upload Resume</h1>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <button className="upload-btn" onClick={handleUpload}>
              Upload Resume
            </button>
          </div>

          {/* Select Resume */}
          <div className="section-card">
            <h2>Select Resume</h2>

            {resumes.length === 0 ? (
              <p>No resumes uploaded yet.</p>
            ) : (
              <div className="resume-list">
                {resumes.map((resume) => (
                  <button
                    key={resume._id}
                    className={
                      selectedResume === resume._id
                        ? "resume-btn selected"
                        : "resume-btn"
                    }
                    onClick={() => setSelectedResume(resume._id)}
                  >
                    {resume.fileName}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Job Description */}
          <div className="section-card">
            <h2>Job Description</h2>

            <textarea
              rows="10"
              placeholder="Paste Job Description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />

            <button className="analyze-btn" onClick={analyzeResume}>
              Analyze Resume
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadResume;
