import React, { useState, useEffect } from 'react'
import Sidebar from '../../layout/Sidebar.jsx'
import { MdAdd } from "react-icons/md";
import CurrentMembers from '../group-members/CurrentGroupMembers.jsx'
import { Link } from 'react-router-dom';
import UserNavbar from '../../layout/Navs/UserNavbar.jsx'
import Loader from '../../layout/Loader.jsx';
import toast, { Toaster } from "react-hot-toast";
import { getCookie } from "cookies-next";

export default function ResercherLeadTeam() {
    const [loading, setLoading] = useState(false);
    const [leadTeam, setLeadTeam] = useState([])
    const [Team, setTeam] = useState([])
    const [showCreateTeam, setShowCreateTeam] = useState(false)
    useEffect(() => {
        let isMounted = true;
        const fetchLeadTeam = async () => {
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
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                if (isMounted) {
                    if (result.success) {
                        console.log(result)
                        setLoading(false);
                        if (result.team.researchers.length === 0) {
                            setShowCreateTeam(true)
                        }
                        else {
                            setLeadTeam(result.team.researchers)
                            setTeam(result)
                        }
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
        fetchLeadTeam();
        return () => {
            isMounted = false;
        };
    }, []);
    if (loading) {
        return <Loader />;
    }
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="flex  xl:flex-row flex-col   font-Satoshi-Black  ">
                <Sidebar pageName='group-lead-team' />
                <section className=' w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
                    <UserNavbar />
                    <div className='xl:m-10 m-5  '>
                        <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '>Group Members</h1>
                        {showCreateTeam && (<>
                            <header className='bg-white shadow-sm my-5 p-5 md:p-10 '>
                                <Link to='/add-team-members'>
                                    <div className='h-[40vh] md:w-[60%] w-full mx-auto bg-lightEpsilon border-2 border-dashed flex flex-col items-center justify-center border-epsilon  p-10 rounded-md'>
                                        <MdAdd className='text-epsilon text-5xl border-2 border-dashed rounded-full border-epsilon my-4 ' />
                                        <h1 className='font-semibold text-xl'>Create Team</h1>
                                    </div>
                                </Link>
                            </header>
                        </>)}
                        {!showCreateTeam && (<>
                            <p className='font-semibold my-2'>
                                {leadTeam.length}{' '}
                                {leadTeam.length === 1 ? 'Member' : 'Members'}
                            </p>
                            <CurrentMembers
                                myMembers={Team} />
                            <Link
                                to='/add-team-members'
                                className="my-5 py-4 px-7  font-semibold rounded-md group relative overflow-hidden  bg-epsilon  text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon ">
                                <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                                Add Members
                            </Link>
                        </>)}
                    </div>
                </section>
            </div>
        </>
    )
}
