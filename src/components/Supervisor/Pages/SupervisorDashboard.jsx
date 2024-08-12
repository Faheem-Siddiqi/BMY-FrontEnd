import React, { useState, useEffect } from 'react';
import profileImage from '../../../assets/images/Profile.png'
import Sidebar from '../../layout/Sidebar'

import { ImFilesEmpty } from "react-icons/im";
import { IoTimerOutline } from "react-icons/io5";
import {  MdOutlineGroupOff } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaCheck } from "react-icons/fa6";
import UserNavbar from '../../layout/Navs/UserNavbar.jsx';
import Loader from '../../layout/Loader.jsx';
export default function SupervisorDashboard() {
  const [loading, setLoading] = useState(true);
  const [researchers, setResearchers] = useState([])
  const [NoTeamError, setNoTeam] = useState(false)
 
  useEffect(() => {
    const fetchResearcherTeam = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/team/getSupervisorTeams`, {
          method: "GET",
          redirect: "follow",
          credentials: "include",
        });
        if (response.status === 404) {
          console.log('Researcher has no team');
          setNoTeam(true);
          setLoading(false);
          return;
        }
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (result.success) {
        
          if (Array.isArray(result.teams) && result.teams?.length > 0) {
            setResearchers(result.teams[0]?.researchers || []);
          }
          else {
            setResearchers([]);
          }
          setNoTeam(false);
         
        }
        else {
          toast.error("Failed to load team details.");
          setNoTeam(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    // fetchProposal();
    fetchResearcherTeam();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="flex  xl:flex-row flex-col  font-WorkSans-Regular  "
      >
        <Sidebar pageName='supervisor-dashboard ' />
        <section className=' w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
          <UserNavbar />
          <div className='xl:m-10 m-5  '>
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '>Dashboard</h1>
            <div className="flex md:flex flex-col md:flex-row gap-5">
              <header className='bg-white shadow-sm my-5 px-5 py-5 md:py-10 md:w-[35%] '>
                <h1 className='text-lg md:text-2xl font-bold font-Satoshi-Black  '>Updates </h1>
                <div className='flex gap-1 items-center' >
                  <p className=' my-2'>BMY-124 Submitted</p>
                  <FaCheck className='bg-epsilon p-1 rounded-full text-xl   text-white ' />
                  <IoTimerOutline className='bg-epsilon p-1 text-2xl rounded-full text-white ' />
                </div>
                <p className=' my-2'>The Proposal has been submitted, keep an eye on Notifications for Approval Status.</p>
              </header>
              <header className='bg-white shadow-sm md:my-5 mb-5 px-5  py-5  md:py-10 md:w-[35%] '>
                <h1 className='text-lg md:text-2xl font-bold font-Satoshi-Black  '>Supervision</h1>
                <p className=' my-3'>Current Supervision</p>
                <p className=' my-2'>You are currently supervising x projects.</p>
              </header>
            </div>
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '>My Researchers</h1>
            <p className='my-2'>Team 1</p>


            <div>
 
      {researchers && researchers.length > 0 ? (
        <header className='bg-white shadow-sm my-5 p-5 md:p-10 '>
          <div id='members' className="flex md:flex-row gap-5 md:gap-10 flex-wrap flex-col">
            {researchers.map((researcher, index) => (
              <section key={index} className='flex gap-2 items-center font-Satoshi-Black'>
                <div className='flex justify-center items-center min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]'>
                  <img className='rounded-full' src={researcher.pfp || profileImage} alt='profile image' />
                </div>
                <div className='py-5'>
                  <p className='text-[1rem] font-bold'>{researcher.fullname}</p>
                  <p className='text-light text-sm '>{researcher.workemail}</p>
                </div>
              </section>
            ))}
          </div>
          <div className='flex justify-end text-neutral-600'>
            <Link
              to='/supervisor-teams'
              className="relative w-fit after:block after:content-[''] after:absolute after:h-[1px] after:bg-neutral-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">
              Manage Teams
            </Link>
          </div>
        </header>
      ) : (
        <div>
          <header className='bg-white shadow-sm my-5 p-5 md:p-10 '>
            <h1 className='font-semibold flex items-center gap-2'>
              <MdOutlineGroupOff className='text-2xl' />
              No Team Found
            </h1>
          </header>
          <div className='flex justify-end text-neutral-600'>
            <Link
              to='/supervisor-teams'
              className="relative w-fit after:block after:content-[''] after:absolute after:h-[1px] after:bg-neutral-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">
              Manage Teams
            </Link>
          </div>
        </div>
      )}
    </div>
         
            {/* Proposal found */}
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '> Proposal</h1>
            <header className='bg-white shadow-sm my-5 p-5 md:p-10 '>
              <h1 className='font-semibold mb-4 flex items-center gap-2' >
                <ImFilesEmpty className='text-2xl' />
                <Link to='/mentor-proposal'>
                  Propsal ID BMY-24</Link>
              </h1>
              <h1 className='font-semibold mb-4  flex items-center gap-2' >
                <ImFilesEmpty className='text-2xl' />
                <Link>
                  Propsal ID BMY-24</Link></h1>
              <h1 className='font-semibold mb-4  flex items-center gap-2' >
                <ImFilesEmpty className='text-2xl' />
                <Link>
                  Propsal ID BMY-24</Link></h1>
              <h1 className='font-semibold mb-4  flex items-center gap-2' >
                <ImFilesEmpty className='text-2xl' />
                <Link>
                  Propsal ID BMY-24</Link></h1>
            </header>
            <div className='flex justify-end text-nuetral-600'>
              <Link
                to='/supervisor-proposal'
                className="relative w-fit  after:block after:content-[''] after:absolute after:h-[1px] after:bg-neutral-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">
                Manage Proposasl</Link>
            </div>
          
            {/* Proposal Not Found Render */}
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '> Proposal</h1>
            <header className='bg-white shadow-sm my-5 p-5 md:p-10 '>
              <h1 className='font-semibold  flex items-center gap-2' >
                <ImFilesEmpty className='text-2xl' />
                No Active Proposal</h1>
            </header>
            <div className='flex justify-end text-nuetral-600'>
              <Link
                to='/supervisor-proposal'
                className="relative w-fit  after:block after:content-[''] after:absolute after:h-[1px] after:bg-neutral-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">
                Manage Proposal</Link>
            </div>
            {/* */}
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'>ERC Panel </h1>
            <header className='bg-white shadow-sm my-5 p-10'>
              <div className="grid md:grid-cols-2 grid-col-1  md:gap-10">
                <div>
                  <h1 className='font-semibold my-5 text-lg'>ERC Committee Members</h1>
                  <div id='members' className="grid md:grid-cols-2 grid-col-1">
                    {researchers.map((member, index) => (
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
                  <h1 className='font-semibold my-5 text-lg'>ERC Head</h1>
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
