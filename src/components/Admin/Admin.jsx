import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import background from '../../assets/images/background.png';
import { Link } from 'react-router-dom';
import { IoPersonAddSharp } from "react-icons/io5";
import UserNavbar from './../layout/Navs/UserNavbar';
import Loader from '../layout/Loader.jsx';
import { toast, ToastContainer } from 'react-toastify';
import { getCookie } from "cookies-next";
import 'react-toastify/dist/ReactToastify.css';

export default function Admin() {
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [displayEmail, setDisplayEmail] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [ercMembers, setErcMembers] = useState([]);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    useEffect(() => {
        AOS.init({ duration: 1000, once: false });
        AOS.refresh();
    }, []);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);
    useEffect(() => {
        const fetchNotApprovedUsers = async () => {
            try {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                const token = getCookie("token");
                myHeaders.append("Authorization", `Bearer ${token}`);
                const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/admin/get-not-approved-users`, {
                    method: "GET",
                    redirect: "follow",
                    headers: myHeaders,
                    credentials: "include",
                });
                if (response.status === 404) {
                    console.log('Researcher has no team');
                    return;
                }
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                if (result.success) {
                    Array.isArray(result.users) ? setErcMembers(result.users) : console.error('Expected an array for result.users, but got:', result.users);
                } else {
                    toast.error("Failed to load team details."); // Show an error toast
                }
            } catch (error) {
                console.error(error); // Log the error
                toast.error("An error occurred while fetching team details."); // Show an error toast
            } finally {
                setLoading(false); // Stop loading
            }
        };
        fetchNotApprovedUsers();
    }, []);
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        const selectedMember = ercMembers.find(member => member.workemail === value);
        if (selectedMember) {
            setDisplayEmail(selectedMember.workemail);
            setIsButtonEnabled(true);
        } else {
            setDisplayEmail("");
            setIsButtonEnabled(false);
        }
    };
    const addErcHead = async () => {
        if (!displayEmail) return;
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const token = getCookie("token");
            myHeaders.append("Authorization", `Bearer ${token}`);
            const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/admin/approve-erc-head`, {
                method: 'PATCH',
                redirect: 'follow',
                headers: myHeaders,
                credentials: 'include',
                body: JSON.stringify({ workemail: displayEmail }),
            });
            const responseText = await response.text();
            if (response.ok) {
                const data = JSON.parse(responseText);
                toast.success('ERC Head successfully approved');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                return data;
            } else {
                const errorData = JSON.parse(responseText);
                throw new Error(errorData.message || 'Failed to approve ERC Head');
            }
        } catch (error) {
            toast.error(`Error approving ERC Head: ${error.message}`);
            console.error(`Error approving ERC Head: ${error.message}`);
            throw error;
        }
    };
    if (loading) {
        return <Loader />;
    }
    return (
        <>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
            <div>
                <UserNavbar />
            </div>
            <div className='font-WorkSans-Regular bg-iota pb-20'>
                <div className=''>
                    <div className="relative">
                        <img
                            src={background}
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
                                            className="max-w-xl mb-4 text-base text-gray-200 "
                                        >
                                            We are a firm of Community Health Professionals registered in Pakistan in 2022.
                                            We have Professionals trained from renowned institutes across Pakistan, with diverse backgrounds.
                                        </p>
                                        <button className="mt-6 px-6 py-3 rounded-md group relative overflow-hidden bg-epsilon text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon">
                                            <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                                            <Link to='/learn-more'>
                                                Learn More
                                            </Link>
                                        </button>
                                    </div>
                                    <div
                                        data-aos="fade-left"
                                        className="w-full max-w-xl xl:px-8 xl:w-5/12"
                                    >
                                        <div className="w-full max-w-md py-4 overflow-auto px-6 bg-white border border-gray-200 rounded-lg shadow">
                                            <div className="flex items-center justify-between mb-4">
                                                <h5 className="text-2xl mt-5 font-bold leading-none text-gray-900">
                                                    ERC Panel
                                                </h5>
                                            </div>
                                            <div className="mb-2">
                                                <h2 className="font-semi font-WorkSans-Regular">
                                                    Add ERC Head
                                                </h2>
                                                <div className='relative w-full md:px-0 h-fit'>
                                                    {ercMembers.length === 0 ? (
                                                        <p className='text-red-500'>No requests found</p>
                                                    ) : (
                                                        <>
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
                                                            <button
                                                                onClick={addErcHead}
                                                                disabled={!isButtonEnabled}
                                                                className={`text-xl absolute z-[10] bottom-[.6rem] right-2 ${isButtonEnabled ? 'text-epsilon' : 'text-red-500 cursor-not-allowed'}`}
                                                            >
                                                                <IoPersonAddSharp />
                                                            </button>
                                                            <datalist id="erc-members">
                                                                {ercMembers
                                                                    .filter(member =>
                                                                        member.workemail.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
                                                                    )
                                                                    .map(member => (
                                                                        <option key={member.workemail} value={member.workemail} />
                                                                    ))}
                                                            </datalist>
                                                        </>
                                                    )}
                                                </div>
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
