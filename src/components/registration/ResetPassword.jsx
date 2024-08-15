import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import Loader from "../layout/Loader";

export default function ResetPassword() {
  const [requiredError, setRequiredError] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false); // New state for loading
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const SuccessReset = () => toast.success('Reset Password Successful');
  const FailReset = () => toast.error('Failed to reset the password');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRequiredError(false);
    setSubmitError('');
    setLoading(true); // Set loading to true when starting request

    if (!password || !confirmPassword) {
      setRequiredError(true);
      setLoading(false); // Reset loading state
      return;
    }

    if (password !== confirmPassword) {
      setSubmitError("Password and Confirm Password Don't Match");
      setLoading(false); // Reset loading state
      return;
    }

    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(confirmPassword)) {
      setSubmitError("Password must have one uppercase letter, one lowercase letter, one number, and be at least 8 characters long");
      setLoading(false); // Reset loading state
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/user/setnewpassword`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workemail: email,
          password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        SuccessReset();
        setTimeout(() => {
          navigate('/login');
        }, 0); 
      } else {
        FailReset();
      }
    } catch (error) {
      setSubmitError('An unexpected error occurred');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {loading && <Loader />} {/* Show loader when loading is true */}
      <div className="flex items-center justify-center my-10">
        <div className="w-full max-w-4xl p-7 md:p-20 shadow-sm bg-iota rounded-box flex flex-col items-center gap-5">
          <div className='font-CormorantGaramond-Regular items-center justify-center flex flex-col w-fit mb-4'>
            <h1 className="text-3xl gap-1 flex">
              <p className='text-zeta font-bold'>BMY</p>
              <p className='text-primary font-semibold'>Health</p>
            </h1>
            <p className='font-light text-lg text-mist'>Pakistan</p>
          </div>
          <div className="md:px-10 px-5 md:py-12 py-10 w-full md:w-96 bg-white rounded-sm shadow-sm">
            <h2 className="text-xl md:text-3xl font-bold font-WorkSans-Regular">New Password</h2>
            <p className='text-light font-NunitoSans-Regular text-sm mb-4 mt-1'>Reset Password</p>
            <section className="mb-4">
              <label htmlFor='password'>Password</label>
              <p className="text-xs my-1 text-red-600">
                {!password && requiredError && " * Password Field Required"}
              </p>
              <div className="relative">
                <input
                  name='password'
                  id='password'
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  placeholder="8+ characters"
                  className="mt-1 w-full bg-gray-100 border border-light border-opacity-55 rounded py-2 px-3 focus:outline-none focus:border-gray-500"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0  text-sm flex items-center px-2"
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </section>
            <section className="mb-4">
              <label htmlFor='confirm-password'>Confirm Password</label>
              <p className="text-xs my-1 text-red-600">
                {!confirmPassword && requiredError && " * Confirm Password Field Required"}
              </p>
              <div className="relative">
                <input
                  name='confirm-password'
                  id='confirm-password'
                  type={showConfirmPassword ? "text" : "password"} // Toggle between text and password
                  placeholder="8+ characters"
                  className="mt-1 w-full bg-gray-100 border border-light border-opacity-55 rounded py-2 px-3 focus:outline-none focus:border-gray-500"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex text-sm items-center px-2"
                  onClick={() => setShowConfirmPassword(prev => !prev)}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </section>
            <span className="text-xs text-red-600">
              {submitError}
            </span>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-epsilon w-full mt-5 text-white mb-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading} 
            >
              {loading ? 'Updating...' : 'Submit'} 
            </button>
            <p className="text-center text-sm font-Satoshi-Black my-3">
              Don’t have an Account? <Link to="/sign-up" className="text-primary border-b border-b-transparent hover:border-b-primary duration-500">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
