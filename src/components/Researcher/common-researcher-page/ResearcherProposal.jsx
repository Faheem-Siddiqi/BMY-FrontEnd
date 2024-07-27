import React from 'react'
import Sidebar from '../../layout/Sidebar.jsx'
import Table from '../../Common/Table.jsx';
import UserNavbar from '../../layout/Navs/UserNavbar.jsx';
import { Link } from 'react-router-dom';
export default function ResearcherProposal() {
  const profileImage = '../../../assets/images/Profile.png'
  return (
    <>
      <div className="flex  xl:flex-row flex-col min-h-[100vh]    font-WorkSans-Regular overflow ">
        <Sidebar pageName='researcher-proposals' />
        <section className=' w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
          <UserNavbar />
          <div className='xl:m-10 m-5  '>
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '> Proposal </h1>
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

            or
            <section className='md:my-10 my-5 '>
              <h2 className='text-xl font-bold'>
                Assigned Sections
              </h2>
              <header className='bg-white shadow-sm my-5 p-5 md:p-10'>
                <h2 className='font-semibold '>No Section assigned yet</h2>
                <p>The Team Lead hasn’t assigned any section yet</p>
             
                <button
                  className="my-5 py-3 px-7   rounded-md group relative overflow-hidden  bg-epsilon  text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon ">
                  <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                  Request or View My Section
                </button>
              </header>
              or

              <header className='bg-white shadow-sm my-5 p-5 md:p-10'>
                <h2 className='font-semibold text-lg '> Section Assigned </h2>
                <p className='mb-5'>Ethical Review</p>
             
                <Link
                to='/proposal-section'
                  className="my-5 py-3 px-7   rounded-md group relative overflow-hidden  bg-epsilon  text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon ">
                  <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                  View My Section
                </Link>
              </header>

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
  )
}
