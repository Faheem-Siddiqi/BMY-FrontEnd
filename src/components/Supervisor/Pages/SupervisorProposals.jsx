import React from 'react'
import Sidebar from '../../layout/Sidebar'
import Table from '../../Common/Table'
export default function SupervisorProposals() {
  return (
    <>
      <div className="flex  xl:flex-row flex-col min-h-[100vh]  font-WorkSans-Regular overflow ">
        <Sidebar pageName='supervisor-proposal' />
        <section className=' w-full xl:w-[85%] bg-lightBackground '>
          <nav className='bg-orange-400 w-full'> NAV BAR CONTENT</nav>
          <div className='xl:m-10 m-5  '>
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'> </h1>
            <header className='bg-white shadow-sm my-5 p-10'>
              <p className='font-semibold my-2'>6 Members</p>
            </header>
          </div>
          <section className='md:my-10 my-5'>
            <h1 className='font-semibold text-xl my-2'>Previous Proposals</h1>
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
          </section>
        </section>
      </div>
    </>
  )
}
