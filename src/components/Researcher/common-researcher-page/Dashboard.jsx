import React, { useState, useEffect } from 'react';
import Loader from '../../layout/Loader.jsx';
import Sidebar from '../../layout/Sidebar.jsx';
import { ImFilesEmpty } from "react-icons/im";
import { MdOutlineGroupOff } from "react-icons/md";
import { Link } from 'react-router-dom';
import DefaultImage from '../../../assets/images/Profile.png';
import UserNavbar from '../../layout/Navs/UserNavbar.jsx';
import toast from 'react-hot-toast';
export default function SupervisorDashboard() {
  const [loading, setLoading] = useState(true);
  const [noTeam, setNoTeam] = useState(false);
  const [supervisors, setSupervisors] = useState([]);
  const [team, setTeam] = useState([]);
  const [showNoActive, setShowNoActiveProposal] = useState(false)
  const [showNotAssigned, setShowNotAssign] = useState(false)
  const [previousProposals, setFormattedPreviousProposal] = useState([])
  useEffect(() => {
    const fetchResearcherTeam = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/team/getResearcherTeam`, {
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
          console.log(result);
          setNoTeam(false);
          setTeam(Array.isArray(result.team?.researchers) ? result.team.researchers : []);
          setSupervisors(Array.isArray(result.team?.supervisors) ? result.team.supervisors : []);
        } else {
          toast.error("Failed to load team details.");
          setNoTeam(false);
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while fetching team details.");
      } finally {
        setLoading(false);
      }
    };
    const fetchProposal = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/by-researchers`, {
          method: 'GET',
          redirect: 'follow',
          credentials: 'include',
        });
        if (!response.ok) {
          setShowNoActiveProposal(true)
          setShowNotAssign(true)
          throw new Error('No Proposal');
        }
        var result = await response.json();
        if (result.success) {
          // console.log(result)
          if ((result.notAcceptedProposals.length === 0 || !result.notAcceptedProposals[0].title)) {
            setShowNoActiveProposal(true)
          }
          if (result.notAcceptedProposals && result.notAcceptedProposals.length > 0) {
            const section = result.notAcceptedProposals[0]?.sections;
            console.log(section)
            if (!section || Object.keys(section).length === 0) {
              setShowNotAssign(true);
            }
          }
          else {
            setShowNoActiveProposal(true)
          }
          // console.log(fromattedProposal)
        } else {
          console.log('Failed to load proposal details.');
        }
      } catch (error) {
        if (result.notAcceptedProposals && result.notAcceptedProposals.length > 0) {
          const section = result.notAcceptedProposals[0]?.sections;
          if (!section || Object.keys(section).length === 0) {
            setShowNotAssign(true);
          }
        }
        else {
          setShowNoActiveProposal(true)
          setShowNotAssign(false);
        }
        console.log(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchProposal();
    fetchResearcherTeam();
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="flex xl:flex-row flex-col font-WorkSans-Regular">
        <Sidebar pageName='dashboard' />
        <section className='w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
          <UserNavbar />
          <div className='xl:m-10 m-5'>
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'>Dashboard</h1>
            <section>
              <div className="flex md:flex flex-col md:flex-row gap-5">
                {!showNoActive && (<>
                  <header className='bg-white shadow-sm my-5 px-5 py-5 md:py-10 md:w-[35%]'>
                    <h1 className='text-lg md:text-2xl font-bold font-Satoshi-Black'>Section Assigned</h1>
                    {showNotAssigned && (<>
                      <p className='my-3 text-epsilon'>Not Assigned yet by group lead</p>
                    </>)}
                    {!showNotAssigned && (<>
                      <br />
                      <Link
                        to='/proposal-section'
                        className=" py-3 px-3   rounded-md group relative overflow-hidden  bg-epsilon  text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon ">
                        <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                        View My Section
                      </Link>
                    </>)}
                  </header>
                </>)}
                <header className='bg-white shadow-sm md:my-5 mb-5 px-5 py-5 md:py-10 md:w-[35%]'>
                  <h1 className='text-lg md:text-2xl font-bold font-Satoshi-Black'>Supervisor</h1>
                  <div>
                    {supervisors.length === 0 ? (
                      <p className='text-xl mt-3'>No supervisors</p>
                    ) : (
                      supervisors.map((supervisor, index) => (
                        <div key={index} className='mt-3'>
                          <p className='text-xl'>{supervisor?.fullname || 'N/A'}</p>
                          <p className='text-sm'>{supervisor?.experience?.company || 'N/A'}</p>
                        </div>
                      ))
                    )}
                  </div>
                </header>
              </div>
            </section>
            {showNoActive && (<>
              <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'>Proposal</h1>
              <header className='bg-white shadow-sm my-5 p-5 md:p-10'>
                <h1 className='font-semibold flex items-center gap-2'>
                  <ImFilesEmpty className='text-2xl' />
                  No Active Proposal
                </h1>
              </header>
              <div className='flex justify-end text-nuetral-600'>
                <Link
                  to='/researcher-proposal'
                  className="relative w-fit after:block after:content-[''] after:absolute after:h-[1px] after:bg-neutral-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">
                  Manage Proposal
                </Link>
              </div>
            </>)}
            {team.length > 0 ? (
              <>
                <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'>Team</h1>
                <p className='font-semibold my-2'>My Team</p>
                <header className='bg-white shadow-sm my-5 p-5 md:p-10'>
                  <div id='members' className="flex md:flex-row gap-5 md:gap-10 flex-wrap flex-col">
                    {team.map((member, index) => (
                      <section key={index} className='flex gap-2 items-center font-Satoshi-Black'>
                        <div className='flex justify-center items-center min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]'>
                          <img className='rounded-full  min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]' src={member.pfp || DefaultImage} alt='profile image' />
                        </div>
                        <div className='py-5'>
                          <p className='text-[1rem] font-bold md:w-full truncate w-[150px]'>{member.fullname || 'N/A'}</p>
                          <p className='text-light md:w-full text-sm truncate w-[150px]'>{member.workemail || 'N/A'}</p>
                        </div>
                      </section>
                    ))}
                  </div>
                </header>
                <div className='flex justify-end text-nuetral-600'>
                  <Link
                    to='/researcher-team'
                    className="relative w-fit after:block after:content-[''] after:absolute after:h-[1px] after:bg-neutral-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">
                    View All
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'>Team</h1>
                <header className='bg-white shadow-sm my-5 p-5 md:p-10'>
                  <h1 className='font-semibold flex items-center gap-2'>
                    <MdOutlineGroupOff className='text-2xl' />
                    Team Not Found
                  </h1>
                </header>
                <div className='flex justify-end text-nuetral-600'>
                  <Link
                    to='/researcher-team'
                    className="relative w-fit after:block after:content-[''] after:absolute after:h-[1px] after:bg-neutral-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">
                    Manage Team
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
