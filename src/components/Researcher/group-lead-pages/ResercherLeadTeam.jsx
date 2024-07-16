import React from 'react'
import Sidebar from '../../layout/Sidebar.jsx'
import { MdAdd } from "react-icons/md";
import CurrentMembers from '../group-members/CurrentGroupMembers.jsx'
import { Link } from 'react-router-dom';
export default function ResercherLeadTeam() {
    return (
        <>
            <div className="flex  xl:flex-row flex-col min-h-[100vh]   font-Satoshi-Black overflow ">
                <Sidebar pageName='teamLead-team' />
                <section className=' w-full xl:w-[85%] bg-lightBackground '>
                    <nav className='bg-orange-400 w-full'> NAV BAR CONTENT</nav>
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
                        <Link className='bg-epsilon py-2 px-3 rounded text-white w-fit' to='/add-team-members'>
                            Add Members
                        </Link>
                    </div>
                </section>
            </div>
        </>
    )
}
