import React, { useState, useEffect } from 'react';
import Sidebar from '../../layout/Sidebar.jsx';
import profileImage from '../../../assets/images/Profile.png';
import { ImFilesEmpty } from "react-icons/im";
import { MdOutlineGroupOff } from "react-icons/md";
import { Link } from 'react-router-dom';
import UserNavbar from '../../layout/Navs/UserNavbar.jsx';
import toast from 'react-hot-toast';
import Loader from '../../layout/Loader.jsx';

export default function ResercherLeadDashboard() {
  const [loading, setLoading] = useState(false);
  const [researchers, setResearchers] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  // const [activeProposal, setActiveProposal] = useState({});
  const [proposalDetail, setProposalDetail] = useState({});
  useEffect(() => {
    const fetchLeadTeam = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/team/getOwnerTeam`, {
          method: "GET",
          redirect: "follow",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (result.success) {
          setResearchers(result.team.researchers || []);
          setSupervisors(result.team.supervisors || []);
        } else {
          toast.error("Failed to load user details.");
        }
      } catch (error) {
        toast.error("An error occurred while fetching user details.");
      } finally {
        setLoading(false);
      }
    };


    const fetchProposals = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/by-group-lead`, {
          method: 'GET',
          redirect: 'follow',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (result.success) {


          const formattedProposal = {
            id: result.notAcceptedProposals && result.notAcceptedProposals.length > 0
              ? (result.notAcceptedProposals[0]._id ? result.notAcceptedProposals[0]._id : ' ')
              : ' ',
            title: result.notAcceptedProposals && result.notAcceptedProposals.length > 0
              ? (result.notAcceptedProposals[0].title ? result.notAcceptedProposals[0].title : ' ')
              : ' ',
            status: result.notAcceptedProposals && result.notAcceptedProposals.length > 0
              ? (result.notAcceptedProposals[0].status ? result.notAcceptedProposals[0].status : ' ')
              : ' ',
            lead: result.notAcceptedProposals && result.notAcceptedProposals.length > 0
              ? (result.notAcceptedProposals[0].creator && result.notAcceptedProposals[0].creator.fullname
                ? result.notAcceptedProposals[0].creator.fullname
                : ' ')
              : ' ',
            sections: result.notAcceptedProposals && result.notAcceptedProposals.length > 0
              ? (result.notAcceptedProposals[0].sections && result.notAcceptedProposals[0].sections
                ? result.notAcceptedProposals[0].sections
                : ' ')
              : ' ',
            reviews: result.notAcceptedProposals && result.notAcceptedProposals.length > 0
              ? (Array.isArray(result.notAcceptedProposals[0].reviews)
                ? (result.notAcceptedProposals[0].reviews.length > 0
                  ? result.notAcceptedProposals[0].reviews
                  : [])
                : [])
              : [],
          };
          setProposalDetail(formattedProposal);


        }


        else {
          toast.error('No proposals found.');
        }
      } catch (error) {
        toast.error(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchProposals();

    fetchLeadTeam();
  }, []);



  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex xl:flex-row flex-col font-WorkSans-Regular">
        <Sidebar pageName='group-lead-dashboard' />
        <section className='w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
          <UserNavbar />
          <div className='xl:m-10 m-5'>
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'>Dashboard</h1>
            <section>
              <div className="flex md:flex flex-col md:flex-row gap-5">
               
              {proposalDetail?.id?.trim() && (
                  <>
                <header className='bg-white shadow-sm my-5 px-5 py-5 md:py-10 md:w-[35%]'>

              
  <h1 className='text-lg md:text-2xl font-bold font-Satoshi-Black'>Active Proposal</h1>


                  <div className='mt-4'>
                    <span className='font-bold '> Proposal Id</span>
                    <span className='mx-2 my-2 text-epsilon '>
                    BMY-{proposalDetail.id ? proposalDetail.id.slice(-4) : 'N/A'}
                    </span>
                  </div>
                  <div className='mb-3'>
                  {proposalDetail.status || 'N/A'}
                  
                  </div>
                  <Link to='/group-lead-proposal' className='text-epsilon '>View Details.</Link>
                </header>

</>)

}
                <header className='bg-white shadow-sm md:my-5 mb-5 px-5 py-5 md:py-10 md:w-[35%]'>
                  <h1 className='text-lg md:text-2xl font-bold font-Satoshi-Black'>Supervisor</h1>
                  {supervisors.length > 0 ? (
                    supervisors.map((supervisor, index) => (
                      <>

                        <div key={index}>
                          <p className=' mt-3'>{supervisor.fullname}</p>
                          <p className='text-sm'>{supervisor.workemail}</p>
                        </div>



                      </>
                    ))
                  ) : (
                    <p>No supervisors available.</p>
                  )}
                </header>
              </div>
            </section>


            {!proposalDetail?.id?.trim() && (
                  <>
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'>Proposal</h1>
            <header className='bg-white shadow-sm my-5 p-5 md:p-10'>
              <h1 className='font-semibold flex items-center gap-2'>
                <ImFilesEmpty className='text-2xl' />
                No Active Proposal
              </h1>
            </header>

            </>)}
            <div className='flex justify-end text-nuetral-600'>
              <Link
                to='/group-lead-proposal'
                className="relative w-fit after:block after:content-[''] after:absolute after:h-[1px] after:bg-neutral-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">
                Manage Proposal
              </Link>
            </div>
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'>Team</h1>

            {researchers.length > 0 ? (
              <header className='bg-white shadow-sm my-5 p-5 md:p-10'>
                <div>
                  <h1 className='font-semibold text-lg'>Researchers</h1>
                  <div id='members' className="flex md:flex-row gap-5 md:gap-10 flex-wrap flex-col">
                    {researchers.map((researcher, index) => (
                      <section key={index} className='flex gap-2 items-center font-Satoshi-Black'>
                        <div className='flex justify-center items-center min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]'>
                          <img className='rounded-full  min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]' src={profileImage} alt='profile image' />
                        </div>
                        <div className='py-5'>
                          <p className='text-[1rem] font-bold'>{researcher.fullname}</p>
                          <p className='text-light text-sm'>{researcher.workemail}</p>
                        </div>
                      </section>
                    ))}
                  </div>
                </div>
              </header>
            ) : (
              <header className='bg-white shadow-sm my-5 p-5 md:p-10'>
                <h1 className='font-semibold flex items-center gap-2'>
                  <MdOutlineGroupOff className='text-2xl' />
                  Team Not Found
                </h1>
              </header>
            )}

            <div className='flex justify-end text-nuetral-600'>
              <Link
                to='/group-lead-team'
                className="relative w-fit after:block after:content-[''] after:absolute after:h-[1px] after:bg-neutral-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">
                Manage Team
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
