import React, { useState, useEffect } from 'react';
import toast, { Toaster } from "react-hot-toast";
import Loader from '../layout/Loader.jsx';
import { getCookie } from "cookies-next";
import { ImFilesEmpty } from "react-icons/im";
import { FaEdit, FaTrash } from 'react-icons/fa';
export default function ReviewAudit({
    proposalId, title, BMYid, authorshipTable, auditForm, toggleSelectedAuditProposal
}) {
    const [authors, setAuthors] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [approvalLoading, setApprovalLoading] = useState(false)
    const SubmitAuditForm = async () => {
        if (!proposalId) {
            toast.error('Proposal ID is missing. Make sure you don\'t change the URL.');
            return;
        }
        const SubmitData = JSON.stringify({
            proposalId,
            authors: authors,
        });
        setApprovalLoading(true);
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const token = getCookie("token");
            if (token) {
                myHeaders.append("Authorization", `Bearer ${token}`);
            }
            const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/approveAudit`, {
                method: 'PATCH',
                body: SubmitData,
                headers: myHeaders,
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            if (result.success) {
                setApprovalLoading(false);
                toast.success('Audit Approved Successfully.')
                window.location.reload();
            } else {
                setApprovalLoading(false);
                toast.error('Audit not found.');
            }
        } catch (error) {
            toast.error(`Error Approving Audit: ${error.message}`);
            console.log(error);
            setApprovalLoading(false);
        } finally {
            setApprovalLoading(false);
        }
    };
    const handleAddItem = () => {
        if (inputValue.trim() === '') return;
        if (editIndex !== null) {
            const updatedItems = authors.map((item, index) =>
                index === editIndex ? inputValue : item
            );
            setAuthors(updatedItems);
            setEditIndex(null);
        } else {
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
            <Toaster position="top-center" reverseOrder={false} />
            <div className='text-center'>
                <div className='font-bold  text-lg'>
                    <span className='mr-1'>
                        Proposal:
                    </span>
                    <span className='text-epsilon font-normal'>BMY-{BMYid}</span>
                </div>
                <h2 className='my-1'>
                    {`"${title}"`}
                </h2>
            </div>
            <hr className='my-5' />
            <header className='bg-epsilon bg-opacity-50 p-4 border-l-4 text-justify border-l-epsilon'>
                Dear member, please note that this form contains highly confidential data and intellectual property owned by someone. Kindly ensure you open the files using a secure internet connection on your personal computer only, and take extra precautions to keep all files secure and remove from your device after completing the audit. Thank you!
            </header>
            <header className='md:bg-stone-50 md:shadow-sm my-5 md:p-5'>
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
                            className="relative text-sm w-fit block after:block after:content-[''] after:absolute after:h-[1px] after:bg-zeta after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
                            target='_blank'
                            href={`${auditForm.Manuscript}`}>
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
                            className="relative   text-sm w-fit block after:block after:content-[''] after:absolute after:h-[1px] after:bg-zeta after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
                            target='_blank'
                            href={auditForm['Data file for audit and subsequent storage in BMY Health records for a period of two years.'] || 'https://default-link.com'}>
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
                            className="relative   text-sm w-fit block after:block after:content-[''] after:absolute after:h-[1px] after:bg-zeta after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
                            target='_blank'
                            href={auditForm['Plagiarism report generated through a reliable source'] || 'https://default-link.com'}>
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
                        {/* AI detection report by following the process */}
                        <a
                            className="relative  text-sm  w-fit block after:block after:content-[''] after:absolute after:h-[1px] after:bg-zeta after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
                            target='_blank'
                            href={auditForm['AI detection report by following the process']}>
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
                        disabled
                        value={auditForm["Informed consent statement for ERC to assess proposal data confidentiality levels, storage & disposal needs"] || 'No information available'}
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
                        disabled
                        rows={4}
                        value={auditForm["How was data privacy, and confidentiality ensured as claimed in the proposal submission"] || 'No information available'}
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
                        disabled
                        rows={4}
                        value={auditForm["Was any harm recorded by the study participants or researchers directly due to the conduct of research? If yes, how was it managed?"] || 'No information available'}
                        className='border mt-2 rounded-md block py-[0.67rem]   px-2 w-full md:w-[50%] outline-none'
                    ></textarea>
                </section>
                <section className='mb-4 w-full md:w-[100%]'>
                    <label
                        htmlFor="question2"
                        className='text-zeta   font-semibold'>
                        <h2 className='text-md'>
                            8. Feedback of Aurthors:
                        </h2>
                    </label>
                    <section className=' my-5'>
                        <div className=' flex flex-col gap-5 h-[70vh] overflow-auto pr-1'>
                            {authorshipTable && authorshipTable.length > 0 ? (
                                authorshipTable.map((userOpinion, index) => (
                                    <div className=' md:bg-epsilon !bg-opacity-50  md:p-5' key={index}>
                                        {userOpinion.authorDetails.length > 0 && (
                                            <>
                                                <div className="overflow-x-auto my-2">
                                                    <table className="w-full border border-collapse hidden md:table">
                                                        <thead className="bg-zeta border-zeta border-collapse text-white border">
                                                            <tr>
                                                                <th className="py-2 px-4 w-[16%] text-left">Author Position</th>
                                                                <th className="py-2 px-4 w-[25%] text-left">Author Name</th>
                                                                <th className="py-2 px-4 w-[31%] break-all text-left">Justification</th>
                                                                <th className="py-2 px-4 w-[15%]   break-all text-left">Confidence %</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {userOpinion?.authorDetails && userOpinion.authorDetails.map((row, index) => (
                                                                <tr key={index}>
                                                                    <td className="py-2 px-4 border">{row[0].authorPosition || 'N/A'}  </td>
                                                                    <td className="py-2 px-4 border">{row[0].authorName || 'N/A'}</td>
                                                                    <td className="py-2 px-4  border">{row[0].justification || 'N/A'}</td>
                                                                    <td className="py-2 px-4 border">{row[0].confidence || 'N/A'}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                    <div className="block md:hidden mt-4">
                                                        {userOpinion?.authorDetails && userOpinion.authorDetails.map((row, index) => (
                                                            <div key={index} className=" mb-10">
                                                                <div className="flex">
                                                                    <span className="w-[35%] break-all bg-zeta rounded-tl p-2 text-white">Position</span>
                                                                    <span className='w-[65%] border break-all px-1'>{row[0].authorPosition || 'N/A'}</span>
                                                                </div>
                                                                <div className="flex">
                                                                    <span className="w-[35%] p-2 break-all bg-zeta text-white">Name</span>
                                                                    <span className='w-[65%] border break-all px-1'>{row[0].aurthorName || 'N/A'}</span>
                                                                </div>
                                                                <div className="flex">
                                                                    <span className="w-[35%] bg-zeta p-2 break-all text-white">Justification</span>
                                                                    <span className='w-[65%] border break-all px-1'>{row[0].justification || 'N/A'}</span>
                                                                </div>
                                                                <div className="flex">
                                                                    <span className="w-[35%] break-all bg-zeta p-2 text-white">Confidence</span>
                                                                    <span className='w-[65%] break-all border px-1'>{row[0].confidence || 'N/A'}</span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        <h2 className='text-md   font-bold text-zeta'>
                                            Justification
                                        </h2>
                                        <p className='text-sm '>Justification for adding more than 10 authors or for removing any author (if required)</p>
                                        <textarea
                                            disabled
                                            value={userOpinion.secondJustification || 'No information available'}
                                            rows={4}
                                            className='border mt-2 rounded-md block py-[0.67rem]  px-2 w-full md:w-[50%] outline-none'
                                            placeholder='Add Details'
                                        ></textarea>
                                    </div>
                                ))
                            ) : (
                                <div className='bg-epsilon bg-opacity-50 p-5 '>No data Available</div>
                            )}
                        </div>
                    </section>
                </section>
                <section className='mb-4 w-full'>
                    <label
                        htmlFor="question2"
                        className='text-zeta   font-semibold'>
                        <h2 className='text-md'>
                            9. What is your suggestion about authorship as ERC Members?
                        </h2>
                    </label>
                    <p className='text-sm'>Write aurthor sequence below by adding names one by one in sequence</p>
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
                                        <button
                                            onClick={() => handleEditItem(index)}
                                            className="bg-epsilon text-white rounded-md w-fit hover:bg-zeta duration-300 mr-2"
                                        >
                                            <FaEdit className='m-1 text-[14px]' />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteItem(index)}
                                            className="bg-red-500 text-white rounded-md w-fit hover:bg-red-600 duration-300 mr-2"
                                        >
                                            <FaTrash className='m-1 text-[14px]' />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
                <button
                    onClick={SubmitAuditForm}
                    disabled={authors.length === 0}
                    className={`${authors.length === 0 ? ("cursor-not-allowed bg-stone-400") : ("cursor-pointer  bg-epsilon  hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon")} mt-6 px-8 py-3  group relative overflow-hidden  text-white transition-all duration-300 ease-out `}
                >
                    <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                    {!approvalLoading ? ('Approve') : ('Approving')}
                </button>
            </header>
        </>
    );
}
