import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://job-aggregator-platform-lxfb.onrender.com";

export default function Hero() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("India");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [excelUrl, setExcelUrl] = useState(null);


  const handleSearch = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);
  setExcelUrl(null);

  try {
    // 1️⃣ Trigger scrape (GET EXCEL URL HERE)
    const scrapeRes = await fetch(`${API_BASE}/api/jobs/scrape`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword, location }),
    });

    const scrapeData = await scrapeRes.json();

    // ✅ SET EXCEL URL FROM SCRAPE RESPONSE
    setExcelUrl(scrapeData.excelFile);

    // 2️⃣ Fetch jobs from DB
    const res = await fetch(`${API_BASE}/api/jobs`);
    const data = await res.json();

    setJobs(data.jobs || []);
    setStats({ total: data.jobs.length });

  } catch (err) {
    setError("Failed to fetch jobs");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-[85.2vh] bg-[#850E35] text-slate-100">
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Card */}
        <section className="bg-[#FFC4C4]  rounded-2xl p-6 shadow-lg">
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Job title (e.g. Frontend Developer)"
              className="rounded-xl text-[#850E35]  border border-slate-700 px-4 py-3 focus:ring-2  outline-none"
              required
            />

            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="rounded-xl  text-[#850E35] border border-slate-700 px-4 py-3 focus:ring-2  outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#c54a62] hover:bg-[#850E35] transition font-semibold disabled:opacity-50"
            >
              {loading ? "Scraping jobs…" : "Search & Scrape"}
            </button>
          </form>
        </section>

        {/* Status */}
        {loading && (
          <div className="mt-6 text-zinc-50 animate-pulse">
            Scraping LinkedIn jobs. This may take a few seconds…
          </div>
        )}

        {error && (
          <div className="mt-6 bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl p-4">
            {error}
          </div>
        )}

        {/* Stats */}
        {stats && (
          <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#EE6983]  border  rounded-xl p-4">
              <p className="text-3xl font-bold text-center">Jobs Scraped</p>
              <p className="text-3xl font-medium text-center pt-6">{stats.total}</p>
            </div>
            <div className="bg-[#EE6983]  border  rounded-xl p-4 md:col-span-2">
              <p className="text-3xl font-bold  text-center">Export</p>
              
              {excelUrl && (
                <a
                  href={excelUrl}
                  download="linkedin_jobs.xlsx"
                  className="inline-block mt-6 px-5 py-3 ml-82 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-semibold transition"
                >
                  Download Excel
                </a>
              )}
            </div>
          </section>
        )}

        {/* Results Table */}
        <section className="mt-10 bg-[#EE6983] border border-slate-800 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-950 ">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Company</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Posted</th>
                <th className="px-4 py-3 text-left">Link</th>
              </tr>
            </thead>
            <tbody>
              {!loading && jobs.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-8 py-8 text-center  text-zinc-900"
                  >
                    No jobs to display
                  </td>
                </tr>
              )}

              {jobs.map((job, i) => (
                <tr
                  key={i}
                  className="border-t border-slate-800 hover:bg-[#850E35] transition"
                >
                  <td className="px-4 py-3 font-medium">{job.title}</td>
                  <td className="px-4 py-3">{job.company}</td>
                  <td className="px-4 py-3">{job.location}</td>
                  <td className="px-4 py-3 ">{job.timePosted}</td>
                  <td className="px-4 py-3">
                    <a
                      href={job.postLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 text-bold hover:underline"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      {/* Footer */}
    </div>
  );
}
