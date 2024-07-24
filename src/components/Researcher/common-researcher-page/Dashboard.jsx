import React from 'react'
import Sidebar from '../../layout/Sidebar.jsx'
import profileImage from '../../../assets/images/bena.jpg'
import { IoTimerOutline } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaCheck } from "react-icons/fa6";
import UserNavbar from '../../layout/Navs/UserNavbar.jsx';
export default function SupervisorDashboard() {
  const members = [
    {
      name: "Faheem Siddiqi",
      email: "email",
      profileImage: profileImage
    },
    {
      name: "John Doe",
      email: "email",
      profileImage: profileImage
    },
    {
      name: "John Doe",
      email: "email 2",
      profileImage: profileImage
    }, {
      name: "John Doe",
      email: "Country 2",
      profileImage: profileImage
    }, {
      name: "John Doe",
      email: "Country 2",
      profileImage: profileImage
    }, {
      name: "John Doe",
      email: "Country 2",
      profileImage: profileImage
    }, {
      name: "John Doe",
      email: "Country 2",
      profileImage: profileImage
    },
  ];
  const ERCMembers = [
    {
      name: "Faheem Siddiqi",
      institution: "institution",
      profileImage: profileImage
    },
    {
      name: "John Doe",
      institution: "institution 2",
      profileImage: profileImage
    },
    {
      name: "John Doe",
      institution: "institution 2",
      profileImage: profileImage
    }, {
      name: "John Doe",
      institution: "institution 2",
      profileImage: profileImage
    }, {
      name: "John Doe",
      institution: "institution 2",
      profileImage: profileImage
    }, {
      name: "John Doe",
      institution: "institution 2",
      profileImage: profileImage
    }, {
      name: "John Doe",
      institution: "institution 2",
      profileImage: profileImage
    },
  ];
  return (
    <>
    
      <div className="flex  xl:flex-row flex-col  font-WorkSans-Regular "
     >
        <Sidebar pageName='supervisor-dashboard ' />
        <section className=' w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
       <UserNavbar/>
          <div className='xl:m-10 m-5  '>
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '>John Doe’s Dashboard</h1>
            <p className='text-xl md:text-3xl mt-5 font-semibold font-Satoshi-Black '>Status.</p>
            <div className="flex md:flex flex-col md:flex-row gap-5">
              <header className='bg-white shadow-sm my-5 px-5 py-5 md:py-10 md:w-[35%] '>
                <h1 className='text-lg md:text-2xl font-bold font-Satoshi-Black  '>Team 4 Proposal </h1>
                <div className='flex gap-1 items-center' >
                  <p className=' my-2'>Proposal Submitted</p>
                  <FaCheck className='bg-epsilon p-1 rounded-full text-xl   text-white ' />
                  <IoTimerOutline className='bg-epsilon p-1 text-2xl rounded-full text-white ' />
                </div>
                <p className=' my-2'>The Proposal has been submitted, keep an eye on Notifications for Approval Status.</p>
              </header>
              <header className='bg-white shadow-sm md:my-5 mb-5 px-5  py-5  md:py-10 md:w-[35%] '>
                <h1 className='text-lg md:text-2xl font-bold font-Satoshi-Black  '>Supervision</h1>
                <p className=' my-3'>Current</p>
                <p className=' my-2'>You are currently supervising x projects.</p>
              </header>
            </div>
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '>My Researchers</h1>
            <p className='font-semibold my-2'>Not Researcher Found.</p>
            <header className='bg-white shadow-sm my-5 p-5 md:p-10 '>
              <div id='members' className="flex md:flex-row gap-5  md:gap-10  flex-wrap flex-col">
                {members.map((member, index) => (
                  <section key={index} className='flex gap-2 items-center font-Satoshi-Black'>
                    <div className='flex justify-center items-center min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]'>
                      <img className='rounded-full' src={member.profileImage} alt='profile image' />
                    </div>
                    <div className='py-5'>
                      <p className='text-[1rem] font-bold'>{member.name}</p>
                      <p className='text-light text-sm '>{member.email}</p>
                    </div>
                  </section>
                ))}
                <div>
                </div>
              </div>
            </header>
            or
            <header className='bg-white shadow-sm my-8 p-5 md:p-16 '>
              <Link to='/supervisor-teams'>
                <div className='h-[40vh] md:w-[60%] w-full mx-auto bg-lightEpsilon border-2 border-dashed flex flex-col items-center justify-center border-epsilon  p-10 rounded-md'>
                  <MdAdd className='text-epsilon text-5xl border-2 border-dashed rounded-full border-epsilon my-4 ' />
                  <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '>Researchers</h1>
                  <p className='font-semibold my-2'>Not Researcher Found.</p>
                </div>
              </Link>
            </header>
            <div className='flex justify-end text-nuetral-600'>
              <Link
                to='/supervisor-teams'
                className="relative w-fit  after:block after:content-[''] after:absolute after:h-[1px] after:bg-neutral-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">
                Manage Teams</Link>
            </div>
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '> Proposals</h1>
            <p className='font-semibold my-2'>Not Researcher Found.</p>
            <header className='bg-white shadow-sm my-5 p-5 md:p-10 '>
              <h1 className='font-semibold  text-lg'>Active Proposals</h1>
            </header>

            <div className='flex justify-end text-nuetral-600'>
              <Link
                to='/supervisor-proposal'
                className="relative w-fit  after:block after:content-[''] after:absolute after:h-[1px] after:bg-neutral-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">
                Manage Proposal</Link>
            </div>
            {/* 
             */}
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'>ERC Panel </h1>
            <header className='bg-white shadow-sm my-5 p-10'>
              <div className="grid md:grid-cols-2 grid-col-1 md:gap-10">
                <div>
                  <h1 className='font-semibold  text-lg'>ERC Committee Members</h1>
                  <div id='members' className="grid md:grid-cols-2 grid-col-1">
                    {ERCMembers.map((member, index) => (
                      <section key={index} className='flex gap-2 items-center font-Satoshi-Black'>
                        <div className='flex justify-center items-center min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]'>
                          <img className='rounded-full' src={member.profileImage} alt='profile image' />
                        </div>
                        <div className='py-5'>
                          <p className='text-[1rem] font-bold'>{member.name}</p>
                          <p className='text-light text-sm'>{member.institution}</p>
                        </div>
                      </section>
                    ))}
                  </div>
                </div>
                <div>
                  <h1 className='font-semibold  text-lg'>ERC Head</h1>
                  <section className='flex gap-2 my-5 items-center px-2 font-Satoshi-Black'>
                    <div className='flex justify-center items-center min-w-[85px] min-h-[85px] max-w-[85px] max-h-[85px]'>
                      <img className='rounded-full ' src={profileImage} alt='profile image' />
                    </div>
                    <div className='py-5'>
                      <p className='text-[1rem] font-bold'>ERC Head </p>
                      <p className='text-light text-sm font-semibold'>email</p>
                    </div>
                  </section>
                </div>
              </div>
            </header>
            <div className='flex justify-end text-nuetral-600'>
              <Link
                to='/view-erc-team'
                className="relative w-fit  after:block after:content-[''] after:absolute after:h-[1px] after:bg-neutral-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">
                View Panel</Link>
            </div>
            {/*  */}
          </div>
        </section>
      </div>
    </>
  )
}
