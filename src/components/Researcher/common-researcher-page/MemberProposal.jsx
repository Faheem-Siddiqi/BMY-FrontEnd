import Sidebar from '../../layout/Sidebar.jsx';
import UserNavbar from '../../layout/Navs/UserNavbar.jsx';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import Proposal from '../proposals/Proposal.jsx';
import { ImFilesEmpty } from "react-icons/im";
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
                        id: result.notAcceptedProposals && result.notAcceptedProposals.length > 0
                            ? (result.notAcceptedProposals[0]._id ? result.notAcceptedProposals[0]._id : ' ')
                            : ' ',
                        cretaedAt: result.notAcceptedProposals && result.notAcceptedProposals.length > 0 && result.notAcceptedProposals[0].createdAt
                            ? (() => {
                                const date = new Date(result.notAcceptedProposals[0].createdAt);
                                // const day = date.getDate().toString().padStart(2, '0');
                                const number = result.notAcceptedProposals[0].proposalId ? result.notAcceptedProposals[0].proposalId : 'N/A'
                                const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
                                const year = date.getFullYear();
                                return `${number}-${month}-${year}`;
                            })()
                            : 'N/A',
                        sections: result.notAcceptedProposals && result.notAcceptedProposals.length > 0
                            ? (result.notAcceptedProposals[0].sections ? result.notAcceptedProposals[0].sections : {})
                            : ' ',
                        title: result.notAcceptedProposals && result.notAcceptedProposals.length > 0
                            ? (result.notAcceptedProposals[0].title ? result.notAcceptedProposals[0].title : ' ')
                            : ' ',
                        status: result.notAcceptedProposals && result.notAcceptedProposals.length > 0
                            ? (result.notAcceptedProposals[0].status ? result.notAcceptedProposals[0].status : ' ')
                            : ' ',
                        lead: result.notAcceptedProposals && result.notAcceptedProposals.length > 0
                            ? (result.notAcceptedProposals[0].creator && result.notAcceptedProposals[0].creator.fullname
                                ? result.notAcceptedProposals[0].creator.fullname
                                : ' ')
                            : ' ',
                        reviews: result.notAcceptedProposals && result.notAcceptedProposals.length > 0
                            ? (Array.isArray(result.notAcceptedProposals[0].reviews)
                                ? (result.notAcceptedProposals[0].reviews.length > 0
                                    ? result.notAcceptedProposals[0].reviews
                                    : [])
                                : [])
                            : [],
                    };
                    setProposalDetail(formattedProposal);
                    // console.log(formattedProposal)
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
                            <div
                                onClick={() => window.history.back()}
                                className='group flex items-center cursor-pointer gap-1'>
                                <MdOutlineKeyboardBackspace className=' group-hover:-translate-x-1  duration-500 ' />
                                <button
                                    className='font-semibold'
                                > Go Back</button>
                            </div>
                        </div>
                        <header className='bg-white shadow-sm my-5 px-5 py-5 md:py-10 w-full'>
                            <h1 className='text-lg  italics mb-2 italic font-Satoshi-Black'>{proposalDetail.title}</h1>
                            <div>
                                <span className='font-bold my-2'> Proposal Id</span>
                                <span className='mx-2 my-2 text-epsilon'>
                                    BMY-
                                    <span>
                                        {proposalDetail.cretaedAt || 'N/A'}
                                    </span>
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
                            {/* {sectionAssigned && sectionAssigned.length > 0 ? (
                                sectionAssigned.map((section, index) => (
                                    <Proposal
                                        key={index}
                                        assignProposal={section.section}
                                        MemberproposalId={proposalDetail.id}
                                    />
                                ))
                            )
                                : (
                                    <header className='bg-white shadow-sm my-5 p-5 md:p-10 '>
                                        <h1 className='font-semibold  mb-3 flex items-center gap-2' >
                                            <ImFilesEmpty className='text-2xl ' />
                                            No Section assigned yet</h1>
                                        <p>The Team Lead hasn’t assigned any section yet</p>
                                    </header>
                                )} */}
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
