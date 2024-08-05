// From Normal Researcher 
import React from 'react'
import Sidebar from '../../layout/Sidebar.jsx'
import profileImage from '../../../assets/images/Profile.png'
import Table from '../../Common/Table.jsx'
import CreateSvg from '../../../assets/svgs/CreateSvg.jsx'
import UserNavbar from '../../layout/Navs/UserNavbar.jsx'
export default function Supervisor() {
    return (
        <>
            <div className="flex  xl:flex-row flex-col min-h-[100vh]    font-Satoshi-Black overflow ">
                <Sidebar pageName='supervisors' />
                <section className=' w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
                    <UserNavbar />
                    <header className='xl:px-10 px-5 my-5'>
                        <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '>Supervisors </h1>
                        <p className='font-semibold my-2'>All Supervisors Available</p>
                    </header>
                    <div className='xl:m-10 m-5'>
                        <div className="flex md:justify-end my-5 ">
                            <div className='w-full md:px-0 px-5 md:w-[30%] h-fit relative'>
                                <input
                                    name='search-name'
                                    id='search-name'
                                    className='border rounded-md block py-2 bg-lightBackground border-stone-300 px-2 w-full outline-none' type="text" placeholder='Search' />
                                <CreateSvg className='md:block hidden' />
                            </div>
                        </div>
                        <Table
                            className='w-full'
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
                            header={[' Supervisors', 'Institution', 'Designation', 'Requests']}
                            rowRenderComponent='supervisorsRow'
                        />
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
                                    </div>
                                </section>
                            </div>
                        </header>
                        <header className='bg-white shadow-sm my-5 p-10'>
                            <div className="">
                                <p className=' font-bold my-4'>Project Supervisor </p>
                                <p className=' '>Project Supervisor Not Found</p>
                            </div>
                        </header>
                    </div>
                </section>
            </div>
        </>
    )
}