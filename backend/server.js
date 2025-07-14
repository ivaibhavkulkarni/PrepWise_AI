require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require('./routes/authRoutes');
const sessionRoutes = require('./routes/sessionRoutes')
const questionRoutes = require('./routes/questionRoutes')
const { protect } = require("./middlewares/authMiddleware")
const { generateInterviewQuestions, generateConceptExplanation} = require('./controllers/aiController');

const app = express();

// Middleware to handle cors

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);


// DataBase
connectDB()
// Middleware 

app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);

app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);

app.use("/api/ai/generate-questions", protect, generateInterviewQuestions)
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation)

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Satrt server

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port http://localhost:${PORT}`));
