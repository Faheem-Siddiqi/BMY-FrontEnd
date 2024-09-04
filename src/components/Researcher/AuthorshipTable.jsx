'use client';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Sidebar from '../layout/Sidebar';
import UserNavbar from '../layout/Navs/UserNavbar';
import React, { useState } from 'react';
const AuthorshipTable = () => {
    const data = [
        { name: 'JohnDoe', email: 'john@example.com', role: 'Admin' },
        { name: 'Jane Smith', email: 'jane@example.com Lorem ipsum, dolor sit amet consectetur adipisicing elit. In obcaecati eveniet dignissimos quasi et a officiis harum aut aperiam amet voluptates eum accusamus impedit velit tenetur, quod, animi eligendi dolores', role: 'User' },
        { name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
      ];


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
                    <div className=''>
                        <h1 className='text-xl   p-5  md:text-3xl font-bold font-Satoshi-Black'>Authorship Table</h1>
                        <div className='xl:mx-10  md:p-10  bg-white'>
                            <div className=" mx-auto ">
                                <div className='bg-epsilon  text-zeta bg-opacity-40 p-5'>
                                    <p className='text-sm text-justify'>
                                        {`Each author has to give opinion about authorship. For adding more than 10 authors, provide a justification to ERC team separately. For removing anyone give justification based on fulfilling ICMJE criteria. ERC team will finalize authorship based on 360 degree feedback of all authors, and compliance with BMY Health collaboration agreement. 
       `}
                                    </p>
                                    <p className='text-sm text-justify mt-1'>
                                        {`
        From your response, we will take your opinions for other authors. Regarding your authorship position, more weightage will be given to what others say about you. Regrading amount of work, more weightage will be given to intern leader's opinions. Regrading quality of work, more weightage will be given to supervisor’s opinion.`}
                                    </p>
                                </div>
                                <form className="mb-6 md:px-0  px-5  grid md:grid-cols-2 grid-cols-1 gap-5 mt-7">
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


                        
<div className="overflow-x-auto">
      <table className="min-w-full border    border-collapse hidden md:table">
        <thead className="bg-zeta border-zeta border-collapse text-white border ">
          <tr>
            <th className="py-2 px-4 w-[16%]  text-left">Author Position</th>
            <th className="py-2 px-4  w-[25%]  text-left">Author Name</th>
            <th className="py-2 px-4  w-[31%]  text-left">Justification</th>
            <th className="py-2 px-4 w-[15%]    text-left">Confidence % </th>
            <th className="py-2 px-4 w-[10%]   text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="">
              <td className="py-2 px-4 border border-zeta border-opacity-15  border-collapse ">{row.name}</td>
              <td className="py-2 px-4 border border-zeta  border-opacity-15 border-collapse">{row.email}</td>
              <td className="py-2 px-4  border border-zeta border-opacity-15  border-collapse">{row.role}</td>
              <td className="py-2 px-4  border border-zeta border-opacity-15  border-collapse">{row.role}</td>
              <td className="py-2 px-4  border border-zeta border-opacity-15 border-collapse items-center  flex flex-row  ">

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

      {/* Mobile View */}
      <div className="block md:hidden">
        {data.map((row, index) => (
          <div key={index} className="px-4 mb-10">
            <div className="flex ">
              <span className="w-[35%] font-semibold bg-zeta rounded-tl p-2 text-white "> Position</span>
              <span className='w-[65%] border  rounded-tr px-1 '>{row.name}</span>
            </div>
            <div className="flex   ">
              <span className=" w-[35%] font-semibold p-2 bg-zeta text-white"> Name</span>
              <span className='w-[65%] border  px-1'>{row.email}</span>
            </div>
            <div className="flex  ">
              <span className=" w-[35%] font-semibold bg-zeta  p-2 text-white">Justification</span>
              <span className='w-[65%] border  px-1'>{row.role}</span>
            </div>

            <div className="flex  ">
              <span className=" w-[35%] font-semibold bg-zeta  p-2 text-white">Confidence </span>
              <span className='w-[65%] border  px-1'>{row.role}</span>
            </div>

            <div className="flex  ">
              <span className=" w-[35%] font-semibold bg-zeta rounded-bl p-2 text-white">Action</span>
              <span className='w-[65%] border px-1'>{row.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
        

        <br /><br />

                                <div className='max-w-full  md:px-0  px-5  overflow-scroll'>
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
                                <h2 className='text-md mt-5  md:px-0  px-5  font-bold text-zeta'>
                                    Justification
                                </h2>
                                <textarea
                                    rows={4}
                                    name=''
                                    className='border md:mx-0  p-3 mx-5  mb-5 mt-2 rounded-md  py-[0.67rem]  border-stone-300 w-[80%] md:w-[50%] outline-none'
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
