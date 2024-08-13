import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../layout/Sidebar.jsx';
import profileImage from '../../../assets/images/Profile.png';
import UserNavbar from '../../layout/Navs/UserNavbar.jsx';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { MdOutlineGroupOff } from 'react-icons/md';
import toast from 'react-hot-toast';
import Loader from '../../layout/Loader.jsx';
export default function ErcCommittee() {
  const [loading, setLoading] = useState(true);
  const [accepted, setAccepted] = useState([])
  const [supervisor, setSupervisor] = useState([])
  const [ercHead, setErcHead] = useState([])
  const [notSubmit, setNotSubmit] = useState([])
  const [selectedValue, setSelectedValue] = useState('');
  const getArrayToDisplay = () => {
    switch (selectedValue) {
      case 'accepted':
        return accepted;
      case 'supervisor':
        return supervisor;
      case 'ercHead':
        return ercHead;
      case 'notSubmit':
        return notSubmit;
      default:
        return notSubmit;
    }
  };
  var arrayToDisplay = getArrayToDisplay();
  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/fetch-all-proposals-ercmember`, {
          method: "GET",
          redirect: "follow",
          credentials: "include",
        });
        if (response.status === 404) {
          console.log('Researcher has no team');
          setLoading(false);
          return;
        }
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (result.success) {
          console.log(result)
          const formattedAcceptedProposals = (result?.data?.accepted || []).map(accepted => ({
            id: accepted?.proposal?._id || 'N/A',
            title: accepted?.proposal?.title || 'Untitled',
            ownerFullname: accepted?.proposal?.creator?.fullname || 'N/A',
            ownerEmail: accepted?.proposal?.creator?.workemail || 'No Email',
            ownerPfp: accepted?.proposal?.creator?.pfp || '',  
            supervisors: Array.isArray(accepted.team?.supervisors) ? accepted.team.supervisors : [],
            researchers: Array.isArray(accepted?.team?.researchers) ? accepted.team.researchers : [],
            ercMembers: Array.isArray(accepted?.proposal?.assignedErcMember) ? accepted.proposal.assignedErcMember : [],
          }));
          // console.log(formattedAcceptedProposals)
          setAccepted(formattedAcceptedProposals)
          const formattedUnAcceptedProposals = (result?.data?.["not submitted"] || []).map(unAccepted => ({
            id: unAccepted?.proposal?._id || 'N/A',
            title: unAccepted?.proposal?.title || 'Untitled',
            ownerFullname: unAccepted?.proposal?.creator?.fullname || 'N/A',
            ownerEmail: unAccepted?.proposal?.creator?.workemail || 'No Email',
            ownerPfp: unAccepted?.proposal?.creator?.pfp || '',
            supervisors: Array.isArray(unAccepted?.team?.supervisors) ? unAccepted.team.supervisors : [],
            researchers: Array.isArray(unAccepted?.team?.researchers) ? unAccepted.team.researchers : [],
            ercMembers: Array.isArray(unAccepted?.proposal?.assignedErcMember) ? unAccepted.proposal.assignedErcMember : [],
          }));
          setNotSubmit(formattedUnAcceptedProposals)
          const supervisor = (result?.data?.["submitted to supervisor"] || []).map(supervisor => ({
            id: supervisor?.proposal?._id || 'N/A',
            title: supervisor?.proposal?.title || 'Untitled',
            ownerFullname: supervisor?.proposal?.creator?.fullname || 'N/A',
            ownerEmail: supervisor?.proposal?.creator?.workemail || 'No Email',
            ownerPfp: supervisor?.proposal?.creator?.pfp || '',
            supervisors: Array.isArray(supervisor?.team?.supervisors) ? supervisor.team.supervisors : [],
            researchers: Array.isArray(supervisor?.team?.researchers) ? supervisor.team.researchers : [],
            ercMembers: Array.isArray(supervisor?.proposal?.assignedErcMember) ? supervisor.proposal.assignedErcMember : [],
          }));
          setSupervisor(supervisor)
          const ercHead = (result?.data?.["submitted to erc head"] || []).map(head => ({
            id: head?.proposal?._id || 'N/A',
            title: head?.proposal?.title || 'Untitled',
            ownerFullname: head?.proposal?.creator?.fullname || 'N/A',
            ownerEmail: head?.proposal?.creator?.workemail || 'No Email',
            ownerPfp: head?.proposal?.creator?.pfp || '',
            supervisors: Array.isArray(head?.team?.supervisors) ? head.team.supervisors : [],
            researchers: Array.isArray(head?.team?.researchers) ? head.team.researchers : [],
            ercMembers: Array.isArray(head?.proposal?.assignedErcMember) ? head.proposal.assignedErcMember : [],
          }));
          setErcHead(ercHead)
          console.log(result)
        } else {
          toast.error("Failed to load team details.");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while fetching team details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProposal();
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="flex xl:flex-row flex-col font-WorkSans-Regular">
        <Sidebar pageName='erc-panel' />
        <section className='w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
          <UserNavbar />
          <div className='xl:m-10 m-5 '>
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'>ERC Panel</h1>
            <h1 className='font-semibold my-1 text-lg'>ERC Committee Members</h1>
            <div className='flex justify-end my-5 w-full'>
              <select
                className='px-4 py-2 text-center border rounded outline-none border-epsilon'
                value={selectedValue}
                onChange={(e) => setSelectedValue(e.target.value)}
              >
                <option className='text-left' disabled>Select Status</option>
                <option className='text-left' value="ercHead">ERC Team</option>
                <option selected={true}   className='text-left' value="accepted">Approved</option>
              </select>
            </div>
            {arrayToDisplay.length > 0 ? (
                  arrayToDisplay.map((proposal, index) => (
                    <>
            <header key={index} className='bg-white shadow-sm my-5 p-10'>
              <div id='members' className="flex  flex-col">
                      {/* id */}
                      <p className=''>
                        <span className='font-bold'>
                          Proposal:
                        </span>
                        <span className='mx-1 text-epsilon w-[10px] truncate'>
                          BMY- {proposal.id ? proposal.id.slice(-4) : 'N/A'}
                        </span>
                      </p>
                      {/* title */}
                      <p className=''>
                        <span className='font-bold'>
                          Proposal Title:
                        </span>
                        <span className='mx-1 text-epsilon '>
                          {proposal.title ? proposal.title : 'N/A'}
                        </span>
                      </p>
                      <hr className='my-3' />
                      <h1 className='font-semibold text-lg my-1'>
                        Group Lead
                      </h1>
                      <section key={index} className='flex gap-2 items-center font-Satoshi-Black'>
                        <div className='flex justify-center items-center min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]'>
                          <img className='rounded-full min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]' src={proposal.ownerPfp || profileImage} alt='profile image' />
                        </div>
                        <div className='py-5'>
                          <p className='text-[1rem] font-bold  md:w-full  md:full truncate w-[150px]'>{proposal.ownerFullname}</p>
                          <p className='text-light  md:w-full text-sm md:full truncate w-[150px]'>{proposal.ownerEmail}</p>
                        </div>
                      </section>
                      <h1 className='font-semibold text-lg my-1'>
                        Supervisors
                      </h1>
                      {proposal.supervisors.length === 0 ? (
                        <p>No Data To Render</p>
                      ) : (
                        <div className='flex flex-row flex-wrap md:gap-x-10  gap-x-5  '>
                          {proposal.supervisors.map((supervisor, index) => (
                            <div key={index} className=''>
                              <section className='flex w-fit  gap-2 items-center font-Satoshi-Black'>
                                <div className='flex justify-center items-center min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]'>
                                  <img className='rounded-full min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]' src={supervisor.pfp || profileImage} alt='profile image' />
                                </div>
                                <div className='py-5'>
                                  <p className='text-[1rem] font-bold  md:w-full  md:full truncate w-[150px]'>{supervisor.fullname}</p>
                                  <p className='text-light  md:w-full text-sm md:full truncate w-[150px]'>{supervisor.workemail}</p>
                                </div>
                              </section>
                            </div>
                          ))}
                        </div>
                      )}
                      <h1 className='font-semibold text-lg my-1'>
                        Researchers
                      </h1>
                      {proposal.researchers.length === 0 ? (
                        <p>No Data To Render</p>
                      ) : (
                        <div className='flex flex-row flex-wrap md:gap-x-10  gap-x-5  '>
                          {proposal.researchers.map((researcher, index) => (
                            <div key={index} className=' '>
                              <section className='flex w-fit  gap-2 items-center font-Satoshi-Black'>
                                <div className='flex justify-center items-center min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]'>
                                  <img className='rounded-full min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]' src={researcher.pfp || profileImage} alt='profile image' />
                                </div>
                                <div className='py-5'>
                                  <p className='text-[1rem] font-bold  md:w-full  md:full truncate w-[150px]'>{researcher.fullname}</p>
                                  <p className='text-light  md:w-full text-sm md:full truncate w-[150px]'>{researcher.workemail}</p>
                                </div>
                              </section>
                            </div>
                          ))}
                        </div>
                      )}
                      <h1 className='font-semibold text-lg my-1'>
                        ERC Members
                      </h1>
                      {proposal.ercMembers.length === 0 ? (
                        <p>No Data To Render</p>
                      ) : (
                        <div className='flex flex-row flex-wrap md:gap-x-10  gap-x-5 '>
                          {proposal.ercMembers.map((ercMembers, index) => (
                            <div key={index} className=' '>
                              <div>
                                <section className='flex w-fit  gap-2 items-center font-Satoshi-Black'>
                                  <div className='flex justify-center items-center min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]'>
                                    <img className='rounded-full min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]' src={ercMembers.pfp || profileImage} alt='profile image' />
                                  </div>
                                  <div className='py-5'>
                                    <p className='text-[1rem] font-bold  md:w-full  md:full truncate w-[150px]'>{ercMembers.fullname}</p>
                                    <p className='text-light  md:w-full text-sm md:full truncate w-[150px]'>{ercMembers.workemail}</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className='flex md:gap-10 gap-5 flex-wrap'>
                      </div>
              </div>
            </header>
             </>
                  ))
                ) : (
                  <p className='text-center text-gray-500'>ERC Panel not found</p>
                )}
          </div>
        </section>
      </div>
    </>
  );
}
