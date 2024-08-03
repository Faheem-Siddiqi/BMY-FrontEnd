import React from 'react'
import { Link , useNavigate } from 'react-router-dom';
import { useState ,useEffect } from 'react';
import Loader from "../layout/Loader";
import toast, { Toaster } from "react-hot-toast";

export default function ResetPassword() {
  const [requiredError, setRequiredError] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userEmail, setUseEmail] = useState('')
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const SuccessReset = () => toast.success("Reset Password Successful");
  const FailReset= () => toast.error("Fail to reset the password");
  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates on unmounted components
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/user/getuserdetails`, {
          method: "GET",
          redirect: "follow",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (isMounted) {
          if (result.success) {
            // console.log(result.user) all user detail
            const { fullname, pfp, workemail, experience, residence, signature } = result.user;
            setUseEmail(workemail)
            setLoading(false);
          } else {
            toast.error("Failed to load user details.");
            navigate("/login");
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error(error);
          toast.error("An error occurred while fetching user details.");
          navigate("/login");
        }
      }
    };
    fetchUserDetails();
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  
  if (loading) {
    return <Loader />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRequiredError(false);
    setSubmitError("");

    if (!password || !confirmPassword) {
      setRequiredError(true);
      return;
    }

    if (password !== confirmPassword) {
      setSubmitError("Password and Confirm Password Doesn't Match");
      return;
    }

    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(confirmPassword)) {
      setSubmitError("Password must have one uppercase letter, one lowercase letter, one number, and be at least 8 characters long");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/user/setnewpassword`, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workemail: userEmail, 
          password,
        }),
      });

      const result = await response.json();

      if (result) {
        SuccessReset();
       
      } else {
        FailReset();
      }
    } catch (error) {
      setSubmitError('An unexpected error occurred');
    }
  };

  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
      <div className=" flex items-center justify-center my-10">
        <div className="w-full max-w-4xl p-7 md:p-20 shadow-sm bg-iota rounded-box flex  flex-col items-center gap-5 ">
          <div className='font-CormorantGaramond-Regular items-center justify-center  flex flex-col w-fit mb-4 ' >
            <h1 className="text-3xl  gap-1 flex">
              <p className='text-zeta font-bold '>BMY</p>
              <p className='text-primary font-semibold'>Health</p>
            </h1>
            <p className='font-light text-lg  text-mist'>Pakistan</p>
          </div>
          <div className="md:px-10 px-5 md:py-12 py-10  w-full md:w-96 bg-white rounded-sm shadow-sm ">
            <h2 className=" text-xl md:text-3xl font-bold font-WorkSans-Regular">New Password</h2>
            <p className='text-light font-NunitoSans-Regular text-sm mb-4 mt-1'>Reset Password</p>
            <section className="mb-4">
              <label htmlFor='password' >Password</label>
              <p className="text-xs my-1 text-red-600">
                {!password && requiredError && " *  Password Field Required"}
              </p>
              <input
                name='password'
                id='password'
                type="password"
                placeholder="8+ characters"
                className="mt-1  w-full bg-gray-100 border border-light border-opacity-55 rounded py-2 px-3  focus:outline-none  focus:border-gray-500"
                onChange={(e) => { setPassword(e.target.value) }}
              />
            </section>
            <section className="mb-4">
              <label htmlFor='confirm-password' >Confirm Password</label>
              <p className="text-xs my-1 text-red-600">
                {!confirmPassword && requiredError && " * Confirm Password Field Required"}
              </p>
              <input
                name='confirm-password'
                id='confirm-password'
                type="password"
                placeholder="8+ characters"
                className="mt-1  w-full bg-gray-100 border border-light border-opacity-55 rounded py-2 px-3  focus:outline-none  focus:border-gray-500"
                onChange={(e) => { setConfirmPassword(e.target.value) }}
              />
            </section>
            <span className="text-xs text-red-600">
              {submitError}
            </span>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-epsilon w-full mt-5 text-white mb-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
            <p className="text-center text-sm font-Satoshi-Black my-3">
              Don’t have an Account? <Link to="/sign-up" className="text-primary border-b border-b-transparent hover:border-b-primary duration-500">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
