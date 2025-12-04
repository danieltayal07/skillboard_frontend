import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Briefcase, Building2, AlertCircle } from "lucide-react";
// ShieldCheck
import api from "../api/axios";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "applicant",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (selectedRole) => {
    setForm({ ...form, role: selectedRole });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/signup", form);
      alert("Account created successfully!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="mb-8">
          <Link to="/" className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <div className="bg-orange-500 p-1.5 rounded-lg">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span>Skill<span className="text-orange-600">Board</span></span>
          </Link>
          
          <h1 className="text-3xl font-bold mt-8 mb-2 text-slate-900">Create an Account</h1>
          <p className="text-slate-500">Select your role to get started.</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label className="form-label">I am a...</label>
            <div className="role-group" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              
              <div 
                className={`role-card ${form.role === 'applicant' ? 'active' : ''}`}
                onClick={() => handleRoleSelect('applicant')}
              >
                <User size={24} className={form.role === 'applicant' ? 'text-orange-500' : 'text-slate-400'} />
                <h4>Seeker</h4>
              </div>

              <div 
                className={`role-card ${form.role === 'employer' ? 'active' : ''}`}
                onClick={() => handleRoleSelect('employer')}
              >
                <Building2 size={24} className={form.role === 'employer' ? 'text-orange-500' : 'text-slate-400'} />
                <h4>Employer</h4>
              </div>

              {/* Admin */}
              {/* <div 
                className={`role-card ${form.role === 'admin' ? 'active' : ''}`}
                onClick={() => handleRoleSelect('admin')}
              >
                <ShieldCheck size={24} className={form.role === 'admin' ? 'text-orange-500' : 'text-slate-400'} />
                <h4>Admin</h4>
              </div> */}

            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div className="input-wrapper">
              <User className="input-icon" size={18} />
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                className="form-input"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input
                name="email"
                type="email"
                placeholder="john@example.com"
                className="form-input"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                className="form-input"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-submit flex justify-center items-center" 
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-orange-600 hover:text-orange-700">
            Log in here
          </Link>
        </p>
      </div>

      <div className="auth-right">
        <div className="max-w-md text-center z-10">
          <div className="bg-white p-4 rounded-2xl shadow-xl mb-8 inline-block transform -rotate-3 hover:rotate-0 transition-transform duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Briefcase size={20} className="text-orange-600" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-slate-900">System Status</div>
                <div className="text-xs text-slate-500">All services operational</div>
              </div>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Manage your career ecosystem
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Whether you are an admin managing the platform, an employer hiring, or a candidate applying—SkillBoard makes it seamless.
          </p>
        </div>
        
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-orange-200 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-orange-300 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
      </div>
    </div>
  );
}

export default Signup;