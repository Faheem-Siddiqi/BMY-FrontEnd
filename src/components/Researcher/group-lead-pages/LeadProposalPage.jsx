import React, { useState, useEffect } from 'react'
import Sidebar from '../../layout/Sidebar.jsx'
import { MdFileDownloadDone } from "react-icons/md";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import DiscussionModal from '../proposals/proposal-reviews/DiscussionModal.jsx';
import UserNavbar from '../../layout/Navs/UserNavbar.jsx';
import ProposalForLead from '../proposals/ProposalForLead.jsx';
import Loader from '../../layout/Loader.jsx';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
export default function LeadProposalPage() {
  const [LeadDataToggle, setLeadDataToggle] = useState(false)
  const [loading, setLoading] = useState(false);
  const [proposalDetail, setProposalDetail] = useState({});
  const [supervisorIds, setSupervisorIds] = useState([])
  const updateLeadsDataToggle = (newValue) => {
    setLeadDataToggle(newValue);
  };
  const [mainSupervisor, setMainSupervisor] = useState({})
  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates on unmounted components
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
        if (isMounted) {
          if (result.success) {
            const mainSup = result?.team?.supervisors !== undefined ? result.team.supervisors : '';
            setMainSupervisor(mainSup)
          } else {
            toast.error("Failed to load user details.");
          }
        }
      } catch (error) {
        if (isMounted) {
          toast.error("An error occurred while fetching user details.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchLeadTeam();
    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
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
        } else {
          toast.error('No proposals found.');
        }
      } catch (error) {
        toast.error(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchProposals();
  }, [LeadDataToggle]);
  async function submitProposalToSupervisor() {
    try {
      // Validate that proposalDetail and mainSupervisor are defined
      if (!proposalDetail || !proposalDetail.id || !mainSupervisor || !mainSupervisor[0] || !mainSupervisor[0]._id) {
        throw new Error("Both proposalId and supervisorId are required");
      }
      // Make the fetch request with the request body directly
      const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/submit-to-supervisor`
        , {
          method: 'PATCH',
          redirect: 'follow',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            proposalId: proposalDetail.id,
            supervisorId: mainSupervisor[0]._id,
          }),
        });
      const responseText = await response.text();
      console.log("Response Status:", response.status);
      console.log("Response Text:", responseText);

      if (response.ok) {
        const data = JSON.parse(responseText);
        toast.success('Proposal successfully submitted to supervisor');
        return data;
      } else {

        const errorData = JSON.parse(responseText);
        throw new Error(errorData.message || 'Failed to submit proposal');
      }
    } catch (error) {

      toast.error(`Error submitting proposal: ${error.message}`);
      console.error(`Error submitting proposal: ${error.message}`);
      throw error;
    }
  }
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex  xl:flex-row flex-col min-h-[100vh] font-Satoshi-Black overflow ">
        <Sidebar pageName='teamLead-proposals' />
        <section className=' w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
          <UserNavbar />
          <div className='xl:m-10 m-5  '>
            <div className="flex flex-col gap-5 md:justify-between justify-start md:items-center items-start md:flex-row">
              <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '> Proposal </h1>
              <div className='group flex items-center gap-1'>
                <MdOutlineKeyboardBackspace className=' group-hover:-translate-x-1  duration-500 ' />
                <button
                  className='font-semibold'
                  onClick={() => window.history.back()}> Go Back</button>
              </div>
            </div>
            <header className='bg-white shadow-sm my-5 px-5 py-5 md:py-10 w-full'>
              <h1 className='text-lg  font-semibold italics mb-2 italic font-Satoshi-Black'>{proposalDetail.title}</h1>
              <div>
                <span className='font-bold my-2'> Proposal Id</span>
                <span className='mx-2 my-2 text-epsilon w-[10px] truncate'>
                  BMY-{proposalDetail.id ? proposalDetail.id.slice(-4) : 'N/A'}
                </span>
              </div>
              <div>
                <span className='font-bold my-2'>Status</span>
                <span className='mx-2 my-2'>{proposalDetail.status}</span>
              </div>
              <div className="flex flex-wrap gap-5 mt-5 mb-2">
                <button
                  onClick={submitProposalToSupervisor}
                  className="  w-fit py-2 px-6 rounded-md  group relative inline-flex items-center justify-center overflow-hidden border border-epsilon font-medium text-epsilon shadow-md transition duration-300 ease-out ">
                  <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-epsilon text-white duration-300 group-hover:translate-x-0">
                    <MdFileDownloadDone className='text-2xl' />   <span className='mx-2'>
                      Submit
                    </span>
                  </span>
                  <span className="ease absolute flex h-full w-full transform items-center justify-center text-epsilontransition-all duration-300 group-hover:translate-x-full">Submit</span>
                  <span className="invisible relative"> x Submit  </span>
                </button>
                <DiscussionModal memberData={proposalDetail} memberDataToggle={updateLeadsDataToggle} />
              </div>
              <p>*Submit will be submitted to supervisor: <span className='capitalize'>
                {mainSupervisor && mainSupervisor[0] && mainSupervisor[0].fullname ? mainSupervisor[0].fullname : 'Not Available'}
              </span></p>
            </header>
            {/* {sectionAssigned.map((section, index) => (
                                  <Proposal
                                      key={index}
                                      assignProposal={section.section}
                                      MemberproposalId={proposalDetail.id} />
                              ))} */}
            <ProposalForLead
              LeadproposalData={proposalDetail}
            />
            {/* <Proposal 
              /> */}
          </div>
        </section>
      </div>
    </>
  )
}
