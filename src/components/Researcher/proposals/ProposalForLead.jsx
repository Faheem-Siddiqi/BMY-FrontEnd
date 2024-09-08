import React, { useState, useEffect } from 'react';
import Information from './ProposalSections/Information.jsx';
import ScientificReview from './ProposalSections/ScientificReview.jsx';
import EthicalReview from './ProposalSections/EthicalReview.jsx';
import Consent from './Consent.jsx';
import { ImFilesEmpty } from "react-icons/im";
import toast, { Toaster } from "react-hot-toast";
import Loader from '../../layout/Loader.jsx';
export default function ProposalForLead({ LeadproposalData, setSectionQnasUndefine }) {
    const hasMissingQuestions =
        !LeadproposalData ||
        !LeadproposalData.sections ||
        !LeadproposalData.sections.information ||
        !LeadproposalData.sections.information.questions ||
        !LeadproposalData.sections.consent ||
        !LeadproposalData.sections.consent.questions ||
        !LeadproposalData.sections.scientificReview ||
        !LeadproposalData.sections.scientificReview.questions ||
        !LeadproposalData.sections.ethicalReview ||
        !LeadproposalData.sections.ethicalReview.questions;
    if (hasMissingQuestions) {
        setSectionQnasUndefine(true)
        return (
            <>
                <p>
                    <header className='bg-white shadow-sm my-5 p-5 md:p-10'>
                        <h1 className='font-semibold flex items-center gap-2'>
                            <ImFilesEmpty className='text-2xl' />
                            All  Proposal Sections Needs To Be Submitted
                        </h1>
                    </header>
                </p>
            </>
        );
    }
    const [risk, setRisk] = useState(0)
    const [ethicalData, setEthicalData] = useState({
        table1Answers: {
            table1a: '',
            table1b: '',
            table1c: '',
            table1d: '',
            table1e: '',
            table1f: '',
            table1g: '',
        },
        question1: '',
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
            table3f: '',
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
            table5a: '',
            table5b: '',
            table5c: '',
            table5d: '',
            table5e: '',
            table5f: '',
            table5g: '',
        },
        table5Score: 0,
        table6Answers: {
            table6a: '',
            table6b: '',
            table6c: '',
        },
        table6Score: 0,
        ethicalRisk: 0,
        benefitScore: 0,
    });
    const [scientificData, setScientificData] = useState({
        supervisorName: '',
        applicantName: '',
        researchTitle: '',
        startDate: '',
        endDate: '',
        answer4: '',
        answer4Limit: 250,
        answer5: '',
        answer5Limit: 800,
        answer6: '',
        answer6Limit: 100,
        answer7: '',
        answer7Limit: 100,
        researchObjectives: '',
        mainVariable: '',
        operationalDefinition: '',
        answer11: '',
        answer12: '',
        answer13: '',
        answer14a: '',
        answer14b: '',
        answer14c: '',
        answer14d: '',
        answer14e: '',
        answer14f: '',
        answer14g: '',
        answer15a: '',
        answer15b: '',
        answer15c: '',
        answer15d: '',
        answer15e: '',
        answer15f: '',
        answer15g: '',
        answer16a: '',
        answer16b: '',
        answer16c: '',
        answer16d: '',
        answer16e: '',
        answer16f: '',
        answer16g: '',
        answer16h: '',
        answer17: '',
        answer18: '',
        answer19: '',
        answer20: '',
        answer21: '',
        answer22: '',
        answer23a: '',
        answer23b: '',
        answer23c: '',
        answer23d: '',
        answer23e: '',
        answer23f: '',
        answer24a: '',
        answer24b: '',
        answer24c: '',
        answer24d: '',
        answer24e: '',
        answer24f: '',
        answer24g: '',
        onlineQuestionnaires: ''
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
        ],
        question3: '',
    });
    useEffect(() => {
        // Safely initialize sections with default values
        const informationSection = LeadproposalData?.sections?.information || { questions: {} };
        const consentSection = LeadproposalData?.sections?.consent || { questions: {} };
        const scientificReviewSection = LeadproposalData?.sections?.scientificReview || { questions: {} };
        const ethicalReviewSection = LeadproposalData?.sections?.ethicalReview || { questions: {} };
        // Update ethical data
        setEthicalData(prevState => ({
            ...prevState,
            table1Answers: {
                ...prevState.table1Answers,
                table1a: ethicalReviewSection?.questions?.["Is there any contact with potentially harmful items or substances?"] || '',
                table1b: ethicalReviewSection?.questions?.["Is there any risk of emotional disturbance of participant with any sensitive question in your proforma?"] || '',
                table1c: ethicalReviewSection?.questions?.["Is there a risk of breach of privacy (e.g. subjects' names, initials, or hospital numbers, pictures going to be published in manuscripts) without informed consent?"] || '',
                table1d: ethicalReviewSection?.questions?.["Is there any risk of social stigma for the community (such as high prevalence of a disease with stigma) if data is published with name of that community (geographical/ religious/ ethnic group etc)?"] || '',
                table1e: ethicalReviewSection?.questions?.["Is there any economic risk/ effect on career (such as employee feedback/ medical diagnosis are shared) for participant if data is disclosed outside research team?"] || '',
                table1f: ethicalReviewSection?.questions?.["Is there any chance of disclosure requirements for participants details? For example, research outside the usual legal and ethical reporting, CR research for reporting harmful diseases and ethical issue regarding for research outside institutions disclosing personal info to research sponsors (pharma company) or other regulatory agencies/ community enterprise?"] || '',
                table1g: ethicalReviewSection?.questions?.["Are any of the above risks to participants more than what they experience in everyday life?"] || '',
            },
            question1: ethicalReviewSection?.questions?.["In case of any such risk, is the participant informed about risks in detail at the time of informed consent?"] || '',
            table1InnerScore: ethicalReviewSection?.questions?.["Risk"] || 0,
            table2Answers: {
                ...prevState.table2Answers,
                table2a: ethicalReviewSection?.questions?.["In case of any risk to the special group, have you assigned a member to monitor those risks?"] || '',
                table2b: ethicalReviewSection?.questions?.["Is the research excluding groups such as elderly, women, pregnant, language barrier from research without scientific evidence of these groups being at risk in given scenario of your research?"] || '',
                table2c: ethicalReviewSection?.questions?.["Is there a power differential between researchers and participants (researchers in a position of authority/ influencing decisions of participants care where they may readily give consent for data collection)?"] || '',
            },
            table3Answers: {
                ...prevState.table3Answers,
                table3a: ethicalReviewSection?.questions?.["With questionnaires, will you give participants the option of omitting ethicalReviewSection.questions they don’t want to answer?"] || '',
                table3b: ethicalReviewSection?.questions?.["Will you tell participants that their data will be treated with full confidentiality and if published, it will not be identifiable as theirs?"] || '',
                table3c: ethicalReviewSection?.questions?.["People with impaired decision making capacity"] || '',
                table3d: ethicalReviewSection?.questions?.["Children under 16"] || '',
                table3e: ethicalReviewSection?.questions?.["Medically vulnerable"] || '',
                table3f: ethicalReviewSection?.questions?.["Prisoners"] || '',
                table3g: ethicalReviewSection?.questions?.["Economically or educationally disadvantaged"] || '',
            },
            table4Answers: {
                ...prevState.table4Answers,
                table4a: ethicalReviewSection?.questions?.["Racial or ethnic minorities"] || '',
                table4b: ethicalReviewSection?.questions?.["Institutionalized persons (correctional facilities, nursing homes, or mental health)"] || '',
            },
            question2: ethicalReviewSection?.questions?.["Are you considering special care for taking informed consent, with no coercion?"] || '',
            question3: ethicalReviewSection?.questions?.["Are the Risks to these participants (as mentioned in first table) less/ or at least not more than daily life risk?"] || '',
            question4: ethicalReviewSection?.questions?.["What level of confidentiality is provided to maintain privacy of patient information?"] || '',
            question5: ethicalReviewSection?.questions?.["What steps will you take to ensure security of data?"] || '',
            table5Answers: {
                ...prevState.table5Answers,
                table5a: ethicalReviewSection?.questions?.["Qualitative research on sensitive topics which may disturb young/vulnerable/female data collectors without provision of counseling and training'"] || '',
                table5b: ethicalReviewSection?.questions?.["Contact with harmful agents or risk of physical injury"] || '',
                table5c: ethicalReviewSection?.questions?.["Contact with infectious patients and risk to health"] || '',
                table5d: ethicalReviewSection?.questions?.["Traveling in unsafe areas and risk of accidents/violence"] || '',
                table5e: ethicalReviewSection?.questions?.["Risk of facing improper behavior by approaching some risky community (drug abusers/mentally challenged/persons involved in risky behaviors)"] || '',
                table5f: ethicalReviewSection?.questions?.["Industry funded research with conditions of not disclosing risks to patients"] || '',
                table5g: ethicalReviewSection?.questions?.["Research findings having the potential to expose big industry/mafia trends"] || '',
            },
            table6Answers: {
                ...prevState.table6Answers,
                table6a: ethicalReviewSection?.questions?.["New knowledge gained and scientific development"] || '',
                table6b: ethicalReviewSection?.questions?.["Trainings/ educational interventions for participants"] || '',
                table6c: ethicalReviewSection?.questions?.["Early disease diagnosis/ screening of disease that helps patient in getting timely treatment. For such benefit research should include a step of informing patients of their diagnosis after data collection."] || '',
            },
            ethicalRisk: ethicalReviewSection?.questions?.["Ethical Risk"] || 0,
            table6Score: ethicalReviewSection?.questions?.["Benefit Score"] || 0,
        }));
        // Update consent data
        setConsentData({
            question1: consentSection?.questions?.["Will the project require approval by any other ethics committee other than the BMY Ethics Committee?"] || '',
            question2: consentSection?.questions?.["From where additional IRB approval is required"] || '',
            question3: consentSection?.questions?.["Have the research team and data collectors got the relevant training?"] || '',
            question4: consentSection?.questions?.["Are there any financial or other interests to the researcher(s) or department arising from this study, known to you"] || ''
        });
        // Update information data
        setInformationData({
            question1: informationSection.questions?.["Proposal Contact Email"] || '',
            question2: informationSection.questions?.["Your research topic fulfills which of these criteria"]
                ? informationSection.questions?.["Your research topic fulfills which of these criteria"]
                    .split(' -- ')
                    .map(item => item.trim())
                    .filter(item => item !== '')
                : [],
            question3: informationSection.questions?.["Name the beneficiary group clearly identified that will benefit from the information generated in your research"] || ''
        });
        // Update scientific data
        setScientificData(prevState => ({
            ...prevState,
            supervisorName: scientificReviewSection?.questions?.["Supervisor Name"] || '',
            applicantName: scientificReviewSection?.questions?.["Applicant Name"] || '',
            researchTitle: scientificReviewSection?.questions?.["Research Title"] || '',
            startDate: scientificReviewSection?.questions?.["Start Date"] || '',
            endDate: scientificReviewSection?.questions?.["End Date"] || '',
            answer4: scientificReviewSection?.questions?.['Name the beneficiary group clearly identified that will benefit from the information generated in your research'] || '',
            answer5: scientificReviewSection?.questions?.['Add literature review findings on this topic from most relevant articles (those closely matching with yours in terms of variables studied), share what information is already available with them, methodology used by researchers, and on which population it was studied and in how much past. Provide URL link to all studies mentioned.'] || '',
            answer6: scientificReviewSection?.questions?.['What information remained missing in other researches that you will cover in your project/ Research Gap found through literature review (evidence/ temporal/ methodology/ population gap)'] || '',
            answer7: scientificReviewSection?.questions?.['Explain the rationale/ intended value of covering this research gap, detailing why the topic is of interest, benefit or relevance in your setting. Explain in your own words.'] || '',
            researchObjectives: scientificReviewSection?.questions?.['Objectives of Research'] || '',
            mainVariable: scientificReviewSection?.questions?.['Main Variable under Study'] || '',
            operationalDefinition: scientificReviewSection?.questions?.['Operational Definition of Variable'] || '',
            answer11: scientificReviewSection?.questions?.["Study Design"] || '',
            answer12: scientificReviewSection?.questions?.["Type of Analysis"] || 'N/A',
            answer13: scientificReviewSection?.questions?.["Sample Size"] || 'N/A',
            answer14a: scientificReviewSection?.questions?.["For the case-control study, the sample size was calculated using an online OpenEpi sample size calculator. Keeping the ratio of controls to cases as"] || 'N/A',
            answer14b: scientificReviewSection?.questions?.["Proportion of controls with exposure as"] || 'N/A',
            answer14c: scientificReviewSection?.questions?.["Both proportions reported by a researcher from article title and URL:"] || 'N/A',
            answer14d: scientificReviewSection?.questions?.["Confidence limits"] || 'N/A',
            answer14e: scientificReviewSection?.questions?.["Percentage of test"] || 'N/A',
            answer14f: scientificReviewSection?.questions?.["Sample size came out to be"] || 'N/A',
            answer15a: scientificReviewSection?.questions?.["For cohort study, sample size was calculated using online OpenEpi sample size calculator. Keeping ratio of Unexposed/Exposed as"] || 'N/A',
            answer15b: scientificReviewSection?.questions?.["Percent of Unexposed with Outcome"] || 'N/A',
            answer15c: scientificReviewSection?.questions?.["Percent of exposed with Outcome"] || 'N/A',
            answer15d: scientificReviewSection?.questions?.["Both proportions reported by a researcher from article title and URL:"] || 'N/A',
            answer15e: scientificReviewSection?.questions?.["Confidence limits"] || 'N/A',
            answer15f: scientificReviewSection?.questions?.["Percentage of test"] || 'N/A',
            answer15g: scientificReviewSection?.questions?.["Sample size came out to be"] || 'N/A',
            answer16a: scientificReviewSection?.questions?.["For before-after comparison study, sample size was calculated using online OpenEpi sample size calculator. Keeping Mean value for group 1 as"] || 'N/A',
            answer16b: scientificReviewSection?.questions?.["Mean value for group 2"] || 'N/A',
            answer16c: scientificReviewSection?.questions?.["SD value for group 1"] || 'N/A',
            answer16d: scientificReviewSection?.questions?.["SD for group 2"] || 'N/A',
            answer16e: scientificReviewSection?.questions?.["Reported by a researcher from article title and URL:"] || 'N/A',
            answer16f: scientificReviewSection?.questions?.["Confidence level"] || 'N/A',
            answer16g: scientificReviewSection?.questions?.["Percentage power of test"] || 'N/A',
            answer16h: scientificReviewSection?.questions?.["Sample size came out to"] || 'N/A',
            answer17: scientificReviewSection?.questions?.["Non-Random Sampling Methods"] || 'N/A',
            answer18: scientificReviewSection?.questions?.["Random Sampling Methods"] || 'N/A',
            answer19: scientificReviewSection?.questions?.["Sample inclusion exclusion criteria and sampling technique in detail for quantitative research"] || 'N/A',
            answer20: scientificReviewSection?.questions?.["Sample inclusion-exclusion criteria and sampling methods in detail for interviews"] || 'N/A',
            answer21: scientificReviewSection?.questions?.["Place/s for data collection (give all available details including organization/ forum name, location, city, country etc.)"] || 'N/A',
            answer22: scientificReviewSection?.questions?.["Data collection procedures and tools"] || 'N/A',
            answer23a: scientificReviewSection?.questions?.["For cross sectional survey, sample size was calculated using online OpenEpi sample size calculator for proportion. Keeping estimated population size as"] || 'N/A',
            answer23b: scientificReviewSection?.questions?.["Prevalence of “outcome of interest” as"] || 'N/A',
            answer23c: scientificReviewSection?.questions?.["Reported by a researcher from article title and URL"] || 'N/A',
            answer23d: scientificReviewSection?.questions?.["Absolute precision as"] || 'N/A',
            answer23e: scientificReviewSection?.questions?.["Sample size came out to be"] || 'N/A',
            answer23f: scientificReviewSection?.questions?.["For a confidence level of"] || 'N/A',
            answer24a: scientificReviewSection?.questions?.["For case control study, sample size was calculated using online OpenEpi sample size calculator for proportion. Keeping ratio of controls to cases as"] || 'N/A',
            answer24b: scientificReviewSection?.questions?.["For case control study, Proportion of controls with exposure as"] || 'N/A',
            answer24c: scientificReviewSection?.questions?.["For case control study, Proportion of cases with exposure as"] || 'N/A',
            answer24d: scientificReviewSection?.questions?.["For case control study, Both proportions reported by a researcher from article title and url"] || 'N/A',
            answer24e: scientificReviewSection?.questions?.["Both proportions reported by a researcher with confidence limit as"] || 'N/A',
            answer24f: scientificReviewSection?.questions?.["%, power of test"] || 'N/A',
            answer24g: scientificReviewSection?.questions?.["For case control study sample size comes out to be"] || 'N/A',
            onlineQuestionnaires: scientificReviewSection?.questions?.["Online questionnaires/ google forms"] || 'N/A',
        }));
        if (hasMissingQuestions) {
            setSectionQnasUndefine(true)
        }
        else {
            setSectionQnasUndefine(false)
        }
    }, [LeadproposalData, hasMissingQuestions]);
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
            case 'information':
                return (
                    <Information
                        sectionAssigned={['none']}
                        formData={informationData}
                    />
                );
            case 'Scientific Review':
                return (
                    <ScientificReview
                        sectionAssigned={['none']}
                        scientificData={scientificData}
                    />
                )
            case 'Ethical Review':
                return (
                    <EthicalReview
                        sectionAssigned={['none']}
                        ethicalData={ethicalData}
                    />
                );
            case 'Consent':
                return (
                    <Consent
                        sectionAssigned={['none']}
                        formData={consentData}
                    />
                );
            default:
                return (
                    <Information
                        sectionAssigned={['none']}
                        formData={informationData}
                    />
                );
        }
    };
    // if (loading) {
    //     return <Loader />;
    // }
    return (
        <>
            <Toaster />
            <div className="md:my-10 my-5">
                <div className="flex flex-wrap gap-5 text-xl text-epsilon">
                    {sections.map((section, index) => (
                        <button
                            key={index}
                            onClick={() => handleButtonClick(section)}
                            className={`py-1 px-3 rounded-md group relative overflow-hidden bg-epsilon  text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon  ${clickedSection === section ? 'bg-zeta hover:from-zeta' : ''}`}
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
