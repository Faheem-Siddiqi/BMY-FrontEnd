import React from 'react'
import Sidebar from '../../layout/Sidebar.jsx'
import profileImage from '../../../assets/images/Profile.png'
import { MdOutlineGroupOff } from "react-icons/md";
import UserNavbar from '../../layout/Navs/UserNavbar.jsx'

export default function ResearcherSupervisor() {
    return (
        <>
            <div className="flex  xl:flex-row flex-col min-h-[100vh]    font-Satoshi-Black overflow ">
                <Sidebar pageName='supervisors' />
                <section className=' w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
                    <UserNavbar />
                    <div className='xl:m-10 m-5'>
                        <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'>Project Supervisor</h1>
                        <header className='bg-white shadow-sm my-5 p-10'>
                            <div className="flex flex-wrap gap-5 md:flex-row flex-col">
                                <section className='flex gap-2  items-center  font-Satoshi-Black'>
                                    <div className='flex justify-center items-center min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]'>
                                        <img className='rounded-full ' src={profileImage} alt='profile image' />
                                    </div>
                                    <div className='py-5'>
                                        <p className='text-[1rem] font-bold'>Faheem Siddiqi</p>
                                        <p className='text-light'>email</p>
                                        <p className='text-light'>designation</p>
                                    </div>
                                </section>
                            </div>
                        </header>


                        <header className='bg-white shadow-sm my-5 p-10'>
                        <h1 className='font-semibold  flex items-center gap-2'
             >
               <MdOutlineGroupOff className='text-2xl'/>
               Supervisor Not Found
             </h1>
                        </header>
                    </div>
                </section>
            </div>
        </>
    )
}
