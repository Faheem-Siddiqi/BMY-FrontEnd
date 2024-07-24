import React from 'react';
import Sidebar from '../../layout/Sidebar';
import Table from '../../Common/Table';
import { Link } from 'react-router-dom';
import { PiEmptyBold } from "react-icons/pi";
import { MdAdd } from "react-icons/md";
import  UserNavbar from '../../layout/Navs/UserNavbar.jsx'
export default function SupervisorProposals() {
  const activeProposals = ['proposal1', 'proposal2', 'proposal3', 'proposal4'];

  return (
    <>

  
      <div className="flex xl:flex-row flex-col  font-WorkSans-Regular ">
        <Sidebar pageName="supervisor-proposal " />
        <section className=' w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
        <UserNavbar/>
          <div className="xl:m-10 m-5">
          <header className='bg-white shadow-sm my-8 p-5 md:p-16 '>
              <Link to='/supervisor-teams'>
                <div className='h-[40vh] md:w-[60%] w-full mx-auto bg-lightEpsilon border-2 border-dashed flex flex-col items-center justify-center border-epsilon  p-10 rounded-md'>
                  <MdAdd className='text-epsilon text-5xl border-2 border-dashed rounded-full border-epsilon my-4 ' />
                  <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '>Researchers</h1>
                  <p className='font-semibold my-2'>Not Researcher Found.</p>
                </div>
              </Link>
            </header>
            <h1 className="text-xl md:text-3xl font-bold font-Satoshi-Black">Active Proposals</h1>
            <header className="bg-white shadow-sm my-5 p-10">
              <h1 className="font-semibold text-lg">List of Active Proposals</h1>
              <ul>

              {activeProposals.map((proposal, index) => (
  <li key={index} className="my-5 flex items-center gap-3 cursor-pointer group">
    
    <div className='w-[10px] h-[10px]  bg-epsilon bg-opacity-60 group-hover:translate-x-[0.4rem] duration-500 group-hover:bg-opacity-100 rounded-full'>

    </div>
    <p className="text-epsilon border-b border-transparent duration-500 group-hover:border-b hover:border-epsilon w-fit">
      {proposal}
    </p>

    
  </li>
))}
              </ul>
            </header>
            <section className="my-5 md:my-10">
              <h1 className="text-xl md:text-3xl font-bold font-Satoshi-Black">Previous Proposals</h1>
              <Table
                className="w-[99%]"
                rowData={[
                  {
                    name: 'Proposal XYZ',
                    groupdLead: 'Faheem',
                    status: 'ERC ko submit krana ka bad wala yh doc render krna ha',
                  },
                  {
                    name: 'Proposal XYZ',
                    groupdLead: 'Faheem',
                    status: 'Group Lead Approval Pending',
                  },
                  {
                    name: 'Proposal XYZ',
                    groupdLead: 'Faheem',
                    status: 'Accepted',
                  },
                  {
                    name: 'Proposal XYZ',
                    groupdLead: 'Faheem',
                    status: 'ERC Remarks On Assigned Section',
                  },
                ]}
                header={['', 'Name', 'Group Lead', 'Status', 'Action']}
                rowRenderComponent="previousProposalsRow"
              />
            </section>
          </div>
        </section>
      </div>
    </>
  );
}
