import React, { useState, useRef } from 'react';
import Sidebar from './../layout/Sidebar';
import Affiliation from './Affiliation';
import Signature from './Signature';
import PersonalInformation from './PersonalInformation';
export default function EditProfile() {
  return (
    <>
      <header className="flex  xl:flex-row flex-col h-[100vh] font-Satoshi-Black   ">
        <Sidebar pageName='profile' />
        <header className='w-full xl:w-[85%] bg-lightBackground overflow-y-auto '>
          <nav className='bg-orange-400 w-full'> NAV BAR CONTENT</nav>
          <div className='xl:px-10 px-5'>
          <PersonalInformation />
          <Affiliation />
          <Signature />
          </div>
         
        </header>
      </header>
    </>
  );
}
