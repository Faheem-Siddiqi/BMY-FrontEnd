import React  , {useState,useEffect} from 'react';
import Sidebar from '../../layout/Sidebar';
import Table from '../../Common/Table';
import { Link } from 'react-router-dom';
import { ImFilesEmpty } from "react-icons/im";
import UserNavbar from '../../layout/Navs/UserNavbar.jsx'
import Loader from '../../layout/Loader.jsx';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
export default function SupervisorProposals() {
  const activeProposals = ['proposal1', 'proposal2', 'proposal3', 'proposal4'];

  const [noActiveProposals, setNoActiveProposals] =useState(false)
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex xl:flex-row flex-col  font-WorkSans-Regular ">
        <Sidebar pageName="supervisor-proposal" />
        <section className=' w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
          <UserNavbar />
          <div className="xl:m-10 m-5">
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '> Proposal</h1>
            <header className='bg-white shadow-sm my-5 p-5 md:p-10 '>
              <h1 className='font-semibold mb-4 flex items-center gap-2' >
                <ImFilesEmpty className='text-2xl' />
                <Link to='/mentor-proposal'>
                  Propsal ID BMY-24</Link>
              </h1>
              <h1 className='font-semibold mb-4  flex items-center gap-2' >
                <ImFilesEmpty className='text-2xl' />
                <Link>
                  Propsal ID BMY-24</Link></h1>
              <h1 className='font-semibold mb-4  flex items-center gap-2' >
                <ImFilesEmpty className='text-2xl' />
                <Link>
                  Propsal ID BMY-24</Link></h1>
              <h1 className='font-semibold mb-4  flex items-center gap-2' >
                <ImFilesEmpty className='text-2xl' />
                <Link>
                  Propsal ID BMY-24</Link></h1>
            </header>
            or
            {/* Proposal Not Found Render */}
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '> Proposal</h1>
            <header className='bg-white shadow-sm my-5 p-5 md:p-10 '>
              <h1 className='font-semibold  flex items-center gap-2' >
                <ImFilesEmpty className='text-2xl' />
                No Active Proposal</h1>
            </header>
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
