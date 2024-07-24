import React, { useContext } from 'react';
import AppContext from '../../AppContext';
import { useState } from 'react';
import { MdDashboard, MdMarkEmailUnread } from 'react-icons/md';
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
            {
                id: 1,
                icon: <MdDashboard
                    className='text-xl' />,
                text: 'Dashboard',
                link: '/group-lead-dashboard',
                page: 'group-lead-dashboard'
            },
            {
                id: 2,
                icon: <MdMarkEmailUnread
                    className='text-xl' />,
                text: 'Supervisors',
                link: '/supervisor',
                page: 'supervisors'
            },
            {
                id: 3,
                icon: <FaUsers
                    className='text-xl' />,
                text: 'Proposals',
                link: '/group-lead-proposal',
                page: 'teamLead-proposals'
            },
            {
                id: 4,
                icon: <IoDocuments
                    className='text-xl' />,
                text: 'Team',
                link: '/group-lead-team',
                page: 'LeadTeams'
            },
        ];
    }
    if (role === 'supervisor') {
        var sidebarItems = [
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
                    className='text-2xl' />,
                text: 'ERC Panel',
                link: '/view-erc-team',
                page: 'view-erc-team'
            },
        ];
    }
    if (role === 'researchers') {
        var sidebarItems = [
            {
                id: 1,
                icon: <MdDashboard className='text-xl' />,
                text: 'Dashboard',
                link: '/dashboard',
                page: 'researcher-dashboard'
            },
            {
                id: 2,
                icon: <FaUsers className='text-xl' />,
                text: 'Teams',
                link: '/researcher-team',
                page: 'team-members'
            },
            {
                id: 3,
                icon: <MdMarkEmailUnread className='text-xl' />,
                text: 'Supervisors',
                link: '/supervisor',
                page: 'supervisors'
            },
            {
                id: 4,
                icon: <IoDocuments className='text-xl' />,
                text: 'Proposals',
                link: '/researcher-proposal',
                page: 'researcher-proposals'
            },
        ];
    }
    const [propPassedPage, setPageName] = useState(pageName);
    const [hideSidebar, setToggleHideSidebar] = useState(false)
    const sidebarClass = 'font-Satoshi-Black flex justify-between items-center my-1 md:my-2 px-1 cursor-pointer';
    const sidebarLinks = 'flex w-full py-2 px-4 items-center gap-2 hover:text-darkGolden duration-200';
    return (
        <>
            <div className='xl:w-[15%] xl:h-screen  bg-iota w-full relative font-Satoshi-Black  text-black text-[18px]'>
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
                            className={` ${propPassedPage === item.page ? 'bg-lightBg font-semibold  font-semibold text-primary' : 'hover:bg-lightBg hover:text-primary duration-200 '} ${sidebarClass}`}
                        >
                            <Link to={item.link} className={sidebarLinks}>
                                {item.icon}
                                <p className='text-base'>{item.text}</p>
                            </Link>
                        </section>
                    ))}
                </>)}
            </div>
        </>
    );
};
export default Sidebar;
