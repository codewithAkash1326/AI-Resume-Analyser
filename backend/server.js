const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Resume Analyzer API Running",
  });
});

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/resume", require("./routes/resumeRoutes"));
app.use("/analysis", require("./routes/analysisRoutes"));
app.use("/dashboard", require("./routes/dashboardRoutes"));

const PORT = process.env.PORT || 8000;

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
