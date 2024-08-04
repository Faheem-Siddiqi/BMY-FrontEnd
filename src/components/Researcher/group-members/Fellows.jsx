import React from 'react';
import profileImage from '../../../assets/images/Profile.png';

export default function Fellows({ myMembers }) {

  // Check if myMembers and necessary properties are defined
  if (!myMembers || !myMembers.owner || !myMembers.researchers) {
    return <div>No team data available</div>;
  }

  return (
    <>
      <header className='bg-white shadow-sm my-10 md:p-10 p-5'>
        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-10">
          <div>
            <h1 className='font-semibold text-lg'>Group Lead</h1>
            <section className='flex gap-2 my-5 items-center md:px-2 font-Satoshi-Black'>
              <div className='flex justify-center items-center min-w-[70px] min-h-[70px] max-w-[70px] max-h-[70px]'>
                <img className='rounded-full' src={myMembers.owner.pfp || profileImage} alt='profile image' />
              </div>
              <div className='py-5'>
                <p className='text-[1rem] font-bold md:full truncate w-[150px]'>{myMembers.owner.fullname}</p>
                <p className='text-light text-sm md:full truncate w-[150px]'>{myMembers.owner.workemail}</p>
              </div>
            </section>

            <h1 className='font-semibold text-lg'>Group</h1>
            <div id='members' className="flex flex-row  sm:gap-5 flex-wrap">
              {myMembers.researchers.length > 0 ? (
                myMembers.researchers.map((researcher) => (
                  <section key={researcher._id} className='flex gap-2 items-center font-Satoshi-Black'>
                    <div className='flex justify-center items-center w-[60px] h-[60px]'>
                      <img className='rounded-full w-full h-full' src={researcher.pfp || profileImage} alt='profile image' />
                    </div>
                    <div className='py-5 '>
                      <p className='text-[1rem] font-bold'>{researcher.fullname}</p>
                      <p className='text-light md:w-full text-sm md:full truncate w-[150px]'>{researcher.workemail}</p>
                    </div>
                  </section>
                ))
              ) : (
                <p className='text-light text-sm'>No researchers available</p>
              )}
            </div>
          </div>

          <div>
            <h1 className='font-semibold text-lg'>Supervisor</h1>
            <section className='flex gap-2 my-5 items-center md:px-2 font-Satoshi-Black'>
              <div className='flex justify-center items-center min-w-[85px] min-h-[85px] max-w-[85px] max-h-[85px]'>
                <img className='rounded-full' src={profileImage} alt='profile image' />
              </div>
              <div className='py-5'>
                <p className='text-[1rem] truncate w-[150px] font-bold'>Select Supervisor</p>
                <p className='text-light text-sm md:full truncate w-[150px]'>email</p>
              </div>
            </section>
          </div>
        </div>
      </header>
    </>
  );
}
