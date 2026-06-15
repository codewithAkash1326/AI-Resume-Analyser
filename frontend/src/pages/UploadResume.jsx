import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ResumeCard from "../components/ResumeCard";

import "../styles/UploadResume.css";

function UploadResume() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");

  const [resumes, setResumes] = useState([]);

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
    if (!file) return;

    const formData = new FormData();

    formData.append("resume", file);

    try {
      await api.post("/resume/upload", formData);

      fetchResumes();

      alert("Resume uploaded");
    } catch (error) {
      console.log(error);
    }
  };

  const analyzeResume = async (resumeId) => {
    try {
      const response = await api.post("/analysis/analyze", {
        resumeId,
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
          <h1>Upload Resume</h1>

          <input type="file" onChange={(e) => setFile(e.target.files[0])} />

          <button onClick={handleUpload}>Upload</button>

          <textarea
            rows="10"
            placeholder="Paste Job Description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />

          <h2>Your Resumes</h2>

          {resumes.map((resume) => (
            <div className="resume-wrapper" key={resume._id}>
              <ResumeCard resume={resume} />

              <button onClick={() => analyzeResume(resume._id)}>Analyze</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default UploadResume;
