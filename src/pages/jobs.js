import React, { useEffect, useState, useCallback } from "react";
import { Search, MapPin, Briefcase, Filter } from "lucide-react";
import api from "../api/axios";
import JobCard from "../components/Jobcard"; 
import Navbar from "../components/Navbar"; 
import "../styles/jobs.css";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [keyword, setKeyword] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  const [sortOption, setSortOption] = useState("newest"); 
  const [jobType, setJobType] = useState("all");          
  const [salaryFilter, setSalaryFilter] = useState("all"); 

  const fetchJobs = useCallback(async (overrides = {}) => {
    setLoading(true);
    try {
      const params = {};
  
      const kw = overrides.keyword !== undefined ? overrides.keyword : keyword;
      if (kw && kw.trim() !== "") params.keyword = kw.trim();
  
      const loc = overrides.location !== undefined ? overrides.location : locationQuery;
      if (loc && loc.trim() !== "") params.location = loc.trim();
  
      const t = overrides.type !== undefined ? overrides.type : jobType;
      if (t && t !== "all") params.type = t;
  
      const s = overrides.salary !== undefined ? overrides.salary : salaryFilter;
      if (s && s !== "all") params.salary = s;
  
      const so = overrides.sort !== undefined ? overrides.sort : sortOption;
      if (so) params.sort = so;
  
      if (overrides.page) params.page = overrides.page;
      if (overrides.limit) params.limit = overrides.limit;
  
      const res = await api.get("/jobs", { params });

      const jobList = res.data.jobs || res.data || [];
      setJobs(jobList);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  }, [keyword, locationQuery, jobType, salaryFilter, sortOption]);
  

 const handleKeyDown = (e) => {
  if (e.key === "Enter") fetchJobs({ keyword, location: locationQuery, page: 1 });
};


  const handleSearchClick = () => {
    fetchJobs({ keyword, location: locationQuery, page: 1 });
  };

  useEffect(() => {
    fetchJobs({ page: 1 });
  }, [sortOption, jobType, salaryFilter]);

  const handleFilterChange = (setter, value) => {
    setter(value);
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line
  }, [sortOption, jobType, salaryFilter]); 


  const clearAllFilters = () => {
    // 1. Reset UI State
    setKeyword("");
    setLocationQuery("");
    setSortOption("newest");
    setJobType("all");
    setSalaryFilter("all");

    fetchJobs({
      keyword: "",
      location: "",
      type: "all",
      salary: "all",
      sort: "newest"
    });
  };

  return (
    <div className="jobs-page">
      <Navbar />
      
      {/* Hero Section */}
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
            <button className="search-btn" onClick={handleSearchClick}>
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="jobs-container">
        
        {/* Filter Bar */}
        <div className="filters-bar">
          <div className="results-count">
             Showing {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'}
          </div>

          <div className="filter-group">
            {/* Sort Dropdown */}
            <select 
              className="filter-select"
              value={sortOption}
              onChange={(e) => handleFilterChange(setSortOption, e.target.value)}
            >
              <option value="newest">Sort: Newest</option>
              <option value="salary-high">Salary: High to Low</option>
              <option value="salary-low">Salary: Low to High</option>
            </select>

            {/* Type Filter */}
            <select 
              className="filter-select"
              value={jobType}
              onChange={(e) => handleFilterChange(setJobType, e.target.value)}
            >
              <option value="all">Type: All</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>

            {/* Salary Filter */}
            <select 
              className="filter-select"
              value={salaryFilter}
              onChange={(e) => handleFilterChange(setSalaryFilter, e.target.value)}
            >
              <option value="all">Salary: Any</option>
              <option value="50k+">$50k+</option>
              <option value="100k+">$100k+</option>
            </select>
            
            {/* Reset Button */}
            {(keyword || locationQuery || jobType !== 'all' || salaryFilter !== 'all') && (
              <button 
                onClick={clearAllFilters}
                className="text-sm font-semibold text-orange-600 hover:text-orange-700 ml-2"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="loading-state">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-4 bg-gray-200 rounded w-48 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        ) : (
          <>
            {jobs.length > 0 ? (
              <div className="jobs-grid">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div style={{ background: '#f1f5f9', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <Filter size={30} color="#94a3b8" />
                </div>
                <h3>No jobs found matching your criteria.</h3>
                <p>Try adjusting your search terms or filters.</p>
                <button 
                  onClick={clearAllFilters}
                  style={{ marginTop: '1rem', border: '1px solid #f97316', color: '#f97316', background: 'transparent', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
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