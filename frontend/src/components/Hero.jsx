import { useState } from "react";

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
      const scrapeRes = await fetch(`${API_BASE}/api/jobs/scrape`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword, location })
      });

      const scrapeData = await scrapeRes.json();
      setExcelUrl(scrapeData.excelFile);

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
    <div className="min-h-screen bg-[#850E35] text-slate-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Search Card */}
        <section className="bg-[#FFC4C4] rounded-2xl p-4 sm:p-6 shadow-lg">
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4"
          >
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Job title (e.g. Frontend Developer)"
              className="rounded-xl text-[#850E35] border px-4 py-3 outline-none"
              required
            />

            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="rounded-xl text-[#850E35] border px-4 py-3 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#c54a62] hover:bg-[#850E35] transition font-semibold py-3 disabled:opacity-50"
            >
              {loading ? "Scraping…" : "Search & Scrape"}
            </button>
          </form>
        </section>

        {/* Status */}
        {loading && (
          <div className="mt-4 text-center text-sm animate-pulse">
            Scraping LinkedIn jobs…
          </div>
        )}

        {error && (
          <div className="mt-4 bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl p-3 text-sm">
            {error}
          </div>
        )}

        {/* Stats */}
        {stats && (
          <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#EE6983] rounded-xl p-4 text-center">
              <p className="text-xl font-bold">Jobs Scraped</p>
              <p className="text-3xl font-semibold mt-2">{stats.total}</p>
            </div>
            <div className="bg-[#EE6983] rounded-xl p-4 md:col-span-2 flex flex-col items-center justify-center">
              <p className="text-xl font-bold">Export</p>
              {excelUrl && (
                <a
                  href={excelUrl}
                  download="linkedin_jobs.xlsx"
                  className="mt-4 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-semibold"
                >
                  Download Excel
                </a>
              )}
            </div>
          </section>
        )}

        {/* Mobile Cards */}
        <section className="mt-8 space-y-4 md:hidden">
          {jobs.map((job, i) => (
            <div key={i} className="bg-[#EE6983] rounded-xl p-4">
              <p className="font-semibold">{job.title}</p>
              <p className="text-sm">{job.company}</p>
              <p className="text-sm">{job.location}</p>
              <p className="text-xs mt-1">{job.timePosted}</p>
              <a
                href={job.postLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-indigo-900 font-semibold"
              >
                View Job
              </a>
            </div>
          ))}
          {!loading && jobs.length === 0 && (
            <p className="text-center text-sm">No jobs to display</p>
          )}
        </section>

        {/* Desktop Table */}
        <section className="hidden md:block mt-10 bg-[#EE6983] rounded-2xl overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-950">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Company</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Posted</th>
                <th className="px-4 py-3 text-left">Link</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, i) => (
                <tr key={i} className="border-t hover:bg-[#850E35]">
                  <td className="px-4 py-3 font-medium">{job.title}</td>
                  <td className="px-4 py-3">{job.company}</td>
                  <td className="px-4 py-3">{job.location}</td>
                  <td className="px-4 py-3">{job.timePosted}</td>
                  <td className="px-4 py-3">
                    <a
                      href={job.postLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-200 hover:underline"
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
    </div>
  );
}
