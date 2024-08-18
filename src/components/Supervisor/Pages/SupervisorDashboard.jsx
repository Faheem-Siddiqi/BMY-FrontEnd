import React, { useState, useEffect } from 'react';
import profileImage from '../../../assets/images/Profile.png';
import Sidebar from '../../layout/Sidebar';
import { ImFilesEmpty } from "react-icons/im";
import { IoTimerOutline } from "react-icons/io5";
import { MdOutlineGroupOff } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaCheck } from "react-icons/fa6";
import UserNavbar from '../../layout/Navs/UserNavbar.jsx';
import Loader from '../../layout/Loader.jsx';
export default function SupervisorDashboard() {
  const [loading, setLoading] = useState(true);
  const [researchers, setResearchers] = useState([]);
  const [proposalInfo, setProposalInfo] = useState([]);
  const [ercHead, setErcHead] = useState({});
  const [ercMembers, setErcMembers] = useState([]);
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
          setResearchers([]);
        } else if (!response.ok) {
          throw new Error('Network response was not ok');
        } else {
          const result = await response.json();
          if (result.success) {
            setResearchers(result.teams[0]?.researchers || []);
          } else {
            console.error("Failed to load team details.");
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    const fetchProposals = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/get-all-proposals-supervisor`, {
          method: 'GET',
          redirect: "follow",
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error('Failed to fetch proposals');
        }
        const result = await response.json();
        if (Array.isArray(result.proposals) && result.proposals.length > 0) {
          const proposalInfo = result.proposals.map(proposal => ({
            proposalid: proposal._id,
            mainSupervisorId: proposal.supervisorId ? proposal.supervisorId._id : '',
            createdAt: proposal.createdAt
            ? (() => {
              const date = new Date(proposal.createdAt);
              const number = proposal.proposalId || 'N/A';
              const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
              const year = date.getFullYear();
              return `${number}-${month}-${year}`;
            })()
            : 'N/A',
          }));
          setProposalInfo(proposalInfo);
          console.log(proposalInfo)
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    const fetchErcPanel = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/teams/get-erc-panel`, {
          method: 'GET',
          redirect: "follow",
        });
        if (!response.ok) {
          console.log('No panel found');
          throw new Error('Failed to fetch ERC panel');
        }
        const result = await response.json();
        setErcHead(result.head || {});
        setErcMembers(result.researchers || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProposals();
    fetchErcPanel();
    fetchResearcherTeam();
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="flex xl:flex-row flex-col font-WorkSans-Regular">
        <Sidebar pageName='supervisor-dashboard' />
        <section className='w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
          <UserNavbar />
          <div className='xl:m-10 m-5'>
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'>My Researchers</h1>
            <p className='my-2'>Team 1</p>
            <div>
              {researchers.length > 0 ? (
                <>
                  <header className='bg-white shadow-sm my-5 p-5 md:p-10'>
                    <div id='members' className="flex md:flex-row gap-5 md:gap-10 flex-wrap flex-col">
                      {researchers.map((researcher, index) => (
                        <section key={index} className='flex gap-2 items-center font-Satoshi-Black'>
                          <div className='flex justify-center items-center min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]'>
                            <img className='rounded-full  min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]' src={researcher.pfp || profileImage} alt='profile' />
                          </div>
                          <div className='py-5'>
                            <p className='text-[1rem] font-bold'>{researcher.fullname}</p>
                            <p className='text-light text-sm'>{researcher.workemail}</p>
                          </div>
                        </section>
                      ))}
                    </div>
                  </header>
                  <div className='flex justify-end text-neutral-600'>
                    <Link
                      to='/supervisor-teams'
                      className="relative w-fit after:block after:content-[''] after:absolute after:h-[1px] after:bg-neutral-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">
                      Manage Teams
                    </Link>
                  </div>
                </>
              ) : (
                <div>
                  <header className='bg-white shadow-sm my-5 p-5 md:p-10'>
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
            {researchers.length > 0 && (
              <>
                <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'>Proposals</h1>
                <header className='bg-white shadow-sm my-5 p-5 md:p-10'>
                  {proposalInfo.map(proposal => (
                    <h1 key={proposal.proposalid} className='mb-4 flex items-center gap-2'>
                      <ImFilesEmpty className='text-2xl' />
                      <p>
                        Proposal:
                        <span className='mx-1 text-epsilon w-[10px] truncate'>
                        BMY-{proposal.createdAt}
                        </span>
                      </p>
                    </h1>
                  ))}
                </header>
                <div className='flex justify-end text-neutral-600'>
                  <Link
                    to='/supervisor-proposal'
                    className="relative w-fit after:block after:content-[''] after:absolute after:h-[1px] after:bg-neutral-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">
                    Manage Proposal
                  </Link>
                </div>
              </>
            )}
            {ercHead && ercMembers.length > 0 && (
              <>
                <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'>ERC Panel</h1>
                <header className='bg-white shadow-sm my-5 p-10'>
                  <div className="flex flex-col-reverse gap-5">
                    <div>
                      <h1 className='font-semibold mb-5 text-lg'>ERC Committee Members</h1>
                      <div id='members' className="flex flex-wrap md:gap-10 gap-5">
                        {ercMembers.map((member, index) => (
                          <section key={index} className='flex gap-2 items-center font-Satoshi-Black'>
                            <div className='flex justify-center items-center min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]'>
                              <img className='rounded-full  min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]' src={member.pfp || profileImage} alt='profile' />
                            </div>
                            <div className='py-5'>
                              <p className='text-[1rem] font-bold'>{member.fullname || 'No Name Available'}</p>
                              <p className='text-light text-sm'>{member.email || 'No Email Available'}</p>
                            </div>
                          </section>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h1 className='font-semibold mt-5 text-lg'>ERC Head</h1>
                      <section className='flex gap-2 mt-5 items-center px-2 font-Satoshi-Black'>
                        <div className='flex justify-center items-center min-w-[85px] min-h-[85px] max-w-[85px] max-h-[85px]'>
                          <img className='rounded-full  min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]' src={ercHead.pfp || profileImage} alt='profile' />
                        </div>
                        <div className='py-5'>
                          <p className='text-[1rem] font-bold'>
                            {ercHead.fullname || 'No Name Available'}
                          </p>
                          <p className='text-light text-sm font-semibold'>
                            {ercHead.workemail || 'No Email Available'}
                          </p>
                        </div>
                      </section>
                    </div>
                  </div>
                </header>
                <div className='flex justify-end text-neutral-600'>
                  <Link
                    to='/view-erc-team'
                    className="relative w-fit after:block after:content-[''] after:absolute after:h-[1px] after:bg-neutral-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">
                    View Panel
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
