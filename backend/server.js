const express = require("express");
const cors = require("cors");
const path = require("path");
const screenshotRouter = require("./routes/screenshot");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Serve static files from frontend in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend")));
}

// API Routes
app.use("/api/screenshot", screenshotRouter);

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

// This will Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
