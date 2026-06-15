const Resume = require("../models/Resume");
const Analysis = require("../models/Analysis");

const analyzeResumeWithAI = require("../services/aiService");

// POST /analysis/analyze
const analyzeResume = async (req, res) => {
  try {
    const { resumeId, jobDescription } = req.body;

    if (!resumeId || !jobDescription) {
      return res.status(400).json({
        success: false,
        message: "resumeId and jobDescription are required",
      });
    }

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const aiResult = await analyzeResumeWithAI(
      resume.extractedText,
      jobDescription,
    );

    const analysis = await Analysis.create({
      user: req.user._id,
      resume: resume._id,
      jobDescription,

      atsScore: aiResult.atsScore,
      keywordMatch: aiResult.keywordMatch,
      missingKeywords: aiResult.missingKeywords,
      skillGap: aiResult.skillGap,
      recommendations: aiResult.recommendations,
    });

    res.status(201).json({
      success: true,
      analysis,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /analysis/history
const getAnalysisHistory = async (req, res) => {
  try {
    const history = await Analysis.find({
      user: req.user._id,
    })
      .populate("resume", "fileName")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: history.length,
      history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /analysis/:id
const getAnalysisById = async (req, res) => {
  try {
    const analysis = await Analysis.findById(req.params.id).populate(
      "resume",
      "fileName",
    );

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Analysis not found",
      });
    }

    res.status(200).json({
      success: true,
      analysis,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  analyzeResume,
  getAnalysisHistory,
  getAnalysisById,
};
