import React, { useContext } from 'react';
import AppContext from '../../AppContext';
import { BiLogOut } from 'react-icons/bi';
import { useState } from 'react';
import { MdDashboard, MdMarkEmailUnread } from 'react-icons/md';
import { TiEdit } from 'react-icons/ti';
import { FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IoDocuments } from "react-icons/io5";
import profileImage from '../../assets/images/bena.jpg';
import { VscThreeBars } from "react-icons/vsc";
import { PiUserCircleGearFill } from "react-icons/pi";
const Sidebar = ({ pageName }) => {
    const { role } = useContext(AppContext);
    if (role === 'group-lead') {
        var sidebarItems = [
            // RE-SEARCHERS
            {
                id: 1,
                icon: <MdDashboard
                    className='text-xl' />,
                text: 'Dashboard',
                link: '/',
                page: 'researcher-dashboard'
            },
            {
                id: 2,
                icon: <FaUsers
                    className='text-xl' />,
                text: 'Teams',
                link: '/researcher-team',
                page: 'team-members'
            },
            {
                id: 3,
                icon: <MdMarkEmailUnread
                    className='text-xl' />,
                text: 'Supervisors',
                link: '/supervisor',
                page: 'supervisors'
            },
        
            {
                id: 4,
                icon: <IoDocuments
                    className='text-xl' />,
                text: 'Proposals',
                link: '/researcher-proposal',
                page: 'researcher-proposals'
            },
            {
                id: 5,
                icon: <FaUsers
                    className='text-xl' />,
                text: 'LeadProposals',
                link: '/group-lead-proposal',
                page: 'teamLead-proposals'
            },
            {
                id: 6,
                icon: <IoDocuments
                    className='text-xl' />,
                text: 'teamLead-team',
                link: '/group-lead-team',
                page: 'LeadTeams'
            },
        ];
    }
    if (role === 'supervisor') {
        var sidebarItems = [
            // RE-SEARCHERS
            {
                id: 1,
                icon: <MdDashboard
                    className='text-xl' />,
                text: 'Dashboard',
                link: '/supervisor-dashboard',
                page: 'supervisor-dashboard'
            },
            {
                id: 2,
                icon: <FaUsers
                    className='text-xl' />,
                text: 'Teams',
                link: '/supervisor-teams',
                page: 'supervisor-teams'
            },
            {
                id: 3,
                icon: <IoDocuments
                    className='text-xl' />,
                text: 'Proposals',
                link: '/supervisor-proposal',
                page: 'supervisor-proposal'
            },
            {
                id: 4,
                icon: <PiUserCircleGearFill
                    className='text-xl' />,
                text: 'ERC Panel',
                link: '/view-erc-team',
                page: 'view-erc-team'
            },
        ];
    }
    // var sidebarItems = [
    //     {
    //         id: 1,
    //         icon: <MdDashboard
    //             className='text-xl' />,
    //         text: 'Dashboard',
    //         link: '/',
    //         page: 'researcher-dashboard'
    //     },
    //     {
    //         id: 2,
    //         icon: <FaUsers
    //             className='text-xl' />,
    //         text: 'Teams',
    //         link: '/researcher-team',
    //         page: 'team-members'
    //     },
    //     {
    //         id: 3,
    //         icon: <MdMarkEmailUnread
    //             className='text-xl' />,
    //         text: 'Supervisors',
    //         link: '/supervisor',
    //         page: 'supervisors'
    //     },
    //     // only researcher with status as team head
    //     {
    //         id: 4,
    //         icon: <IoDocuments
    //             className='text-xl' />,
    //         text: 'Proposals',
    //         link: '/researcher-proposal',
    //         page: 'researcher-proposals'
    //     },
    //     {
    //         id: 5,
    //         icon: <FaUsers
    //             className='text-xl' />,
    //         text: 'LeadProposals',
    //         link: '/group-lead-proposal',
    //         page: 'teamLead-proposals'
    //     },
    //     {
    //         id: 6,
    //         icon: <IoDocuments
    //             className='text-xl' />,
    //         text: 'teamLead-team',
    //         link: '/group-lead-team',
    //         page: 'LeadTeams'
    //     },
    // ];
    const [propPassedPage, setPageName] = useState(pageName);
    const [hideSidebar, setToggleHideSidebar] = useState(false)
    const sidebarClass = 'font-Satoshi-Black flex justify-between items-center my-1 md:my-2 px-1 cursor-pointer';
    const sidebarLinks = 'flex w-full py-2 px-4 items-center gap-2 hover:text-darkGolden duration-200';
    return (
        <>
            <div className='xl:w-[15%]  bg-iota w-full relative font-Satoshi-Black  text-black text-[18px]'>
                <div className='flex xl:justify-center items-center justify-between xl:mx-0 mx-5 mt-5'>
                    <section className='font-CormorantGaramond-Regular items-center justify-center flex flex-col w-fit mb-4'>
                        <h1 className='text-3xl text-center gap-1 flex'>
                            <p className='text-zeta font-bold'>BMY</p>
                            <p className='text-primary font-semibold'>Health</p>
                        </h1>
                        <p className='font-light text-lg text-mist'>Pakistan</p>
                    </section>
                    <button onClick={() => { setToggleHideSidebar(!hideSidebar) }} className='xl:hidden block mb-5' >
                        <VscThreeBars className='duration-200 hover:text-epsilon text-3xl ' />
                    </button>
                </div>
                {/* Menu */}
                {!hideSidebar && (<>
                    {sidebarItems.map(item => (
                        <section
                            key={item.id}
                            className={` ${propPassedPage === item.page ? 'bg-lightBg   text-primary' : 'hover:bg-lightBg hover:text-primary duration-200 '} ${sidebarClass}`}
                        >
                            <Link to={item.link} className={sidebarLinks}>
                                {item.icon}
                                <p className='text-base'>{item.text}</p>
                            </Link>
                        </section>
                    ))}
                    <header className='xl:absolute bottom-1'>
                        <section className={`${sidebarClass}`}>
                            <div className={sidebarLinks}>
                                <BiLogOut />
                                <p>Logout</p>
                            </div>
                        </section>
                        <div className='flex justify-center'>
                            <hr className='my-2 border-[1.2px] w-full xl:ml-5' />
                        </div>
                        <div className='flex gap-2 items-center px-2 font-Satoshi-Black'>
                            <div className='flex justify-center items-center min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px]'>
                                <img className='rounded-full' src={profileImage} alt='profile image' />
                            </div>
                            <div className='py-5'>
                                <p className='text-[1rem]'>Faheem Siddiqi</p>
                                <p className='text-light text-sm'>Role</p>
                                <Link to='/edit-profile' className='text-light text-sm flex items-center gap-1 cursor-pointer'>
                                    <TiEdit className='inline text-[1rem]' />
                                    <p>Edit</p>
                                </Link>
                            </div>
                        </div>
                    </header>
                </>)}
            </div>
        </>
    );
};
export default Sidebar;
