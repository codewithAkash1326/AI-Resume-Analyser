const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const analyzeResumeWithAI = async (resumeText, jobDescription) => {
  try {
    const prompt = `
You are an ATS Resume Analyzer.

Analyze the following resume against the job description.

Return ONLY valid JSON.

{
  "atsScore": number,
  "keywordMatch": number,
  "missingKeywords": [],
  "skillGap": [],
  "recommendations": []
}

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    const cleanedResponse = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanedResponse);
  } catch (error) {
    throw new Error("AI analysis failed");
  }
};

module.exports = analyzeResumeWithAI;
