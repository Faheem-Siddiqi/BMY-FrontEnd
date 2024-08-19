import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./../layout/Navs/Navbar";
import Footer from "../layout/Footer.jsx";
import { getCookie } from "cookies-next";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [showRequireError, setShowRequireError] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowRequireError(false);
    setSubmitError("");
    setSuccessMessage("");
    setLoading(true); 
    if (!email) {
      setShowRequireError(true);
      setLoading(false); 
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubmitError("Invalid Email Address");
      setLoading(false); // Set loading to false when request ends
      return;
    }
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const token = getCookie("token");
      myHeaders.append("Authorization", `Bearer ${token}`);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/user/forgetpassword`,
        {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify({ workemail: email }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
        navigate("/forget-password-otp", { state: { email } });
      } else {
        setSubmitError(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setSubmitError("An error occurred. Please try again.");
    } finally {
      setLoading(false); 
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center my-10">
        <div className="w-full max-w-4xl p-7 md:p-20 shadow-sm bg-iota rounded-box flex flex-col items-center gap-5">
          <div className="font-CormorantGaramond-Regular items-center justify-center flex flex-col w-fit mb-4">
            <h1 className="text-3xl gap-1 flex">
              <p className="text-zeta font-bold">BMY</p>
              <p className="text-primary font-semibold">Health</p>
            </h1>
            <p className="font-light text-lg text-mist">Pakistan</p>
          </div>
          <div className="md:px-10 px-5 md:py-12 py-10 w-full md:w-96 bg-white rounded-sm shadow-sm">
            <h2 className="text-xl md:text-3xl font-bold font-WorkSans-Regular">
              Forget Password
            </h2>
            <p className="text-light font-NunitoSans-Regular text-sm mb-4 mt-1">
              Reset Password
            </p>
            <section className="font-NunitoSans-Regular">
              <label htmlFor="email">Registered Email</label>
              <input
                name="email"
                id="email"
                type="email"
                placeholder="jane.doe@example.com"
                className="mt-1 w-full bg-gray-100 border border-light border-opacity-55 rounded py-2 px-3 focus:outline-none focus:border-gray-500"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </section>
            <span className="text-xs text-red-600">
              {!email && showRequireError && " *Email Required"}
              {submitError}
            </span>
            <button
              type="submit"
              onClick={handleSubmit}
              className={`w-full mt-5 mb-3 py-2 px-4 rounded focus:outline-none ${loading ? 'bg-gray-400' : 'bg-epsilon'} text-white`}
              disabled={loading} // Disable button when loading
            >
              {loading ? "Sending OTP..." : "Submit"} {/* Change button text based on loading state */}
            </button>
            {successMessage && (
              <p className="text-green-600">{successMessage}</p>
            )}
            <p className="text-center text-sm font-Satoshi-Black my-3">
              Don’t have an Account?{" "}
              <Link
                to="/sign-up"
                className="text-primary border-b border-b-transparent hover:border-b-primary duration-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
