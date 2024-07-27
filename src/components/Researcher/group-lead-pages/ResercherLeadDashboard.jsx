import React from 'react'
import Sidebar from '../../layout/Sidebar.jsx'
import profileImage from '../../../assets/images/bena.jpg'
import { ImFilesEmpty } from "react-icons/im";
import { MdOutlineGroupOff } from "react-icons/md";
import { Link } from 'react-router-dom';
import UserNavbar from '../../layout/Navs/UserNavbar.jsx';
export default function ResercherLeadDashboard() {
  const members = [
    {
      name: "Faheem Siddiqi",
      email: "email",
      profileImage: profileImage
    },
    {
      name: "John Doe",
      email: "email",
      profileImage: profileImage
    },
    {
      name: "John Doe",
      email: "email 2",
      profileImage: profileImage
    }, {
      name: "John Doe",
      email: "Country 2",
      profileImage: profileImage
    }, {
      name: "John Doe",
      email: "Country 2",
      profileImage: profileImage
    }, {
      name: "John Doe",
      email: "Country 2",
      profileImage: profileImage
    }, {
      name: "John Doe",
      email: "Country 2",
      profileImage: profileImage
    },
  ];
  return (
    <>
      <div className="flex  xl:flex-row flex-col  font-WorkSans-Regular "
      >
        <Sidebar pageName='group-lead-dashboard' />
        <section className=' w-full xl:w-[85%]  bg-lightBackground h-screen overflow-y-scroll'>
          <UserNavbar />
          <div className='xl:m-10 m-5  '>
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '>John Doe’s Dashboard</h1>
            <section>
              <p className='text-xl md:text-3xl mt-5 font-semibold font-Satoshi-Black '>Status.</p>
              <div className="flex md:flex flex-col md:flex-row gap-5">
                <header className='bg-white shadow-sm my-5 px-5 py-5 md:py-10 md:w-[35%] '>
                  <h1 className='text-lg md:text-2xl font-bold font-Satoshi-Black  '>Proposal Name </h1>
                  <p className=' my-2'>Assign Section to members</p>
                  <Link
                    to='/researcher-proposal'
                    className='text-epsilon text-sm'>Assign Proposal.</Link>
                </header>
                <header className='bg-white shadow-sm md:my-5 mb-5 px-5  py-5  md:py-10 md:w-[35%] '>
                  <h1 className='text-lg md:text-2xl font-bold font-Satoshi-Black  '>Supervisor</h1>
                  <p className='text-xl mt-3'>
                    Mr. Faheem
                  </p>
                  <p className='text-sm'>
                    Designation
                  </p>
                </header>
              </div>
            </section>

            or
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '> Proposal</h1>
          
            <header className='bg-white shadow-sm my-5 p-5 md:p-10 '>
              <h1 className='font-semibold  flex items-center gap-2' >
              <ImFilesEmpty className='text-2xl'/>
                No Active Proposal</h1>
            </header>
            <div className='flex justify-end text-nuetral-600'>
              <Link
                to='/group-lead-proposal'
                className="relative w-fit  after:block after:content-[''] after:absolute after:h-[1px] after:bg-neutral-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">
                Manage Proposal</Link>
            </div>
          
          
           
        
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '> Team</h1>
           
            <header className='bg-white shadow-sm my-5 p-5 md:p-10 '>
              <h1 className='font-semibold  flex items-center gap-2'
              >
                <MdOutlineGroupOff className='text-2xl'/>
                Team Not Found
              </h1>
            </header>
            <div className='flex justify-end text-nuetral-600'>
              <Link
                to='/group-lead-team'
                className="relative w-fit  after:block after:content-[''] after:absolute after:h-[1px] after:bg-neutral-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">
                Manage Team</Link>
            </div>
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '> Team</h1>
            <p className='font-semibold my-2'>My Team</p>
            <header className='bg-white shadow-sm my-5 p-5 md:p-10 '>
              <h1 className='font-semibold  text-lg'>My Team</h1>
              <div id='members' className="flex md:flex-row gap-5  md:gap-10  flex-wrap flex-col">
                {members.map((member, index) => (
                  <section key={index} className='flex gap-2 items-center font-Satoshi-Black'>
                    <div className='flex justify-center items-center min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]'>
                      <img className='rounded-full' src={member.profileImage} alt='profile image' />
                    </div>
                    <div className='py-5'>
                      <p className='text-[1rem] font-bold'>{member.name}</p>
                      <p className='text-light text-sm '>{member.email}</p>
                    </div>
                  </section>
                ))}
                <div>
                </div>
              </div>
            </header>
            <div className='flex justify-end text-nuetral-600'>
              <Link
                to='/group-lead-team'
                className="relative w-fit  after:block after:content-[''] after:absolute after:h-[1px] after:bg-neutral-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">
                Manage Team</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
