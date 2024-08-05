import React, { useState, useEffect } from 'react';
import Information from './ProposalSections/Information.jsx';
import ScientificReview from './ProposalSections/ScientificReview.jsx';
import EthicalReview from './ProposalSections/EthicalReview.jsx';
import Consent from './Consent.jsx';
import toast, { Toaster } from "react-hot-toast";

export default function Proposal({ assignProposal, role }) {
    //************************     Information Component 
    //Values-Required
    const [informationData, setInformationData] = useState({
        question1: 'Fetch the group lead email from backend',
        question2: [
            'Feasible (have manpower, budget, time for data collection and writing)', 
            'Addressing research question on right time as community/decision makers are looking for the answers'
        ],
        question3: '',
    });

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
            console.log(informationData);
            toast.success("Data updated successfully!");
        } catch (error) {
            toast.error("Failed to update data.");
        }
    };

    //************************     Ethical Review Component 
    const [formState, setFormState] = useState({
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
        researchTitle: '', // Assuming you need this from your input
    });

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
        if (formState.table2Answers.table2a === 'Yes') {
            newScore += 1;
        }
        if (formState.table2Answers.table2b === 'No') {
            newScore += 1;
        }
        if (formState.table2Answers.table2c === 'No') {
            newScore += 1;
        }
        return newScore;
    };

    const calculateTable4Score = () => {
        let newScore = 0;
        if (formState.table4Answers.table4a === 'No') {
            newScore += 10;
        }
        if (formState.table4Answers.table4b === 'No') {
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
        for (const key in formState.table5Answers) {
            if (key !== 'table5g' && formState.table5Answers[key] === 'Yes') {
                newScore += 1;
            }
        }
        return newScore;
    };

    const calculateTable6Score = () => {
        let newScore = 0;
        for (const key in formState.table6Answers) {
            if (formState.table6Answers[key] === 'Moderate gains') {
                newScore += 20;
            }
            if (formState.table6Answers[key] === 'Minor gains') {
                newScore += 5;
            }
            if (formState.table6Answers[key] === 'Major gains') {
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

    const handleResearchTitleChange = (e) => {
        setFormState(prevState => ({
            ...prevState,
            researchTitle: e.target.value
        }));
    };

    const Risk = formState.table1Score + formState.table2Score + formState.table4Score + formState.table5Score;

    //************************     Consent Component 
    //Values-Required
    const [consentData, setConsentData] = useState({
        question1: 'Yes',
        question2: '',
        question3: 'No',
        question4: 'No',
    });

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
            console.log(consentData);
            toast.success("Data updated successfully!");
        } catch (error) {
            toast.error("Failed to update data.");
        }
    };


    // assign section
    const sections = [
        'Information',
        'Scientific Review',
        'Ethical Review',
        'Consent'
    ];

    const [clickedSection, setClickedSection] = useState('Information');

    const handleButtonClick = (section) => {
        setClickedSection(section);
    };

    const renderSection = () => {
        switch (clickedSection) {
            case 'Information':
                return (
                    <Information
                        formData={informationData}
                        onInputChange={handleInformationChange}
                        onSubmit={handleInformationSubmission}
                        updateFormData={handleUpdateInformationData}
                    />
                );
            case 'Scientific Review':
                return <ScientificReview />;
            case 'Ethical Review':
                return (
                    <EthicalReview
                        formState={formState}
                        onChange={handleChange}
                        onQuestionChange={handleQuestionChange}
                        onResearchTitleChange={handleResearchTitleChange}
                        Risk={Risk}
                    />
                );
            case 'Consent':
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
