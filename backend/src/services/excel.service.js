import ExcelJS from "exceljs";
import path from "path";
import fs from "fs";

const exportJobsToExcel = async (jobs) => {
  if (!jobs || jobs.length === 0) {
    console.log("⚠️ No jobs to write into Excel");
    return null;
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Jobs");

  worksheet.columns = [
    { header: "Job ID", key: "jobId", width: 20 },
    { header: "Title", key: "title", width: 30 },
    { header: "Company", key: "company", width: 25 },
    { header: "Location", key: "location", width: 20 },
    { header: "Posted", key: "timePosted", width: 15 },
    { header: "Link", key: "postLink", width: 40 }
  ];

  jobs.forEach((job) => {
    worksheet.addRow({
      jobId: job.jobId,
      title: job.title,
      company: job.company,
      location: job.location,
      timePosted: job.timePosted,
      postLink: job.postLink
    });
  });

  const outputDir = path.join(process.cwd(), "output");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const filePath = path.join(outputDir, "linkedin_jobs.xlsx");
  await workbook.xlsx.writeFile(filePath);

  console.log(`✅ Excel generated with ${jobs.length} rows`);

  return filePath;
};

export default exportJobsToExcel;
