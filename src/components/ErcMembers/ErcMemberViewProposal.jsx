import React, { useState, useEffect } from 'react';
import Sidebar from '../layout/Sidebar.jsx';
import UserNavbar from '../layout/Navs/UserNavbar.jsx';
import { MdOutlineKeyboardBackspace, MdFileDownloadDone } from "react-icons/md";
import DiscussionModal from '../Researcher/proposals/proposal-reviews/DiscussionModal.jsx';
import ProposalForLead from '../Researcher/proposals/ProposalForLead.jsx';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import Loader from '../layout/Loader.jsx';
import { useParams } from 'react-router-dom';
export default function ErcMemberViewProposal() {
    const [undefineSectionQuestions, setSectionQnasUndefine] = useState(false)
    const [ErcMemDataToggle, setMemberDataToggle] = useState(false)
    const updateMemberDataToggle = (newValue) => {
        setMemberDataToggle(newValue);
    };
    const [loading, setLoading] = useState(false)
    const [proposalDetail, setProposalDetail] = useState({});
    const { proposalId } = useParams();
    useEffect(() => {
        const fetchProposalById = async () => {
            if (!proposalId) {
                toast.error('Proposal ID is Missing. Make sure you dont change url');
                return;
            }
            try {
                setLoading(true);
                const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/by-id/${proposalId}`, {
                    method: 'GET',
                    redirect: 'follow',
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
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
                toast.error(`Error: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };
        fetchProposalById();
    }, [proposalId, ErcMemDataToggle]);



    async function handleApprove() {
        try {
            // Validate that proposalDetail is defined
            if (!proposalId) {
                toast.error('Proposal ID is Missing. Make sure you dont change url');
                console.log('proposal id is undefinded')
                throw new Error("Proposal ID is required");
            }
            const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/accept`, {
                method: 'PATCH',
                redirect: 'follow',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    proposalId: proposalDetail.id,
                }),
            });
            const responseText = await response.text();
            console.log("Response Status:", response.status);
            console.log("Response Text:", responseText);
            if (response.ok) {
                const data = JSON.parse(responseText);
                toast.success('Proposal successfully submitted to ERC head');
                return data;
            } else {
                const errorData = JSON.parse(responseText);
                throw new Error(errorData.message || 'Failed to submit proposal');
            }
        } catch (error) {
            toast.error(`Error submitting proposal: ${error.message}`);
            console.error(`Error submitting proposal: ${error.message}`);
            throw error;
        }
    }
    if (loading) {
        return <Loader />;
    }
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />

        <div className="flex xl:flex-row flex-col min-h-[100vh] font-WorkSans-Regular overflow-hidden">
            <Sidebar pageName='assigned-proposals' />
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
                            <button
                            onClick={handleApprove}
                                className="  w-fit py-2 px-6 rounded-md  group relative inline-flex items-center justify-center overflow-hidden border border-epsilon font-medium text-epsilon shadow-md transition duration-300 ease-out ">
                                <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-epsilon text-white duration-300 group-hover:translate-x-0">
                                    <MdFileDownloadDone className='text-2xl' />   <span className='mx-2'>
                                        Approve
                                    </span>
                                </span>
                                <span className="ease absolute flex h-full w-full transform items-center justify-center text-epsilontransition-all duration-300 group-hover:translate-x-full">Approve</span>
                                <span className="invisible relative"> x Approve </span>
                            </button>
                            <DiscussionModal memberData={proposalDetail} memberDataToggle={updateMemberDataToggle} />
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
