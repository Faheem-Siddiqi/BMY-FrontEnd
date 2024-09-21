'use client';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Sidebar from '../layout/Sidebar';
import UserNavbar from '../layout/Navs/UserNavbar';
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from "react-hot-toast";
import Loader from '../layout/Loader.jsx';
import { getCookie } from "cookies-next";
import { useParams } from 'react-router-dom';
const AuthorshipTable = () => {
    const { proposalId } = useParams();
    const [hasFilled, setHasFilled] = useState(false)
    const [loading, setLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [fetchingDataLoad, SetFetchingDataLoad] = useState(false);
    const [rows, setRows] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [secondJustification, setSecondJustification] = useState('');
    const [form, setForm] = useState({
        position: '',
        name: '',
        justification: '',
        confidence: '',
    });
    const checkUserAuthorship = async () => {
        SetFetchingDataLoad(true)
        if (!proposalId) {
            toast.error('Proposal ID is missing.');
            SetFetchingDataLoad(false);
            return;
        }
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const token = getCookie("token");
            if (token) {
                myHeaders.append("Authorization", `Bearer ${token}`);
            }
            const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/check-user-submitted-authorship-table`, {
                method: 'POST',
                headers: myHeaders,
                credentials: 'include',
                body: JSON.stringify({ proposalId })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            if (result.success) {
                setHasFilled(result.filled);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        } finally {
            SetFetchingDataLoad(false);
        }
    };
    const getUserEntries = async () => {
        SetFetchingDataLoad(true);
        if (!proposalId) {
            toast.error('Proposal ID is missing.');
            SetFetchingDataLoad(false);
            return;
        }
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const token = getCookie("token");
            if (token) {
                myHeaders.append("Authorization", `Bearer ${token}`);
            }
            const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/get-user-authorship-entries`, {
                method: 'POST',
                headers: myHeaders,
                credentials: 'include',
                body: JSON.stringify({ proposalId }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            if (result.success) {
                const authorshipEntries = result?.authorshipEntries ?? [];
                console.log(authorshipEntries)
                setRows([]);
                const updateForm = (data) => {
                    const newRows = [];
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].length > 0) {
                            const currentItem = data[i][0];
                            setForm({
                                position: currentItem.authorPosition ?? '',
                                name: currentItem.authorName ?? '',
                                justification: currentItem.justification ?? '',
                                confidence: currentItem.confidence ?? '',
                            });
                            // Add the new entry to the newRows array
                            newRows.push({
                                position: currentItem.authorPosition ?? '',
                                name: currentItem.authorName ?? '',
                                justification: currentItem.justification ?? '',
                                confidence: currentItem.confidence ?? '',
                            });
                        }
                    }
                    setRows(newRows);
                };
                updateForm(authorshipEntries);
                setSecondJustification(result.secondJustification ?? '');
                setForm({
                    position: '',
                    name: '',
                    justification: '',
                    confidence: '',
                });
            } else {
                console.log('in case there is no record there can be error backend dev forget to add check')
                console.log(error)
            }
        } catch (error) {
            console.log('in case there is no record there can be error backend dev forget to add check')
            console.log(error)
        } finally {
            SetFetchingDataLoad(false);
        }
    };
    useEffect(() => {
        checkUserAuthorship();
        getUserEntries();
    }, [proposalId]);
    const HandleAddRowBackend = async () => {
        if (!proposalId) {
            toast.error('Proposal ID is missing. Make sure you don\'t change the URL.');
            return;
        }
        const fromData = JSON.stringify({
            proposalId,
            authorPosition: form.position,
            authorName: form.name,
            justification: form.justification,
            confidence: form.confidence,
        });
        setLoading(true);
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const token = getCookie("token");
            if (token) {
                myHeaders.append("Authorization", `Bearer ${token}`);
            }
            const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/addAuthorshipEntry`, {
                method: 'PATCH',
                body: fromData,
                headers: myHeaders,
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            if (result.success) {
                toast.success('Opinion added successfully.');
                handleAddRow()
                setForm({
                    position: '',
                    name: '',
                    justification: '',
                    confidence: '',
                });
                // Optionally, update UI with the new data
            } else {
                toast.error('Proposal not found.');
            }
        } catch (error) {
            toast.error(`Error fetching proposal: ${error.message}`);
            console.error(error); // Log errors for debugging
        } finally {
            setLoading(false);
        }
    };
    const SubmitAuditOpinion = async () => {
        if (!proposalId) {
            toast.error('Proposal ID is missing. Make sure you don\'t change the URL.');
            return;
        }
        const SubmitData = JSON.stringify({
            proposalId,
            secondJustification: secondJustification,
        });
        setSubmitLoading(true);
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const token = getCookie("token");
            if (token) {
                myHeaders.append("Authorization", `Bearer ${token}`);
            }
            const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/submitAuthorship`, {
                method: 'PATCH',
                body: SubmitData,
                headers: myHeaders,
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            if (result.success) {
                toast.success('Opinion Submitted Successfully.');
                handleAddRow()
                window.location.reload();
            } else {
                toast.error('Proposal not found.');
            }
        } catch (error) {
            toast.error(`Error fetching proposal: ${error.message}`);
            console.error(error); // Log errors for debugging
        } finally {
            setSubmitLoading(false);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };
    const handleAddRow = () => {
        if (form.position && form.name && form.justification && form.confidence) {
            if (editingIndex !== null) {
                const updatedRows = rows.map((row, index) =>
                    index === editingIndex ? form : row
                );
                setRows(updatedRows);
                setEditingIndex(null);
            } else {
                setRows([...rows, form]);
            }
            setForm({ position: '', name: '', justification: '', confidence: '' });
        }
    };
    const handleEditRow = (index) => {
        setForm(rows[index]);
        setEditingIndex(index);
    };
    const handleDeleteRow = (index) => {
        setRows(rows.filter((_, i) => i !== index));
    };
    const isFormValid = form.position && form.name && form.justification && form.confidence;
    if (fetchingDataLoad) {
        return (
            <Loader />)
    }
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="flex xl:flex-row flex-col font-WorkSans-Regular">
                <Sidebar pageName='' />
                <div className='w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
                    <UserNavbar />
                    <div className=''>
                        <h1 className='text-xl p-5 md:text-3xl font-bold font-Satoshi-Black'>Authorship Opinion</h1>
                        <div className='xl:mx-10 md:p-10 bg-white'>
                            {hasFilled && (<>
                                <h2 className='text-epsilon my-2'>Submitted</h2>
                            </>)}
                            <div className="mx-auto">
                                {!hasFilled && (<>
                                    <div className='bg-epsilon border-l-4 border-epsilon text-zeta bg-opacity-40 p-5'>
                                        <p className='text-sm text-justify'>
                                            {`Each author has to give an opinion about authorship for fellows, interns, and study supervisors. For adding more than 10 authors, provide a justification to the ERC team separately. For removing anyone, give justification based on fulfilling ICMJE criteria. The ERC team will finalize authorship based on a 360-degree feedback of all authors and compliance with BMY Health collaboration agreement.`}
                                        </p>
                                        <p className='text-sm text-justify mt-1'>
                                            {`From your response, we will take your opinions for other authors. Regarding your authorship position, more weightage will be given to what others say about you. Regarding the amount of work, more weightage will be given to the intern leader's opinions. Regarding the quality of work, more weightage will be given to the supervisor’s opinion.`}
                                        </p>
                                    </div>
                                </>)}
                                {!hasFilled && (<>
                                    <form className="mb-6 md:px-0 px-5 grid md:grid-cols-2 grid-cols-1 gap-5 mt-7">
                                        <input
                                            type="text"
                                            name="position"
                                            value={form.position}
                                            onChange={handleChange}
                                            placeholder="Author Position"
                                            className="p-2 border border-gray-300 outline-epsilon rounded"
                                        />
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Author Name"
                                            className="w-full p-2 border border-gray-300 outline-epsilon rounded"
                                        />
                                        <textarea
                                            name="justification"
                                            value={form.justification}
                                            rows={1}
                                            onChange={handleChange}
                                            placeholder="Justification"
                                            className="w-full p-2 border border-gray-300 outline-epsilon rounded"
                                        />
                                        <div>
                                            <input
                                                type="number"
                                                name="confidence"
                                                min={0}
                                                step={10}
                                                max={100}
                                                value={form.confidence}
                                                onChange={handleChange}
                                                placeholder="Confidence Percentage"
                                                className="w-full p-2 border border-gray-300 outline-epsilon rounded"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={HandleAddRowBackend}
                                            className={`w-fit font-Satoshi-Black duration-300 text-white p-2  ${!loading ? 'bg-epsilon hover:bg-zeta' : 'bg-gray-400 cursor-not-allowed'}  ${isFormValid ? 'bg-epsilon hover:bg-zeta' : 'bg-gray-400 cursor-not-allowed'}`}
                                            disabled={!isFormValid || loading}
                                        >
                                            {loading === true ? 'Updating' : 'Add Author'}
                                        </button>
                                    </form>
                                </>)}
                                {rows.length > 0 && (
                                    <>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full border border-collapse hidden md:table">
                                                <thead className="bg-zeta border-zeta border-collapse text-white border">
                                                    <tr>
                                                        <th className="py-2 px-4 w-[16%] text-left">Author Position</th>
                                                        <th className="py-2 px-4 w-[25%] text-left">Author Name</th>
                                                        <th className="py-2 px-4 w-[31%] text-left">Justification</th>
                                                        <th className="py-2 px-4 w-[15%] text-left">Confidence %</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {rows.map((row, index) => (
                                                        <tr key={index}>
                                                            <td className="py-2 px-4 border">{row.position}</td>
                                                            <td className="py-2 px-4 border">{row.name}</td>
                                                            <td className="py-2 px-4 border">{row.justification}</td>
                                                            <td className="py-2 px-4 border">{row.confidence}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            {/* Mobile View */}
                                            <div className="block md:hidden mt-4">
                                                {rows.map((row, index) => (
                                                    <div key={index} className="px-4 mb-10">
                                                        <div className="flex">
                                                            <span className="w-[35%] break-all bg-zeta rounded-tl p-2 text-white">Position</span>
                                                            <span className='w-[65%] break-all border px-1'>{row.position}</span>
                                                        </div>
                                                        <div className="flex">
                                                            <span className="w-[35%] break-all p-2 bg-zeta text-white">Name</span>
                                                            <span className='w-[65%] break-all border px-1'>{row.name}</span>
                                                        </div>
                                                        <div className="flex">
                                                            <span className="w-[35%] break-all bg-zeta p-2 text-white">Justification</span>
                                                            <span className='w-[65%] break-all border px-1'>{row.justification}</span>
                                                        </div>
                                                        <div className="flex">
                                                            <span className="w-[35%] break-all bg-zeta p-2 text-white">Confidence</span>
                                                            <span className='w-[65%] break-all border px-1'>{row.confidence}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                                <h2 className='text-md mt-5 md:px-0 px-5 font-bold text-zeta'>
                                    Justification
                                </h2>
                                <p className='text-sm md:m-0 mx-5'>Add justification for adding more than 10 authors or for removing any author (if required)</p>
                                <textarea
                                    rows={4}
                                    disabled={hasFilled}
                                    value={secondJustification}
                                    onChange={(e) => setSecondJustification(e.target.value)}
                                    className='border md:mx-0 p-3 mx-5 mb-5 mt-2 rounded-md py-[0.67rem] border-stone-300 w-[80%] md:w-[50%] outline-none'
                           
                                />
                            </div>
                            {!hasFilled && (<>
                                <button
                                    type="button"
                                    onClick={SubmitAuditOpinion}
                                    className={`w-fit flex md:m-0 m-5 font-Satoshi-Black duration-300 text-white py-2 px-4 ${!submitLoading ? 'bg-epsilon hover:bg-zeta' : 'bg-gray-400 cursor-not-allowed'}`}
                                    disabled={submitLoading}
                                >
                                    {submitLoading ? 'Submitting' : 'Submit'}
                                </button>
                            </>)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default AuthorshipTable;
