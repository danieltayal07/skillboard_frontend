import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "applicant",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/signup", form);
      alert("Account created successfully!");
      navigate("/login");

    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <h2>Create an Account</h2>

      <form onSubmit={handleSignup} className="auth-form">
        {error && <p className="error-box">{error}</p>}

        <label>Full Name</label>
        <input
          name="name"
          type="text"
          placeholder="Your full name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          name="email"
          type="email"
          placeholder="Your email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          name="password"
          type="password"
          placeholder="Choose a password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <label>Register As</label>
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="applicant">Applicant</option>
          <option value="employer">Employer</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" className="btn-primary">
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Signup;
