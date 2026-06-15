const express = require("express");
const multer = require("multer");

const {
  uploadResume,
  getResumes,
  deleteResume,
} = require("../controllers/resumeController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

router.post("/upload", protect, upload.single("resume"), uploadResume);

router.get("/", protect, getResumes);

router.delete("/:id", protect, deleteResume);

module.exports = router;
