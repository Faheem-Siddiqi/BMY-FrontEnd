import React from 'react'
import Sidebar from '../../layout/Sidebar.jsx'
import CurrentMembers from '../group-members/CurrentGroupMembers.jsx'
import Table from '../../Common/Table.jsx';
import { MdOutlineGroupOff } from "react-icons/md";
import UserNavbar from '../../layout/Navs/UserNavbar.jsx';
export default function TeamMembers() {
    const profileImage = 'a'
    return (
        <>
            <div className="flex  xl:flex-row flex-col min-h-[100vh]    font-Satoshi-Black overflow ">
                <Sidebar pageName='team-members' />
                <section className=' w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
                    <UserNavbar />
                    <div className='xl:m-10 m-5  '>
                        <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '> Group Members </h1>
                        <p className='font-semibold my-2'>6 Members</p>
                        <CurrentMembers />
                    </div>
                    or
                    <section className='my-5 xl:m-10 m-5  '>
                        <header className='bg-white shadow-sm my-5 p-5 md:p-10 '>
                            <h1 className='font-semibold  flex items-center gap-2'
                            >
                                <MdOutlineGroupOff className='text-2xl' />
                                Team Not Found
                            </h1>
                        </header>
                        <p className='font-semibold my-2'>Join Now </p>
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
                            header={[' Group Lead', 'Institution', 'Designation', 'Requests']}
                            rowRenderComponent='ShowResearcherLeads'
                        />
                    </section>
                </section>
            </div>
        </>
    )
}
