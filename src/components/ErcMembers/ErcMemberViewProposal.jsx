import React from 'react';
import Sidebar from '../layout/Sidebar.jsx';
import UserNavbar from '../layout/Navs/UserNavbar.jsx';
import { MdOutlineKeyboardBackspace, MdFileDownloadDone } from "react-icons/md";
import DiscussionModal from '../Researcher/proposals/proposal-reviews/DiscussionModal.jsx';
import Proposal from '../Researcher/proposals/Proposal.jsx';
export default function ErcMemberViewProposal() {
    return (
        <div className="flex xl:flex-row flex-col min-h-[100vh] font-WorkSans-Regular overflow-hidden">
            <Sidebar pageName='assigned-proposals' />
            <section className='w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
                <UserNavbar />
                <div className='xl:m-10 m-5'>
                    <div className="flex flex-col gap-5 md:justify-between justify-start md:items-center items-start md:flex-row">
                        <h1 className='text-xl  md:text-3xl font-bold font-Satoshi-Black  '> Proposal </h1>
                        <div className='group flex items-center gap-1'>
                            <MdOutlineKeyboardBackspace className=' group-hover:-translate-x-1  duration-500 ' />
                            <button
                                className='font-semibold'
                                onClick={() => window.history.back()}> Go Back</button>
                        </div>
                    </div>
                    <header className='bg-white shadow-sm my-5 px-5 py-5 md:py-10 w-full'>
                        <h1 className='text-lg md:text-xl font-semibold font-Satoshi-Black'>Proposal ID</h1>
                        <div className='my-2'>
                            <span className='font-bold'>Ethical Risk Score:</span>
                            <span className='mx-2'>72</span>
                        </div>
                        <div className='my-2'>
                            <span className='font-bold'>Supervisor:</span>
                            <span className='mx-2'>Name</span>
                        </div>
                        <div className='my-2'>
                            <span className='font-bold'>Lead:</span>
                            <span className='mx-2'>Lead</span>
                        </div>
                      <div className='flex md:flex-row flex-col mt-5 gap-5 md:gap-3 md:items-center'>
                <button
                  className="  w-fit py-2 px-6 rounded-md  group relative inline-flex items-center justify-center overflow-hidden border border-epsilon font-medium text-epsilon shadow-md transition duration-300 ease-out ">
                  <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-epsilon text-white duration-300 group-hover:translate-x-0">
                    <MdFileDownloadDone className='text-2xl' />   <span className='mx-2'>
                      Accept
                    </span>
                  </span>
                  <span className="ease absolute flex h-full w-full transform items-center justify-center text-epsilontransition-all duration-300 group-hover:translate-x-full">Accept</span>
                  <span className="invisible relative"> x Accept </span>
                </button>
                <DiscussionModal />
              </div>
                    </header>
                    <Proposal />
                </div>
            </section>
        </div>
    );
}
