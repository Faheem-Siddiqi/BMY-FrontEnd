import React from 'react'
import Sidebar from '../../layout/Sidebar.jsx'
import { Link } from 'react-router-dom';
import UserNavbar from '../../layout/Navs/UserNavbar.jsx';
export default function ResercherLeadNewProposal() {
    return (
        <>
            <div className="flex  xl:flex-row flex-col min-h-[100vh]   font-Satoshi-Black overflow ">
                <Sidebar pageName='teamLead-proposals' />
                <section className=' w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
                    <UserNavbar />
                    <div className='xl:m-10 m-5  '>
                        <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '> Proposal </h1>
                        <section className=' w-full   shadow-sm my-5 p-10 bg-white'>
                            <label htmlFor="proposal-title" className='text-zeta  font-semibold '>Proposal Title </label>
                            <input
                                type='text'
                                name='proposal-title'
                                id='proposal-title'
                                className=' md:w-[50%] border mt-2  mb-5 rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none' placeholder='Proposal Title' />
                            <Link
                                to='/add-team-members'
                                className="my-10 py-2 px-7  font-semibold rounded-md group relative overflow-hidden  bg-epsilon  text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon ">
                                <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                                Next
                            </Link>
                            Add condition if team is empty then route is /add-team-members else /lead-proposal
                        </section>
                    </div>
                </section>
            </div>
        </>
    )
}
