import React, { useState, useEffect } from 'react';
import Sidebar from '../../layout/Sidebar.jsx';
import profileImage from '../../../assets/images/Profile.png';
import Table from '../../Common/Table.jsx';
import CreateSvg from '../../../assets/svgs/CreateSvg.jsx';
import UserNavbar from '../../layout/Navs/UserNavbar.jsx';
import DefaultImage from '../../../assets/images/Profile.png';
import Loader from '../../layout/Loader.jsx';
import { MdOutlineGroupOff } from "react-icons/md";
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { getCookie } from "cookies-next";
// Debounce function to delay input handling
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};
export default function Supervisor() {
    const [teamId, setTeamId] = useState('')
    const [showNoSupervisor, SetShowNoSupervisor] = useState(false);
    const [mySupervisors, setMySupervisors] = useState({});
    const [loading, setLoading] = useState(false);
    const [supervisors, setSupervisors] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // Search query state
    const debouncedSearchQuery = useDebounce(searchQuery, 300); // Debounce search query
    useEffect(() => {
        let isMounted = true; // Flag to prevent state updates on unmounted components
        let hasFetched = false; // Flag to prevent multiple fetches
        const fetchResearcherTeam = async () => {
            if (hasFetched) return; // Prevent additional fetch
            hasFetched = true;
            setLoading(true);
            try {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                const token = getCookie("token");
                myHeaders.append("Authorization", `Bearer ${token}`);
                const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/team/getOwnerTeam`, {
                    method: "GET",
                    redirect: "follow",
                    headers: myHeaders,
                    credentials: "include",
                });
                if (!response.ok) {
                    setLoading(false);
                    fetchAllSupervisors();
                    SetShowNoSupervisor(true);
                    return;
                }
                const result = await response.json();
                if (isMounted) {
                    if (result.success) {
                        setMySupervisors(result.team.supervisors);
                        setLoading(false);
                        setTeamId(result.team._id)
                        if (result.supervisors && Object.keys(result.supervisors).length > 0) {
                            SetShowNoSupervisor(false);
                        } else {
                            SetShowNoSupervisor(true);
                            fetchAllSupervisors();
                        }
                    }
                }
            } catch (error) {
                if (isMounted) {
                    console.error(error);
                    toast.error("An error occurred while fetching user details.");
                }
            }
        };
        const fetchAllSupervisors = async () => {
            setLoading(true);
            try {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                const token = getCookie("token");
                myHeaders.append("Authorization", `Bearer ${token}`);
                const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/teams/getAllSupervisors`, {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow",
                });
                if (!response.ok) {
                    setLoading(false);
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                if (isMounted) {
                    if (result.success) {
                        
                        const formattedSupervisors = result.supervisors.map(supervisors => ({
                            id: supervisors._id,
                            profileImage: supervisors.pfp ? supervisors.pfp : '',
                            name: supervisors.fullname ? supervisors.fullname : '',
                            email: supervisors.workemail ? supervisors.workemail : '',
                            institution: supervisors.experience?.company ? supervisors.experience.company : 'No Data Available',
                            designation: supervisors.experience?.designation ? supervisors.experience.designation : 'No Data Available'
                        }));
                        setSupervisors(formattedSupervisors);
                        setLoading(false);
                    } else {
                        toast.error("Failed to load user details.");
                    }
                }
            } catch (error) {
                if (isMounted) {
                    toast.error("An error occurred while fetching user details.");
                }
            }
        };
        fetchResearcherTeam();
        // Removed duplicated fetchAllSupervisors call
        return () => {
            isMounted = false;
        };
    }, []);
    // Filter supervisors based on search query
    const filteredSupervisors = supervisors.filter(supervisor =>
        supervisor.email.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
    if (loading) {
        return <Loader />;
    }
    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="flex xl:flex-row flex-col min-h-[100vh] font-Satoshi-Black overflow">
                <Sidebar pageName='supervisors' />
                <section className='w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
                    <UserNavbar />
                    <header className='xl:px-10 px-5 my-5'>
                        {mySupervisors && mySupervisors.length > 0 ? (
                            <>
                                <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'>Project Supervisor</h1>
                                <header className='bg-white shadow-sm my-5 p-10'>
                                    <div className="flex flex-wrap md:gap-10 gap-5 md:flex-row flex-col">
                                        {mySupervisors.map((supervisor, index) => (
                                            <section key={index} className='flex gap-2 items-center font-Satoshi-Black'>
                                                <div className='flex justify-center items-center min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]'>
                                                    <img className='rounded-full  min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]' src={supervisor.pfp || profileImage} alt='profile' />
                                                </div>
                                                <div className='py-5'>
                                                    <p className='text-[1rem] font-bold'>{supervisor.fullname}</p>
                                                    <p className='text-light'>{supervisor.workemail}</p>
                                                </div>
                                            </section>
                                        ))}
                                    </div>
                                </header>
                            </>
                        )
                            : (
                                <>
                                    <header className='bg-white shadow-sm my-5 p-10'>
                                        <h1 className='font-semibold flex items-center gap-2'>
                                            <MdOutlineGroupOff className='text-2xl' />
                                            Supervisor Not Found
                                        </h1>
                                    </header>
                                </>
                            )
                        }
                    </header>
                    <div className='xl:m-10 m-5'>
                        <>
                            <div>
                                {supervisors && supervisors.length > 0 ? (
                                    <>
                                        <h1 className='font-semibold text-lg flex items-center gap-2'>
                                            Supervisors Avaiable
                                        </h1>
                                        <div className="flex md:justify-end my-5">
                                            <div className='w-full md:px-0 px-5 md:w-[30%] h-fit relative'>
                                                <input
                                                    name='search-name'
                                                    id='search-name'
                                                    className='border rounded-md block py-2 bg-lightBackground border-stone-300 px-2 w-full outline-none'
                                                    type="text"
                                                    placeholder='Search'
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                />
                                                <CreateSvg className='md:block hidden' />
                                            </div>
                                        </div>
                                        <Table
                                            className='w-[99%]'
                                            rowData={filteredSupervisors.map(supervisor => ({
                                                supervisorId: supervisor.id,
                                                profileImage: supervisor.profileImage || DefaultImage,
                                                name: supervisor.name,
                                                email: supervisor.email,
                                                institution: supervisor.institution,
                                                designation: supervisor.designation,
                                                teamId: teamId
                                            }))}
                                            header={['Supervisors', 'Institution', 'Designation', 'Requests']}
                                            rowRenderComponent='supervisorsRow'
                                        />
                                    </>
                                ) : (
                                    <header className='bg-white shadow-sm my-5 p-10'>
                                        <h1 className='font-semibold flex items-center gap-2'>
                                            <MdOutlineGroupOff className='text-2xl' />
                                            Supervisor Not Avaiable
                                        </h1>
                                    </header>
                                )}
                            </div>
                        </>
                    </div>
                </section>
            </div>
        </>
    );
}
