import React, { useState, useEffect } from 'react';
import Sidebar from '../layout/Sidebar.jsx';
import UserNavbar from '../layout/Navs/UserNavbar.jsx';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import DiscussionModal from '../Researcher/proposals/proposal-reviews/DiscussionModal.jsx';
import AssignERCs from './AssignERCs.jsx';
import ProposalForLead from '../Researcher/proposals/ProposalForLead.jsx';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import Loader from '../layout/Loader.jsx';
import { useParams } from 'react-router-dom';
import { getCookie } from "cookies-next";

export default function ErcHeadViewProposal() {
    const [undefineSectionQuestions, setSectionQnasUndefine] = useState(false);
    const [ErcHeadDataToggle, setHeadDataToggle] = useState(false);
    const [ercMembers, setErcMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [proposalDetail, setProposalDetail] = useState({});
    const { proposalId } = useParams();
    const updateHeadDataToggle = (newValue) => {
        setHeadDataToggle(newValue);
    };
    useEffect(() => {
        const fetchAllErcs = async () => {
            try {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                const token = getCookie("token");
                myHeaders.append("Authorization", `Bearer ${token}`);
                const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/teams/getAllErcMembers`, {
                    method: "GET",
                    redirect: "follow",
                    headers: myHeaders,
                    credentials: 'include'
                });
                if (!response.ok) throw new Error('Network response was not ok');
                const result = await response.json();
                if (result.success) {
                    setErcMembers(result?.ercMembers ?? []);
                } else {
                    toast.error("Failed to load ERC members.");
                }
            } catch (error) {
                toast.error(`Error fetching ERC members: ${error.message}`);
            }
        };
        const fetchProposalById = async () => {
            if (!proposalId) {
                toast.error('Proposal ID is Missing. Make sure you don\'t change the URL.');
                return;
            }
            try {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                const token = getCookie("token");
                myHeaders.append("Authorization", `Bearer ${token}`);
                const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/by-id/${proposalId}`, {
                    method: 'GET',
                    redirect: 'follow',
                    headers: myHeaders,
                    credentials: 'include',
                });
                if (!response.ok) throw new Error('Network response was not ok');
                const result = await response.json();
                if (result.success) {
                    const proposal = result.proposal || {};
                    const formattedProposal = {
                        id: proposal._id || 'N/A',
                        title: proposal.title || 'No title',
                        status: proposal.status || 'Unknown',
                        lead: proposal.creator?.workemail || 'Unknown',
                        sections: proposal.sections || {},
                        reviews: Array.isArray(proposal.reviews) ? proposal.reviews : [],
                    };
                    setProposalDetail(formattedProposal);
                } else {
                    toast.error('Proposal not found.');
                }
            } catch (error) {
                toast.error(`Error fetching proposal: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };
        // Fetch data when component mounts or when proposalId or ErcHeadDataToggle changes
        fetchProposalById();
        fetchAllErcs();
    }, [proposalId, ErcHeadDataToggle]);
    async function handleApprove() {
        try {
            if (!proposalId) {
                toast.error('Proposal ID is Missing. Make sure you don\'t change the URL.');
                return;
            }
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const token = getCookie("token");
            myHeaders.append("Authorization", `Bearer ${token}`);
            const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/submit-to-erc-head`, {
                method: 'PATCH',
                redirect: 'follow',
                credentials: 'include',
                headers: myHeaders,
                body: JSON.stringify({
                    proposalId: proposalDetail.id,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                toast.success('Proposal successfully submitted to ERC head');
                return data;
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to submit proposal');
            }
        } catch (error) {
            toast.error(`Error submitting proposal: ${error.message}`);
        }
    }
    if (loading) {
        return <Loader />;
    }
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="flex xl:flex-row flex-col min-h-[100vh] font-WorkSans-Regular overflow-hidden">
                <Sidebar pageName='all-proposals' />
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
                            <h1 className='text-lg  font-semibold italics mb-2 italic font-Satoshi-Black'>
                                {proposalDetail.title}</h1>
                            <span className='font-bold my-2'> Proposal Id</span>
                            <span className='mx-2 my-2 font-normal text-epsilon'>
                                BMY-{proposalDetail.id ? proposalDetail.id.slice(-4) : 'N/A'}
                            </span>
                            <div className='my-2'>
                                <span className='font-bold'>Lead:</span>
                                <span className='mx-2'>{proposalDetail.lead}</span>
                            </div>
                            <div className='my-2'>
                                <span className='font-bold'>Ethical Risk Score:</span>
                                <span className='mx-2'>
                                    {proposalDetail?.sections?.ethicalReview?.questions?.['Ethical Risk'] ?? 'N/A'}
                                </span>
                            </div>
                            <div className='my-2'>
                                <span className='font-bold'>Benefit Score:</span>
                                <span className='mx-2'>
                                    {proposalDetail?.sections?.ethicalReview?.questions?.['Benefit Score'] ?? 'N/A'}
                                </span>
                            </div>
                            <div className='flex md:flex-row flex-col mt-5 gap-5 md:gap-3 md:items-center'>
                                <AssignERCs
                                    members={ercMembers}
                                />
                                <DiscussionModal memberData={proposalDetail} memberDataToggle={updateHeadDataToggle} />
                            </div>
                        </header>
                        <ProposalForLead
                            LeadproposalData={proposalDetail}
                            setSectionQnasUndefine={setSectionQnasUndefine}
                        />
                    </div>
                </section>
            </div>
        </>
    );
}
