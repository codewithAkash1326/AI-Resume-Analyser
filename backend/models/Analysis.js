const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },

    jobDescription: {
      type: String,
      required: true,
    },

    atsScore: {
      type: Number,
      default: 0,
    },

    keywordMatch: {
      type: Number,
      default: 0,
    },

    missingKeywords: [
      {
        type: String,
      },
    ],

    skillGap: [
      {
        type: String,
      },
    ],

    recommendations: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Analysis", analysisSchema);
