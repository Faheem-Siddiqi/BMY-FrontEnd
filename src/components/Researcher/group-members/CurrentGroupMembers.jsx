import React from 'react'
import profileImage from '../../../assets/images/Profile.png'
import DeleteMembers from '../../modals/DeleteMembers.jsx';
export default function CurrentGroupMembers() {
    return (
        <>
            <header className='bg-white shadow-sm my-10 p-10'>
                <div className="grid md:grid-cols-2 grid-col-1 md:gap-10">
                    <div>
                        <h1 className='font-semibold  text-lg'>Groud Lead</h1>
                        <section className='flex gap-2 my-5 items-center px-2 font-Satoshi-Black'>
                            <div className='flex justify-center items-center min-w-[70px] min-h-[70px] max-w-[70px] max-h-[70px]'>
                                <img className='rounded-full ' src={profileImage} alt='profile image' />
                            </div>
                            <div className='py-5'>
                                <p className='text-[1rem] font-bold'>Lead</p>
                                <p className='text-light text-sm font-semibold'>Country</p>
                                <p className='text-light text-sm font-semibold'>    </p>
                            </div>
                        </section>
                        <h1 className='font-semibold  text-lg'>Group</h1>
                        <div id='members' className=" grid md:grid-cols-2 grid-col-1">
                            <section className='flex gap-2  items-center  font-Satoshi-Black'>
                                <div className='flex justify-center items-center min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]'>
                                    <img className='rounded-full ' src={profileImage} alt='profile image' />
                                </div>
                                <div className='py-5'>
                                    <p className='text-[1rem] font-bold'>Faheem Siddiqi</p>
                                    <p className='text-light text-sm font-semibold'>Country</p>
                                    <DeleteMembers />
                                </div>
                            </section>
                            <section className='flex gap-2  items-center  font-Satoshi-Black'>
                                <div className='flex justify-center items-center min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]'>
                                    <img className='rounded-full ' src={profileImage} alt='profile image' />
                                </div>
                                <div className='py-5'>
                                    <p className='text-[1rem] font-bold'>Faheem Siddiqi</p>
                                    <p className='text-light text-sm font-semibold'>Country</p>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div>
                        <h1 className='font-semibold  text-lg'>Supervisor</h1>
                        <section className='flex gap-2 my-5 items-center px-2 font-Satoshi-Black'>
                            <div className='flex justify-center items-center min-w-[85px] min-h-[85px] max-w-[85px] max-h-[85px]'>
                                <img className='rounded-full ' src={profileImage} alt='profile image' />
                            </div>
                            <div className='py-5'>
                                <p className='text-[1rem] font-bold'>Select Supervisor from </p>
                                <p className='text-light text-sm font-semibold'>Designation</p>
                                <p className='text-light text-sm '>Agr request bji we to pedning ajie else ni bji to default image</p>
                            </div>
                        </section>
                    </div>
                </div>
            </header>
        </>
    )
}
