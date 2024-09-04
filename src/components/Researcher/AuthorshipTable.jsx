'use client';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Sidebar from '../layout/Sidebar';
import UserNavbar from '../layout/Navs/UserNavbar';
import React, { useState } from 'react';
const AuthorshipTable = () => {
    const [rows, setRows] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [form, setForm] = useState({
        position: '',
        name: '',
        justification: '',
        confidence: '',
    });
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
    return (
        <>
            <div className="flex xl:flex-row flex-col font-WorkSans-Regular">
                <Sidebar pageName='' />
                <div className='w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
                    <UserNavbar />
                    <div className='xl:m-10 '>
                        <h1 className='text-xl  md:p-10 p-5  md:text-3xl font-bold font-Satoshi-Black'>Authorship Table</h1>
                        <div className='xl:mx-10  md:p-10 p-5 bg-white'>
                            <div className=" mx-auto ">
                                <div className='bg-epsilon  text-zeta bg-opacity-40 md:p-5'>
                                    <p className='text-sm text-justify'>
                                        {`Each author has to give opinion about authorship. For adding more than 10 authors, provide a justification to ERC team separately. For removing anyone give justification based on fulfilling ICMJE criteria. ERC team will finalize authorship based on 360 degree feedback of all authors, and compliance with BMY Health collaboration agreement. 
       `}
                                    </p>
                                    <p className='text-sm text-justify mt-1'>
                                        {`
        From your response, we will take your opinions for other authors. Regarding your authorship position, more weightage will be given to what others say about you. Regrading amount of work, more weightage will be given to intern leader's opinions. Regrading quality of work, more weightage will be given to supervisor’s opinion.`}
                                    </p>
                                </div>
                                <form className="mb-6 grid md:grid-cols-2 grid-cols-1 gap-5 mt-7">
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
                                        onClick={handleAddRow}
                                        className={`w-fit font-Satoshi-Black duration-300 text-white p-2 ${isFormValid ? 'bg-epsilon hover:bg-zeta' : 'bg-gray-400 cursor-not-allowed'
                                            }`}
                                        disabled={!isFormValid}
                                    >
                                        {editingIndex !== null ? 'Update Row' : 'Add Author'}
                                    </button>
                                </form>
                                <div className='max-w-full overflow-scroll'>
                                    <table className=" border-collapse border w-full border-gray-300">
                                        <thead>
                                            <tr className="bg-epsilon text-white">
                                                <th className="border border-gray-300 p-2  max-w-[20%] text-left">Author Position</th>
                                                <th className="border border-gray-300 p-2   max-w-[20%] text-left">Author Name</th>
                                                <th className="border border-gray-300 p-2  max-w-[20%] text-left">Justification</th>
                                                <th className="border border-gray-300 p-2  max-w-[20%]  text-left">Confidence Percent </th>
                                                <th className="border border-gray-300 p-2  max-w-[20%] text-left">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rows.map((row, index) => (
                                                <tr key={index} className="odd:bg-gray-50 ]">
                                                    <td className="border border-gray-300  max-w-[20%] p-2">{row.position}</td>
                                                    <td className="border border-gray-300 max-w-[20%] p-2">{row.name}</td>
                                                    <td className="border border-gray-300  max-w-[23%] p-2">{row.justification}</td>
                                                    <td className="border border-gray-300  max-w-[20%]  p-2">{row.confidence}</td>
                                                    <td className="border border-gray-300 max-w-[17%]  p-2">
                                                        <button
                                                            onClick={() => handleEditRow(index)}
                                                            className="bg-epsilon text-white rounded-md w-fit hover:bg-zeta duration-300 mr-2"
                                                        >
                                                            <FaEdit className='m-1 text-[14px]' />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteRow(index)}
                                                            className="bg-red-500 text-white rounded-md w-fit hover:bg-red-600 duration-300 mr-2"
                                                        >
                                                            <FaTrash className='m-1 text-[14px]' />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <h2 className='text-md mt-5 font-bold text-zeta'>
                                    Justification
                                </h2>
                                <textarea
                                    rows={4}
                                    name=''
                                    className='border mt-2 rounded-md block py-[0.67rem]  border-stone-300 px-2 w-full md:w-[50%] outline-none'
                                    placeholder='Add Justification (if required)'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default AuthorshipTable;
