const express = require("express");

const {
  analyzeResume,
  getAnalysisHistory,
  getAnalysisById,
} = require("../controllers/analysisController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/analyze", protect, analyzeResume);

router.get("/history", protect, getAnalysisHistory);

router.get("/:id", protect, getAnalysisById);

module.exports = router;
