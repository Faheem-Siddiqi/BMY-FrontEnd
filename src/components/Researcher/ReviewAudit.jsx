import React, { useState, useEffect } from 'react';
import Sidebar from '../layout/Sidebar.jsx';
import { ImFilesEmpty } from "react-icons/im";
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import UserNavbar from '../layout/Navs/UserNavbar.jsx';
import toast from 'react-hot-toast';
export default function ReviewAudit() {
    const [authors, setAuthors] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const handleAddItem = () => {
        if (inputValue.trim() === '') return;
        if (editIndex !== null) {
            // Update item
            const updatedItems = authors.map((item, index) =>
                index === editIndex ? inputValue : item
            );
            setAuthors(updatedItems);
            setEditIndex(null);
        } else {
            // Add new item
            setAuthors([...authors, inputValue]);
        }
        setInputValue('');
    };
    const handleDeleteItem = (index) => {
        setAuthors(authors.filter((_, i) => i !== index));
    };
    const handleEditItem = (index) => {
        setInputValue(authors[index]);
        setEditIndex(index);
    };
    return (
        <>
            <div className="flex xl:flex-row flex-col font-WorkSans-Regular">
                <Sidebar pageName='' />
                <section className='w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
                    <UserNavbar />
                    <div className='xl:m-10 '>
                        <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'>Audit Form</h1>
                        <header className='bg-white shadow-sm my-5 p-5 md:p-10'>
                            <section className='mb-4 w-full md:w-[100%]'>
                                <label
                                    htmlFor="question2"
                                    className='text-zeta   font-semibold'>
                                    <h2 className='text-md'>
                                        1. Manuscript:
                                    </h2>
                                </label>
                                <div
                                    className='gap-1  p-2 mt-2  outline-none flex items-center'>
                                    <ImFilesEmpty />
                                    <a
                                        class="relative text-sm w-fit block after:block after:content-[''] after:absolute after:h-[1px] after:bg-zeta after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
                                        target='_blank'
                                        href='https://cloud.mongodb.com/v2/66ce1b56a145fb06af98fa6b#/metrics/replicaSet/66ce1c525a6f3b0f8da07a90/explorer/test/proposals/find'>
                                        View Manuscript</a>
                                </div>
                            </section>
                            <section className='mb-4 w-full md:w-[100%]'>
                                <label
                                    htmlFor="question2"
                                    className='text-zeta   font-semibold'>
                                    <h2 className='text-md'>
                                        2. Data file  for audit and subsequent storage in BMY Health records for a period of two years.
                                    </h2>
                                </label>
                                <div
                                    className='gap-1  p-2 mt-2  outline-none flex items-center'>
                                    <ImFilesEmpty />
                                    <a
                                        class="relative   text-sm w-fit block after:block after:content-[''] after:absolute after:h-[1px] after:bg-zeta after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
                                        target='_blank'
                                        href='https://cloud.mongodb.com/v2/66ce1b56a145fb06af98fa6b#/metrics/replicaSet/66ce1c525a6f3b0f8da07a90/explorer/test/proposals/find'>
                                        View Data File</a>
                                </div>
                            </section>
                            <section className='mb-4 w-full md:w-[100%]'>
                                <label
                                    htmlFor="question2"
                                    className='text-zeta   font-semibold'>
                                    <h2 className='text-md'>
                                        3. Plagiarism report generated through a reliable source:
                                    </h2>
                                </label>
                                <div
                                    className='gap-1  p-2 mt-2  outline-none flex items-center'>
                                    <ImFilesEmpty />
                                    <a
                                        class="relative   text-sm w-fit block after:block after:content-[''] after:absolute after:h-[1px] after:bg-zeta after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
                                        target='_blank'
                                        href='https://cloud.mongodb.com/v2/66ce1b56a145fb06af98fa6b#/metrics/replicaSet/66ce1c525a6f3b0f8da07a90/explorer/test/proposals/find'>
                                        View Report</a>
                                </div>
                            </section>
                            <section className='mb-4 w-full md:w-[100%]'>
                                <label
                                    htmlFor="question2"
                                    className='text-zeta   font-semibold'>
                                    <h2 className='text-md'>
                                        4. AI detection report by following the process:
                                    </h2>
                                </label>
                                <div
                                    className='gap-1  p-2 mt-2  outline-none flex items-center'>
                                    <ImFilesEmpty />
                                    <a
                                        class="relative  text-sm  w-fit block after:block after:content-[''] after:absolute after:h-[1px] after:bg-zeta after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
                                        target='_blank'
                                        href='https://cloud.mongodb.com/v2/66ce1b56a145fb06af98fa6b#/metrics/replicaSet/66ce1c525a6f3b0f8da07a90/explorer/test/proposals/find'>
                                        View Report</a>
                                </div>
                            </section>
                            <section className='mb-4 w-full md:w-[100%]'>
                                <label
                                    htmlFor="question2"
                                    className='text-zeta   font-semibold'>
                                    <h2 className='text-md'>
                                        5. Informed consent statement  for ERC to assess proposal data confidentiality levels, storage & disposal needs.
                                    </h2>
                                </label>
                                <textarea
                                    id=''
                                    name=''
                                    rows={4}
                                    className='border mt-2 rounded-md block py-[0.67rem]  px-2 w-full md:w-[50%] outline-none'
                                    placeholder='Add Details'
                                ></textarea>
                            </section>
                            <section className='mb-4 w-full md:w-[100%]'>
                                <label
                                    htmlFor="question2"
                                    className='text-zeta   font-semibold'>
                                    <h2 className='text-md'>
                                        6. How was data privacy, and confidentiality ensured as claimed in the proposal submission.
                                    </h2>
                                </label>
                                <textarea
                                    rows={4}
                                    id=''
                                    name=''
                                    className='border mt-2 rounded-md block py-[0.67rem]  px-2  w-full md:w-[50%] outline-none'
                                    placeholder='Add Details'
                                ></textarea>
                            </section>
                            <section className='mb-4 w-full md:w-[100%]'>
                                <label
                                    htmlFor="question2"
                                    className='text-zeta   font-semibold'>
                                    <h2 className='text-md'>
                                        7. Was any harm recorded by the study participants or researchers directly due to the conduct of research? If yes, how was it managed?
                                    </h2>
                                </label>
                                <textarea
                                    rows={4}
                                    id=''
                                    name=''
                                    className='border mt-2 rounded-md block py-[0.67rem]   px-2 w-full md:w-[50%] outline-none'
                                    placeholder='Add Details'
                                ></textarea>
                            </section>
                            <section className='mb-4 w-full md:w-[100%]'>
                                <label
                                    htmlFor="question2"
                                    className='text-zeta   font-semibold'>
                                    <h2 className='text-md'>
                                        8. Feedback of Aurthors
                                    </h2>
                                </label>
                                <section className='pr-4 my-5'>
                                    <div className=' flex flex-col gap-5 h-[70vh] overflow-auto pr-1'>
                                        <section className='md:h-[70vh] bg-epsilon bg-opacity-50 p-5'>
                                            <p>Name</p>
                                            <p>Designation</p>
                                            <div className='max-w-full overflow-scroll'>
                                    <table className=" w-full ">
                                        <thead>
                                            <tr className="bg-epsilon text-white">
                                                <th className=" p-2  max-w-[20%] text-left">Author Position</th>
                                                <th className=" p-2   max-w-[20%] text-left">Author Name</th>
                                                <th className=" p-2  max-w-[20%] text-left">Justification</th>
                                                <th className=" p-2  max-w-[20%]  text-left">Confidence Percent </th>
                                            </tr>
                                            
                                        </thead>
                                        <tbody>
                                       
                                                <tr className=" ]">
                                                    <td className="border  max-w-[20%] p-2">{`row.position`}</td>
                                                    <td className="border max-w-[20%] p-2">{`row.name`}</td>
                                                    <td className="border  max-w-[23%] p-2">{`row.justification`}</td>
                                                    <td className="border  max-w-[20%]  p-2">{`row.confidence`}</td>
                                                   
                                                </tr>
                                                <tr className=" ]">
                                                    <td className="border  max-w-[20%] p-2">{`row.position`}</td>
                                                    <td className="border max-w-[20%] p-2">{`row.name`}</td>
                                                    <td className="border  max-w-[23%] p-2">{`row.justification`}</td>
                                                    <td className="border  max-w-[20%]  p-2">{`row.confidence`}</td>
                                                   
                                                </tr>
                                                so on
                                         
                                        </tbody>
                                    </table>
                                </div>
                                        </section>
                                        <section className='md:h-[70vh] bg-epsilon bg-opacity-50 p-5'>
                                            <p>Name</p>
                                            <p>Designation</p>
                                            table 1 his opinion
                                        </section>
                                        <section className='md:h-[70vh] bg-epsilon bg-opacity-50 p-5'>
                                            <p>Name</p>
                                            <p>Designation</p>
                                            table 1 his opinion
                                        </section><section className='md:h-[70vh] bg-epsilon bg-opacity-50 p-5'>
                                            <p>Name</p>
                                            <p>Designation</p>
                                            table 1 his opinion
                                        </section><section className='md:h-[70vh] bg-epsilon bg-opacity-50 p-5'>
                                            <p>Name</p>
                                            <p>Designation</p>
                                            table 1 his opinion
                                        </section>
                                        <section className='md:h-[70vh] p-5 bg-epsilon bg-opacity-50'>
                                            <p>Name</p>
                                            <p>Designation</p>
                                       
                                        </section>
                                    </div>
                                </section>
                            </section>
                            <section className='mb-4 w-full md:w-[100%]'>
                                <label
                                    htmlFor="question2"
                                    className='text-zeta   font-semibold'>
                                    <h2 className='text-md'>
                                        9. Authorship
                                    </h2>
                                </label>
                                <p className='text-sm'>Add Aurthor in Sequence</p>
                                <div className="py-5 md:w-[50%] w-full">
                                    <div className="flex mb-4">
                                        <input
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            className="flex-1 p-2 border rounded-l outline-none"
                                            placeholder="Add Author "
                                        />
                                        <button
                                            onClick={handleAddItem}
                                            className="px-4 py-2 bg-epsilon text-white rounded-r hover:bg-zeta duration-300"
                                        >
                                            {editIndex !== null ? 'Update' : 'Add'}
                                        </button>
                                    </div>
                                    <ul className="list-disc text-sm ">
                                        {authors.map((item, index) => (
                                            <li key={index} className="flex items-center justify-between p-2 border-b border-gray-300">
                                                <span>{index + 1}.  {item}</span>
                                                <div>
                                                    
                                                    
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </section>
                            <button
                                // onClick={onSubmit}
                                // disabled={isButtonEnabled}
                                className={`  mt-6 px-8 py-3  group relative overflow-hidden bg-epsilon text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon`}
                            >
                                <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                                Approve
                            </button>
                        </header>
                    </div>
                </section>
            </div>
        </>
    );
}
