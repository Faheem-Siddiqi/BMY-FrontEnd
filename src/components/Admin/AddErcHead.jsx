import { useState, useEffect } from "react";
import React from 'react'
import { IoCloseCircleSharp } from "react-icons/io5";
import { MdAssignmentAdd } from "react-icons/md";
import CreateSvg from '../../assets/svgs/CreateSvg.jsx'
import Modal from 'react-modal';

export default function AddErcHead() {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [displayEmail, setDisplayEmail] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const ercMembers = [
        { id: 1, name: "John Doe", email: "john.doe@example.com", institute: 'BMY', designation: 'chaprasi' },
        { id: 2, name: "Jane Smith", email: "jora.smith@example.com", institute: 'BMY', designation: 'chaprasi' },
        { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", institute: 'BMY', designation: 'chaprasi' },
    ];
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        const selectedMember = ercMembers.find(member => member.email === value);
        if (selectedMember) {
            setDisplayEmail(selectedMember.email);
        } else {
            setDisplayEmail("");
        }
    };
    return (
        <>
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
                                value={displayEmail || searchTerm} // Display email or searchTerm if no email is available
                                onChange={handleInputChange}
                                list="erc-members"
                            />
                            <CreateSvg className='md:block hidden' />
                            <datalist id="erc-members">
                                {ercMembers
                                    .filter(member =>
                                        member.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
                                    )
                                    .map(member => (
                                        <option key={member.id} value={member.email}>
                                            {`${member.name} (${member.email})`}
                                        </option>
                                    ))}
                            </datalist>
                        </div>
                        <div className="flex gap-5 md:flex-row mt-5 flex-col">
                            <button
                                htmlFor='profile-image'
                                className="py-[0.6rem] px-5 h-fit rounded-md group relative overflow-hidden bg-epsilon text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon">
                                <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                                Remove
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
    )
}
