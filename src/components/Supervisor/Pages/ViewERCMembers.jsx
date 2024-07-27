import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../../layout/Sidebar'
import profileImage from '../../../assets/images/Profile.png'
import UserNavbar from '../../layout/Navs/UserNavbar.jsx'
export default function ERCMembers() {
  const members = [
    {
      name: "Faheem Siddiqi",
      designation: "istitution",
      profileImage: profileImage
    },
    {
      name: "John Doe",
      designation: "istitution",
      profileImage: profileImage
    },
    {
      name: "John Doe",
      designation: "desgination 2",
      profileImage: profileImage
    }, {
      name: "John Doe",
      designation: "Country 2",
      profileImage: profileImage
    }, {
      name: "John Doe",
      designation: "Country 2",
      profileImage: profileImage
    }, {
      name: "John Doe",
      designation: "Country 2",
      profileImage: profileImage
    }, {
      name: "John Doe",
      designation: "Country 2",
      profileImage: profileImage
    },
  ];
  return (
    <>
      <div className="flex  xl:flex-row flex-col  font-WorkSans-Regular  ">
        <Sidebar pageName='view-erc-team' />
        <section className=' w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
          <UserNavbar />
          <div className='xl:m-10 m-5  '>
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'>ERC Panel </h1>
            <h1 className='font-semibold  my-1 text-lg'>ERC Committee Members</h1>
            <header className='bg-white shadow-sm my-5 p-10'>
              <p className='mb-5 text-epsilon text-lg'>
                BMY_134 id of proposal
              </p>
              <div className='my-5'>
                <div className='flex justify-center  items-center min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]'>
                  <img className='rounded-full' src={profileImage} alt='profile image' />
                </div>
                <div className=''>
                  <p className='text-[1rem] font-bold'>Faheem</p>
                  <p className='text-light text-'>ERC Head </p>
                </div>
              </div>
              <div id='members' className="flex md:flex-row gap-5  md:gap-10  flex-wrap flex-col">
                {members.map((member, index) => (
                  <section key={index} className='flex gap-2 items-center font-Satoshi-Black'>
                    <div className='flex justify-center items-center min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]'>
                      <img className='rounded-full' src={member.profileImage} alt='profile image' />
                    </div>
                    <div className='py-5'>
                      <p className='text-[1rem] font-bold'>{member.name}</p>
                      <p className='text-light text-sm '>{member.designation}</p>
                    </div>
                  </section>
                ))}
                <div>
                </div>
              </div>
            </header>
            <Link to='/view-erc-team'>
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
