import React, { useState, useEffect } from 'react';
import Sidebar from '../../layout/Sidebar.jsx';
import Table from '../../Common/Table.jsx';
import { Link } from 'react-router-dom';
import { ImFilesEmpty } from "react-icons/im";
import UserNavbar from '../../layout/Navs/UserNavbar.jsx';
import Loader from '../../layout/Loader.jsx';

export default function ErcMemberProposal() {
  const [loading, setLoading] = useState(true);
  const [noActive, setNoActive] = useState(false);
  const [proposalInfo, setProposalInfo] = useState([]);
  const [previousProposals, setFormattedPreviousProposal] = useState(null);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/get-assigned-to-erc-member`, {
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

    const fetchPreviousProposals = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/get-all-accepted-proposals-ercmember`, {
          method: 'GET',
          redirect: "follow",
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error('Failed to fetch previous proposals');
        }
        const result = await response.json();
        setFormattedPreviousProposal(result.proposals || []);
      } catch (error) {
        console.error(error.message);
        setFormattedPreviousProposal([]);  // Set to an empty array on error
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchProposals(), fetchPreviousProposals()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }
  // console.log(proposalInfo)
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
            <section className="my-5 md:my-10">
              <h1 className="text-xl md:text-3xl font-bold font-Satoshi-Black">Previous Proposals</h1>
              {previousProposals === null ? (
                <Loader />
              ) : previousProposals.length > 0 ? (
                <Table
                  className='w-[99%]'
                  rowData={previousProposals.map(proposal => ({
                    PropossalID: proposal?._id || '',
                    GroupLead: proposal?.creator?.fullname || '',
                    EthicalRisk: proposal?.sections?.ethicalReview?.questions['Benefit Score'] || 0,
                    BenefitScore: proposal?.sections?.ethicalReview?.questions['Ethical Risk'] || 0,
                    sections: proposal?.sections || {},
                    title: proposal?.title || '',
                  }))}
                  header={[' Propossal ID', 'Group Lead', 'Ethical Risk', 'Benefit Score', 'Action']}
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
