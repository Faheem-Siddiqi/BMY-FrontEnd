import React, { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';

export default function OTP() {
  const [otp, setOtp] = useState(''); 
  const [count, setCount] = useState(0);
  const [showRequireError, setShowRequireError] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleTime = () => {
    setCount(59);  
    const interval = setInterval(() => {
      setCount(prevCount => {
        if (prevCount === 1) {
          clearInterval(interval);
          return 0;  
        } else {
          return prevCount - 1;  
        }
      });
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowRequireError(false);
    setSubmitError('');
    setSuccessMessage('');

    if (!otp) {
      setShowRequireError(true);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/user/verifyCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resetPasswordToken: otp }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        navigate('/reset-password')
      } else {
        setSubmitError(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setSubmitError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center my-10">
        <div className="w-full max-w-4xl p-7 md:p-20 shadow-sm bg-iota rounded-box flex flex-col items-center gap-5">
          <section className='font-CormorantGaramond-Regular items-center justify-center flex flex-col w-fit mb-4'>
            <h1 className="text-3xl gap-1 flex">
              <p className='text-zeta font-bold'>BMY</p>
              <p className='text-primary font-semibold'>Health</p>
            </h1>
            <p className='font-light text-lg text-mist'>Pakistan</p>
          </section>
          <div className="md:px-10 px-5 md:py-12 py-10 w-full md:w-96 bg-white rounded-sm shadow-sm">
            <h2 className="text-xl md:text-3xl font-bold font-WorkSans-Regular">OTP Confirmation</h2>
            <p className='text-light font-NunitoSans-Regular text-sm mb-4 mt-1'>OTP Sent to email: faheem.siddiqi@yahoo.com</p>
            <section className="font-NunitoSans-Regular">
              <label htmlFor='otp'>OTP</label>
              <input
                name='otp'
                id='otp'
                type="text"
                placeholder="0000"
                className="mt-1 w-full text-center bg-gray-100 border border-light border-opacity-55 rounded py-2 px-3 focus:outline-none focus:border-gray-500"
                onChange={(e) => setOtp(e.target.value)}
              />
            </section>
            <span className="text-xs text-red-600">
              {!otp && showRequireError && " *OTP Required"}
              {submitError}
            </span>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-epsilon w-full mt-5 text-white mb-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
            {successMessage && (
              <p className="text-green-600">{successMessage}</p>
            )}
            <section className=''>
              <div className="flex gap-2 text-sm font-Satoshi-Black my-3">
                {count === 0 ? (
                  <>
                    <span>Didn't receive OTP? </span>
                    <button
                      className="text-primary border-b border-b-transparent hover:border-b-primary duration-500 cursor-pointer"
                      onClick={handleTime}
                    >
                      Resend
                    </button>
                  </>
                ) : (
                  <> Please wait {count} s to resend OTP </>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
