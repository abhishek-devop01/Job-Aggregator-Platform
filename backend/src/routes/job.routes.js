import express from "express";
import { scrapeJobsController } from "../controllers/job.controller.js";
import { getJobsController } from "../controllers/job.controller.js";

const router = express.Router();

router.post("/scrape", scrapeJobsController);
router.get("/", getJobsController); // 👈 NEW

export default router;
