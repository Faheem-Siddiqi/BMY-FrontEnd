import React, { useState, useEffect } from 'react';
import Information from './ProposalSections/Information.jsx';
import ScientificReview from './ProposalSections/ScientificReview.jsx';
import EthicalReview from './ProposalSections/EthicalReview.jsx';
import Consent from './Consent.jsx';
import toast, { Toaster } from "react-hot-toast";
import Loader from '../../layout/Loader.jsx';
export default function ProposalForLead({
    assignProposal,
    LeadproposalId
}) {
    const [risk, setRisk] = useState(0)
    const [ethicalData, setEthicalData] = useState({
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
            table5g: '',
        },
        table5Score: 0,
        table6Answers: {
            table6a: 'N/A',
            table6b: 'Moderate gains',
            table6c: 'Minor gains',
        },
        table6Score: 0,
        ethicalRisk: 0,
        benefitScore: 0,
    });
    const updateState = (updates) => {
        setEthicalData(prevState => ({ ...prevState, ...updates }));
    };
    useEffect(() => {
        let newScore = 0;
        for (const key in ethicalData.table1Answers) {
            if (key !== 'table1g') {
                if (ethicalData.table1Answers[key] === 'Yes') {
                    newScore += 1;
                }
            }
        }
        const finalScore = ethicalData.question1 === 'No' ? newScore * 5 : 0;
        updateState({
            table1InnerScore: newScore,
            table1Score: finalScore
        });
    }, [ethicalData.table1Answers, ethicalData.question1]);
    useEffect(() => {
        let newScore = 0;
        for (const key in ethicalData.table2Answers) {
            if (key === 'table2a' && ethicalData.table2Answers[key] === 'Yes') {
                newScore += 1;
            }
            if (key === 'table2b' && ethicalData.table2Answers[key] === 'No') {
                newScore += 1;
            }
            if (key === 'table2c' && ethicalData.table2Answers[key] === 'No') {
                newScore += 1;
            }
        }
        updateState({ table2Score: newScore });
    }, [ethicalData.table2Answers]);
    useEffect(() => {
        let newScore = 0;
        if (ethicalData.table4Answers.table4a === 'No') {
            newScore += 10;
        }
        if (ethicalData.table4Answers.table4b === 'No') {
            newScore += 10;
        }
        if (ethicalData.question2 === 'No') {
            newScore = 0;
        }
        if (ethicalData.question3 === 'Yes') {
            newScore += 1;
        }
        updateState({ table4Score: newScore });
    }, [ethicalData.table4Answers, ethicalData.question2, ethicalData.question3]);
    useEffect(() => {
        let newScore = 0;
        for (const key in ethicalData.table5Answers) {
            if (key !== 'table5g') {
                if (ethicalData.table5Answers[key] === 'Yes') {
                    newScore += 1;
                }
            }
        }
        updateState({ table5Score: newScore });
    }, [ethicalData.table5Answers]);
    useEffect(() => {
        let newScore = 0;
        for (const key in ethicalData.table6Answers) {
            if (ethicalData.table6Answers[key] === 'Moderate gains') {
                newScore += 20;
            }
            if (ethicalData.table6Answers[key] === 'Minor gains') {
                newScore += 5;
            }
            if (ethicalData.table6Answers[key] === 'Major gains') {
                newScore += 30;
            }
        }
        updateState({ table6Score: newScore });
    }, [ethicalData.table6Answers]);
    useEffect(() => {
        const Risk = ethicalData.table1Score + ethicalData.table2Score + ethicalData.table4Score + ethicalData.table5Score;
        setRisk(Risk)
        updateState({ ethicalRisk: Risk });
    }, [ethicalData.table4Answers, ethicalData.table2Answers, ethicalData.table1Answers, ethicalData.table5Answers]);
    const BenefitScore = ethicalData.table6Score
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
                    //  console.log(result)
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
                        const Questions = formattedSections[informationIndex].questions;
                        setInformationData({
                            question1: Questions["Proposal Contact Email"] || '',
                            question2: Questions["Your research topic fulfills which of these criteria"]
                                ? Questions["Your research topic fulfills which of these criteria"]
                                    .split(' -- ')
                                    .map(item => item.trim())
                                    .filter(item => item !== '')
                                : [],
                            question3: Questions["Name the beneficiary group clearly identified that will benefit from the information generated in your research"] || ''
                        });
                    }
                    if (scientificReviewindex !== -1) {
                        const Questions = formattedSections[scientificReviewindex].questions;
                        setScientificData(prevState => ({
                            ...prevState,
                            supervisorName: Questions["Supervisor Name"] || '',
                            applicantName: Questions["Applicant Name"] || '',
                            researchTitle: Questions["Research Title"] || '',
                            startDate: Questions["Start Date "] || '',
                            endDate: Questions["End Date"] || '',
                            answer4: Questions['Name the beneficiary group clearly identified that will benefit from the information generated in your research'] || '',
                            answer5: Questions['Add literature review findings on this topic from most relevant articles (those closely matching with yours in terms of variables studied), share what information is already available with them, methodology used by researchers, and on which population it was studied and in how much past. Provide URL link to all studies mentioned.'] || '',
                            answer6: Questions['What information remained missing in other researches that you will cover in your project/ Research Gap found through literature review (evidence/ temporal/ methodology/ population gap)'] || '',
                            answer7: Questions['Explain the rationale/ intended value of covering this research gap, detailing why the topic is of interest, benefit or relevance in your setting. Explain in your own words.'] || '',
                            researchObjectives: Questions['Objectives of Research'] || '',
                            mainVariable: Questions['Main Variable under Study'] || '',
                            operationalDefinition: Questions['Operational Definition of Variable'] || '',
                            answer11: Questions["Study Design"] || '',
                            answer12: Questions["Type of Analysis"] || 'N/A',
                            answer13: Questions["Sample Size"] || 'N/A',
                            answer14a: Questions["For the case-control study, the sample size was calculated using an online OpenEpi sample size calculator. Keeping the ratio of controls to cases as"] || 'N/A',
                            answer14b: Questions["Proportion of controls with exposure as"] || 'N/A',
                            answer14c: Questions["Both proportions reported by a researcher from article title and URL:"] || 'N/A',
                            answer14d: Questions["Confidence limits"] || 'N/A',
                            answer14e: Questions["Percentage of test"] || 'N/A',
                            answer14f: Questions["Sample size came out to be"] || 'N/A',
                            answer15a: Questions["For cohort study, sample size was calculated using online OpenEpi sample size calculator. Keeping ratio of Unexposed/Exposed as"] || 'N/A',
                            answer15b: Questions["Percent of Unexposed with Outcome"] || 'N/A',
                            answer15c: Questions["Percent of exposed with Outcome"] || 'N/A',
                            answer15d: Questions["Both proportions reported by a researcher from article title and URL:"] || 'N/A',
                            answer15e: Questions["Confidence limits"] || 'N/A',
                            answer15f: Questions["Percentage of test"] || 'N/A',
                            answer15g: Questions["Sample size came out to be"] || 'N/A',
                            answer16a: Questions["For before-after comparison study, sample size was calculated using online OpenEpi sample size calculator. Keeping Mean value for group 1 as"] || 'N/A',
                            answer16b: Questions["Mean value for group 2"] || 'N/A',
                            answer16c: Questions["SD value for group 1"] || 'N/A',
                            answer16d: Questions["SD for group 2"] || 'N/A',
                            answer16e: Questions["Reported by a researcher from article title and URL:"] || 'N/A',
                            answer16f: Questions["Confidence level "] || 'N/A',
                            answer16g: Questions["Percentage power of test"] || 'N/A',
                            answer16h: Questions["Sample size came out to"] || 'N/A',
                            answer17: Questions["Non-Random Sampling Methods"] || 'N/A',
                            answer18: Questions["Random Sampling Methods"] || 'N/A',
                            answer19: Questions["Sample inclusion exclusion criteria and sampling technique in detail for quantitative research"] || 'N/A',
                            answer20: Questions["Sample inclusion-exclusion criteria and sampling methods in detail for interviews"] || 'N/A',
                            answer21: Questions["Place/s for data collection (give all available details including organization/ forum name, location, city, country etc.)"] || 'N/A',
                            answer22: Questions["Data collection procedures and tools"] || 'N/A',
                            onlineQuestionnaires: Questions["Online questionnaires/ google forms"] || 'N/A',
                        }));
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
                        setEthicalData(prevState => ({
                            ...prevState,
                            table1Answers: {
                                ...prevState.table1Answers,
                                table1a: Questions["Is there any contact with potentially harmful items or substances?"] || '',
                                table1b: Questions["Is there any risk of emotional disturbance of participant with any sensitive question in your proforma?"] || '',
                                table1c: Questions["Is there a risk of breach of privacy (e.g. subjects' names, initials, or hospital numbers, pictures going to be published in manuscripts) without informed consent?"] || '',
                                table1d: Questions["Is there any risk of social stigma for the community (such as high prevalence of a disease with stigma) if data is published with name of that community (geographical/ religious/ ethnic group etc)?"] || '',
                                table1e: Questions["Is there any economic risk/ effect on career (such as employee feedback/ medical diagnosis are shared) for participant if data is disclosed outside research team?"] || '',
                                table1f: Questions["Is there any chance of disclosure requirements for participants details? For example, research outside the usual legal and ethical reporting, CR research for reporting harmful diseases and ethical issue regarding for research outside institutions disclosing personal info to research sponsors (pharma company) or other regulatory agencies/ community enterprise?"] || '',
                                table1g: Questions["Are any of the above risks to participants more than what they experience in everyday life?"] || '',
                            },
                            table2Answers: {
                                ...prevState.table2Answers,
                                table2a: Questions["Is there a power differential between researchers and participants (researchers in a position of authority/ influencing decisions of participants care where they may readily give consent for data collection)?"] || '',
                                table2b: Questions["With questionnaires, will you give participants the option of omitting questions they don’t want to answer?"] || '',
                                table2c: Questions["Will you tell participants that their data will be treated with full confidentiality and if published, it will not be identifiable as theirs?"] || '',
                            },
                            table3Answers: {
                                ...prevState.table3Answers,
                                table3a: Questions["People with impaired decision making capacity"] || '',
                                table3b: Questions["Children under 16"] || '',
                                table3c: Questions["Medically vulnerable"] || '',
                                table3d: Questions["Prisoners"] || '',
                                table3e: Questions["Economically or educationally disadvantaged"] || '',
                                table3f: Questions["Racial or ethnic minorities"] || '',
                                table3g: Questions["Institutionalized persons (correctional facilities, nursing homes, or mental health)"] || '',
                            },
                            table4Answers: {
                                ...prevState.table4Answers,
                                table4a: Questions["Are you considering special care for taking informed consent, with no coercion?"] || '',
                                table4b: Questions["Are the Risks to these participants (as mentioned in first table) less/ or at least not more than daily life risk?"] || '',
                            },
                            table5Answers: {
                                ...prevState.table5Answers,
                                table5a: Questions["Qualitative research on sensitive topics which may disturb young/vulnerable/female data collectors without provision of counseling and training"] || '',
                                table5b: Questions["Contact with harmful agents or risk of physical injury"] || '',
                                table5c: Questions["Contact with infectious patients and risk to health"] || '',
                                table5d: Questions["Traveling in unsafe areas and risk of accidents/violence"] || '',
                                table5e: Questions["Risk of facing improper behavior by approaching some risky community (drug abusers/mentally challenged/persons involved in risky behaviors)"] || '',
                                table5f: Questions["Industry funded research with conditions of not disclosing risks to patients"] || '',
                                table5g: Questions["Research findings having the potential to expose big industry/mafia trends"] || '',
                            },
                            table6Answers: {
                                ...prevState.table6Answers,
                                table6a: Questions["New knowledge gained and scientific development"] || '',
                                table6b: Questions["Trainings/ educational interventions for participants"] || '',
                                table6c: Questions["Early disease diagnosis/ screening of disease that helps patient in getting timely treatment. For such benefit research should include a step of informing patients of their diagnosis after data collection."] || '',
                                table6d: Questions["Traveling in unsafe areas and risk of accidents/violence"] || '',
                                table6e: Questions["Risk of facing improper behavior by approaching some risky community (drug abusers/mentally challenged/persons involved in risky behaviors)"] || '',
                                table6f: Questions["Industry funded research with conditions of not disclosing risks to patients"] || '',
                                table6g: Questions["Research findings having the potential to expose big industry/mafia trends"] || '',
                            },
                            ethicalRisk: Questions["Ethical Risk"] || 0,
                            benefitScore: Questions["Benefit Score"] || 0,
                            table1InnerScore: Questions["Risk"] || 0,
                            question1: Questions["In case of any such risk, is the participant informed about risks in detail at the time of informed consent?"] || '',
                            question2: Questions["In case of any risk to the special group, have you assigned a member to monitor those risks?"] || '',
                            question3: Questions["Is the research excluding groups such as elderly, women, pregnant, language barrier from research without scientific evidence of these groups being at risk in given scenario of your research?"] || '',
                        }));
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
                    .filter(item => item !== '')
                    .length === 2
                    ? informationData.question2
                        .map(item => item.trim())
                        .filter(item => item !== '')
                        .join(' -- ')
                    : informationData.question2
                        .map(item => item.trim())
                        .filter(item => item !== '')
                        .join(', ')
                : '';
            const payload = {
                "proposalId": LeadproposalId,
                "section": "information",
                "questions": {
                    "Proposal Contact Email": informationData.question1 || '',
                    "Your research topic fulfills which of these criteria": question2Joined,
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
    const handleEthicalSectionSubmission = async () => {
        try {
            const payload = {
                "proposalId": LeadproposalId,
                "section": "ethicalReview",
                'questions': {
                    "Is there any contact with potentially harmful items or substances?": ethicalData.table1Answers.table1a || '',
                    "Is there any risk of emotional disturbance of participant with any sensitive question in your proforma?": ethicalData.table1Answers.table1b || '',
                    "Is there a risk of breach of privacy (e.g. subjects' names, initials, or hospital numbers, pictures going to be published in manuscripts) without informed consent?": ethicalData.table1Answers.table1c || '',
                    "Is there any risk of social stigma for the community (such as high prevalence of a disease with stigma) if data is published with name of that community (geographical/ religious/ ethnic group etc)?": ethicalData.table1Answers.table1d || '',
                    "Is there any economic risk/ effect on career (such as employee feedback/ medical diagnosis are shared) for participant if data is disclosed outside research team?": ethicalData.table1Answers.table1e || '',
                    "Is there any chance of disclosure requirements for participants details? For example, research outside the usual legal and ethical reporting, CR research for reporting harmful diseases and ethical issue regarding for research outside institutions disclosing personal info to research sponsors (pharma company) or other regulatory agencies/ community enterprise?": ethicalData.table1Answers.table1f || '',
                    "Are any of the above risks to participants more than what they experience in everyday life?": ethicalData.table1Answers.table1g || '',
                    "Risk": ethicalData.table1InnerScore || 0,
                    "In case of any such risk, is the participant informed about risks in detail at the time of informed consent?": ethicalData.question1 || '',
                    "In case of any risk to the special group, have you assigned a member to monitor those risks?": ethicalData.question2 || '',
                    "Is the research excluding groups such as elderly, women, pregnant, language barrier from research without scientific evidence of these groups being at risk in given scenario of your research?": ethicalData.question3 || '',
                    'Is there a power differential between researchers and participants (researchers in a position of authority/ influencing decisions of participants care where they may readily give consent for data collection)?': ethicalData.table2Answers.table2a || '',
                    'With questionnaires, will you give participants the option of omitting questions they don’t want to answer?': ethicalData.table2Answers.table2b || '',
                    'Will you tell participants that their data will be treated with full confidentiality and if published, it will not be identifiable as theirs?': ethicalData.table2Answers.table2c || '',
                    'People with impaired decision making capacity': ethicalData.table3Answers.table3a || '',
                    'Children under 16': ethicalData.table3Answers.table3b || '',
                    'Medically vulnerable': ethicalData.table3Answers.table3c || '',
                    'Prisoners': ethicalData.table3Answers.table3d || '',
                    'Economically or educationally disadvantaged': ethicalData.table3Answers.table3e || '',
                    'Racial or ethnic minorities': ethicalData.table3Answers.table3f || '',
                    'Institutionalized persons (correctional facilities, nursing homes, or mental health)': ethicalData.table3Answers.table3g || '',
                    'Are you considering special care for taking informed consent, with no coercion?': ethicalData.table4Answers.table4a || '',
                    'Are the Risks to these participants (as mentioned in first table) less/ or at least not more than daily life risk?': ethicalData.table4Answers.table4b || '',
                    'Qualitative research on sensitive topics which may disturb young/vulnerable/female data collectors without provision of counseling and training': ethicalData.table5Answers.table5a || '',
                    'Contact with harmful agents or risk of physical injury': ethicalData.table5Answers.table5b || '',
                    'Contact with infectious patients and risk to health': ethicalData.table5Answers.table5c || '',
                    'Traveling in unsafe areas and risk of accidents/violence': ethicalData.table5Answers.table5d || '',
                    'Risk of facing improper behavior by approaching some risky community (drug abusers/mentally challenged/persons involved in risky behaviors)': ethicalData.table5Answers.table5e || '',
                    'Industry funded research with conditions of not disclosing risks to patients': ethicalData.table5Answers.table5f || '',
                    'Research findings having the potential to expose big industry/mafia trends': ethicalData.table5Answers.table5g || '',
                    'New knowledge gained and scientific development': ethicalData.table6Answers.table6a || '',
                    'Trainings/ educational interventions for participants': ethicalData.table6Answers.table6b || '',
                    'Early disease diagnosis/ screening of disease that helps patient in getting timely treatment. For such benefit research should include a step of informing patients of their diagnosis after data collection.': ethicalData.table6Answers.table6c || '',
                    'Ethical Risk.': ethicalData.ethicalRisk || '',
                    'Benefit Score.': ethicalData.benefitScore || '',
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
    const ScientificReviewChange = (newData) => {
        setScientificData(prevData => ({ ...prevData, ...newData }));
    };
    const handleScientificDataSubmission = async () => {
        try {
            const questions = {
                "Supervisor Name": scientificData.supervisorName || '',
                "Applicant Name": scientificData.applicantName || '',
                "Research Title": scientificData.researchTitle || '',
                "Start Date ": scientificData.startDate || '',
                "End Date": scientificData.endDate || '',
                "Sample Size": scientificData.answer13 || 'N/A',
                'Name the beneficiary group clearly identified that will benefit from the information generated in your research': scientificData.answer4 || '',
                'Add literature review findings on this topic from most relevant articles (those closely matching with yours in terms of variables studied), share what information is already available with them, methodology used by researchers, and on which population it was studied and in how much past. Provide URL link to all studies mentioned.': scientificData.answer5 || '',
                'What information remained missing in other researches that you will cover in your project/ Research Gap found through literature review (evidence/ temporal/ methodology/ population gap)': scientificData.answer6 || '',
                'Explain the rationale/ intended value of covering this research gap, detailing why the topic is of interest, benefit or relevance in your setting. Explain in your own words.': scientificData.answer7 || '',
                'Objectives of Research': scientificData.researchObjectives || '',
                'Main Variable under Study': scientificData.mainVariable || '',
                'Operational Definition of Variable': scientificData.operationalDefinition || '',
                "Study Design": scientificData.answer11 || '',
                "Type of Analysis": scientificData.answer12 || 'N/A',
                'Sample Size': scientificData.answer13 || 'N/A',
                "For the case-control study, the sample size was calculated using an online OpenEpi sample size calculator. Keeping the ratio of controls to cases as": scientificData.answer14a || 'N/A',
                "Proportion of controls with exposure as": scientificData.answer14b || 'N/A',
                "Both proportions reported by a researcher from article title and URL:": scientificData.answer14c || 'N/A',
                "Confidence limits": scientificData.answer14d || 'N/A',
                "Percentage of test": scientificData.answer14e || 'N/A',
                "Sample size came out to be": scientificData.answer14f || 'N/A',
                "For cohort study, sample size was calculated using online OpenEpi sample size calculator. Keeping ratio of Unexposed/Exposed as": scientificData.answer15a || 'N/A',
                "Percent of Unexposed with Outcome": scientificData.answer15b || 'N/A',
                "Percent of exposed with Outcome": scientificData.answer15c || 'N/A',
                "Both proportions reported by a researcher from article title and URL:": scientificData.answer15d || 'N/A',
                "Confidence limits": scientificData.answer15e || 'N/A',
                "Percentage of test": scientificData.answer15f || 'N/A',
                "Sample size came out to be": scientificData.answer15g || 'N/A',
                "For before-after comparison study, sample size was calculated using online OpenEpi sample size calculator. Keeping Mean value for group 1 as": scientificData.answer16a || 'N/A',
                "Mean value for group 2": scientificData.answer16b || 'N/A',
                "SD value for group 1": scientificData.answer16c || 'N/A',
                "SD for group 2": scientificData.answer16d || 'N/A',
                "Reported by a researcher from article title and URL:": scientificData.answer16e || 'N/A',
                "Confidence level ": scientificData.answer16f || 'N/A',
                "Percentage power of test": scientificData.answer16g || 'N/A',
                "Sample size came out to": scientificData.answer16h || 'N/A',
                "Non-Random Sampling Methods": scientificData.answer17 || 'N/A',
                "Random Sampling Methods": scientificData.answer18 || 'N/A',
                "Sample inclusion exclusion criteria and sampling technique in detail for quantitative research": scientificData.answer19 || 'N/A',
                "Sample inclusion-exclusion criteria and sampling methods in detail for interviews": scientificData.answer20 || 'N/A',
                "Place/s for data collection (give all available details including organization/ forum name, location, city, country etc.)": scientificData.answer21 || 'N/A',
                "Data collection procedures and tools": scientificData.answer22 || 'N/A',
                "Online questionnaires/ google forms": scientificData.onlineQuestionnaires || 'N/A',
            };
            const payload = {
                "proposalId": LeadproposalId,
                "section": "scientificReview",
                "questions": questions
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
                console.log(result.message)
                toast.error(result.message || "Failed to update data.");
            }
        } catch (error) {
            toast.error("Failed to update data.");
            console.log(error);
        }
    };
    //************************     Consent Component 
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
                "proposalId": LeadproposalId,
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
    const [clickedSection, setClickedSection] = useState('information');
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
                return (
                    <ScientificReview
                        scientificData={scientificData}
                        onChange={ScientificReviewChange}
                        onSubmit={handleScientificDataSubmission}
                    />
                )
            case 'ethicalReview':
                return (
                    <EthicalReview
                        ethicalData={ethicalData}
                        updateState={updateState}
                        risk={risk}
                        onSubmit={handleEthicalSectionSubmission}
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
