import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../layout/Sidebar.jsx';
import profileImage from '../../../assets/images/bena.jpg'
import UserNavbar from '../../layout/Navs/UserNavbar.jsx';
import { MdOutlineGroupOff } from "react-icons/md";
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
const membersGroups = [
  [
    {
      name: "Faheem Siddiqi",
      designation: "emial",
      profileImage: profileImage
    },
    {
      name: "John Doe",
      designation: "email ",
      profileImage: profileImage
    },
    {
      name: "John Doe",
      designation: "email",
      profileImage: profileImage
    },
    {
      name: "John Doe",
      designation: "email",
      profileImage: profileImage
    },
    {
      name: "John Doe",
      designation: "email",
      profileImage: profileImage
    },
    {
      name: "John Doe",
      designation: "email",
      profileImage: profileImage
    },
    {
      name: "John Doe",
      designation: "email",
      profileImage: profileImage
    },
    {
      name: "John Doe",
      designation: "email",
      profileImage: profileImage
    },
  ],
  [
    {
      name: "John Doe",
      designation: "Designation 2",
      profileImage: profileImage
    },
    {
      name: "John Doe",
      designation: "Country 2",
      profileImage: profileImage
    },
  ],
];
export default function ErcHeadTeam() {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const currentMembers = membersGroups[currentGroupIndex];
  const nextGroup = () => {
    if (currentGroupIndex < membersGroups.length - 1) {
      setCurrentGroupIndex(currentGroupIndex + 1);
    }
  };
  const previousGroup = () => {
    if (currentGroupIndex > 0) {
      setCurrentGroupIndex(currentGroupIndex - 1);
    }
  };
  return (
    <>
      <div className="flex xl:flex-row flex-col font-WorkSans-Regular">
        <Sidebar pageName='all-bmy-teams' />
        <section className='w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
          <UserNavbar />
          <div className='xl:m-10 m-5 '>
          <header className='bg-white shadow-sm my-5 p-5 md:p-10 '>
                            <h1 className='font-semibold  flex items-center gap-2'
                            >
                                <MdOutlineGroupOff className='text-2xl' />
                                No  Panel To Show
                            </h1>
                        </header>
                        or
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'>ERC Panel</h1>
            <h1 className='font-semibold my-1 text-lg'>ERC Committee Members</h1>
            <header className='bg-white shadow-sm my-5 p-10'>
              <p className='mb-5 text-epsilon text-lg'>BMY_134 id of proposal</p>
              <div className='my-5'>
                <div className='flex justify-center items-center min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]'>
                  <img className='rounded-full' src={profileImage} alt='profile image' />
                </div>
                <div>
                  <p className='text-[1rem] font-bold'>Faheem</p>
                  <p className='text-light text-sm'>ERC Head</p>
                </div>
              </div>
              <div id='members' className="flex md:flex-row gap-5 md:gap-10 flex-wrap flex-col">
                {currentMembers.map((member, index) => (
                  <section key={index} className='flex gap-2 items-center font-Satoshi-Black'>
                    <div className='flex justify-center items-center min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]'>
                      <img className='rounded-full' src={member.profileImage} alt='profile image' />
                    </div>
                    <div className='py-5'>
                      <p className='text-[1rem] font-bold'>{member.name}</p>
                      <p className='text-light text-sm'>{member.designation}</p>
                    </div>
                  </section>
                ))}
              </div>
              <section className="flex justify-center items-center gap-4 my-3">
                <button className={`bg-epsilon p-2 rounded-full text-white ${currentGroupIndex === 0 && 'bg-opacity-70'}`} onClick={previousGroup} disabled={currentGroupIndex === 0}>
                  <IoIosArrowBack />
                </button>
                <p>{currentGroupIndex + 1} of {membersGroups.length}</p>
                <button className={`bg-epsilon p-2 rounded-full text-white ${currentGroupIndex === membersGroups.length - 1 && 'bg-opacity-70'}`} onClick={nextGroup} disabled={currentGroupIndex === membersGroups.length - 1}>
                  <IoIosArrowForward />
                </button>
              </section>
            </header>
            <Link to='/view-erc-team'></Link>
          </div>
        </section>
      </div>
    </>
  );
}
