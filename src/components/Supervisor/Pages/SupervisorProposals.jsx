import React, { useState, useEffect } from 'react';
import Sidebar from '../../layout/Sidebar';
import Table from '../../Common/Table';
import { Link } from 'react-router-dom';
import { ImFilesEmpty } from "react-icons/im";
import UserNavbar from '../../layout/Navs/UserNavbar.jsx'
import Loader from '../../layout/Loader.jsx';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
export default function SupervisorProposals() {
  const [loading, setLoading] = useState(false)
  const [noActive, setNoActive] = useState(false)
  const [proposalInfo, setProposalInfo] = useState([])
  const [previousProposals, setFormattedPreviousProposal] = useState([])
  useEffect(() => {
    const fetchProposals = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/get-all-proposals-supervisor`, {
          method: 'GET',
          redirect: "follow",
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
            mainSupervisorId: proposal.supervisorId ? proposal.supervisorId._id : '',
          }));
          setProposalInfo(proposalInfo);
        } else {
          setNoActive(true);
        }
      }
      catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchPreviousProposals = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/get-all-accepted-proposals-supervisor`, {
          method: 'GET',
          redirect: "follow",
          credentials: 'include'
        });
        if (!response.ok) {
          setNoActive(true);
          throw new Error('Failed to fetch proposals');
        }
        const result = await response.json();
        // console.log(result)
        setFormattedPreviousProposal(result.proposals || []);
        // console.log(previousProposals)
      }
      catch (error) {
        console.log(error.message);
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
                        BMY-{proposal.proposalid ? proposal.proposalid.slice(-4) : 'N/A'}
                      </span>
                    </Link>
                  </h1>
                ))}
              </header>
            </>)}
            {noActive && (<>
              <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '> Proposal</h1>
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
                    approvalErcMember: proposal?.approvalMember || {},
                    ercMembers: proposal?.assignedErcMember || [],
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
