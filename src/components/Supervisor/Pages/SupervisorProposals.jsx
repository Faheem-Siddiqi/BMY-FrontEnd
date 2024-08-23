import React, { useState, useEffect } from 'react';
import Sidebar from '../../layout/Sidebar';
import Table from '../../Common/Table';
import { Link } from 'react-router-dom';
import { ImFilesEmpty } from "react-icons/im";
import UserNavbar from '../../layout/Navs/UserNavbar.jsx';
import Loader from '../../layout/Loader.jsx';
import { Toaster } from 'react-hot-toast';
import { getCookie } from "cookies-next";

export default function SupervisorProposals() {
  const [loading, setLoading] = useState(true);
  const [noActive, setNoActive] = useState(false);
  const [proposalInfo, setProposalInfo] = useState([]);
  const [previousProposals, setFormattedPreviousProposal] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const token = getCookie("token");
        myHeaders.append("Authorization", `Bearer ${token}`);
        const [proposalsResponse, previousProposalsResponse] = await Promise.all([
          fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/get-all-proposals-supervisor`, {
            method: 'GET',
            headers:myHeaders,
            redirect: "follow",
            credentials: 'include'
          }),
          fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/get-all-accepted-proposals-supervisor`, {
            method: 'GET',
            redirect: "follow",
            headers:myHeaders,
            credentials: 'include'
          })
        ]);

        if (!proposalsResponse.ok || !previousProposalsResponse.ok) {
          setNoActive(true);
          throw new Error('Failed to fetch proposals');
        }

        const [proposalsResult, previousProposalsResult] = await Promise.all([
          proposalsResponse.json(),
          previousProposalsResponse.json()
        ]);

        const proposals = proposalsResult.proposals || [];
        const previousProposals = previousProposalsResult.proposals || [];

        if (Array.isArray(proposals) && proposals.length > 0) {
          const proposalInfo = proposals.map(proposal => ({
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
            mainSupervisorId: proposal.supervisorId ? proposal.supervisorId._id : '',
          }));
          setProposalInfo(proposalInfo);
        } else {
          setNoActive(true);
        }

        setFormattedPreviousProposal(previousProposals);
      } catch (error) {
        console.log(error.message);
        setNoActive(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex xl:flex-row flex-col  font-WorkSans-Regular ">
        <Sidebar pageName="supervisor-proposal" />
        <section className=' w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
          <UserNavbar />
          <div className="xl:m-10 m-5">
            {!noActive && (<>
              <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '> Proposal</h1>
              <header className='bg-white shadow-sm my-5 p-5 md:p-10 '>
                {proposalInfo.map(proposal => (
                  <h1 key={proposal.proposalid} className=' mb-4 flex items-center gap-2'>
                    <ImFilesEmpty className='text-2xl' />
                    <Link to={`/mentor-proposal/${proposal.proposalid}`}>
                      Proposal:
                      <span className='mx-1 text-epsilon w-[10px] truncate'>
                        { }
                        BMY-{proposal.createdAt}
                      </span>
                    </Link>
                  </h1>
                ))}
              </header>
            </>)}
            {noActive && (<>
              <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'> Proposal</h1>
              <header className='bg-white shadow-sm my-5 p-5 md:p-10 '>
                <h1 className='font-semibold  flex items-center gap-2' >
                  <ImFilesEmpty className='text-2xl' />
                  No Active Proposal</h1>
              </header>
            </>)}
            {/* */}
            <section className="my-5 md:my-10">
              <h1 className="text-xl md:text-3xl font-bold font-Satoshi-Black">Previous Proposals</h1>
              {previousProposals && previousProposals.length > 0 ? (
                <Table
                  className='w-[99%] '
                  rowData={(previousProposals || []).map(proposal => ({
                    PropossalID: proposal?._id || '',
                    GroupLead: proposal?.creator?.fullname || '',
                    EthicalRisk: proposal?.sections?.ethicalReview?.questions['Benefit Score'] || 0,
                    BenefitScore: proposal?.sections?.ethicalReview?.questions['Ethical Risk'] || 0,
                    sections: proposal?.sections || {},
                    title: proposal?.title || '',
                    // approvalErcMember: proposal?.approvalMember || {},
                    // ercMembers: proposal?.assignedErcMember || [],
                  }))}
                  header={[' Propossal ID', 'Group Lead', 'Ethical Risk', 'Benefit Score', 'Action',]}
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
