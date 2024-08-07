import React, { useEffect, useState } from 'react';
import Sidebar from '../../layout/Sidebar.jsx';
import Table from '../../Common/Table.jsx';
import UserNavbar from '../../layout/Navs/UserNavbar.jsx';
import { ImFilesEmpty } from "react-icons/im";
import { Link } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import Loader from '../../layout/Loader.jsx';
export default function ResearcherProposal() {
  const [loading, setLoading] = useState(true);
  const [showNoActive, setShowNoActiveProposal] = useState(false)
  const [showNotAssigned, setShowNotAssign]= useState(false)
  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/by-researchers`, {
          method: 'GET',
          redirect: 'follow',
          credentials: 'include',
        });
        if (!response.ok) {
          setShowNoActiveProposal(true)
          setShowNotAssign(true)
          throw new Error('No Proposal');
         
        }
        const result = await response.json();
        if (result.success) {
          // console.log(result)
          const fromattedProposal = {
            id: result.notAcceptedProposals[0]._id,
            title: result.notAcceptedProposals[0].title ? result.notAcceptedProposals[0].title : ' ',
            status: result.notAcceptedProposals[0].status ? result.notAcceptedProposals[0].status : ' ',
            lead: result.notAcceptedProposals[0].creator.fullname ? result.notAcceptedProposals[0].creator.fullname : ' ',
          }
          if ((result.notAcceptedProposals.length === 0 || !result.notAcceptedProposals[0].title)) {
            setShowNotAssign(true)
         
          }



          // console.log(fromattedProposal)
        } else {
          toast.error('Failed to load proposal details.');
        }
      } catch (error) {
        toast.error(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    // const fetchAssignSection = async () => {
    //   try {
    //     const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/get-assigned-section-researcher`, {
    //       method: 'GET',
    //       redirect: 'follow',
    //       credentials: 'include',
    //     });
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     const result = await response.json();
    //     if (result.success) {
    //       const sections = result.assignedSections
    //       .map(assignedSection => ({
    //         section: assignedSection.section ? assignedSection.section : '',
    //       }));
    //       console.log('sections')
    //       setSectionAssigned(sections)
    //     } else {
    //       toast.error('Failed to load proposal details.');
    //     }
    //   } catch (error) {
    //     toast.error(`Error: ${error.message}`);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    fetchProposal();
    // fetchAssignSection()
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
              
               {showNoActive  && (<> 
                  <header className='bg-white shadow-sm my-5 p-5 md:p-10'>
                    <h1 className='font-semibold flex items-center gap-2'>
                      <ImFilesEmpty className='text-2xl' />
                      No Active Proposal
                    </h1>
                  </header>
                  </>)}
            </section>
            <section className='md:my-10 my-5'>
              {showNotAssigned && (<>
                <h2 className='text-xl font-bold'>
                  Assigned Sections
                </h2>
                <header className='bg-white shadow-sm my-5 p-5 md:p-10 '>
                  <h1 className='font-semibold  mb-3 flex items-center gap-2' >
                    <ImFilesEmpty className='text-2xl ' />
                    No Section assigned yet</h1>
                  <p>The Team Lead hasn’t assigned any section yet</p>
                </header>
              </>)}
              {!showNotAssigned && (<>
                <header className='bg-white shadow-sm my-5 p-5 md:p-10'>
                  <h1 className='font-semibold pb-3 flex items-center gap-2' >
                    <ImFilesEmpty className='text-2xl ' />
                    Assigned Section
                  </h1>
                  <br />
                  <Link
                    to='/proposal-section'
                    className=" py-3 px-7   rounded-md group relative overflow-hidden  bg-epsilon  text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon ">
                    <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                    View My Section
                  </Link>
                </header>
                </>)}
            </section>
            <section className='md:my-10 my-5'>
              <h1 className='font-semibold text-xl my-2'>Previous Proposals</h1>
              <Table
                className='w-[99%] '
                rowData={[
                  {
                    name: 'BMY-124',
                    supervisor: 'ahmed',
                    groupdLead: 'Faheem',
                    status: 'Submitted, ERC Approval pending',
                  },
                  {
                    name: 'Proposal XYZ',
                    supervisor: 'ahmed',
                    groupdLead: 'Faheem',
                    status: 'Group Lead Approval Pending',
                  },
                  {
                    name: 'Proposal XYZ',
                    supervisor: 'ahmed',
                    groupdLead: 'Faheem',
                    status: 'Accepted',
                  },
                  {
                    name: 'BMY-124',
                    supervisor: 'ahmed',
                    groupdLead: 'Faheem',
                    status: 'ERC Remarks On Assigned Section',
                  },
                ]
                }
                header={[' Propossal ID', 'Supervised By', 'Group Lead', 'Status', 'Action']}
                rowRenderComponent='previousProposalsRow'
              />
            </section>
          </div>
        </section>
      </div>
    </>
  );
}
