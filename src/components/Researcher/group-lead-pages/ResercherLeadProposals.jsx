import React from 'react'
import Sidebar from '../../layout/Sidebar.jsx'
import { MdAdd } from "react-icons/md";
import { Link } from 'react-router-dom';
import Table from '../../Common/Table.jsx';
import UserNavbar from '../../layout/Navs/UserNavbar.jsx';
import CreateProposalModal from '../../modals/CreateProposalModal.jsx'
export default function ResercherLeadProposals() {
  return (
    <>
      <div className="flex  xl:flex-row flex-col min-h-[100vh]   font-Satoshi-Black overflow ">
        <Sidebar pageName='teamLead-proposals' />
        <section className=' w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
          <UserNavbar />
          <div className='xl:m-10 m-5  '>
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '> Proposal </h1>

            <header className='bg-white shadow-sm my-5 px-5 py-5 md:py-10 w-full '>
                  <h1 className='text-lg md:text-2xl font-bold font-Satoshi-Black  '>Proposal Name </h1>
                 

               <div>
               <span className='font-bold my-2'>Supervisor</span>
               <span className='mx-2 my-2'>Name</span>
               </div>


               <div>
               <span className='font-bold my-2'>Lead</span>
               <span className='mx-2 my-2'>Lead</span>
               </div>
              

                  <Link 
                  to='/lead-proposal'
                  className='text-epsilon text-sm'>View Details. </Link>
                </header>

or
            <header className='bg-white shadow-sm my-5 p-16'>
              <Link to='/create-new-proposal'>
                <div className='h-[40vh] md:w-[60%] w-full mx-auto bg-lightEpsilon border-2 border-dashed flex flex-col items-center justify-center border-epsilon  p-10 rounded-md'>
                  <MdAdd className='text-epsilon text-5xl border-2 border-dashed rounded-full border-epsilon my-4 ' />
                  <h1 className='font-semibold text-xl'>Create Proposal</h1>
                </div>
              </Link>
              <CreateProposalModal />
            </header>
            <h1 className='font-semibold text-xl my-5'>Assign Section </h1>
            <Table
              className='w-[99%] '
              rowData={[
                {
                  name: 'Proposal XYZ',
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
                  name: 'Proposal XYZ',
                  supervisor: 'ahmed',
                  groupdLead: 'Faheem',
                  status: 'ERC Remarks On Assigned Section',
                },
              ]
              }
              header={['Researcher', 'Section', 'Action']}
              rowRenderComponent='AssignResearcherTableRow'
            />
            <h1 className='font-semibold text-xl my-5'>Previous Proposals</h1>
            <Table
              className='w-[99%] '
              rowData={[
                {
                  name: 'Proposal XYZ',
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
                  name: 'Proposal XYZ',
                  supervisor: 'ahmed',
                  groupdLead: 'Faheem',
                  status: 'ERC Remarks On Assigned Section',
                },
              ]
              }
              header={[' Name', 'Supervised By', 'Group Lead', 'Status', 'Action']}
              rowRenderComponent='previousProposalsRow'
            />
          </div>
        </section>
      </div>
    </>
  )
}
