import React, { useEffect, useState } from 'react';
import Sidebar from '../../layout/Sidebar.jsx';
import Table from '../../Common/Table.jsx';
import UserNavbar from '../../layout/Navs/UserNavbar.jsx';
import { ImFilesEmpty } from "react-icons/im";
import { Link } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import Loader from '../../layout/Loader.jsx';
import { getCookie } from "cookies-next";
export default function ResearcherProposal() {
  const [loading, setLoading] = useState(true);
  const [showNoActive, setShowNoActiveProposal] = useState(false)
  const [showNotAssigned, setShowNotAssign] = useState(false)
  const [previousProposals, setFormattedPreviousProposal] = useState([])
  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const token = getCookie("token");
        myHeaders.append("Authorization", `Bearer ${token}`);
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/by-researchers`, {
          method: 'GET',
          redirect: 'follow',
          headers: myHeaders,
          credentials: 'include',
        });
        if (!response.ok) {
          setShowNoActiveProposal(true)
          setShowNotAssign(true)
          throw new Error('No Proposal');
        }
        var result = await response.json();
        if (result.success) {
          const formattedPreviousProposal = [];
          (result.acceptedProposals || []).forEach(proposal => {
            const sections = proposal.sections || {};
            const ethicalReview = sections.ethicalReview || {};
            const questions = ethicalReview.questions || {};
            const formattedProposal = {
              id: proposal._id || null,
              leadName: proposal.creator?.fullname || 'Unknown',
              mainSupervisor: proposal.supervisorId || 'Not assigned',
              sections: sections,
              title: proposal.title || 'N/A',
              riskScore: questions['Ethical Risk'] || 0,
              benefitScore: questions['Benefit Score'] || 0,
              approvalErcMember: proposal.approvalMember || {},
              ercMembers: proposal.assignedErcMember || [],
              BMYid: proposal.createdAt ? (() => {
                const date = new Date(proposal.createdAt);
                const number = proposal.proposalId || 'N/A';
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear();
                return `${number}-${month}-${year}`;
            })() : 'N/A',
              acceptedAt: proposal.acceptedAt ? (new Date(proposal.acceptedAt).toString() !== 'Invalid Date' ? new Date(proposal.acceptedAt).toISOString().split('T')[0] : 'N/A') : 'N/A'
            };
              // console.log(formattedProposal)
            // Add the formatted proposal to the array
            formattedPreviousProposal.push(formattedProposal);
          });
          setFormattedPreviousProposal(formattedPreviousProposal)
          if ((result.notAcceptedProposals.length === 0 || !result.notAcceptedProposals[0].title)) {
            setShowNoActiveProposal(true)
          }
          if (result.notAcceptedProposals && result.notAcceptedProposals.length > 0) {
            const section = result.notAcceptedProposals[0]?.sections;
            if (!section || Object.keys(section).length === 0) {
              setShowNotAssign(true);
            }
          }
          else {
            setShowNoActiveProposal(true)
          }
        } else {
          console.log('Failed to load proposal details.');
        }
      } catch (error) {
        if (result.notAcceptedProposals && result.notAcceptedProposals.length > 0) {
          const section = result.notAcceptedProposals[0]?.section;
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
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex xl:flex-row flex-col min-h-[100vh] font-WorkSans-Regular overflow">
        <Sidebar pageName='researcher-proposals' />
        <section className='w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
          <UserNavbar />
          <div className='xl:m-10 m-5'>
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'>Proposal</h1>
            <section className='my-5'>
              {showNoActive && (<>
                <header className='bg-white shadow-sm my-5 p-5 md:p-10'>
                  <h1 className='font-semibold flex items-center gap-2'>
                    <ImFilesEmpty className='text-2xl' />
                    No Active Proposal
                  </h1>
                </header>
              </>)}
            </section>
            <section className='md:my-10 my-5'>
              {!showNoActive && (<>
                <header className='bg-white shadow-sm my-5 p-5 md:p-10'>
                  <Link
                    to='/proposal-section'
                    className=" py-3 px-7   rounded-md group relative overflow-hidden  bg-epsilon  text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon ">
                    <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                    View Proposal
                  </Link>
                </header>
              </>)}
            </section>
            <section className='md:my-10 my-5'>
              <h1 className='font-semibold text-xl my-2'>Previous Proposals</h1>
              {previousProposals && previousProposals.length > 0 ? (
                <Table
                  className='w-[99%] '
                  rowData={previousProposals.map(proposal => ({
                    PropossalID: proposal.id,
                    GroupLead: proposal.leadName,
                    EthicalRisk: proposal.riskScore,
                    BenefitScore: proposal.benefitScore,
                    sections: proposal.sections,
                    title: proposal.title,
                    approvalErcMember: proposal.approvalErcMember || {},
                    ercMembers: proposal.ercMembers,
                    acceptedAt: proposal.acceptedAt,
                    BMYid: proposal.BMYid,
                  }))}
                  header={[' Propossal ID', 'Group Lead', 'Ethical Risk', 'Benefit Score', 'Action', 'Letters']}
                  rowRenderComponent='previousProposalsRow'
                />
              ) : (
                <p>No previous proposals</p>
              )}
            </section>
          </div>
        </section>
      </div>
    </>
  );
}
