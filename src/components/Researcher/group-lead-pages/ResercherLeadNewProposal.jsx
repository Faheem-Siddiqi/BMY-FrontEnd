import React from 'react'
import Sidebar from '../../layout/Sidebar.jsx'
import UserNavbar from '../../layout/Navs/UserNavbar.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import Loader from './../../layout/Loader';
import { getCookie } from "cookies-next";

export default function ResercherLeadNewProposal() {
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleNextClick = async () => {
        setLoading(true);
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const token = getCookie("token");
            myHeaders.append("Authorization", `Bearer ${token}`);
            const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/create-proposal`
                , {
                    method: 'POST',
                    credentials: 'include',
                    headers: myHeaders,
                    body: JSON.stringify({ title }),
                });
            const result = await response.json();
            setLoading(false);
            if (response.ok) {
                navigate('/group-lead-proposal');
                toast.success('Proposal Created Succsssfully');
            }
            else {
                toast.error(result.message || 'An error occurred while creating the proposal');
            }
        } catch (error) {
            setLoading(false);
            toast.error('An error occurred while creating the proposal');
        }
    };
    if (loading) {
        return (
            <>
                <Loader />
            </>
        )
    }
    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="flex  xl:flex-row flex-col min-h-[100vh]   font-Satoshi-Black overflow ">
                <Sidebar pageName='teamLead-proposals' />
                <section className=' w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
                    <UserNavbar />
                    <div className='xl:m-10 m-5  '>
                        <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '> Proposal </h1>
                        <section className=' w-full shadow-sm my-5 p-10 bg-white'>
                            <label htmlFor="proposal-title" className='text-zeta  font-semibold '>Proposal Title </label>
                            <input
                                type='text'
                                value={title}
                                onChange={(e) => { setTitle(e.target.value) }}
                                name='proposal-title'
                                id='proposal-title'
                                className=' md:w-[50%] border mt-2   rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none' placeholder='Proposal Title' />
                            <button
                                onClick={handleNextClick}
                                disabled={title === ''}
                                className="my-10 py-2 px-7  font-semibold rounded-md group relative overflow-hidden  bg-epsilon  text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon ">
                                <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                                Next
                            </button>
                        </section>
                    </div>
                </section>
            </div>
        </>
    )
}
