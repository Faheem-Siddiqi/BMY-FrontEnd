import Sidebar from '../../layout/Sidebar.jsx';
import UserNavbar from '../../layout/Navs/UserNavbar.jsx';
import { MdOutlineKeyboardBackspace, MdFileDownloadDone } from "react-icons/md";
import Proposal from '../proposals/Proposal.jsx';
import { Link } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import Loader from '../../layout/Loader.jsx'
import React, { useEffect, useState } from 'react';
export default function MemberProposal() {
    const [sectionAssigned, setSectionAssigned] = useState([]);
    const [loading, setLoading] = useState(true);
    const [purposalDetail, setProposalDetail] = useState({})
    useEffect(() => {
        const fetchProposal = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/by-researchers`, {
                    method: 'GET',
                    redirect: 'follow',
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                if (result.success) {
                    console.log(result)
                    const fromattedProposal = {
                        id: result.notAcceptedProposals[0]._id,
                        title: result.notAcceptedProposals[0].title ? result.notAcceptedProposals[0].title : ' ',
                        status: result.notAcceptedProposals[0].status ? result.notAcceptedProposals[0].status : ' ',
                        lead: result.notAcceptedProposals[0].creator.fullname ? result.notAcceptedProposals[0].creator.fullname : ' ',
                    }
                    setProposalDetail(fromattedProposal)
                    // console.log(fromattedProposal)
                } else {
                    toast.error('Failed to load proposal details.');
                }
            } catch (error) {
                toast.error(`Error: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };
        const fetchAssignSection = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/get-assigned-section-researcher`, {
                    method: 'GET',
                    redirect: 'follow',
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                if (result.success) {
                    setSectionAssigned(result.assignedSections)
                } else {
                    toast.error('Failed to load proposal details.');
                }
            } catch (error) {
                toast.error(`Error: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };
        fetchProposal();
        fetchAssignSection()
    }, []);
    if (loading) {
        return <Loader />;
    }
    return (
        <>
            <div className="flex xl:flex-row flex-col min-h-[100vh] font-WorkSans-Regular overflow-hidden">
                <Sidebar pageName='researcher-proposals' />
                <section className='w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
                    <UserNavbar />
                    <div className='xl:m-10 m-5'>
                        <div className="flex flex-col gap-5 md:justify-between justify-start md:items-center items-start md:flex-row">
                            <h1 className='text-xl  md:text-3xl font-bold font-Satoshi-Black  '> Proposal </h1>
                            <div className='group flex items-center gap-1'>
                                <MdOutlineKeyboardBackspace className=' group-hover:-translate-x-1  duration-500 ' />
                                <button
                                    className='font-semibold'
                                    onClick={() => window.history.back()}> Go Back</button>
                            </div>
                        </div>
                        <header className='bg-white shadow-sm my-5 px-5 py-5 md:py-10 w-full'>
                            <h1 className='text-lg md:text-2xl font-bold font-Satoshi-Black'>{purposalDetail.title}</h1>
                            <div>
                                <span className='font-bold my-2'> Proposal Id</span>
                                <span className='mx-2 my-2 text-epsilon w-[10px] truncate'>
                                    BMY-{purposalDetail.id ? purposalDetail.id.slice(-4) : 'N/A'}
                                </span>
                            </div>
                            <div>
                                <span className='font-bold my-2'>Status</span>
                                <span className='mx-2 my-2'>{purposalDetail.status}</span>
                            </div>
                            <div className="flex flex-wrap gap-5 my-5">
                                <button className="w-fit py-2 px-6 rounded-md group relative inline-flex items-center justify-center overflow-hidden border border-epsilon font-medium text-epsilon shadow-md transition duration-300 ease-out">
                                    <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-epsilon text-white duration-300 group-hover:translate-x-0">
                                        <MdFileDownloadDone className='text-2xl' />
                                        <span className='mx-2'>Submit</span>
                                    </span>
                                    <span className="ease absolute flex h-full w-full transform items-center justify-center text-epsilon transition-all duration-300 group-hover:translate-x-full">
                                        Submit
                                    </span>
                                    <span className="invisible relative">x Submit</span>
                                </button>
                            </div>
                        </header>
                        <div>
                            {sectionAssigned.map((section, index) => (
                                <Proposal key={index} assignProposal={section.section} />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
