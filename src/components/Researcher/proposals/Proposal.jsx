import React, { useState } from 'react';
import Information from './ProposalSections/Information.jsx';
import ScientificReview from './ProposalSections/ScientificReview.jsx';
import EthicalReview from './ProposalSections/EthicalReview.jsx';
import Consent from './Consent.jsx';
export default function Proposal() {
    const sections = [
        'Information',
        'Scientific Review (Synopsis)',
        'Ethical Review',
        'Consent'
    ];
    const [clickedSection, setClickedSection] = useState('');
    const handleButtonClick = (section) => {
        setClickedSection(section);
    };
    const renderSection = () => {
        switch (clickedSection) {
            case 'Information':
                return <Information />;
            case 'Scientific Review (Synopsis)':
                return <ScientificReview />;
            case 'Ethical Review':
                return <EthicalReview />;
            case 'Consent':
                return <Consent />;
            default:
                return <Information />;
        }
    };
    return (
        <>
            <div className="md:my-10  my-5">
                <div className="flex  itesm-center md:justify-center flex-wrap gap-5 text-xl text-epsilon">
                    {sections.map((section, index) => (
                        <button
                            key={index}
                            onClick={() => handleButtonClick(section)}
                            className={`py-2 px-5 rounded-md group relative overflow-hidden bg-epsilon text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon ${clickedSection === section ? 'bg-epsilon-dark' : ''
                                }`}
                        >
                            <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                            {section}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                {renderSection()}
            </div>
        </>
    );
}
