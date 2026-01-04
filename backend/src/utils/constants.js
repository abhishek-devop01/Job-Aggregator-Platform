const LINKEDIN_BASE_URL = "https://www.linkedin.com";

const LINKEDIN_SEARCH_URL = `${LINKEDIN_BASE_URL}/jobs/search`;

const LINKEDIN_JOB_API_URL =
  "https://www.linkedin.com/jobs-guest/jobs/api/jobPosting";

const SELECTORS = {
  jobCard: "li",
  jobUrnAttr: "data-entity-urn",
  jobTitle: "h2",
  companyName: ".topcard__org-name-link",
  location: ".topcard__flavor--bullet",
  description: ".description__text"
};

export {
  LINKEDIN_BASE_URL,
  LINKEDIN_SEARCH_URL,
  LINKEDIN_JOB_API_URL,
  SELECTORS
};
