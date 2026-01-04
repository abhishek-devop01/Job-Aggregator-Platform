import scrapeAndSaveJobs from "../services/job.service.js";
import exportJobsToExcel from "../services/excel.service.js";
import Job from "../models/job.model.js";

// POST /api/jobs/scrape
const scrapeJobsController = async (req, res) => {
  try {
    const { keyword, location } = req.body;

    if (!keyword) {
      return res.status(400).json({
        success: false,
        message: "Keyword is required",
      });
    }
    const jobsInserted = await scrapeAndSaveJobs(keyword, location);

    const allJobs = await Job.find().sort({ createdAt: -1 });
    const excelPath = await exportJobsToExcel(allJobs);

    res.status(200).json({
      success: true,
      totalJobsSaved: jobsInserted.length,
      excelFile: excelPath
        ? "https://job-aggregator-platform-lxfb.onrender.com/downloads/linkedin_jobs.xlsx"
        : null,
    });
  } catch (error) {
    console.error("Controller error:", error.message);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET /api/jobs
const getJobsController = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }).limit(100);

    res.status(200).json({
      success: true,
      totalJobsSaved: jobs.length,
      jobs,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
    });
  }
};

export { scrapeJobsController, getJobsController };
