import React, { useState, useEffect } from 'react';
import Sidebar from '../../layout/Sidebar.jsx'
import profileImage from '../../../assets/images/Profile.png'
import { MdOutlineGroupOff } from "react-icons/md";
import UserNavbar from '../../layout/Navs/UserNavbar.jsx'
import Loader from '../../layout/Loader.jsx';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
export default function ResearcherSupervisor() {
    const [showNoSupervisor, setNoSUpervisor] = useState(false);
    const [supervisors, setSupervisor] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        let isMounted = true;
        let hasFetched = false;
        const fetchResearcherTeam = async () => {
            if (hasFetched) return;
            hasFetched = true;
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/team/getResearcherTeam`, {
                    method: "GET",
                    redirect: "follow",
                    credentials: "include",
                });
                if (!response.ok) {
                    setLoading(false);
                    setNoSUpervisor(true);
                    return;
                }
                const result = await response.json();
                if (isMounted) {
                    const supervisorArray = Array.isArray(result.team?.supervisors) ? result.team.supervisors : [];
                    setSupervisor(supervisorArray)
                    if (result.success) {
                        setLoading(false);
                        if (Array.isArray(result.team?.supervisors) && result.team.supervisors.length === 0) {
                            setNoSUpervisor(true);
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
        fetchResearcherTeam();
        return () => {
            isMounted = false;
        };
    }, []);
    useEffect(() => {
    }, []);
    if (loading) {
        return <Loader />;
    }
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="flex  xl:flex-row flex-col min-h-[100vh]    font-Satoshi-Black overflow ">
                <Sidebar pageName='supervisors' />
                <section className=' w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
                    <UserNavbar />
                    {!showNoSupervisor && (
                        <>
                            <div className='xl:m-10 m-5'>
                                <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'>Project Supervisor</h1>
                                {supervisors.map((supervisor, index) => (
                                    <header
                                        key={index}
                                        className='bg-white shadow-sm my-5 p-10'>
                                        <div className="flex flex-wrap gap-5 md:flex-row flex-col">
                                            <section className="flex gap-2 items-center font-Satoshi-Black">
                                                <div className="flex justify-center items-center min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]">
                                                    <img className="rounded-full" src={supervisor.pfp || profileImage} alt={`profile image`} />
                                                </div>
                                                <div className="py-5">
                                                    <p className="text-[1rem] font-bold  md:full truncate w-[150px]">{supervisor.fullname}</p>
                                                    <p className="text-light  md:full truncate w-[150px]">{supervisor.workemail}</p>
                                                    <p className="text-light  md:full truncate w-[150px]">{supervisor.experience?.company || ''}</p>
                                                </div>
                                            </section>
                                        </div>
                                    </header>
                                ))}
                                {showNoSupervisor && (<>
                                    <header className='bg-white shadow-sm my-5 p-10'>
                                        <h1 className='font-semibold  flex items-center gap-2'
                                        >
                                            <MdOutlineGroupOff className='text-2xl' />
                                            Supervisor Not Found
                                        </h1>
                                    </header>
                                </>)}
                            </div>
                        </>
                    )}
                </section>
            </div>
        </>
    )
}
