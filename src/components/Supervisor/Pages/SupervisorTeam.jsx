import React, { useState } from 'react'; // Import useState
import Sidebar from '../../layout/Sidebar';
import profileImage from '../../../assets/images/bena.jpg';
import { LuCrown } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import Table from '../../Common/Table';
export default function SupervisorTeam() {
  // Define Groups
  const Groups = [
    [
      {
        profileImage: profileImage,
        name: 'Faheem ',
        email: 'email'
      },
      {
        profileImage: profileImage,
        name: 'Maira',
        email: 'email 2'
      },
      {
        profileImage: profileImage,
        name: 'Maira',
        email: 'email 2'
      },
      {
        profileImage: profileImage,
        name: 'Maira',
        email: 'email 2'
      }, {
        profileImage: profileImage,
        name: 'Maira',
        email: 'email 2'
      }, {
        profileImage: profileImage,
        name: 'Maira',
        email: 'email 2'
      }, {
        profileImage: profileImage,
        name: 'Maira',
        email: 'email 2'
      }, {
        profileImage: profileImage,
        name: 'Maira',
        email: 'email 2'
      },
    ],
    [
      {
        profileImage: profileImage,
        name: 'Ali ',
        country: 'Country 1'
      },
      {
        profileImage: profileImage,
        name: 'Maira',
        country: 'Country 2'
      },
    ],
    [
      {
        profileImage: profileImage,
        name: 'Ali ',
        country: 'Country 1'
      },
      {
        profileImage: profileImage,
        name: 'Maira',
        country: 'Country 2'
      },
    ]
  ];
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const members = Groups[currentTeamIndex];
  const nextTeam = () => {
    if (currentTeamIndex < Groups.length - 1) {
      setCurrentTeamIndex(currentTeamIndex + 1);
    }
  };
  // Function to navigate to the previous team
  const previousTeam = () => {
    if (currentTeamIndex > 0) {
      setCurrentTeamIndex(currentTeamIndex - 1);
    }
  };
  return (
    <>
      <div className="flex xl:flex-row flex-col min-h-[100vh] font-WorkSans-Regular overflow">
        <Sidebar pageName='supervisor-teams' />
        <section className='w-full xl:w-[85%] bg-lightBackground'>
          <nav className='bg-orange-400 w-full'>NAV BAR CONTENT</nav>
          <div className='xl:m-10 m-5'>
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'>Teams Requests</h1>
            <Table
              className='w-[99%]  md:[50vh] '
              rowData={[
                {
                  profileImage: profileImage,
                  name: 'Maira Anjum',
                  email: 'email1@example.com',
                  institution: 'PIMS',
                  members: 2,
                },
                {
                  profileImage: profileImage,
                  name: 'Faheem Siddiqi',
                  email: 'email1@example.com',
                  institution: 'PIMS',
                  members: 2,
                },
                {
                  profileImage: profileImage,
                  name: 'Maira Anjum',
                  email: 'email1@example.com',
                  institution: 'PIMS',
                  members: 2,
                },
                {
                  profileImage: profileImage,
                  name: 'Faheem Siddiqi',
                  email: 'email1@example.com',
                  institution: 'PIMS',
                  members: 2,
                },
              ]
              }
              header={[' Lead Details', 'Institution', 'Members', 'Action']}
              rowRenderComponent='TeamRequestsRow'
            />
            <header>
              <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'> My Teams</h1>
              <div className='flex my-5 gap-2 '>
                <p className='font-semibold'>Number of Teams</p>
                <p className=''>6</p>
              </div>
              <header className='bg-white shadow-sm my-5 p-10'>
                <section className='h-[40vh] md:h-[50vh] overflow-scroll'>
                  <div className="grid md:grid-cols-2 my-5 grid-col-1 md:gap-10">
                    <div>
                      <h1 className='font-semibold text-lg'>Group</h1>
                      <div id='members' className="grid md:grid-cols-2 grid-cols-1">
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
                      </div>
                    </div>
                    <div>
                      <div className="flex gap-1 items-center justify-start">
                        <h1 className='font-semibold text-lg'>Team Lead</h1>
                        <LuCrown className='text-yellow-600' />
                      </div>
                      <section className='flex gap-2 my-5 items-center px-2 font-Satoshi-Black'>
                        <div className='flex justify-center items-center min-w-[85px] min-h-[85px] max-w-[85px] max-h-[85px]'>
                          <img className='rounded-full' src={profileImage} alt='profile image' />
                        </div>
                        <div className='py-5'>
                          <p className='text-[1rem] font-bold'>Name</p>
                          <p className='text-[0.9rem] '>email</p>
                        </div>
                      </section>
                    </div>
                  </div>
                </section>
                <section className="flex justify-center items-center gap-4 my-3">
                  <button className={` ${currentTeamIndex === 0 && 'bg-opacity-70'} bg-epsilon p-2 rounded-full text-white`} onClick={previousTeam} disabled={currentTeamIndex === 0}>
                    <IoIosArrowBack />
                  </button>
                  <p> {currentTeamIndex + 1} 0f {Groups.length} </p>
                  <button className={` ${currentTeamIndex === Groups.length - 1 && 'bg-opacity-70'} bg-epsilon p-2 rounded-full text-white`} onClick={nextTeam} disabled={currentTeamIndex === Groups.length - 1}>
                    <IoIosArrowForward />
                  </button>
                </section>
              </header>
            </header>
          </div>
        </section>
      </div>
    </>
  );
}
