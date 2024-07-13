import React from 'react'
import Sidebar from '../../layout/Sidebar.jsx'
import profileImage from '../../../assets/images/Profile.png'
import CurrentMembers from './CurrentGroupMembers.jsx'
import CreateSvg from '../../../assets/svgs/CreateSvg.jsx'

import Table from '../../Common/Table.jsx';
export default function AddTeamMembers() {
  return (
    <>
      <header className="flex  xl:flex-row flex-col h-[100vh] font-Satoshi-Black   ">
        <Sidebar pageName='profile' />
        <section className='w-full xl:w-[85%] bg-lightBackground overflow-y-auto '>
          <nav className='bg-orange-400 w-full'> NAV BAR CONTENT</nav>
          <header className='xl:px-10 px-5 my-5'>
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '> Add Team Members </h1>
            <p className='font-semibold my-2'>All Reserchers Available</p>
          </header>
          <div className='xl:m-10 m-5'>
            <div className="flex md:justify-end my-5 ">
            <div className='w-full md:px-0 px-5 md:w-[30%] h-fit relative'>
                  <input
                    name='search-name'
                    id='search-name'
                    className='border rounded-md block py-2 bg-lightBackground border-stone-300 px-2 w-full outline-none' type="text" placeholder='Search' />
                  <CreateSvg  className='md:block hidden'/>
                </div>
            </div>
            <Table
            
            className='w-[99%] '
            rowData={[
              {
                profileImage: profileImage,
                name: 'Maira Anjum',
                email: 'email1@example.com',
                institution: 'PIMS',
                designation: 'Doctor'
              },
              {
                profileImage: profileImage,
                name: 'Faheem Siddiqi',
                email: 'email1@example.com',
                institution: 'PIMS',
                designation: 'Doctor'
              },
              {
                profileImage: profileImage,
                name: 'Maira Anjum',
                email: 'email1@example.com',
                institution: 'PIMS',
                designation: 'Doctor'
              },
              {
                profileImage: profileImage,
                name: 'Faheem Siddiqi',
                email: 'email1@example.com',
                institution: 'PIMS',
                designation: 'Doctor'
              },
              {
                profileImage: profileImage,
                name: 'Maira Anjum',
                email: 'email1@example.com',
                institution: 'PIMS',
                designation: 'Doctor'
              },
              {
                profileImage: profileImage,
                name: 'Faheem Siddiqi',
                email: 'email1@example.com',
                institution: 'PIMS',
                designation: 'Doctor'
              },
            ]
            }
              header={[' Researchers', 'Institution', 'Designation', 'Requests']}
              rowRenderComponent='researchersRow'
            />
                <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '> Group- Members </h1>
            <CurrentMembers />
          </div>
        </section>
      </header>
    </>
  )
}
