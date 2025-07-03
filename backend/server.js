require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

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
app.use("/", (req, res) => {
  res.json("Hello from server");
});


// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Satrt server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));