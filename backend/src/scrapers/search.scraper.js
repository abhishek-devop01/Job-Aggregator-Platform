import axiosInstance from "../config/axios.js";
import * as cheerio from "cheerio";

const searchJobs = async (keyword, location = "india", start = 0) => {
  const url =
    "https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search";

  const response = await axiosInstance.get(url, {
    params: {
      keywords: keyword,
      location,
      f_TPR: "r84600",
      start
    }
  });

  const $ = cheerio.load(response.data);
  const jobs = [];

  $("li").each((_, job) => {
    const baseCard = $(job).find("div.base-card");
    const urn = baseCard.attr("data-entity-urn");

    if (urn) {
      const jobId = urn.split(":")[3];
      jobs.push({
        jobId,
        jobLink: `https://www.linkedin.com/jobs/view/${jobId}`
      });
    }
  });

  console.log(` Job IDs found: ${jobs.length}`);
  return jobs;
};

export default searchJobs;
