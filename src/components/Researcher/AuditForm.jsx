import React, { useState, useEffect } from 'react';
import Sidebar from '../layout/Sidebar.jsx';
import { Link } from 'react-router-dom';
import UserNavbar from '../layout/Navs/UserNavbar.jsx';
import toast, { Toaster } from "react-hot-toast";
import Loader from '../layout/Loader.jsx'
import { getCookie } from "cookies-next";
import { useParams } from 'react-router-dom';
export default function AuditForm() {
    const { proposalId } = useParams();
    const [fetchMembers, setFetchMembers] = useState([])
    const [loading, setLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);



    const [formData, setFormData] = useState({
        manuscript: null,
        dataFile: null,
        plagiarismReport: null,
        aiDetectionReport: null,
        informedConsent: '',
        dataPrivacy: '',
        harmRecorded: ''
    });




    // Assuming you are using react-toastify for notifications

    const handleChange = async (e) => {
        const { name, type, files, value } = e.target;
    
        if (type === 'file') {
            const file = files[0];
           
            
            if (file) {
                try {
                    const token = getCookie("token");
                    const myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                 
                    myHeaders.append("Authorization", `Bearer ${token}`);
                    const filesData = new FormData();
                    filesData.append("file", file);
    
                    // Fetch request
                    const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/uploadFile`, {
                        method: "POST",
                        body: filesData,
                        headers: myHeaders
                    });
    
                    const result = await response.json();
    
                    if (response.ok && result.success) {
                        const fileUrl = result.url;
                        alert(fileUrl);
                        console.log(fileUrl);
    
                        // Update state
                        setFormData(prevState => ({
                            ...prevState,
                            [name]: fileUrl
                        }));
                    } else {
                        toast.error(result.message || 'File upload failed.');
                    }
                } catch (error) {
                    toast.error(`Error: ${error.message}`);
                }
            }
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    
        // Log the updated state after a slight delay
        // Consider using useEffect to monitor formData changes if needed
    };
    

    const [fetchingDataLoad, SetFetchingDataLoad] = useState(false);
    const checkTeamAuthorship = async () => {
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
            const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/fetch-users-without-authorship-entry`, {
                method: 'POST',
                headers: myHeaders,
                credentials: 'include',
                body: JSON.stringify({ proposalId })
            });
            if (!response.ok) {
                console.log(response)
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            if (result.success) {
                setFetchMembers(result.users);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`);
            console.log(error)
        } finally {
            SetFetchingDataLoad(false);
        }
    };
    useEffect(() => {
        checkTeamAuthorship();
    }, [proposalId]);
    if (fetchingDataLoad) {
        return (
            <Loader />)
    }
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="flex xl:flex-row flex-col font-WorkSans-Regular">
                <Sidebar pageName='' />
                <section className='w-full xl:w-[85%] bg-stone-50 h-screen overflow-y-scroll'>
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
                                    id='manuscript'
                                    name='manuscript'
                                    value={formData.manuscript}
                                    onChange={handleChange}
                                    // accept='.doc,.docx'
                                    className='border mt-2 rounded-md block py-[0.67rem] bg-stone-50 px-2 w-[90%] md:w-[50%] outline-none'
                                    placeholder='Add File'
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
                                    id='dataFile'
                                    name='dataFile'
                                    value={formData.dataFile}
                                    onChange={handleChange}
                                    className='border mt-2 rounded-md block py-[0.67rem] bg-stone-50 px-2 md:w-[50%] outline-none'
                                    placeholder='Add File'
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
                                    id='plagiarismReport'
                                    onChange={handleChange}
                                    value={formData.plagiarismReport}
                                    name='plagiarismReport'
                                    className='border mt-2 rounded-md block py-[0.67rem] bg-stone-50 px-2 md:w-[50%] outline-none'
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
                                    id='aiDetectionReport'
                                    onChange={handleChange}
                                    value={formData.aiDetectionReport}
                                    name='aiDetectionReport'
                                    className='border mt-2 rounded-md block py-[0.67rem] bg-stone-50 px-2 md:w-[50%] outline-none'
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
                                     id='informedConsent'
                                    name='informedConsent'
                                    value={formData.informedConsent}
                                    onChange={handleChange}
                                    rows={4}
                                    className='border mt-2 rounded-md block py-[0.67rem] bg-stone-50 px-2 w-full md:w-[50%] outline-none'
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
                                      id='dataPrivacy'
                                    name='dataPrivacy'
                                    value={formData.dataPrivacy}
                                    onChange={handleChange}
                                    className='border mt-2 rounded-md block py-[0.67rem] bg-stone-50 px-2  w-full md:w-[50%] outline-none'
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
                                    id='harmRecorded'
                                    name='harmRecorded'
                                    value={formData.harmRecorded}
                                    onChange={handleChange}
                                    className='border mt-2 rounded-md block py-[0.67rem] bg-stone-50 px-2 w-full md:w-[50%] outline-none'
                                    placeholder='Add Details'
                                ></textarea>
                            </section>
                            <div className='mt-5'>
                                <div className='border-l-2 border-l-epsilon font-semibold md:p-3 p-5 '>
                                    Disclaimer
                                    <p className='font-normal'>
                                        Following Team Members have not submitted the authorship opinion form yet:
                                    </p>
                                </div>
                                <div className='grid gird-cols-1 md:grid-cols-2 w-full my-5  gap-5'>
                                    {fetchMembers.map((user, index) => (
                                        <>
                                            <div key={index} className="my-2 bg-stone-50 w-full  p-2 ">
                                            <h2>Name: {user.fullname || 'Not provided'}</h2>
            <p>Email: {user.workemail || 'Not provided'}</p>
            <p>Role: {user.role || 'Not specified'}</p>
                                            </div>
                                        </>
                                    ))}
                                </div>
                            </div>
                            <button
                                type="button"
                                // onClick={SubmitAuditOpinion}
                                className={`w-fit flex md:m-0 m-5 font-Satoshi-Black duration-300 text-white py-2 px-4 ${!submitLoading ? 'bg-epsilon hover:bg-zeta' : 'bg-gray-400 cursor-not-allowed'}`}
                                disabled={submitLoading}
                            >
                                {submitLoading ? 'Submitting' : 'Submit'}
                            </button>
                        </header>
                    </div>
                </section>
            </div>
        </>
    );
}
