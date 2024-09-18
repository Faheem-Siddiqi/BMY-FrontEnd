import React, { useState, useEffect } from 'react';
import Sidebar from '../../layout/Sidebar.jsx';
import Table from '../../Common/Table.jsx';
import { Link } from 'react-router-dom';
import { ImFilesEmpty } from "react-icons/im";
import UserNavbar from '../../layout/Navs/UserNavbar.jsx';
import Loader from '../../layout/Loader.jsx';
import toast from 'react-hot-toast';
import ReviewAudit from '../../Researcher/ReviewAudit.jsx'
import { getCookie } from "cookies-next";
export default function ErcMemberProposal() {
  const [loading, setLoading] = useState(true);

  const toggleSelectedAuditProposal=()=>{
    setFormattedPreviousProposal(null)
  }
  const [selectedAuditProposal, setSelectedAuditProposal] = useState({
    proposaId: '',
    title: '',
    authorshipTable: [],
    auditForm: {},
    BMYid: '',
  });
  const [noActive, setNoActive] = useState(false);
  const [proposalInfo, setProposalInfo] = useState([]);
  const [auditProposals, setAuditProposals] = useState([])
  const [previousProposals, setFormattedPreviousProposal] = useState(null);
  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const token = getCookie("token");
        myHeaders.append("Authorization", `Bearer ${token}`);
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/get-assigned-to-erc-member`, {
          method: 'GET',
          redirect: "follow",
          headers: myHeaders,
          credentials: 'include'
        });
        if (!response.ok) {
          setNoActive(true);
          throw new Error('Failed to fetch proposals');
        }
        const result = await response.json();
        if (Array.isArray(result.proposals) && result.proposals.length > 0) {
          const proposalInfo = result.proposals.map(proposal => ({
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
          }));
          setProposalInfo(proposalInfo);
        } else {
          setNoActive(true);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    const fetchAuditRequests = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const token = getCookie("token");
        if (token) {
          myHeaders.append("Authorization", `Bearer ${token}`);
        }
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/get-all-accepted-proposals-ercmember`, {
          method: "GET",
          redirect: "follow",
          headers: myHeaders,
          credentials: 'include',
          
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (result.success) {
       
          const data = result?.proposals ?? []
          setAuditProposals(data)
          
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error(`Error: ${error.message}`);
      } finally {
     
      }
    };
    const fetchPreviousProposals = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const token = getCookie("token");
        myHeaders.append("Authorization", `Bearer ${token}`);
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/get-all-accepted-proposals-ercmember`, {
          method: 'GET',
          redirect: "follow",
          headers: myHeaders,
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error('Failed to fetch previous proposals');
        }
        const result = await response.json();
        const formattedPreviousProposal = result.proposals.map(proposal => ({
          id: proposal._id || null,
          leadName: proposal.creator?.fullname || 'Unknown',
          auditApproved: proposal.auditApproved || false,
          sections: proposal.sections || {},
          title: proposal.title || 'N/A',
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
        console.error(error.message);
        setFormattedPreviousProposal([]);
      }
    };
    const fetchData = async () => {
      await Promise.all([fetchProposals(), fetchPreviousProposals(), fetchAuditRequests()]);
      setLoading(false);
    };
    fetchData();

  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="flex xl:flex-row flex-col  font-WorkSans-Regular ">
        <Sidebar pageName="assigned-proposals" />
        <section className=' w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
          <UserNavbar />
          <div className="xl:m-10 m-5">
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '> Proposal</h1>
            {!noActive && (<>
              <header className='bg-white shadow-sm my-5 p-5 md:p-10 '>
                {proposalInfo.map(proposal => (
                  <h1 key={proposal.proposalid} className=' mb-4 flex items-center gap-2'>
                    <ImFilesEmpty className='text-2xl' />
                    <Link to={`/evaluate-proposal/${proposal.proposalid}`}>
                      <span className='font-bold'>
                        Proposal:
                      </span>
                      <span className='mx-1 text-epsilon w-[10px] truncate'>
                        BMY-{proposal.createdAt}
                      </span>
                    </Link>
                  </h1>
                ))}
              </header>
            </>)}
            {noActive && (<>
              <header className='bg-white shadow-sm my-5 p-5 md:p-10 '>
                <h1 className='font-semibold  flex items-center gap-2' >
                  <ImFilesEmpty className='text-2xl' />
                  No Active Proposal</h1>
              </header>
            </>)}
            {/* */}
            {(<> <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '>Audit Forms</h1>
              <header className='bg-white shadow-sm my-5 p-5 md:p-10 '>
                <header className=''>
                  {auditProposals.length > 0 ? (
                    auditProposals.map((proposal) => (
                      <>
                      
                        {(proposal.auditApproved == false || proposal.auditApproved === undefined) && proposal.auditForm && Object.keys(proposal.auditForm).length > 0
                          ? <>{
                            
                            <div key={proposal._id}>
                              <div
                                onClick={() =>
                                  setSelectedAuditProposal({
                                    proposaId: proposal._id,
                                    title: proposal?.title,
                                    authorshipTable: proposal?.authorshipTable || [],
                                    auditForm: proposal?.auditForm || {},
                                    BMYid: proposal?.createdAt
                                      ? (() => {
                                        const date = new Date(proposal.createdAt);
                                        const number = proposal.proposalId || 'N/A';
                                        const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                        const year = date.getFullYear();
                                        return `${number}-${month}-${year}`;
                                      })()
                                      : 'N/A',
                                  })
                                }
                                className='font-semibold cursor-pointer flex items-center gap-2 mb-2' >
                                <ImFilesEmpty className='text-2xl' />
                                Audit Requests:
                                <span className='font-normal text-epsilon cursor-pointer' >BMY-{
                                  proposal?.createdAt
                                    ? (() => {
                                      const date = new Date(proposal.createdAt);
                                      const number = proposal.proposalId || 'N/A';
                                      const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                      const year = date.getFullYear();
                                      return `${number}-${month}-${year}`;
                                    })()
                                    : 'N/A'
                                }
                                </span>
                              </div>
                            </div>
                          }</>
                          : <p className='flex gap-1'>
                          <ImFilesEmpty className='text-xl' />
                          No Audit Request Available For Approval</p>
                        }
                      </>
                    ))
                  )
                    : (
                      <p className='flex gap-1'>
                          <ImFilesEmpty className='text-xl' />
                          No Audit Request Available For Approval</p>
                    )
                  }
                </header>
              </header>
        
            </>)}
            {selectedAuditProposal.proposaId !== '' && (
              <header className='md:bg-white md:shadow-sm my-5  md:p-10 '>
                <ReviewAudit
                toggleSelectedAuditProposal={toggleSelectedAuditProposal}
                proposalId={selectedAuditProposal.proposaId}
                  title={selectedAuditProposal.title}
                  authorshipTable={selectedAuditProposal.authorshipTable}
                  auditForm={selectedAuditProposal.auditForm}
                  BMYid={selectedAuditProposal.BMYid}
                />
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
                    PropossalID: proposal?.id || '',
                    GroupLead: proposal?.leadName || 'N/A',
                    EthicalRisk: proposal?.sections?.ethicalReview?.questions?.['Benefit Score'] ?? 0,
                    BenefitScore: proposal?.sections?.ethicalReview?.questions?.['Ethical Risk'] ?? 0,
                    sections: proposal?.sections || {},
                    title: proposal?.title || '',
                    sections: proposal.sections,
                    approvalErcMember: proposal.approvalErcMember || {},
                    ercMembers: proposal.ercMembers,
                    auditApproved: proposal.auditApproved,
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
