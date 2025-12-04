import React, { useEffect, useState } from "react";
import { Search, MapPin, Briefcase } from "lucide-react";
import api from "../api/axios";
import JobCard from "../components/Jobcard"; 
import Navbar from "../components/Navbar"; 
import "../styles/jobs.css";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/jobs");
        const jobList = res.data.jobs || res.data || [];
        setJobs(jobList);
        setFilteredJobs(jobList);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = () => {
    const term = keyword.toLowerCase();
    const loc = locationQuery.toLowerCase();

    const results = jobs.filter((job) => {
      const matchesKeyword = 
        job.title?.toLowerCase().includes(term) || 
        job.company?.toLowerCase().includes(term) || 
        job.skills?.toLowerCase().includes(term);

      const matchesLocation = 
        job.location?.toLowerCase().includes(loc);

      return (term === "" || matchesKeyword) && (loc === "" || matchesLocation);
    });

    setFilteredJobs(results);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearFilters = () => {
    setKeyword("");
    setLocationQuery("");
    setFilteredJobs(jobs);
  };

  return (
    <div className="jobs-page">
      <Navbar />
      <div className="jobs-hero">
        <div className="hero-content">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-sm font-semibold mb-4">
            <Briefcase size={14} /> #1 Job Board
          </div>
          
          <h2>
            Find your <span className="highlight-text">dream job</span> today.
          </h2>
          <p>Browse thousands of job openings from top companies and startups.</p>
          <div className="search-container">
            <div className="search-input-group">
              <Search size={20} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Job title, company, or keyword..." 
                className="search-input"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="search-input-group border-l border-gray-200">
              <MapPin size={20} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Location (e.g. Remote)" 
                className="search-input"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="jobs-container">
        
        {!loading && (
          <div className="results-count">
            Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} available
          </div>
        )}

        {loading ? (
          <div className="loading-state">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-4 bg-gray-200 rounded w-48 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        ) : (
          <>
            {filteredJobs.length > 0 ? (
              <div className="jobs-grid">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No jobs found matching your criteria.</p>
                <button 
                  onClick={clearFilters}
                  className="mt-4 text-orange-600 font-medium hover:underline"
                  style={{ backgroundColor: 'orange', padding: '10px' , borderRadius: '5px', cursor: 'pointer'}}
                >
                  Clear Filters & Show All
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Jobs;