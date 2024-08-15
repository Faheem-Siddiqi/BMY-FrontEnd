import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../layout/Footer";
import Navbar from "./../layout/Navs/Navbar";
import { setCookie } from 'cookies-next';
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

// Set the base URL for Axios
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

export default function Login() {
  const navigate = useNavigate();
  const [showRequireError, setShowRequireError] = useState(false);
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Toast notifications
  const SuccessLogin = () => toast.success("Login Successful");
  const FailLogin = (message) => toast.error(message || "Login failed");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowRequireError(!email || !password || !role);
    if (!email || !password || !role) return;

    try {
      const response = await axios.post("/api/v1/user/login", { workemail: email, password, role });
      const { token } = response.data;

      // Save token and role
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      setCookie('token', token);

      SuccessLogin();
      navigate('/edit-profile');
    } catch (error) {
      FailLogin(error.response?.data?.message);
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <div className="flex items-center justify-center my-10">
        <div className="w-full max-w-4xl p-5 md:p-20 shadow-sm bg-iota rounded-box">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
              <div className="font-CormorantGaramond-Regular items-center justify-center flex flex-col w-fit mb-10">
                <h1 className="text-3xl gap-1 flex">
                  <p className="text-zeta font-bold">BMY</p>
                  <p className="text-primary font-semibold">Health</p>
                </h1>
                <p className="font-light text-lg text-mist">Pakistan</p>
              </div>
              <div className="mb-4 text-primary">
                {/* Existing SVG and text */}
                <div className="flex items-center gap-2 mb-4">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* SVG Path */}
                  </svg>
                  <p>Create and Carry out Research</p>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* SVG Path */}
                  </svg>
                  <p>Collaborate with others</p>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* SVG Path */}
                  </svg>
                  <p>Succeed</p>
                </div>
              </div>
            </div>
            <div className="md:p-10 p-5 bg-white rounded-r-lg">
              <h2 className="text-3xl font-bold font-WorkSans-Regular">Log in</h2>
              <p className="text-light font-NunitoSans-Regular text-sm mb-4 mt-1">Get Started</p>
              <div className="text-sm text-inputFields">
                <div className="mb-4">
                  <label>Role</label>
                  <span className="text-xs text-red-600">
                    {showRequireError && !role && " * Required"}
                  </span>
                  <select
                    className="mt-1 w-full bg-gray-100 border border-light border-opacity-55 rounded py-2 px-3 focus:outline-epsilon focus:border-gray-500"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Select Role</option>
                    <option value="group-lead">Researcher Lead</option>
                    <option value="researchers">Researcher</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="erc-head">ERC Head</option>
                    <option value="erc-members">ERC Member</option>
                  </select>
                </div>
                <div className="mb-4 font-NunitoSans-Regular">
                  <label htmlFor="email">Work Email</label>
                  <span className="text-xs text-red-600">
                    {showRequireError && !email && " * Required"}
                  </span>
                  <input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="jane.doe@example.com"
                    className="mt-1 w-full bg-gray-100 border border-light border-opacity-55 rounded py-2 px-3 focus:outline-epsilon focus:border-gray-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password">Password</label>
                  <span className="text-xs text-red-600">
                    {showRequireError && !password && " * Required"}
                  </span>
                  <div className="relative">
                    <input
                      name="password"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="8+ characters"
                      className="mt-1 w-full bg-gray-100 border border-light border-opacity-55 rounded py-2 px-3 focus:outline-epsilon focus:border-gray-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-sm"
                      onClick={() => setShowPassword(prev => !prev)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-end mb-4">
                  <Link
                    to="/forget-password"
                    className="relative text-zeta w-fit block after:block after:content-[''] after:absolute after:h-[1px] after:bg-zeta after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-epsilon w-full text-white my-2 py-2 px-4 rounded focus:outline-epsilon focus:shadow-outline"
                >
                  Submit
                </button>
              </div>
              <p className="text-center text-sm font-Satoshi-Black my-3 flex gap-1">
                Don’t have an Account?
                <Link
                  to="/sign-up"
                  className="relative text-primary w-fit block after:block after:content-[''] after:absolute after:h-[1px] after:bg-epsilon after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
                >
                  Sign up
                </Link>
              </p>
              <p className="text-center text-sm font-Satoshi-Black my-3 flex gap-1">
                <Link
                  to="/admin-login"
                  className="relative text-primary w-fit block after:block after:content-[''] after:absolute after:h-[1px] after:bg-epsilon after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
                >
                  Admin Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
