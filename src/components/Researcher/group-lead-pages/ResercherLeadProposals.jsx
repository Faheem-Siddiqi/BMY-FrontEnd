import React from 'react'
import Sidebar from '../../layout/Sidebar.jsx'
import { MdAdd } from "react-icons/md";
import { Link } from 'react-router-dom';
import Table from '../../Common/Table.jsx';
import CreateProposalModal from '../../modals/CreateProposalModal.jsx'
export default function ResercherLeadProposals() {
  return (
    <>
    
      <div className="flex  xl:flex-row flex-col min-h-[100vh]   font-Satoshi-Black overflow ">
        <Sidebar pageName='ResearcherProposal' />
        <section className=' w-full xl:w-[85%] bg-lightBackground '>
          <nav className='bg-orange-400 w-full'> NAV BAR CONTENT</nav>
          <div className='xl:m-10 m-5  '>
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '> Proposal </h1>
            <header className='bg-white shadow-sm my-5 p-16'>
              <Link to='/add-team-members'>
                <div className='h-[40vh] md:w-[60%] w-full mx-auto bg-lightEpsilon border-2 border-dashed flex flex-col items-center justify-center border-epsilon  p-10 rounded-md'>
                  <MdAdd className='text-epsilon text-5xl border-2 border-dashed rounded-full border-epsilon my-4 ' />
                  <h1 className='font-semibold text-xl'>Create Proposal</h1>
                </div>
              </Link>

              <CreateProposalModal/>
            </header>
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
