import Sidebar from '../../layout/Sidebar.jsx';
import UserNavbar from '../../layout/Navs/UserNavbar.jsx';
import { MdOutlineKeyboardBackspace, MdFileDownloadDone } from "react-icons/md";
import Proposal from '../proposals/Proposal.jsx';
import toast, { Toaster } from "react-hot-toast";
import Loader from '../../layout/Loader.jsx'
import React, { useEffect, useState } from 'react';
import DiscussionModal from '../proposals/proposal-reviews/DiscussionModal.jsx'
export default function MemberProposal() {
    const [memberDataToggle, setMemberDataToggle] = useState(false)
    const [sectionAssigned, setSectionAssigned] = useState([]);
    const [loading, setLoading] = useState(false);
    const [proposalDetail, setProposalDetail] = useState({});
    const updateMemberDataToggle = (newValue) => {
        setMemberDataToggle(newValue);
    };
    useEffect(() => {
        const fetchProposal = async () => {
            try {
                setLoading(true);
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
                    const formattedProposal = {
                        id: result.notAcceptedProposals[0]._id,
                        title: result.notAcceptedProposals[0].title || ' ',
                        status: result.notAcceptedProposals[0].status || ' ',
                        lead: result.notAcceptedProposals[0].creator.fullname || ' ',
                        reviews: Array.isArray(result.notAcceptedProposals[0].reviews) && result.notAcceptedProposals[0].reviews.length > 0
                            ? result.notAcceptedProposals[0].reviews
                            : [],
                    };
                    setProposalDetail(formattedProposal);
                    //console.log(proposalDetail)
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
            setLoading(true);
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
                    setSectionAssigned(result.assignedSections);
                } else {
                    toast.error('Failed to load assigned sections.');
                }
            } catch (error) {
                toast.error(`Error: ${error.message}`);
            } finally {
                setLoading(false);
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
                            <h1 className='text-xl  md:text-3xl font-bold font-Satoshi-Black  '> Proposal </h1>
                            <div className='group flex items-center gap-1'>
                                <MdOutlineKeyboardBackspace className=' group-hover:-translate-x-1  duration-500 ' />
                                <button
                                    className='font-semibold'
                                    onClick={() => window.history.back()}> Go Back</button>
                            </div>
                        </div>
                        <header className='bg-white shadow-sm my-5 px-5 py-5 md:py-10 w-full'>
                            <h1 className='text-lg md:text-2xl font-bold font-Satoshi-Black'>{proposalDetail.title}</h1>
                            <div>
                                <span className='font-bold my-2'> Proposal Id</span>
                                <span className='mx-2 my-2 text-epsilon w-[10px] truncate'>
                                    BMY-{proposalDetail.id ? proposalDetail.id.slice(-4) : 'N/A'}
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
                            {sectionAssigned.map((section, index) => (
                                <Proposal
                                    key={index}
                                    assignProposal={section.section}
                                    MemberproposalId={proposalDetail.id} />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
