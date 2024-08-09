import React from 'react'
import Navbar from '../layout/Navs/Navbar'
import Footer from '../layout/Footer'
import { Link } from 'react-router-dom'
export default function LearnMore() {
    const publications = [
        {
            cohort: 'Sept 22 Cohort',
            items: [
                { title: 'Health and Living conditions after Flood in Pakistan, 2022: Experience of one Union Council.', status: 'Published' },
                { title: 'Assessing Smartphone Addiction Among Pakistani Medical & Engineering University Students: A Cross-Sectional Study.', status: 'Submitted for Publication' },
                { title: 'Barriers and Enablers in Implementing Cost-Effective NCD Drug Reimbursement through Social Insurance Schemes in Pakistan.', status: 'Submitted for Publication' },
            ],
        },
        {
            cohort: 'Jan 23 Cohort',
            items: [
                { title: 'Socio-developmental outcomes among children in relation to Physical activity.', status: 'Submitted for Publication' },
                { title: 'Recent Advancements in the Implementation of Assessment using Microfluidic Kidney-on-a-Chip Models in Biomedical Research.', status: 'Submitted for Publication' },
            ],
        },
        {
            cohort: 'May 23 Cohort',
            items: [
                { title: 'Awareness regarding GhATGPT among medical students and trainees.', status: 'Submitted for Publication' },
                { title: 'Unraveling the Complexities of Non-Invasive Investigations into Multifactorial Determinants.', status: 'Submitted for Publication' },
                { title: 'Telemedicine as a New Frontier for Open Dialogue among Healthcare Professionals in Pakistan.', status: 'Submitted for Publication' },
                { title: 'The Role of Phytotherapy in Bridging Traditional and Orthomolecular Differences in Healthcare.', status: 'Published' },
            ],
        },
        {
            cohort: 'Nov 23 Cohort',
            items: [
                { title: 'Caring for the care givers: An observational determinants of Happiness among health care workers in Pakistan.', status: 'Manuscript Writing' },
                { title: 'Investigating the Correlation Between Urban and Lean Psychosis-Vitamin D as a Case Study.', status: 'Manuscript Writing' },
                { title: 'Assessing Health and Economic Ramifications of Sleep.', status: 'Manuscript Writing' },
                { title: 'Healthcare Motivation – Attitudes and Perceptions: What do Employees Think?', status: 'Manuscript Writing' },
            ],
        },
    ];
    return (
        <>
            <Navbar />
            <div className="bg-[#e5f8e3] text-[#092b09] p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6">Research Training</h1>
                <div className="space-y-4 mb-6">
                    <a
                        href="#"
                        className="block text-lg font-semibold text-green-800 hover:underline"
                    >
                        Research Mentoring Program for Health Care Professionals – APR 2024
                    </a>
                    <a
                        href="#"
                        className="block text-lg font-semibold text-green-800 hover:underline"
                    >
                        Advanced Research Internship Program for Health Care Professionals – OCT 2023
                    </a>
                    <a
                        href="#"
                        className="block text-lg font-semibold text-green-800 hover:underline"
                    >
                        Research Internship Batch 3 – May 1<sup>st</sup> to July 31<sup>st</sup> 2023
                    </a>
                </div>
                <p className="text-sm mb-6">
                    This is a project for Developing a Culture of Ethical and Quality Research in Country by Capacity Building, Facilitation and Collaborations. As part of this project, "Training of Trainers" (Community Medicine doctors) and "Students Research Internship" have been initiated. For providing facilitation to researchers, services will be provided as ethically applicable. Collaborations will be promoted to connect researchers with resources and promote multidisciplinary researches.
                </p>
                <p className="text-sm mb-6">
                    First research project designed in collaboration with students, clinicians, academicians and public health practitioners was reviewed by BMV Ethics Review Committee and was approved.
                </p>
                <div className="gap-4 flex-col flex w-fit">
                    <div >
                        <p className='my-3 text-xl font-bold'>Ethics Review Policy</p>
                        <Link to='https://docs.google.com/document/d/1CufblHjoCnyGzd2aFeJ4ippRdPBGgcLQ/edit?pli=1' className="bg-zeta text-white px-4 py-2 rounded">
                            Read More
                        </Link>
                    </div>
                    <div>
                        <p className='my-3 text-xl font-bold'>ERC Online Application</p>
                        <Link to='https://docs.google.com/forms/d/e/1FAIpQLSfmEnvuc4vV1ciG8kcdjw8j8CRgk-oJb403KwwtaIX12w2QdA/viewform' className="bg-zeta text-white px-4 py-2 rounded ">
                            Read More
                        </Link>
                    </div>
                </div>
            </div>
            <div className=" text-[#092b09] p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6">List of <span className="text-[#0e6000]">Interns</span> Publications</h1>
                {publications.map((cohort, index) => (
                    <div key={index} className="mb-8">
                        <h2 className="text-lg font-bold border-b w-fit border-b-zeta mb-2 text-zeta">{cohort.cohort}</h2>
                        <ul className="space-y-2">
                            {cohort.items.map((item, idx) => (
                                <li key={idx} className="flex justify-between items-center">
                                    <span className="text">{idx + 1}. {item.title}</span>
                                    <span className="xl:block hidden font-medium">
                                        {item.status === 'Published' && (
                                            <span className="text-green-700">{item.status}</span>
                                        )}
                                        {item.status === 'Submitted for Publication' && (
                                            <span className="text-blue-700">{item.status}</span>
                                        )}
                                        {item.status === 'Manuscript Writing' && (
                                            <span className="text-orange-700">{item.status}</span>
                                        )}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <Footer />
        </>
    )
}
