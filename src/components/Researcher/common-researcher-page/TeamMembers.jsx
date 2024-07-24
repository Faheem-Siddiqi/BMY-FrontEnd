import React from 'react'
import Sidebar from '../../layout/Sidebar.jsx'
import CurrentMembers from '../group-members/CurrentGroupMembers.jsx'
import Table from '../../Common/Table.jsx';
import { Link } from 'react-router-dom';
import UserNavbar from '../../layout/Navs/UserNavbar.jsx';
export default function TeamMembers() {
    const profileImage = 's'
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
                    <section className='my-5 xl:m-10 m-5  '>
                        <p className='my-2'>You are not part of any active proposal join team. Request Team Lead to Add you in a proposal group. </p>
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
                            rowRenderComponent='ShowResearcherLeads'
                        />
                    </section>
                </section>
            </div>
        </>
    )
}
