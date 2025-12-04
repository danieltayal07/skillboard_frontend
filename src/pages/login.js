import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, AlertCircle, Briefcase, CalendarCheck } from "lucide-react";
import { AuthContext } from "../context/authcontext";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", form);

      login({
        token: res.data.token,
        role: res.data.role,
        email: res.data.email,
      });

      navigate(`/dashboard/${res.data.role}`);

    } catch (err) {
      setError(err.response?.data?.error || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="mb-10">
          <Link to="/" className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <div className="bg-orange-500 p-1.5 rounded-lg">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span>Skill<span className="text-orange-600">Board</span></span>
          </Link>
          
          <h1 className="text-3xl font-bold mt-8 mb-2 text-slate-900">Welcome back</h1>
          <p className="text-slate-500">Please enter your details to sign in.</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2 text-sm animate-pulse">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
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
                type="password"
                name="password"
                placeholder="••••••••"
                className="form-input"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex justify-between items-center mb-2 p-10">
            <label className="flex items-center text-sm text-slate-600 cursor-pointer">
              <input type="checkbox" className="mr-2 rounded border-gray-300 text-orange-600 focus:ring-orange-200" />
              Remember me
            </label>
            <Link to="/forgot-password" class="text-sm font-semibold text-orange-600 hover:text-orange-700">
              Forgot password?
            </Link>
          </div>

          <button 
            type="submit" 
            className="btn-submit flex justify-center items-center gap-2"
            disabled={loading}
          >
            {loading ? (
              "Signing in..."
            ) : (
              <>
                <LogIn size={18} /> Sign In
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-orange-600 hover:text-orange-700">
            Sign up for free
          </Link>
        </p>
      </div>

      <div className="auth-right">
        <div className="max-w-md text-center z-10">
          <div className="bg-white p-4 rounded-2xl shadow-xl mb-8 inline-block transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CalendarCheck size={20} className="text-green-600" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-slate-900">Interview Scheduled</div>
                <div className="text-xs text-slate-500">Tomorrow, 10:00 AM</div>
              </div>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Pick up where you left off
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Keep track of your applications, manage your job listings, and stay connected with top talent.
          </p>
        </div>
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-orange-200 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-orange-300 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
      </div>
    </div>
  );
}

export default Login;