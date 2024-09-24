import React, { useState, useEffect } from 'react';
import Sidebar from '../../layout/Sidebar';
import { isBefore, subMonths } from 'date-fns';
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
  const [showNo, setShowNo] = useState(false)
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
            headers: myHeaders,
            redirect: "follow",
            credentials: 'include'
          }),
          fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/get-all-accepted-proposals-supervisor`, {
            method: 'GET',
            redirect: "follow",
            headers: myHeaders,
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
        if (Array.isArray(proposals) && proposals.length > 0) {
          const proposalInfo = proposals.map(proposal => ({
            proposalid: proposal._id,
            createdAt: proposal.createdAt
              ? (() => {
                const date = new Date(proposal.createdAt);
                const number = proposal.proposalId || 'N/A';
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
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
        // console.log(previousProposalsResult)
        const formattedPreviousProposal = previousProposalsResult.proposals.map(proposal => ({
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
              <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'> Proposal</h1>
              <header className='bg-white shadow-sm my-5 p-5 md:p-10'>
                {proposalInfo.map(proposal => (
                  <h1 key={proposal.proposalid} className='mb-4 flex items-center gap-2'>
                    <ImFilesEmpty className='text-2xl' />
                    <Link to={`/mentor-proposal/${proposal.proposalid}`}>
                      Proposal:
                      <span className='mx-1 text-epsilon '>
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
        

            {previousProposals && previousProposals.length > 0 && (
  <>
    <h1 className="text-xl md:text-3xl font-bold font-Satoshi-Black">
      Authorship Opinion
    </h1>
    <header className="bg-white shadow-sm my-5 p-5 md:p-10">
      
      {previousProposals.some(proposal => {
        const acceptedDate = new Date(proposal.acceptedAt); 
        return (
          (proposal.auditApproved === false || proposal.auditApproved === undefined) &&
          isBefore(acceptedDate, subMonths(new Date(), 3)) 
        );
      }) ? (
        previousProposals.map(proposal => {
          const acceptedDate = new Date(proposal.acceptedAt); 
          return (
            (proposal.auditApproved === false || proposal.auditApproved === undefined) &&
            isBefore(acceptedDate, subMonths(new Date(), 3)) && (
              <div key={proposal.id} className="flex items-center mb-3 gap-1">
                <ImFilesEmpty className="text-2xl" />
                <Link to={`/authorship-opinion-table/${proposal.id}`}>
                  <span className="font-bold">Opinion For Proposal:</span>
                  <span className="mx-1 text-epsilon">
                    BMY-{proposal.BMYid}
                  </span>
                </Link>
              </div>
            )
          );
        })
      ) : (
        <p className="flex gap-1">
          <ImFilesEmpty className="text-xl" />
          No Proposal Available For Opinion
        </p>
      )}
    </header>
  </>
)}

            <section className="my-5 md:my-10">
              <h1 className="text-xl md:text-3xl font-bold font-Satoshi-Black">Previous Proposals</h1>
              {previousProposals && previousProposals.length > 0 ? (
                <Table
                  className='w-[99%] '
                  rowData={(previousProposals || []).map(proposal => ({
                    PropossalID: proposal?._id || '',
                    auditApproved: proposal.auditApproved,
                    GroupLead: proposal?.leadName || 'N/A',
                    EthicalRisk: proposal?.sections?.ethicalReview?.questions?.['Benefit Score'] ?? 0,
                    BenefitScore: proposal?.sections?.ethicalReview?.questions?.['Ethical Risk'] ?? 0,
                    sections: proposal?.sections || {},
                    title: proposal?.title || '',
                    sections: proposal.sections,
                    approvalErcMember: proposal.approvalErcMember || {},
                    ercMembers: proposal.assignedErcMember,
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
