const Analysis = require("../models/Analysis");

const getDashboardData = async (req, res) => {
  try {
    const analyses = await Analysis.find({
      user: req.user._id,
    })
      .populate("resume", "fileName")
      .sort({ createdAt: 1 });

    const totalAnalyses = analyses.length;

    const averageATSScore =
      totalAnalyses > 0
        ? Math.round(
            analyses.reduce((sum, item) => sum + item.atsScore, 0) /
              totalAnalyses,
          )
        : 0;

    const highestATSScore =
      totalAnalyses > 0
        ? Math.max(...analyses.map((analysis) => analysis.atsScore))
        : 0;

    const averageKeywordMatch =
      totalAnalyses > 0
        ? Math.round(
            analyses.reduce((sum, item) => sum + item.keywordMatch, 0) /
              totalAnalyses,
          )
        : 0;

    const scoreTrend = analyses.map((analysis, index) => ({
      analysisNumber: index + 1,
      atsScore: analysis.atsScore,
      keywordMatch: analysis.keywordMatch,
    }));

    const recentAnalyses = analyses.slice(-5).reverse();

    res.status(200).json({
      success: true,

      stats: {
        totalAnalyses,
        averageATSScore,
        highestATSScore,
        averageKeywordMatch,
      },

      scoreTrend,

      recentAnalyses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardData,
};
