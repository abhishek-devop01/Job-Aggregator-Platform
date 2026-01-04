import searchJobs from "../scrapers/search.scraper.js";
import fetchJobDetails from "../scrapers/job.scraper.js";
import Job from "../models/job.model.js";
import delay from "../utils/delay.js";

const scrapeAndSaveJobs = async (keyword, location) => {
  const savedJobs = [];

  for (let start = 0; start <= 100; start += 50) {
    const jobs = await searchJobs(keyword, location, start);

    for (const job of jobs) {
      await delay(2000);

      try {
        const details = await fetchJobDetails(job.jobId);
        if (!details) continue;

        const finalJob = {
          ...details,
          postLink: job.jobLink 
        };

        const saved = await Job.create(finalJob);
        savedJobs.push(saved);
      } catch (err) {
        // duplicate ignored
      }
    }
  }

  return savedJobs;
};

export default scrapeAndSaveJobs;
