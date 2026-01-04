import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    jobId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    title: String,
    company: String,
    location: String,
    description: String,
    source: String,
    timePosted: String,
    postLink: String,
    scrapedAt: Date
  },
  {
    timestamps: true
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
