import React, { useState, useEffect } from 'react';
import Sidebar from '../../layout/Sidebar.jsx';
import Table from '../../Common/Table.jsx';
import { Link } from 'react-router-dom';
import { ImFilesEmpty } from "react-icons/im";
import UserNavbar from '../../layout/Navs/UserNavbar.jsx';
import Loader from '../../layout/Loader.jsx';
import { Toaster } from 'react-hot-toast';
import { getCookie } from "cookies-next";

export default function ErcHeadProposal() {
  const [loading, setLoading] = useState(false);
  const [proposalInfo, setProposalInfo] = useState(null);
  const [previousProposals, setFormattedPreviousProposal] = useState(null);
  useEffect(() => {
    const fetchProposals = async () => {
      setLoading(true);
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const token = getCookie("token");
        myHeaders.append("Authorization", `Bearer ${token}`);
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/get-submitted-to-erc-head`, {
          method: 'GET',
          redirect: "follow",
          headers: myHeaders,
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error('Failed to fetch proposals');
        }
        const result = await response.json();

      
        const formattedProposals = (Array.isArray(result.proposals) && result.proposals.length > 0)
          ? result.proposals
            .filter(proposal => proposal && proposal.status === 'submitted to erc head')
            .map(proposal => ({
              proposalid: proposal._id,

              createdAt: proposal.createdAt
              ? (() => {
                const date = new Date(proposal.createdAt);
                const number = proposal.proposalId || 'N/A';
                const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
                const year = date.getFullYear();
                return `${number}-${month}-${year}`;
              })()
              : 'N/A',
              status: proposal.status
            }))
          : [];
        setProposalInfo(formattedProposals);
        //  console.log(formattedProposals)
      } catch (error) {
        console.log(error.message);
        setProposalInfo([]);
      } finally {
        setLoading(false);
      }
    };
    const fetchPreviousProposals = async () => {
      setLoading(true);
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const token = getCookie("token");
        myHeaders.append("Authorization", `Bearer ${token}`);
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/get-all-accepted-proposals-erchead`, {
          method: 'GET',
          redirect: "follow",
          headers: myHeaders,
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error('Failed to fetch previous proposals');
        }
        const result = await response.json();
        // console.log(result)
        const formattedPreviousProposal = result.proposals.map(proposal => ({
          id: proposal._id || null,
          leadName: proposal.creator?.fullname || 'Unknown',
          sections: proposal.sections || {},
          title: proposal.title || 'N/A',
          auditApproved: proposal.auditApproved || false,
          riskScore: (proposal?.sections?.ethicalReview?.questions?.['Ethical Score'] || 0),
          benefitScore: (proposal?.sections?.ethicalReview?.questions?.['Benefit Score'] || 0),
          approvalErcMember: proposal.approvalMember || {},
          ercMembers: proposal.assignedErcMember || [],
          BMYid: proposal.createdAt ? (() => {
            const date = new Date(proposal.createdAt);
            const number = proposal.proposalId || 'N/A';
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${number}-${month}-${year}`;
          })() : 'N/A',
          acceptedAt: proposal.acceptedAt ? (() => {
            const date = new Date(proposal.acceptedAt);
            return date.toString() !== 'Invalid Date' ? date.toISOString().split('T')[0] : 'N/A';
          })() : 'N/A'
        }));
        setFormattedPreviousProposal(formattedPreviousProposal);

        // console.log(formattedPreviousProposal)
      } catch (error) {
        console.log(error.message);
        setFormattedPreviousProposal([]);  // Set to an empty array on error
      } finally {
        setLoading(false);
      }
    };
    fetchProposals();
    fetchPreviousProposals();
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex xl:flex-row flex-col  font-WorkSans-Regular">
        <Sidebar pageName="all-proposals" />
        <section className='w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
          <UserNavbar />
          <div className="xl:m-10 m-5">
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'>Proposal</h1>
            {proposalInfo === null ? (
              <Loader />
            ) : proposalInfo.length > 0 ? (
              <header className='bg-white shadow-sm my-5 p-5 md:p-10'>
                {proposalInfo.map(proposal => (
                  <h1 key={proposal.proposalid} className='mb-4 flex items-center gap-2'>
                    <ImFilesEmpty className='text-2xl' />
                    <Link to={`/head-evaluate-proposal/${proposal.proposalid}`}>
                      <span className='font-bold'> Proposal:</span>
                      <span className='mx-1 text-epsilon '>
                        { }
                        BMY-{proposal.createdAt}
                      </span>
                    </Link>
                  </h1>
                ))}
              </header>
            ) : (
              <header className='bg-white shadow-sm my-5 p-5 md:p-10'>
                <h1 className='font-semibold flex items-center gap-2'>
                  <ImFilesEmpty className='text-2xl' />
                  No Active Proposal
                </h1>
              </header>
            )}
            <section className="my-5 md:my-10">
              <h1 className="text-xl md:text-3xl font-bold font-Satoshi-Black">Previous Proposals</h1>
              {previousProposals === null ? (
                <Loader />
              ) : previousProposals.length > 0 ? (
                <Table
                  className='w-[99%]'
                  rowData={previousProposals.map(proposal => ({
                    PropossalID: proposal?._id || '',
                    GroupLead: proposal?.leadName || 'N/A',
                    EthicalRisk: proposal?.sections?.ethicalReview?.questions?.['Benefit Score'] ?? 0,
                    BenefitScore: proposal?.sections?.ethicalReview?.questions?.['Ethical Risk'] ?? 0,
                    sections: proposal?.sections || {},
                    title: proposal?.title || '',
                    sections: proposal.sections,
                    approvalErcMember: proposal.approvalErcMember || {},
                    ercMembers: proposal.ercMembers,
                    acceptedAt: proposal.acceptedAt,
                    auditApproved: proposal.auditApproved,
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
