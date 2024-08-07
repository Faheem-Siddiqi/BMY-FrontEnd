import React, { useState, useEffect } from 'react';
import Information from './ProposalSections/Information.jsx';
import ScientificReview from './ProposalSections/ScientificReview.jsx';
import EthicalReview from './ProposalSections/EthicalReview.jsx';
import Consent from './Consent.jsx';
import toast, { Toaster } from "react-hot-toast";
import Loader from '../../layout/Loader.jsx';
export default function Proposal({ assignProposal, role, MemberproposalId }) {


    const [formState, setFormState] = useState({ //Ethical Review Form
        table1Answers: {
            table1a: 'Yes',
            table1b: '',
            table1c: '',
            table1d: 'Yes',
            table1e: '',
            table1f: '',
            table1g: '',
        },
        question1: 'No',
        table1InnerScore: 0,
        table1Score: 0,
        table2Answers: {
            table2a: '',
            table2b: '',
            table2c: '',
        },
        table2Score: 0,
        table3Answers: {
            table3a: '',
            table3b: '',
            table3c: '',
            table3d: '',
            table3e: '',
            table3f: 'Yes',
            table3g: '',
        },
        table4Answers: {
            table4a: '',
            table4b: '',
        },
        question2: '',
        question3: '',
        table4Score: 0,
        table5Answers: {
            table5a: 'Yes',
            table5b: '',
            table5c: '',
            table5d: 'Yes',
            table5e: '',
            table5f: '',
            table5g: ''
        },
        table5Score: 0,
        table6Answers: {
            table6a: 'N/A',
            table6b: 'Moderate gains',
            table6c: 'Minor gains',
        },
        table6Score: 0,

    });

    const [consentData, setConsentData] = useState({
        question1: '',
        question2: '',
        question3: '',
        question4: '',
    });
    const [informationData, setInformationData] = useState({
        question1: '',
        question2: [
            'Feasible (have manpower, budget, time for data collection and writing)',
            'Addressing research question on right time as community/decision makers are looking for the answers'
        ],
        question3: '',
    });
    const [sectionAssigned, setSectionAssigned] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchMemberAssignSection = async () => {
            try {
                setLoading(true)
                const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/get-assigned-section-researcher`, {
                    method: 'GET',
                    redirect: 'follow',
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                if (result.success) {
                    setLoading(false)
                    // console.log(result)
                    const formattedSections = result.assignedSections.map(alotedSection => ({
                        id: alotedSection.proposalId,
                        section: alotedSection.section ? alotedSection.section : '',
                        questions: alotedSection.questions ? alotedSection.questions : '',
                    }));
                    const informationIndex = formattedSections.findIndex(item => item.section === 'information');
                    const scientificReviewindex = formattedSections.findIndex(item => item.section === 'scientificReview');
                    const ethicalReviewindex = formattedSections.findIndex(item => item.section === 'ethicalReview');
                    const consentIndex = formattedSections.findIndex(item => item.section === 'consent');
                    if (informationIndex !== -1) {
                        const Questions = formattedSections[informationIndex].questions
                        setInformationData({
                            question1: Questions["Proposal Contact Email"] || '',
                            question2: Questions["Your research topic fulfills which of these criteria"]
                                ? Questions["Your research topic fulfills which of these criteria"]
                                    .split(' -- ') // Split by '--' if it exists
                                    .map(item => item.trim()) // Trim whitespace from each item
                                    .filter(item => item !== '') // Remove any empty or whitespace-only strings
                                : [],
                            question3: Questions["Name the beneficiary group clearly identified that will benefit from the information generated in your research"] || ''
                        });
                    }
                    if (consentIndex !== -1) {
                        const Questions = formattedSections[consentIndex].questions
                        setConsentData({
                            question1: Questions["Will the project require approval by any other ethics committee other than the BMY Ethics Committee?"] || '',
                            question2: Questions["From where additional IRB approval is required"] || '',
                            question3: Questions["Have the research team and data collectors got the relevant training?"] || '',
                            question4: Questions["Are there any financial or other interests to the researcher(s) or department arising from this study, known to you?"] || '',
                        });
                    }
                    if (ethicalReviewindex !== -1) {
                        const Questions = formattedSections[ethicalReviewindex].questions
                        setFormState({

                            question1: Questions['In case of any such risk, is the participant informed about risks in detail at the time of informed consent?'] || '',
                            question2: Questions['In case of any risk to the special group, have you assigned a member to monitor those risks?'] || '',
                            question3: Questions['Is the research excluding groups such as elderly, women, pregnant, language barrier from research without scientific evidence of these groups being at risk in given scenario of your research?'] || '',

                            table1a: Questions["Is there any contact with potentially harmful items or substances?"] || '',
                            table1b: Questions["Is there any risk of emotional disturbance of participant with any sensitive question in your proforma?"] || '',
                            table1c: Questions["Is there a risk of breach of privacy (e.g. subjects' names, initials, or hospital numbers, pictures going to be published in manuscripts) without informed consent?"] || '',
                            table1d: Questions["Is there any risk of social stigma for the community (such as high prevalence of a disease with stigma) if data is published with name of that community (geographical/ religious/ ethnic group etc)?"] || '',
                            table1e: Questions["Is there any economic risk/ effect on career (such as employee feedback/ medical diagnosis are shared) for participant if data is disclosed outside research team?"] || '',
                            table1f: Questions["Is there any chance of disclosure requirements for participants details? For example, research outside the usual legal and ethical reporting, CR research for reporting harmful diseases and ethical issue regarding for research outside institutions disclosing personal info to research sponsors (pharma company) or other regulatory agencies/ community enterprise?"] || '',
                            table1g: Questions["Are any of the above risks to participants more than what they experience in everyday life?"] || '',
                            table2a: Questions["Is there a power differential between researchers and participants (researchers in a position of authority/ influencing decisions of participants care where they may readily give consent for data collection)?"] || '',
                            table2b: Questions["With questionnaires, will you give participants the option of omitting questions they don’t want to answer?"] || '',
                            table2c: Questions["Will you tell participants that their data will be treated with full confidentiality and if published, it will not be identifiable as theirs?"] || '',
                            table3a: Questions['People with impaired decision making capacity'] || '',
                            table3b: Questions['Children under 16'] || '',
                            table3c: Questions['Medically vulnerable'] || '',
                            table3d: Questions['Prisoners'] || '',
                            table3e: Questions['Economically or educationally disadvantaged'] || '',
                            table3f: Questions['Racial or ethnic minorities'] || '',
                            table3g: Questions['Institutionalized persons (correctional facilities, nursing homes, or mental health)	'] || '',
                            table4a: Questions['Are you considering special care for taking informed consent, with no coercion?'] || '',
                            table4b: Questions['Are the Risks to these participants (as mentioned in first table) less/ or at least not more than daily life risk?'] || '',


                            table5a: Questions['Qualitative research on sensitive topics which may disturb young/vulnerable/female data collectors without provision of counseling and training'] || '',
                            table5b: Questions['Contact with harmful agents or risk of physical injury'] || '',
                            table5c: Questions['Contact with infectious patients and risk to health'] || '',
                            table5d: Questions['Traveling in unsafe areas and risk of accidents/violence'] || '',
                            table5e: Questions['Risk of facing improper behavior by approaching some risky community (drug abusers/mentally challenged/persons involved in risky behaviors)'] || '',
                            table5f: Questions['Industry funded research with conditions of not disclosing risks to patients'] || '',
                            table5g: Questions['Research findings having the potential to expose big industry/mafia trends'] || '',


                            table6a: Questions['New knowledge gained and scientific development'] || '',
                            table6b: Questions['Trainings/ educational interventions for participants'] || '',
                            table6c: Questions['Early disease diagnosis/ screening of disease that helps patient in getting timely treatment. For such benefit research should include a step of informing patients of their diagnosis after data collection.'] || '',


                        });
                    }
                } else {
                    toast.error('Failed to load proposal details.');
                }
            } catch (error) {
                toast.error(`Error: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };
        fetchMemberAssignSection()
    }, []);
    //************************     Information Component 
    //Values-Required
    //Checkbox update
    const handleUpdateInformationData = (updatedData) => {
        setInformationData(updatedData);
    };
    // Update
    const handleInformationChange = (e) => {
        const { name, value } = e.target;
        setInformationData(prevState => ({ ...prevState, [name]: value }));
    };
    // Submission
    const handleInformationSubmission = async () => {
        try {
            const question2Joined = Array.isArray(informationData.question2)
                ? informationData.question2
                    .map(item => item.trim())
                    .filter(item => item !== '') // Remove empty or whitespace-only strings
                    .length === 2
                    ? informationData.question2.join(' -- ') // Join with ' -- ' if exactly two items
                    : informationData.question2.join(',') // Join with ',' if not exactly two items
                : informationData.question2;
            const payload = {
                "proposalId": MemberproposalId,
                "section": "information",
                "questions": {
                    "Proposal Contact Email": informationData.question1 || '',
                    "Your research topic fulfills which of these criteria": question2Joined || '',
                    "Name the beneficiary group clearly identified that will benefit from the information generated in your research": informationData.question3 || ''
                }
            };
            const raw = JSON.stringify(payload);
            const requestOptions = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: raw,
                redirect: "follow",
                credentials: 'include',
            };
            const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/submit-section`, requestOptions);
            const result = await response.json();
            if (response.ok) {
                toast.success("Data updated successfully!");
            } else {
                toast.error(result.message || "Failed to update data.");
            }
        } catch (error) {
            toast.error("Failed to update data.");
            console.log(error);
        }
    };
    //************************     Ethical Review Component 

    const calculateTable1Score = () => {
        let newScore = 0;
        for (const key in formState.table1Answers) {
            if (key !== 'table1g' && formState.table1Answers[key] === 'Yes') {
                newScore += 1;
            }
        }
        return formState.question1 === 'No' ? newScore * 5 : 0;
    };
    
    const calculateTable2Score = () => {
        let newScore = 0;
    
       
        const table2Answers = formState.table2Answers || {};
    
        if (table2Answers.table2a === 'Yes') {
            newScore += 1;
        }
        if (table2Answers.table2b === 'No') {
            newScore += 1;
        }
        if (table2Answers.table2c === 'No') {
            newScore += 1;
        }
    
        return newScore;
    };
    const calculateTable4Score = () => {
        let newScore = 0;
    
        const table4Answers = formState.table4Answers || {};
        
        if (table4Answers.table4a === 'No') {
            newScore += 10;
        }
        if (table4Answers.table4b === 'No') {
            newScore += 10;
        }
        if (formState.question2 === 'No') {
            newScore = 0;
        }
        if (formState.question3 === 'Yes') {
            newScore += 1;
        }
    
        return newScore;
    };
    
    const calculateTable5Score = () => {
        let newScore = 0;
    
        const table5Answers = formState.table5Answers || {};
        
        for (const key in table5Answers) {
            if (key !== 'table5g' && table5Answers[key] === 'Yes') {
                newScore += 1;
            }
        }
    
        return newScore;
    };
    
    const calculateTable6Score = () => {
        let newScore = 0;
    
        const table6Answers = formState.table6Answers || {};
    
        for (const key in table6Answers) {
            const value = table6Answers[key];
            
            if (value === 'Moderate gains') {
                newScore += 20;
            } else if (value === 'Minor gains') {
                newScore += 5;
            } else if (value === 'Major gains') {
                newScore += 30;
            }
        }
    
        return newScore;
    };
    
    useEffect(() => {
        setFormState(prevState => ({
            ...prevState,
            table1InnerScore: calculateTable1Score(),
            table1Score: calculateTable1Score()
        }));
    }, [formState.table1Answers, formState.question1]);
    useEffect(() => {
        setFormState(prevState => ({
            ...prevState,
            table2Score: calculateTable2Score()
        }));
    }, [formState.table2Answers]);
    useEffect(() => {
        setFormState(prevState => ({
            ...prevState,
            table4Score: calculateTable4Score()
        }));
    }, [formState.table4Answers, formState.question2, formState.question3]);
    useEffect(() => {
        setFormState(prevState => ({
            ...prevState,
            table5Score: calculateTable5Score()
        }));
    }, [formState.table5Answers]);
    useEffect(() => {
        setFormState(prevState => ({
            ...prevState,
            table6Score: calculateTable6Score()
        }));
    }, [formState.table6Answers]);
    const handleChange = (e, tableName, id) => {
        const selectedValue = e.target.value;
        setFormState(prevState => ({
            ...prevState,
            [tableName]: {
                ...prevState[tableName],
                [id]: selectedValue,
            }
        }));
    };
    const handleQuestionChange = (e, questionName) => {
        setFormState(prevState => ({
            ...prevState,
            [questionName]: e.target.value
        }));
    };


    const handleEthicalSectionSubmission = async () => {
        try {
            const payload = {
                "proposalId": MemberproposalId,
                "section": "ethicalReview",
                'questions': {
                    "In case of any such risk, is the participant informed about risks in detail at the time of informed consent?": formState.question1 || '',
                    "In case of any risk to the special group, have you assigned a member to monitor those risks?": formState.question2 || '',
                    "Is the research excluding groups such as elderly, women, pregnant, language barrier from research without scientific evidence of these groups being at risk in given scenario of your research?": formState.question3 || '',
                    "Is there any contact with potentially harmful items or substances?": formState.table1Answers.table1a || '',
                    "Is there any risk of emotional disturbance of participant with any sensitive question in your proforma?": formState.table1Answers.table1b || '',
                    "Is there a risk of breach of privacy (e.g. subjects' names, initials, or hospital numbers, pictures going to be published in manuscripts) without informed consent?": formState.table1Answers.table1c || '',
                    "Is there any risk of social stigma for the community (such as high prevalence of a disease with stigma) if data is published with name of that community (geographical/ religious/ ethnic group etc)?": formState.table1Answers.table1d || '',
                    "Is there any economic risk/ effect on career (such as employee feedback/ medical diagnosis are shared) for participant if data is disclosed outside research team?": formState.table1Answers.table1e || '',
                    "Is there any chance of disclosure requirements for participants details? For example, research outside the usual legal and ethical reporting, CR research for reporting harmful diseases and ethical issue regarding for research outside institutions disclosing personal info to research sponsors (pharma company) or other regulatory agencies/ community enterprise?": formState.table1Answers.table1f || '',
                    "Are any of the above risks to participants more than what they experience in everyday life?": formState.table1Answers.table1g || '',
                    "Is there a power differential between researchers and participants (researchers in a position of authority/ influencing decisions of participants care where they may readily give consent for data collection)?": formState.table2Answers.table2a || '',
                    "With questionnaires, will you give participants the option of omitting questions they don’t want to answer?": formState.table2Answers.table2b || '',
                    "Will you tell participants that their data will be treated with full confidentiality and if published, it will not be identifiable as theirs?": formState.table2Answers.table2c || '',
                    "People with impaired decision making capacity": formState.table3Answers.table3a || '',
                    "Children under 16": formState.table3Answers.table3b || '',
                    "Medically vulnerable": formState.table3Answers.table3c || '',
                    "Prisoners": formState.table3Answers.table3d || '',
                    "Economically or educationally disadvantaged": formState.table3Answers.table3e || '',
                    "Racial or ethnic minorities": formState.table3Answers.table3f || '',
                    "Institutionalized persons (correctional facilities, nursing homes, or mental health)": formState.table3Answers.table3g || '',
                    "Are you considering special care for taking informed consent, with no coercion?": formState.table4Answers.table4a || '',
                    "Are the Risks to these participants (as mentioned in first table) less/ or at least not more than daily life risk?": formState.table4Answers.table4b || '',
                    "Qualitative research on sensitive topics which may disturb young/vulnerable/female data collectors without provision of counseling and training": formState.table5Answers.table5a || '',
                    "Contact with harmful agents or risk of physical injury": formState.table5Answers.table5b || '',
                    "Contact with infectious patients and risk to health": formState.table5Answers.table5c || '',
                    "Traveling in unsafe areas and risk of accidents/violence": formState.table5Answers.table5d || '',
                    "Risk of facing improper behavior by approaching some risky community (drug abusers/mentally challenged/persons involved in risky behaviors)": formState.table5Answers.table5e || '',
                    "Industry funded research with conditions of not disclosing risks to patients": formState.table5Answers.table5f || '',
                    "Research findings having the potential to expose big industry/mafia trends": formState.table5Answers.table5g || '',
                    "New knowledge gained and scientific development": formState.table6Answers.table6a || '',
                    "Trainings/ educational interventions for participants": formState.table6Answers.table6b || '',
                    "Early disease diagnosis/ screening of disease that helps patient in getting timely treatment. For such benefit research should include a step of informing patients of their diagnosis after data collection.": formState.table6Answers.table6c || '',
                }
            };
            
            const raw = JSON.stringify(payload);
            const requestOptions = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: raw,
                redirect: "follow",
                credentials: 'include',
            };
            const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/submit-section`, requestOptions);
            const result = await response.json();
            if (response.ok) {
                toast.success("Data updated successfully!");
            } else {
                toast.error(result.message || "Failed to update data.");
            }
        } catch (error) {
            toast.error("Failed to update data.");
            console.log(error);
        }
    };


    const handleResearchTitleChange = (e) => {
        setFormState(prevState => ({
            ...prevState,
            researchTitle: e.target.value
        }));
    };
    const Risk = formState.table1Score + formState.table2Score + formState.table4Score + formState.table5Score;
    //************************     Consent Component 
    //Values-Required
    //Radiobox Update update
    const handleUpdateConsent = (updatedData) => {
        setConsentData(updatedData);
    };
    //Update
    const handleConsentChange = (updatedData) => {
        setConsentData(updatedData);
    };
    //Submission
    const handleConsentSubmission = async () => {
        try {
            const payload = {
                "proposalId": MemberproposalId,
                "section": "consent",
                "questions": {
                    "Will the project require approval by any other ethics committee other than the BMY Ethics Committee?": consentData.question1 || '',
                    "From where additional IRB approval is required": consentData.question2 || '',
                    "Have the research team and data collectors got the relevant training?": consentData.question3 || '',
                    "Are there any financial or other interests to the researcher(s) or department arising from this study, known to you": consentData.question4 || ''
                }
            };
            const raw = JSON.stringify(payload);
            const requestOptions = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: raw,
                redirect: "follow",
                credentials: 'include',
            };
            const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/submit-section`, requestOptions);
            const result = await response.json();
            if (response.ok) {
                toast.success("Data updated successfully!");
            } else {
                toast.error(result.message || "Failed to update data.");
            }
        } catch (error) {
            toast.error("Failed to update data.");
            console.log(error);
        }
    };
    const sections = [
        'information',
        'scientificReview',
        'ethicalReview',
        'consent'
    ];
    const [clickedSection, setClickedSection] = useState(assignProposal);
    const handleButtonClick = (section) => {
        setClickedSection(section);
    };
    const renderSection = () => {
        switch (clickedSection) {
            case 'information':
                return (
                    <Information
                        formData={informationData}
                        onInputChange={handleInformationChange}
                        onSubmit={handleInformationSubmission}
                        updateFormData={handleUpdateInformationData}
                    />
                );
            case 'scientificReview':
                return <ScientificReview />;
            case 'ethicalReview':
                return (
                    <EthicalReview
                        formState={formState}
                        onChange={handleChange}
                        onQuestionChange={handleQuestionChange}
                        onResearchTitleChange={handleResearchTitleChange}
                        Risk={Risk}
                        handleSubmit={handleEthicalSectionSubmission}
                    />
                );
            case 'consent':
                return (
                    <Consent
                        formData={consentData}
                        onInputChange={handleConsentChange}
                        onSubmit={handleConsentSubmission}
                        onUpdateConsent={handleUpdateConsent}
                    />
                );
            default:
                return (
                    <Information
                        formData={informationData}
                        onInputChange={handleInformationChange}
                        onSubmit={handleInformationSubmission}
                        updateFormData={handleUpdateInformationData}
                    />
                );
        }
    };
    if (loading) {
        return <Loader />;
    }
    return (
        <>
            <Toaster />
            {!assignProposal && (
                <div className="md:my-10 my-5">
                    <div className="flex flex-wrap gap-5 text-xl text-epsilon">
                        {sections.map((section, index) => (
                            <button
                                key={index}
                                onClick={() => handleButtonClick(section)}
                                className={`py-1 px-3 rounded-md group relative overflow-hidden bg-epsilon text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon ${clickedSection === section ? 'bg-epsilon-dark' : ''}`}
                            >
                                <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                                {section}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            <div>
                {renderSection()}
            </div>
        </>
    );
}
