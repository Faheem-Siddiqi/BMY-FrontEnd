import React, { useState, useEffect } from 'react';
import Sidebar from '../layout/Sidebar.jsx';
import { ImFilesEmpty } from "react-icons/im";
import { Link } from 'react-router-dom';
import UserNavbar from '../layout/Navs/UserNavbar.jsx';
import toast from 'react-hot-toast';
export default function AuditForm() {
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
                                        1. Please upload your manuscript. Also include the following sections along with manucript:
                                    </h2>
                                    <div className='my-3 text-sm'>
                                        <h3>First page:</h3>
                                        <ul className='font-light mb-2'>
                                            <li>List all author names with their corresponding affiliations.</li>
                                            <li> For interns, use the designation "Research Intern, BMY Health".</li>
                                            <li>For mentors, use "Senior Researcher, BMY Health".</li>
                                        </ul>
                                        <h3>Acknowledgement Section:</h3>
                                        <ul className='font-light mb-2'>
                                            <li>Include the name and designation of the member overseeing research ethics (e.g., Research Ethics Committee Member).</li>
                                            <li>Mention any research coordinators or mentors who are non-authors, using their respective designations.</li>
                                        </ul>
                                        <h3>Additional Notes:</h3>
                                        <ul className='font-light mb-2'>
                                            <li>Ensure there are no multiple affiliations listed, as journals consider this a red flag.</li>
                                            <li>The author sequence in the uploaded file will not be considered final. The ERC team will finalize it based on suggestions.</li>
                                        </ul>
                                    </div>
                                </label>

                              
                                <input
                                    type='file'
                                    id=''
                                    name=''
                                    accept='.doc,.docx'
                                    className='border mt-2 rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-[90%] md:w-[50%] outline-none'
                                    placeholder='Add Details'
                                />
                            </section>
                            <section className='mb-4 w-full md:w-[100%]'>
                                <label
                                    htmlFor="question2"
                                    className='text-zeta   font-semibold'>
                                    <h2 className='text-md'>
                                        2. Please upload your data file  for audit and subsequent storage in BMY Health records for a period of two years. Ensure that no hard copies or personal information of respondents are retained by any team member.
                                    </h2>
                                </label>
                                <input
                                    type='file'
                                    id=''
                                    name=''
                                    accept='.doc,.docx'
                                    className='border mt-2 rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 md:w-[50%] outline-none'
                                    placeholder='Add Details'
                                />
                            </section>
                            <section className='mb-4 w-full md:w-[100%]'>
                                <label
                                    htmlFor="question2"
                                    className='text-zeta   font-semibold'>
                                    <h2 className='text-md'>
                                        3. Please upload the plagiarism report generated through a reliable source, such as Paperpal. Avoid using any unreliable sources that could compromise data security.
                                    </h2>
                                </label>
                                <input
                                    type='file'
                                    id=''
                                    name=''
                                    accept='.doc,.docx'
                                    className='border mt-2 rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 md:w-[50%] outline-none'
                                    placeholder='Add Details'
                                />
                            </section>
                            <section className='mb-4 w-full md:w-[100%]'>
                                <label
                                    htmlFor="question2"
                                    className='text-zeta   font-semibold'>
                                    <h2 className='text-md'>
                                        4. Please upload the AI detection report by following the process:
                                    </h2>
                                    <p className='text-sm mt-2'>
                                        Visit <a className='underline' href="https://typeset.io/ai-detector">https://typeset.io/ai-detector.</a> Upload your PDF, analyze it, and then download and submit the PDF report.
                                    </p>
                                </label>
                                <input
                                    type='file'
                                    id=''
                                    name=''
                                    accept='.pdf'
                                    className='border mt-2 rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 md:w-[50%] outline-none'
                                    placeholder='Add Details'
                                />
                            </section>
                            <section className='mb-4 w-full md:w-[100%]'>
                                <label
                                    htmlFor="question2"
                                    className='text-zeta   font-semibold'>
                                    <h2 className='text-md'>
                                        5. Paste your informed consent statement here for ERC to assess your data confidentiality levels, storage & disposal needs.
                                    </h2>
                                </label>
                                <textarea
                                    id=''
                                    name=''
                                    rows={4}
                                    className='border mt-2 rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full md:w-[50%] outline-none'
                                    placeholder='Add Details'
                                ></textarea>
                            </section>
                            <section className='mb-4 w-full md:w-[100%]'>
                                <label
                                    htmlFor="question2"
                                    className='text-zeta   font-semibold'>
                                    <h2 className='text-md'>
                                        6. Inform how was data privacy, and confidentiality ensured as claimed in the proposal submission. Also inform if data is stored in any other places/ shared with someone externally e.g. with any service provider.
                                    </h2>
                                </label>
                                <textarea
                                    rows={4}
                                    id=''
                                    name=''
                                    className='border mt-2 rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2  w-full md:w-[50%] outline-none'
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
                                    className='border mt-2 rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full md:w-[50%] outline-none'
                                    placeholder='Add Details'
                                ></textarea>
                            </section>
                        </header>
                    </div>
                </section>
            </div>
        </>
    );
}
