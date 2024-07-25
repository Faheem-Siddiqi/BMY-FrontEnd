import React from 'react'
import Sidebar from '../../layout/Sidebar.jsx'
import { MdAdd } from "react-icons/md";
import CurrentMembers from '../group-members/CurrentGroupMembers.jsx'
import { Link } from 'react-router-dom';
import UserNavbar from '../../layout/Navs/UserNavbar.jsx'
export default function ResercherLeadTeam() {
    return (
        <>
       
            <div className="flex  xl:flex-row flex-col   font-Satoshi-Black  ">
                <Sidebar pageName='group-lead-team' />
                <section className=' w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
                    <UserNavbar />
                    <div className='xl:m-10 m-5  '>
                        <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '>Group Members</h1>
                        <header className='bg-white shadow-sm my-5 p-5 md:p-10 '>
                            <Link to='/add-team-members'>
                                <div className='h-[40vh] md:w-[60%] w-full mx-auto bg-lightEpsilon border-2 border-dashed flex flex-col items-center justify-center border-epsilon  p-10 rounded-md'>
                                    <MdAdd className='text-epsilon text-5xl border-2 border-dashed rounded-full border-epsilon my-4 ' />
                                    <h1 className='font-semibold text-xl'>Create Team</h1>
                                </div>
                            </Link>
                        </header>
                        <p className='font-semibold my-2'>6 Members</p>
                        <CurrentMembers />


                        <Link
                        to='/add-team-members'
                  className="my-5 py-3 px-7  font-semibold rounded-md group relative overflow-hidden  bg-epsilon  text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon ">
                  <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                  Add Members
                  </Link>
                       
                    </div>
                </section>
            </div>
        </>
    )
}
