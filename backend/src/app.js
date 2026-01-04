import express from "express";
import cors from "cors";
import jobRoutes from "./routes/job.routes.js";
import path from "path";


const app = express();

// ✅ CORS CONFIG
app.use(
  cors({
    origin: [
      "https://job-aggregator-platform-1.onrender.com",
      "http://localhost:5173",   // Vite dev
      "http://127.0.0.1:5173"
    ],
    methods: ["GET", "POST"],
    credentials: true
  })
);

app.use(express.json());

// 👇 expose output folder
app.use("/downloads", express.static(path.join(process.cwd(), "output")));


// Routes
app.use("/api/jobs", jobRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("LinkedIn Job Scraper API is running");
});

export default app;
