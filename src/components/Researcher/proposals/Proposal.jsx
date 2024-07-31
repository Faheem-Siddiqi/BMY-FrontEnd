import React, { useState } from 'react';
import Information from './ProposalSections/Information.jsx';
import ScientificReview from './ProposalSections/ScientificReview.jsx';
import EthicalReview from './ProposalSections/EthicalReview.jsx';
import Consent from './Consent.jsx';
// Backend-Integration
import toast, { Toaster } from "react-hot-toast";
export default function Proposal({ assignProposal, role }) {
    //************************     Information Component 
    //Values-Required
    const [informationData, setInformationData] = useState({
        question1: 'Fetch the group lead email from backend',
        question2: '',
        question3: '',
    });
    // For checkbox 
    const handleUpdateInformationData = (updatedData) => {
        setInformationData(updatedData);
    };
    const handleInformationChange = (e) => {
        const { name, value, } = e.target;
        setInformationData(prevState => ({ ...prevState, [name]: value }));
    };
    // Handle Submission
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
    question1: 'Yes',
    question2: 'No',
    question3: 'Yes',
    question4: 'Yes',
});
//for checkbox and radios
const handleUpdateConsent = (updatedData) => {
    setFormData(updatedData);
};
const handleConsentChange = (e) => {
    const { name, value, } = e.target;
    setConsentData(prevState => ({ ...prevState, [name]: value }));
};
// Handle Submission
const handleConsentSubmission = async () => {
    try {
        console.log(consentData);
        toast.success("Data updated successfully!");
    } catch (error) {
        toast.error("Failed to update data.");
    }
};
    // Sections Management
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
                    <ScientificReview
                   
                    />
                )
            case 'Ethical Review':
                return <EthicalReview />;
            case 'Consent':
                return(
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
