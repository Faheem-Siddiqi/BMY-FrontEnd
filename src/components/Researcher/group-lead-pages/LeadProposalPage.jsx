import React, { useState, useEffect } from 'react';
import Sidebar from '../../layout/Sidebar.jsx';
import { MdFileDownloadDone, MdOutlineKeyboardBackspace } from 'react-icons/md';
import DiscussionModal from '../proposals/proposal-reviews/DiscussionModal.jsx';
import UserNavbar from '../../layout/Navs/UserNavbar.jsx';
import Loader from '../../layout/Loader.jsx';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import EditableProposal from '../proposals/EditableProposal.jsx';
import { getCookie } from "cookies-next";
export default function LeadProposalPage() {
  const [toggle, setToggle] = useState(true);
  const [undefineSectionQuestions, setSectionQnasUndefine] = useState(false);
  const [LeadDataToggle, setLeadDataToggle] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [proposalDetail, setProposalDetail] = useState({});
  const [mainSupervisor, setMainSupervisor] = useState({});
  const updateLeadsDataToggle = (newValue) => {
    setLeadDataToggle(newValue);
  };
  const toggleState = () => {
    setToggle(prevState => !prevState);
  };
  useEffect(() => {
    let isMounted = true;
    const fetchLeadTeam = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const token = getCookie("token");
        myHeaders.append("Authorization", `Bearer ${token}`);
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/team/getOwnerTeam`, {
          method: "GET",
          redirect: "follow",
          headers: myHeaders,
          credentials: "include",
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        if (isMounted) {
          if (result.success) {
            const mainSup = result?.team?.supervisors ?? [];
            setMainSupervisor(mainSup);
          } else {
            toast.error("Failed to load user details.");
          }
        }
      } catch (error) {
        if (isMounted) {
          toast.error("An error occurred while fetching user details.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchLeadTeam();
    return () => { isMounted = false; };
  }, []);
  useEffect(() => {
    const fetchProposals = async () => {
      try {
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const token = getCookie("token");
        myHeaders.append("Authorization", `Bearer ${token}`);
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/by-group-lead`, {
          method: 'GET',
          redirect: 'follow',
          headers: myHeaders,
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        if (result.success) {
          const proposal = result.notAcceptedProposals?.[0] ?? {};
          const formattedProposal = {
            id: proposal._id || ' ',
            cretaedAt: proposal.createdAt
              ? (() => {
                const date = new Date(proposal.createdAt);
                const number = proposal.proposalId || 'N/A';
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear();
                return `${number}-${month}-${year}`;
              })()
              : 'N/A',
            title: proposal.title || ' ',
            status: proposal.status || ' ',
            lead: proposal.creator?.fullname || ' ',
            sections: proposal.sections || ' ',
            reviews: Array.isArray(proposal.reviews) ? proposal.reviews : [],
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
  }, [LeadDataToggle, toggle]);
  // Check if sections are undefined
  useEffect(() => {
    const checkSections = () => {
      if (!proposalDetail?.sections) {
        setSectionQnasUndefine(true);
        return;
      }
      const { sections } = proposalDetail;
      const isUndefined =
        !sections.information?.questions ||
        !sections.consent?.questions ||
        !sections.ethicalReview?.questions ||
        !sections.scientificReview?.questions;
      setSectionQnasUndefine(isUndefined);
    };
    checkSections();
  }, [proposalDetail, undefineSectionQuestions, toggle]);
  // Submit proposal to supervisor
  async function submitProposalToSupervisor() {
    try {
      setLoadingSubmit(true)
      if (!proposalDetail?.id || !mainSupervisor?.[0]?._id) {
        setLoadingSubmit(false)
        throw new Error("Both proposalId and supervisorId are required");
      }
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const token = getCookie("token");
      myHeaders.append("Authorization", `Bearer ${token}`);
      const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/submit-to-supervisor`, {
        method: 'PATCH',
        redirect: 'follow',
        credentials: 'include',
        headers: myHeaders,
        body: JSON.stringify({
          proposalId: proposalDetail.id,
          supervisorId: mainSupervisor[0]._id,
        }),
      });
      const responseText = await response.text();
      if (response.ok) {
        setLoadingSubmit(false)
        const data = JSON.parse(responseText);
        toast.success('Proposal successfully submitted to supervisor');
        return data;
      } else {
        setLoadingSubmit(false)
        const errorData = JSON.parse(responseText);
        throw new Error(errorData.message || 'Failed to submit proposal');
      }
    } catch (error) {
      setLoadingSubmit(false)
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
              <h1 className='text-lg   italics mb-2 italic font-Satoshi-Black'>{proposalDetail.title}</h1>
              <div>
                <span className='font-bold my-2'> Proposal Id</span>
                <span className='mx-2 my-2 text-epsilon'>
                  BMY-
                  <span>
                    {proposalDetail.cretaedAt || 'N/A'}
                  </span>
                </span>
              </div>
              <div>
                <span className='font-bold my-2'>Status</span>
                <span className='mx-2 my-2'>{proposalDetail.status}</span>
              </div>
              <div className="flex flex-wrap gap-5 mt-5 mb-2">
                <button
                  disabled={undefineSectionQuestions}
                  onClick={submitProposalToSupervisor}
                  className={`w-fit py-2 px-6 rounded-md group relative inline-flex items-center justify-center overflow-hidden border border-epsilon font-medium text-epsilon shadow-md transition duration-300 ease-out ${undefineSectionQuestions ? 'cursor-not-allowed' : 'cursor-pointer'
                    }`}>
                  <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-epsilon text-white duration-300 group-hover:translate-x-0">
                    <MdFileDownloadDone className='text-2xl' />   <span className='mx-2'>
                      {loadingSubmit ? ('Submiting') : ('Submit')}
                    </span>
                  </span>
                  <span className="ease absolute flex h-full w-full transform items-center justify-center text-epsilontransition-all duration-300 group-hover:translate-x-full">{loadingSubmit ? ('Submiting') : ('Submit')} </span>
                  <span className="invisible relative"> x {loadingSubmit ? ('Submiting') : ('Submit')}  </span>
                </button>
                <DiscussionModal memberData={proposalDetail} memberDataToggle={updateLeadsDataToggle} />
              </div>
              <p>*Supervisor to be submitted: <span className='capitalize'>
                {mainSupervisor && mainSupervisor[0] && mainSupervisor[0].fullname ? mainSupervisor[0].fullname : 'Not Available'}
              </span></p>
            </header>
            <EditableProposal
              sectionCheckToggle={toggleState}
              proposalData={proposalDetail}
            />
          </div>
        </section>
      </div>
    </>
  )
}
