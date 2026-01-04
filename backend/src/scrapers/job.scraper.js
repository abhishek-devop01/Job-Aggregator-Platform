import axiosInstance from "../config/axios.js";
import * as cheerio from "cheerio";

const fetchJobDetails = async (jobId) => {
  const url = `https://www.linkedin.com/jobs-guest/jobs/api/jobPosting/${jobId}`;
  const response = await axiosInstance.get(url);
  const $ = cheerio.load(response.data);

  return {
    jobId,
    title: $("h2").first().text().trim() || null,
    company: $("a.topcard__org-name-link").text().trim() || null,
    location: $("span.topcard__flavor--bullet").first().text().trim() || null,

    // ✅ ADD THIS
    timePosted: $("span.posted-time-ago__text")
      .first()
      .text()
      .trim() || null,

    postLink: `https://www.linkedin.com/jobs/view/${jobId}`,
    source: "LinkedIn",
    scrapedAt: new Date()
  };
};

export default fetchJobDetails;
