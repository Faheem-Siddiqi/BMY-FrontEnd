import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../layout/Footer';
import Navbar from './../layout/Navs/Navbar';
export default function Login() {
  const [showRequireError, setShowRequireError] = useState(false)
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowRequireError(false)
    if (!email || !password || !role) {
      setShowRequireError(true)
      return
    }
    console.log('Form submitted:', { email, password, role });
  };
  return (
    <>
    <Navbar/>
      <div className=" flex items-center justify-center my-10">
        <div className="w-full max-w-4xl p-5 md:p-20 shadow-sm bg-iota rounded-box">
          <div className='grid grid-cols-1 lg:grid-cols-2'>
            <div>
              <div className='font-CormorantGaramond-Regular items-center justify-center  flex flex-col w-fit mb-10  ' >
                <h1 className="text-3xl  gap-1 flex">
                  <p className='text-zeta font-bold '>BMY</p>
                  <p className='text-primary font-semibold'>Health</p>
                </h1>
                <p className='font-light text-lg   text-mist'>Pakistan</p>
              </div>
              <div className=" mb-4 text-primary">
                <div className=" flex items-center gap-2 mb-4">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.99944 14.5C6.56292 14.5007 6.13181 14.5966 5.73618 14.781C5.34055 14.9655 4.98995 15.234 4.70883 15.568C4.42772 15.9019 4.22286 16.2932 4.10857 16.7145C3.99427 17.1358 3.97329 17.5769 4.04709 18.0072C4.12088 18.4374 4.28768 18.8463 4.53583 19.2055C4.78399 19.5646 5.10752 19.8652 5.48386 20.0864C5.86019 20.3076 6.28026 20.444 6.71474 20.486C7.14923 20.5281 7.58766 20.4749 7.99944 20.33" stroke="#337E31" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4.26489 16.1046C3.66645 15.8165 3.14918 15.3839 2.75974 14.8459C2.37031 14.3078 2.12098 13.6813 2.03425 13.0228C1.94752 12.3643 2.02613 11.6946 2.26298 11.0741C2.49982 10.4536 2.88746 9.90182 3.39089 9.46859M3.42089 9.38759C3.09293 8.89684 2.94919 8.30588 3.01511 7.71932C3.08103 7.13277 3.35236 6.58845 3.78107 6.18274C4.20977 5.77702 4.7682 5.53608 5.3575 5.50256C5.94679 5.46904 6.52894 5.64511 7.00089 5.99959M7.23889 6.06459C7.07936 5.72564 6.99805 5.35516 7.00097 4.98056C7.00388 4.60595 7.09094 4.23678 7.25572 3.90035C7.4205 3.56392 7.65879 3.26882 7.95296 3.03686C8.24713 2.80491 8.58967 2.64203 8.95526 2.56027C9.32084 2.47851 9.70013 2.47995 10.0651 2.5645C10.43 2.64904 10.7713 2.81452 11.0637 3.04871C11.3561 3.2829 11.5922 3.5798 11.7544 3.91748C11.9166 4.25516 12.0008 4.62497 12.0009 4.99959M12.0009 4.99959V20.4996M12.0009 4.99959C12.001 4.62497 12.0852 4.25516 12.2474 3.91748C12.4096 3.5798 12.6457 3.2829 12.9381 3.04871C13.2304 2.81452 13.5717 2.64904 13.9367 2.5645C14.3016 2.47995 14.6809 2.47851 15.0465 2.56027C15.4121 2.64203 15.7547 2.80491 16.0488 3.03686C16.343 3.26882 16.5813 3.56392 16.7461 3.90035C16.9108 4.23678 16.9979 4.60595 17.0008 4.98056C17.0037 5.35516 16.9224 5.72564 16.7629 6.06459M12.0009 20.4996C12.0009 21.03 11.7902 21.5387 11.4151 21.9138C11.04 22.2889 10.5313 22.4996 10.0009 22.4996C9.47046 22.4996 8.96175 22.2889 8.58668 21.9138C8.2116 21.5387 8.00089 21.03 8.00089 20.4996M12.0009 20.4996C12.0009 21.03 12.2116 21.5387 12.5867 21.9138C12.9617 22.2889 13.4705 22.4996 14.0009 22.4996M12.0009 7.49959C12.0009 8.29524 12.317 9.0583 12.8796 9.62091C13.4422 10.1835 14.2052 10.4996 15.0009 10.4996M20.6109 9.46859C21.0475 9.84365 21.3978 10.3087 21.6377 10.8319C21.8776 11.3551 22.0015 11.924 22.0009 12.4996C22.0009 13.2026 21.8199 13.8636 21.5009 14.4376M20.5809 9.38759C20.9088 8.89684 21.0526 8.30588 20.9867 7.71932C20.9207 7.13277 20.6494 6.58845 20.2207 6.18274C19.792 5.77702 19.2336 5.53608 18.6443 5.50256C18.055 5.46904 17.4728 5.64511 17.0009 5.99959M20.5009 20.9996L22.0009 22.4996M16.0009 18.9996C16.0009 19.6626 16.2643 20.2985 16.7331 20.7674C17.202 21.2362 17.8378 21.4996 18.5009 21.4996C19.1639 21.4996 19.7998 21.2362 20.2687 20.7674C20.7375 20.2985 21.0009 19.6626 21.0009 18.9996C21.0009 18.3366 20.7375 17.7007 20.2687 17.2318C19.7998 16.763 19.1639 16.4996 18.5009 16.4996C17.8378 16.4996 17.202 16.763 16.7331 17.2318C16.2643 17.7007 16.0009 18.3366 16.0009 18.9996Z" stroke="#337E31" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p> Create and Carry out Research</p></div>
                <div className="flex items-center gap-2 mb-4">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.9231 13.2143C17.9054 13.2143 17.0092 13.6793 16.4492 14.3864L12.7931 12.5L16.4492 10.6136C17.0092 11.3207 17.9046 11.7857 18.9231 11.7857C20.6223 11.7857 22 10.5064 22 8.92857C22 7.35071 20.6223 6.07143 18.9231 6.07143C17.2238 6.07143 15.8462 7.35071 15.8462 8.92857C15.8462 9.30429 15.9292 9.66143 16.0708 9.99072L12.3846 11.8929V8.17857C13.9 8.00071 15.0769 6.81286 15.0769 5.35714C15.0769 3.77929 13.6992 2.5 12 2.5C10.3008 2.5 8.92308 3.77929 8.92308 5.35714C8.92308 6.81286 10.1 8.00071 11.6154 8.17857V11.8929L7.92846 9.99072C8.07077 9.66143 8.15385 9.30429 8.15385 8.92857C8.15385 7.35071 6.77615 6.07143 5.07692 6.07143C3.37769 6.07143 2 7.35071 2 8.92857C2 10.5064 3.37769 11.7857 5.07692 11.7857C6.09538 11.7857 6.99077 11.3207 7.55077 10.6136L11.2069 12.5L7.55 14.3864C6.99077 13.6793 6.09538 13.2143 5.07692 13.2143C3.37769 13.2143 2 14.4936 2 16.0714C2 17.6493 3.37769 18.9286 5.07692 18.9286C6.77615 18.9286 8.15385 17.6493 8.15385 16.0714C8.15385 15.6957 8.07077 15.3386 7.92846 15.0093L11.6154 13.1071V16.8214C10.1 16.9993 8.92308 18.1871 8.92308 19.6429C8.92308 21.2207 10.3008 22.5 12 22.5C13.6992 22.5 15.0769 21.2207 15.0769 19.6429C15.0769 18.1871 13.9 16.9993 12.3846 16.8214V13.1071L16.0715 15.0093C15.9292 15.3379 15.8462 15.695 15.8462 16.0714C15.8462 17.6493 17.2238 18.9286 18.9231 18.9286C20.6223 18.9286 22 17.6493 22 16.0714C22 14.4936 20.6223 13.2143 18.9231 13.2143Z" fill="#337E31" />
                  </svg>
                  <p>Collaborate with others</p>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.875 9.6875H19.1112C19.6607 10.8495 19.9688 12.1472 19.9688 13.5156C19.9688 18.4696 15.9384 22.5 10.9844 22.5C6.03039 22.5 2 18.4696 2 13.5156C2 8.56164 6.03039 4.53125 10.9844 4.53125C12.3528 4.53125 13.6505 4.8393 14.8125 5.38883V5.625V6.37297L14.1891 6.99633C13.2219 6.51883 12.134 6.25 10.9844 6.25C6.97813 6.25 3.71875 9.50938 3.71875 13.5156C3.71875 17.5219 6.97813 20.7812 10.9844 20.7812C14.9906 20.7812 18.25 17.5219 18.25 13.5156C18.25 12.3659 17.9812 11.278 17.5037 10.3108L18.127 9.6875H18.875ZM14.6562 13.5156C14.6562 15.5403 13.0091 17.1875 10.9844 17.1875C8.95969 17.1875 7.3125 15.5403 7.3125 13.5156C7.3125 11.4909 8.95969 9.84375 10.9844 9.84375C11.0994 9.84375 11.213 9.84977 11.3252 9.86016L12.7589 8.42648C12.2028 8.23203 11.606 8.125 10.9844 8.125C8.01195 8.125 5.59375 10.5432 5.59375 13.5156C5.59375 16.488 8.01195 18.9062 10.9844 18.9062C13.9568 18.9062 16.375 16.488 16.375 13.5156C16.375 12.894 16.268 12.2972 16.0735 11.7411L14.6399 13.1747C14.6502 13.287 14.6562 13.4006 14.6562 13.5156ZM18.875 8.125L22 5H19.5V2.5L16.375 5.625V7.02008L11.5762 11.8189C11.3908 11.7542 11.1918 11.7187 10.9844 11.7187C9.99195 11.7187 9.1875 12.5231 9.1875 13.5155C9.1875 14.508 9.99195 15.3124 10.9844 15.3124C11.9768 15.3124 12.7812 14.508 12.7812 13.5155C12.7812 13.3081 12.7457 13.1091 12.681 12.9237L17.4799 8.125H18.875Z" fill="#337E31" />
                  </svg>
                  <p>  Succeed</p>
                </div>
              </div>
            </div>
            <div className="md:p-10 p-5 bg-white rounded-r-lg">
              <h2 className="text-3xl font-bold  font-WorkSans-Regular">Log in</h2>
              <p className='text-light font-NunitoSans-Regular text-sm mb-4 mt-1'>Get Started</p>
              <div className=' text-sm text-inputFields'>
                <div className="mb-4">
                  <label >Role</label>
                  <span className="text-xs text-red-600">
                    {!role && showRequireError && " * Required"}
                  </span>
                  <select className="mt-1  w-full bg-gray-100 border border-light border-opacity-55 rounded py-2 px-3  focus:outline-epsilon   focus:border-gray-500"
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value=''>Select Role</option>
                    <option value='researcher'>Researcher</option>
                    <option value='supervisor'>Supervisor</option>
                    <option vale='ercHead'>ERC Head</option>
                    <option value='ercMember'>ERC Member</option>
                  </select>
                </div>
                <div className="mb-4 font-NunitoSans-Regular ">
                  <label htmlFor='email' >Work Email</label>
                  <span className="text-xs text-red-600">
                    {!email && showRequireError && " * Required"}
                  </span>
                  <input
                    name='email'
                    id='email'
                    type="email"
                    placeholder="jane.doe@example.com"
                    className="mt-1  w-full bg-gray-100 border border-light border-opacity-55 rounded py-2 px-3  focus:outline-epsilon  focus:border-gray-500"
                    onChange={(e) => { setEmail(e.target.value) }}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor='password' >Password</label>
                  <span className="text-xs text-red-600">
                    {!password && showRequireError && " * Required"} </span>
                  <input
                    name='password'
                    id='password'
                    type="password"
                    placeholder="8+ characters"
                    className="mt-1  w-full bg-gray-100 border border-light border-opacity-55 rounded py-2 px-3  focus:outline-epsilon  focus:border-gray-500"
                    onChange={(e) => { setPassword(e.target.value) }}
                  />
                </div>
                <div className="flex items-center justify-end mb-4">
                  <Link to="/forget-password" className="relative text-zeta w-fit block after:block after:content-[''] after:absolute after:h-[1px] after:bg-zeta after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">
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
                <Link to="/sign-up" className="relative text-primary w-fit block after:block after:content-[''] after:absolute after:h-[1px] after:bg-epsilon after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
