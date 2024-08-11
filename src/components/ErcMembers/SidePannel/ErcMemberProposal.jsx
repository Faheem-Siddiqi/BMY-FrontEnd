import React, { useState, useEffect } from 'react';
import Sidebar from '../../layout/Sidebar.jsx';
import Table from '../../Common/Table.jsx';
import { Link } from 'react-router-dom';
import { ImFilesEmpty } from "react-icons/im";
import UserNavbar from '../../layout/Navs/UserNavbar.jsx'
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import Loader from '../../layout/Loader.jsx';
export default function ErcMemberProposal() {
  const [loading, setLoading] = useState(false)
  const [noActive, setNoActive] = useState(false)
  const [proposalInfo, setProposalInfo] = useState([])


  useEffect(() => {
    const fetchProposals = async () => {
      setLoading(true);
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
    fetchProposals();
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
                  <h1 key={proposal.proposalid} className='font-semibold mb-4 flex items-center gap-2'>
                    <ImFilesEmpty className='text-2xl' />
                    <Link to={`/evaluate-proposal/${proposal.proposalid}`}>
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
            <header className='bg-white shadow-sm my-5 p-5 md:p-10 '>
              <h1 className='font-semibold  flex items-center gap-2' >
                <ImFilesEmpty className='text-2xl' />
                No Active Proposal</h1>
            </header>


            </>)}
            {/* */}
            <section className="my-5 md:my-10">
              <h1 className="text-xl md:text-3xl font-bold font-Satoshi-Black">Previous Proposals</h1>
              <Table
                className="w-[99%]"
                rowData={[
                  {
                    proposalID: 'BMY-12',
                    groupdLead: 'Faheem',
                    status: 'ERC ko submit krana ka bad wala yh doc render krna ha',
                  },
                  {
                    proposalID: 'Proposal XYZ',
                    groupdLead: 'Faheem',
                    status: 'Group Lead Approval Pending',
                  },
                  {
                    proposalID: 'Proposal XYZ',
                    groupdLead: 'Faheem',
                    status: 'Accepted',
                  },
                  {
                    proposalID: 'Proposal XYZ',
                    groupdLead: 'Faheem',
                    status: 'ERC Remarks On Assigned Section',
                  },
                ]}
                header={['Id', 'Group Lead', 'Status', 'Action']}
                rowRenderComponent="SupervisorProposalRow"
              />
            </section>
          </div>
        </section>
      </div>
    </>
  );
}
