import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  MapPin, Banknote, Calendar, ArrowLeft, 
  Share2, CheckCircle2 
} from "lucide-react";
import api from "../api/axios";
import { AuthContext } from "../context/authcontext";
import "../styles/job-details.css";

function JobDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data.job);
      } catch (err) {
        console.error("Failed to load job details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const applyJob = async () => {
    try {
      await api.post(`/jobs/${id}/applications`);
      setApplied(true);
      alert("Application submitted successfully!");
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong applying.");
    }
  };

  const renderSkills = (skillsString) => {
    if (!skillsString) return "Not specified";
    const skills = Array.isArray(skillsString) 
      ? skillsString 
      : skillsString.split(',').map(s => s.trim());

    return skills.map((skill, idx) => (
      <span key={idx} className="skill-tag">{skill}</span>
    ));
  };

  if (loading) return <div className="job-details-page p-8 text-center text-slate-500">Loading Job Details...</div>;
  if (!job) return <div className="job-details-page p-8 text-center">Job not found.</div>;

  return (
    <div className="job-details-page">
      <div className="job-header-section">
        <div className="header-content">
          <div className="job-title-block">
            <Link to="/jobs" className="text-sm text-orange-600 font-semibold mb-4 inline-flex items-center hover:underline">
              <ArrowLeft size={16} className="mr-1" /> Back to Jobs
            </Link>
            
            <h1>{job.title}</h1>
            <div className="company-name">{job.company || "Leading Tech Company"}</div>
            
            <div className="job-meta-row">
              <div className="meta-item">
                <MapPin size={18} className="text-slate-400" />
                {job.location}
              </div>
              <div className="meta-item">
                <Banknote size={18} className="text-slate-400" />
                {job.salary || "Competitive Salary"}
              </div>
              <div className="meta-item">
                <Calendar size={18} className="text-slate-400" />
                Posted recently
              </div>
            </div>
          </div>

          <div className="header-actions">
            <button className="btn-secondary mr-3" title="Share Job">
              <Share2 size={20} />
            </button>

            {user?.role === "applicant" && (
              <button 
                className={`apply-btn-lg ${applied ? 'bg-green-600 hover:bg-green-700' : ''}`} 
                onClick={applyJob}
                disabled={applied}
              >
                {applied ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={20} /> Applied
                  </span>
                ) : "Apply Now"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="job-content-container">
        <div className="description-card">
          <h3>Job Description</h3>
          <div className="desc-text">
            {job.description || "No description provided."}
          </div>
        </div>

        <div className="details-sidebar">
          <div className="sidebar-card">
            <div className="sidebar-title">Required Skills</div>
            <div className="skills-list">
              {renderSkills(job.skills)}
            </div>
          </div>

          <div className="sidebar-card">
            <div className="sidebar-title">Job Overview</div>
            <div className="space-y-4 text-sm text-slate-600">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span>Job Type</span>
                <span className="font-semibold text-slate-900">{job.type || "Full Time"}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span>Experience</span>
                <span className="font-semibold text-slate-900">Mid-Senior Level</span>
              </div>
              <div className="flex justify-between">
                <span>Date Posted</span>
                <span className="font-semibold text-slate-900">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default JobDetails;