import Sidebar from '../../layout/Sidebar.jsx';
import UserNavbar from '../../layout/Navs/UserNavbar.jsx';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import Proposal from '../proposals/Proposal.jsx';
import { ImFilesEmpty } from "react-icons/im";
import toast from "react-hot-toast";
import Loader from '../../layout/Loader.jsx'
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from 'react';
import DiscussionModal from '../proposals/proposal-reviews/DiscussionModal.jsx'

export default function MemberProposal() {
    const [memberDataToggle, setMemberDataToggle] = useState(false);
    const [sectionAssigned, setSectionAssigned] = useState([]);
    const [loading, setLoading] = useState(true); // Start with loading state as true
    const [proposalDetail, setProposalDetail] = useState({});
    const updateMemberDataToggle = (newValue) => {
        setMemberDataToggle(newValue);
    };
    useEffect(() => {
        const fetchProposal = async () => {
            setLoading(true);
            try {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                const token = getCookie("token");
                myHeaders.append("Authorization", `Bearer ${token}`);
                const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/by-researchers`, {
                    method: 'GET',
                    redirect: 'follow',
                    headers: myHeaders,
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                if (result.success) {
                    const proposal = result.notAcceptedProposals && result.notAcceptedProposals.length > 0
                        ? result.notAcceptedProposals[0]
                        : {};
                    const formattedProposal = {
                        id: proposal._id || ' ',
                        cretaedAt: proposal.createdAt ? (() => {
                            const date = new Date(proposal.createdAt);
                            const number = proposal.proposalId || 'N/A';
                            const month = (date.getMonth() + 1).toString().padStart(2, '0');
                            const year = date.getFullYear();
                            return `${number}-${month}-${year}`;
                        })() : 'N/A',
                        sections: proposal.sections || {},
                        title: proposal.title || ' ',
                        status: proposal.status || ' ',
                        lead: proposal.creator?.fullname || ' ',
                        reviews: Array.isArray(proposal.reviews) ? proposal.reviews : [],
                    };
                    setProposalDetail(formattedProposal);
                } else {
                    toast.error('No proposals found.');
                }
            } catch (error) {
                toast.error(`Error: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };
        const fetchAssignSection = async () => {
            try {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                const token = getCookie("token");
                myHeaders.append("Authorization", `Bearer ${token}`);
                const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/get-assigned-section-researcher`, {
                    method: 'GET',
                    redirect: 'follow',
                    headers: myHeaders,
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                if (result.success) {
                    setSectionAssigned(result.assignedSections);
                } else {
                    toast.error('Failed to load assigned sections.');
                }
            } catch (error) {
                toast.error(`Error: ${error.message}`);
            }
        };
        fetchProposal();
        fetchAssignSection();
    }, [memberDataToggle]);
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
                            <h1 className='text-xl  md:text-3xl font-bold font-Satoshi-Black'> Proposal </h1>
                            <div
                                onClick={() => window.history.back()}
                                className='group flex items-center cursor-pointer gap-1'>
                                <MdOutlineKeyboardBackspace className='group-hover:-translate-x-1 duration-500 ' />
                                <button className='font-semibold'> Go Back</button>
                            </div>
                        </div>
                        <header className='bg-white shadow-sm my-5 px-5 py-5 md:py-10 w-full'>
                            <h1 className='text-lg italics mb-2 italic font-Satoshi-Black'>{proposalDetail.title}</h1>
                            <div>
                                <span className='font-bold my-2'> Proposal Id</span>
                                <span className='mx-2 my-2 text-epsilon'>
                                    BMY-<span>{proposalDetail.cretaedAt}</span>
                                </span>
                            </div>
                            <div>
                                <span className='font-bold my-2'>Status</span>
                                <span className='mx-2 my-2'>{proposalDetail.status}</span>
                            </div>
                            <div className="flex flex-wrap gap-5 my-5">
                                <DiscussionModal memberData={proposalDetail} memberDataToggle={updateMemberDataToggle} />
                            </div>
                        </header>
                        <div>
                            <Proposal
                                proposalData={proposalDetail}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}