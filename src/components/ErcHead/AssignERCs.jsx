import { useState, useEffect } from "react";
import React from 'react';
import { IoCloseCircleSharp } from "react-icons/io5";
import { MdAssignmentAdd } from "react-icons/md";
import CreateSvg from '../../assets/svgs/CreateSvg.jsx';
import Loader from "../layout/Loader.jsx";
import toast from "react-hot-toast";
import { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';
import { getCookie } from "cookies-next";

export default function AssignERCs({ members }) {
    const { proposalId } = useParams();
    const [loading, setLoading] = useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [displayEmail, setDisplayEmail] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [selectedMemberId, setSelectedMemberId] = useState(null);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);
    useEffect(() => {
        const selectedMember = members.find(member => member.workemail === displayEmail);
        if (selectedMember) {
            setIsValidEmail(true);
            setSelectedMemberId(selectedMember._id);
        } else {
            setIsValidEmail(false);
            setSelectedMemberId(null);
        }
    }, [displayEmail, members]);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        // Update displayEmail based on searchTerm
        const selectedMember = members.find(member => member.workemail === value);
        if (selectedMember) {
            setDisplayEmail(selectedMember.workemail);
        } else {
            setDisplayEmail(""); // Reset displayEmail if no match
        }
    };
    async function handleAssign() {
        try {
            if (!proposalId) {
                toast.error('Proposal ID is Missing. Make sure you don\'t change the URL');
                console.log('Proposal ID is undefined');
                throw new Error("Proposal ID is required");
            }
            if (!selectedMemberId) {
                toast.error('Please select a valid ERC Member from the list');
                console.log('ERC Member ID is invalid');
                throw new Error("Valid ERC Member is required");
            }
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const token = getCookie("token");
            myHeaders.append("Authorization", `Bearer ${token}`);
            const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/assign-to-erc-member`, {
                method: 'PATCH',
                redirect: 'follow',
                credentials: 'include',
                headers: myHeaders,
                body: JSON.stringify({
                    proposalId: proposalId,
                    ercMemberId: selectedMemberId,
                }),
            });
            const responseText = await response.text();
            console.log("Response Status:", response.status);
            console.log("Response Text:", responseText);
            if (response.ok) {
                const data = JSON.parse(responseText);
                toast.success('Proposal successfully assigned to ERC member');
                closeModal()
                return data;
            } else {
                closeModal()
                const errorData = JSON.parse(responseText);
                throw new Error(errorData.message || 'Failed to assign proposal to ERC member');
            }
        } catch (error) {
            toast.error(`Error assigning proposal: ${error.message}`);
            console.error(`Error assigning proposal: ${error.message}`);
            throw error;
        }
    }
    if (loading) {
        return <Loader />;
    }
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <div>
                <div onClick={openModal}>
                    <button
                        className="py-2 px-5 rounded-md group relative inline-flex items-center justify-center overflow-hidden border border-epsilon font-medium text-epsilon shadow-md transition duration-300 ease-out">
                        <span className="ease absolute inset-0 flex h-full w-[] -translate-x-full items-center justify-center bg-epsilon text-white duration-300 group-hover:translate-x-0">
                            <span className='mb-1 items-center mr-1 flex gap-2'>
                                <MdAssignmentAdd className="text-xl" /> Assign ERCs
                            </span>
                        </span>
                        <span className="ease absolute gap-2 flex h-full w-full transform items-center justify-center text-epsilon transition-all duration-300 group-hover:translate-x-full">
                            Assign ERCs
                        </span>
                        <span className="invisible relative"> x Assign ERCs </span>
                    </button>
                </div>
                <Modal
                    className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[50%] w-[95%] md:p-14 p-5 bg-white shadow-sm outline-none border rounded-lg'
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Assign ERCs Modal"
                >
                    <div className="w-full">
                        <h2 className="font-bold mb-4 text-xl font-WorkSans-Regular">
                            Search ERC Member
                        </h2>
                        <div className='relative w-full md:px-0 h-fit'>
                            <input
                                name='search-name'
                                id='search-name'
                                className='border rounded-md block py-2 bg-lightBackground border-stone-300 px-2 w-full outline-none'
                                type="text"
                                placeholder='Enter Email'
                                value={displayEmail || searchTerm}
                                onChange={handleInputChange}
                                list="erc-members"
                            />
                            <CreateSvg className='md:block hidden' />
                            <datalist id="erc-members">
                                {members
                                    .filter(member =>
                                        member.workemail.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
                                    )
                                    .map(member => (
                                        <option key={member._id} value={member.workemail}>
                                            {`${member.fullname} (${member.workemail})`}
                                        </option>
                                    ))}
                            </datalist>
                        </div>
                        <div className="flex gap-5 md:flex-row mt-5 flex-col">
                            <button
                                onClick={handleAssign}
                                disabled={!isValidEmail}
                                className={`py-[0.6rem] px-5 h-fit rounded-md group relative overflow-hidden ${isValidEmail ? 'bg-epsilon text-white' : 'bg-gray-400 text-white cursor-not-allowed'} transition-all duration-300 ease-out`}>
                                <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                                Add
                            </button>
                            <button
                                onClick={closeModal}
                                className="w-fit h-fit py-2 px-5 rounded-md group relative inline-flex items-center justify-center overflow-hidden border border-epsilon font-medium text-epsilon shadow-md transition duration-300 ease-out">
                                <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-epsilon text-white duration-300 group-hover:translate-x-0">
                                    <IoCloseCircleSharp className='text-2xl' /> <span className='mx-2'>Close</span>
                                </span>
                                <span className="ease absolute flex h-full w-full transform items-center justify-center text-epsilon transition-all duration-300 group-hover:translate-x-full">Close</span>
                                <span className="invisible relative"> x Close </span>
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
}
