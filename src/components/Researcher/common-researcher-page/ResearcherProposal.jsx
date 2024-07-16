import React from 'react'
import Sidebar from '../../layout/Sidebar.jsx'
import Table from '../../Common/Table.jsx';
export default function ResearcherProposal() {
 
  const profileImage = '../../../assets/images/Profile.png'
  return (
    <>
   
      <div className="flex  xl:flex-row flex-col min-h-[100vh]    font-WorkSans-Regular overflow ">
        <Sidebar pageName='researcher-proposals' />
        <section className=' w-full xl:w-[85%] bg-lightBackground '>
          <nav className='bg-orange-400 w-full'> NAV BAR CONTENT</nav>
          <div className='xl:m-10 m-5  '>
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '> Proposal </h1>
            {/*Create Propopsal (to be shown to head only) For nomal user (team lead ka table call krdeta) Join Team To Have Access To Proposal</p> */}
            {/* <header className='bg-white shadow-sm my-5 p-10'>
              <Link to='/add-team-members'>
                <div className='h-[40vh] md:w-[60%] w-full mx-auto bg-lightEpsilon border-2 border-dashed flex flex-col items-center justify-center border-epsilon  p-10 rounded-md'>
                  <MdAdd className='text-epsilon text-5xl border-2 border-dashed rounded-full border-epsilon my-4 ' />
                  <h1 className='font-semibold text-xl'>Create Proposal</h1>
                </div>
              </Link>
            </header> */}
            <section className='my-5'>
              <p className='my-2'>You are not part of any active proposal join team. Request Team Lead to Add you in a proposal group. </p>
              <Table
                className='w-[99%] '
                rowData={[
                  {
                    profileImage: profileImage,
                    name: 'Maira Anjum',
                    email: 'email1@example.com',
                    institution: 'PIMS',
                    designation: 'Doctor'
                  },
                  {
                    profileImage: profileImage,
                    name: 'Faheem Siddiqi',
                    email: 'email1@example.com',
                    institution: 'PIMS',
                    designation: 'Doctor'
                  },
                  {
                    profileImage: profileImage,
                    name: 'Maira Anjum',
                    email: 'email1@example.com',
                    institution: 'PIMS',
                    designation: 'Doctor'
                  },
                  {
                    profileImage: profileImage,
                    name: 'Faheem Siddiqi',
                    email: 'email1@example.com',
                    institution: 'PIMS',
                    designation: 'Doctor'
                  },
                  {
                    profileImage: profileImage,
                    name: 'Maira Anjum',
                    email: 'email1@example.com',
                    institution: 'PIMS',
                    designation: 'Doctor'
                  },
                  {
                    profileImage: profileImage,
                    name: 'Faheem Siddiqi',
                    email: 'email1@example.com',
                    institution: 'PIMS',
                    designation: 'Doctor'
                  },
                ]
                }
                header={[' Researchers', 'Institution', 'Designation', 'Requests']}
                rowRenderComponent='ShowResearcherLeads'
              />
            </section>
            <section className='md:my-10 my-5 '>
              <h2 className='text-xl font-bold'>
                Assigned Sections
              </h2>
              <header className='bg-white shadow-sm my-5 p-5 md:p-10'>
                <h2 className='font-semibold '>No Section assigned yet</h2>
                <p>The Team Lead hasn’t assigned any section yet</p>
                <p>Request Section Assignment</p>
                <button className='bg-epsilon my-5 text-white px-6 py-2 rounded-md'>Request</button>
              </header>
            </section>
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
          </div>
        </section>
      </div>
    </>
  )
}
