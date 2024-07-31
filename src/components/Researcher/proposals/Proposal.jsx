import React, { useState } from 'react';
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
        // list contain answer checked
        question2: ['Feasible (have manpower, budget, time for data collection and writing)', 'Addressing research question on right time as community/decision makers are looking for the answers'],
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
    //************************     Consent Component 
    //Values-Required
    const [consentData, setConsentData] = useState({
        // Yes and No are radio value
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
    const handleConsentChange = (e) => {
        if (e.target) {
            const { name, value } = e.target;
            if (name && value !== undefined) {
                setConsentData(prevState => ({ ...prevState, [name]: value }));
            } else {
                console.error('Event target does not have name or value');
            }
        } else {
            console.error('Event target is missing');
        }
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
                return (
                    <ScientificReview />
                )
            case 'Ethical Review':
                return <EthicalReview />;
            case 'Consent':
                return (
                    <Consent
                        formData={consentData}
                        onInputChange={handleConsentChange}
                        onSubmit={handleConsentSubmission}
                        onUpdateConsent={handleUpdateConsent}
                    />
                )
            default:
                return <Information />;
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
