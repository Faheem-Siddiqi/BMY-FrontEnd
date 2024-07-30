import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { IoPersonRemoveSharp } from 'react-icons/io5';
import { IoPersonAddSharp } from "react-icons/io5";
import Bena from '../../assets/images/Profile.png';
import AddErc from './AddErcs.jsx';
import UserNavbar from './../layout/Navs/UserNavbar';
export default function Admin() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
        });
        AOS.refresh();
    }, []);
    const [searchTerm, setSearchTerm] = useState("");
    const [displayEmail, setDisplayEmail] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const ercMembers = [
        { id: 1, name: "John Doe", email: "john.doe@example.com", institute: 'BMY', designation: 'Lead' },
        { id: 2, name: "Jane Smith", email: "jane.smith@example.com", institute: 'BMY', designation: 'Lead' },
        { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", institute: 'BMY', designation: 'Lead' },
    ];
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);
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
                <UserNavbar />
            </div>
            <div className='font-WorkSans-Regular bg-iota pb-20'>
                <div className=''>
                    <div className="relative">
                        <img
                            src='https://bmyhealth.com/wp-content/uploads/2024/02/1.jpg'
                            className="absolute inset-0 object-cover w-full h-full"
                            alt=""
                        />
                        <div className="relative bg-opacity-75 bg-deep-purple-accent-700">
                            <svg
                                className="absolute inset-x-0 md:-bottom-6 -bottom-4 text-white"
                                viewBox="0 0 1160 180"
                            >
                                <path
                                    fill="#F3FFF3"
                                    d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
                                />
                            </svg>
                            <div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                                <div className="flex flex-col items-center justify-between xl:flex-row">
                                    <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
                                        <h2
                                            data-aos="fade-right"
                                            className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none"
                                        >
                                           BMY Health Pakistan <br className="hidden md:block" />
                                            Admin Page
                                        </h2>
                                        <p
                                            data-aos="fade-right"
                                            className="max-w-xl mb-4 text-base text-gray-200 md:text-lg"
                                        >
                                            We are a firm of Community Health Professionals registered in Pakistan in 2022.
                                            We have Professionals trained from renowned institutes across Pakistan, with diverse backgrounds.
                                        </p>
                                    </div>
                                    <div
                                        data-aos="fade-left"
                                        className="w-full max-w-xl xl:px-8 xl:w-5/12"
                                    >
                                        <div className="w-full max-w-md py-4 md:h-[80vh] overflow-auto  px-6 bg-white border border-gray-200 rounded-lg shadow">
                                            <div className="flex items-center justify-between mb-4">
                                                <h5 className="text-2xl mt-5  font-bold leading-none text-gray-900">
                                                    ERC Panel
                                                </h5>
                                            </div>
                                            <div className=" mb-2">
                                                <h2 className="font-bold text-lg font-WorkSans-Regular">
                                                    Add ERC Head
                                                </h2>
                                                <div className='relative w-full md:px-0 h-fit'>
                                                    <input
                                                        name='search-name'
                                                        id='search-name'
                                                        className='border rounded-md block py-2 bg-lightBackground border-stone-300 px-2 w-full outline-none'
                                                        type="text"
                                                        placeholder='Enter ERC Head Email'
                                                        value={displayEmail || searchTerm}
                                                        onChange={handleInputChange}
                                                        list="erc-members"
                                                    />
                                                    <button className='text-xl absolute z-[10] text-epsilon bottom-[.6rem] right-2'>
                                                        <IoPersonAddSharp />
                                                    </button>
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
                                            </div>
                                            <div>
                                                {/* for leads */}
                                                <ul role="list">
                                                    {ercMembers.map((member) => (
                                                        <li key={member.id} className="py-3 sm:py-4">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0">
                                                                    <img className="w-10 h-10 rounded-full" src={Bena} alt={member.name} />
                                                                </div>
                                                                <div className="flex-1 min-w-0 ms-4">
                                                                    <p className="text-sm gap-1 flex  justify-start items-center font-medium text-gray-900 truncate">{member.name}

                                                                    <div className="">
                                                                 
                                                                    <IoPersonRemoveSharp className='text-red-400 cursor-pointer' />
                                                                </div>
                                                                    </p>
                                                                    <p className="text-sm text-gray-500">ERC Head</p>
                                                                    <p className="text-sm text-gray-500">{member.email}</p>
                                                                </div>
                                                               
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <hr />
                                                {/* for member */}
                                                <ul role="list">
                                                    {ercMembers.map((member) => (
                                                        <li key={member.id} className="py-3 sm:py-4">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0">
                                                                    <img className="w-10 h-10 rounded-full" src={Bena} alt={member.name} />
                                                                </div>
                                                                <div className="flex-1 min-w-0 ms-4">
                                                                    <p className="text-sm font-medium text-gray-900 truncate">{member.name}</p>
                                                                    <p className="text-sm text-gray-500">{member.email}</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
