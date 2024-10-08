import React, { useState, useEffect } from 'react';
import Information from './ProposalSections/Information.jsx';
import ScientificReview from './ProposalSections/ScientificReview.jsx';
import EthicalReview from './ProposalSections/EthicalReview.jsx';
import Consent from './Consent.jsx';
import toast, { Toaster } from "react-hot-toast";
import Loader from '../../layout/Loader.jsx';
import { getCookie } from "cookies-next";
export default function Proposal({ proposalData, assignProposal, role }) {
    // console.log(proposalData)
    const hasMissingQuestions =
        !proposalData ||
        !proposalData.sections ||
        !proposalData.sections.information ||
        !proposalData.sections.information.questions ||
        !proposalData.sections.consent ||
        !proposalData.sections.consent.questions ||
        !proposalData.sections.scientificReview ||
        !proposalData.sections.scientificReview.questions ||
        !proposalData.sections.ethicalReview ||
        !proposalData.sections.ethicalReview.questions;
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
        question4: '',
        question5: '',
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
    const [savingStatus, setSavingStatus] = useState({
        Information: false,
        ScientificReview: false,
        EthicalReview: false,
        Consent: false
    });
    useEffect(() => {
        const informationSection = proposalData?.sections?.information || { questions: {} };
        const consentSection = proposalData?.sections?.consent || { questions: {} };
        const scientificReviewSection = proposalData?.sections?.scientificReview || { questions: {} };
        const ethicalReviewSection = proposalData?.sections?.ethicalReview || { questions: {} };
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
        setConsentData({
            question1: consentSection?.questions?.["Will the project require approval by any other ethics committee other than the BMY Ethics Committee?"] || '',
            question2: consentSection?.questions?.["From where additional IRB approval is required"] || '',
            question3: consentSection?.questions?.["Have the research team and data collectors got the relevant training?"] || '',
            question4: consentSection?.questions?.["Are there any financial or other interests to the researcher(s) or department arising from this study, known to you"] || ''
        });
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
        // Update information data
    }, [proposalData, hasMissingQuestions]);
    useEffect(() => {
        Object.entries(savingStatus).forEach(([section, isSaving]) => {
            if (isSaving) {
                toast(`${section} is saving...`, {
                    icon: '⏳', // Emoji for loading or saving
                });
            }
        });
    }, [savingStatus]);
    const updateSavingStatus = (section, status) => {
        setSavingStatus(prevState => ({
            ...prevState,
            [section]: status
        }));
    };
    // Define updateState to update state based on previous state
    const updateState = (updates) => {
        setEthicalData(prevState => ({ ...prevState, ...updates }));
    };
    // Use useEffect hooks to update scores and ethicalRisk based on changes
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
    // Effect to update ethicalRisk based on scores
    useEffect(() => {
        const totalRisk = ethicalData.table1Score +
            ethicalData.table2Score +
            ethicalData.table4Score +
            ethicalData.table5Score
        // +
        // ethicalData.table6Score;
        updateState({ ethicalRisk: totalRisk });
    }, [
        ethicalData.table1Score,
        ethicalData.table2Score,
        ethicalData.table4Score,
        ethicalData.table5Score,
        ethicalData.table6Score
    ]);
    const [sectionAssigned, setSectionAssigned] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchMemberAssignSection = async () => {
            try {
                setLoading(true)
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                const token = getCookie("token");
                myHeaders.append("Authorization", `Bearer ${token}`);
                const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/get-assigned-section-researcher`, {
                    method: 'GET',
                    redirect: 'follow',
                    headers: myHeaders,
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                if (result.success) {
                    setLoading(false)
                    const assignedSections = result.assignedSections.map(section => ({
                        sectionsAssigned: section.section || [],
                    }));
                    const uniqueSections = new Set(assignedSections.map(item => item.sectionsAssigned));
                    const uniqueSectionsArray = Array.from(uniqueSections);
                    setSectionAssigned(uniqueSectionsArray)
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
    const handleUpdateInformationData = (updatedData) => {
        setInformationData(updatedData);
    };
    const handleInformationChange = (e) => {
        const { name, value } = e.target;
        setInformationData(prevState => ({ ...prevState, [name]: value }));
    };
    const handleInformationSubmission = async () => {
        try {
            updateSavingStatus('Information', true);
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
                "proposalId": proposalData?.id,
                "section": "information",
                "questions": {
                    "Proposal Contact Email": informationData?.question1 ?? '',
                    "Your research topic fulfills which of these criteria": question2Joined ?? '',
                    "Name the beneficiary group clearly identified that will benefit from the information generated in your research": informationData?.question3 ?? ''
                }
            };
            const raw = JSON.stringify(payload);
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const token = getCookie("token");
            myHeaders.append("Authorization", `Bearer ${token}`);
            const requestOptions = {
                method: "PATCH",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
                credentials: 'include',
            };
            const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/submit-section`, requestOptions);
            const result = await response.json();
            if (response.ok) {
                updateSavingStatus('Information', false);
                toast.success("Data updated successfully!");
            } else {
                updateSavingStatus('Information', false);
                toast.error(result.message || "Failed to update data.");
            }
        } catch (error) {
            toast.error("Failed to update data.");
            updateSavingStatus('Information', false);
            console.log(error);
        }
    };
    //************************     Ethical Review Component 
    const handleEthicalSectionSubmission = async () => {
        try {
            updateSavingStatus('EthicalReview', true);
            const payload = {
                "proposalId": proposalData?.id,
                "section": "ethicalReview",
                'questions': {
                    "Is there any contact with potentially harmful items or substances?": ethicalData?.table1Answers?.table1a ?? '',
                    "Is there any risk of emotional disturbance of participant with any sensitive question in your proforma?": ethicalData?.table1Answers?.table1b ?? '',
                    "Is there a risk of breach of privacy (e.g. subjects' names, initials, or hospital numbers, pictures going to be published in manuscripts) without informed consent?": ethicalData?.table1Answers?.table1c ?? '',
                    "Is there any risk of social stigma for the community (such as high prevalence of a disease with stigma) if data is published with name of that community (geographical/ religious/ ethnic group etc)?": ethicalData?.table1Answers?.table1d ?? '',
                    "Is there any economic risk/ effect on career (such as employee feedback/ medical diagnosis are shared) for participant if data is disclosed outside research team?": ethicalData?.table1Answers?.table1e ?? '',
                    "Is there any chance of disclosure requirements for participants details? For example, research outside the usual legal and ethical reporting, CR research for reporting harmful diseases and ethical issue regarding for research outside institutions disclosing personal info to research sponsors (pharma company) or other regulatory agencies/ community enterprise?": ethicalData?.table1Answers?.table1f ?? '',
                    "Are any of the above risks to participants more than what they experience in everyday life?": ethicalData?.table1Answers?.table1g ?? '',
                    "Risk": ethicalData?.table1InnerScore ?? 0,
                    "In case of any such risk, is the participant informed about risks in detail at the time of informed consent?": ethicalData?.question1 ?? '',
                    "In case of any risk to the special group, have you assigned a member to monitor those risks?": ethicalData?.question2 ?? '',
                    "Is the research excluding groups such as elderly, women, pregnant, language barrier from research without scientific evidence of these groups being at risk in given scenario of your research?": ethicalData?.question3 ?? '',
                    "What level of confidentiality is provided to maintain privacy of patient information?": ethicalData?.question4 ?? '',
                    "What steps will you take to ensure security of data?": ethicalData?.question5 ?? '',
                    'Is there a power differential between researchers and participants (researchers in a position of authority/ influencing decisions of participants care where they may readily give consent for data collection)?': ethicalData?.table2Answers?.table2a ?? '',
                    'With questionnaires, will you give participants the option of omitting questions they don’t want to answer?': ethicalData?.table2Answers?.table2b ?? '',
                    'Will you tell participants that their data will be treated with full confidentiality and if published, it will not be identifiable as theirs?': ethicalData?.table2Answers?.table2c ?? '',
                    'People with impaired decision making capacity': ethicalData?.table3Answers?.table3a ?? '',
                    'Children under 16': ethicalData?.table3Answers?.table3b ?? '',
                    'Medically vulnerable': ethicalData?.table3Answers?.table3c ?? '',
                    'Prisoners': ethicalData?.table3Answers?.table3d ?? '',
                    'Economically or educationally disadvantaged': ethicalData?.table3Answers?.table3e ?? '',
                    'Racial or ethnic minorities': ethicalData?.table3Answers?.table3f ?? '',
                    'Institutionalized persons (correctional facilities, nursing homes, or mental health)': ethicalData?.table3Answers?.table3g ?? '',
                    'Are you considering special care for taking informed consent, with no coercion?': ethicalData?.table4Answers?.table4a ?? '',
                    'Are the Risks to these participants (as mentioned in first table) less/ or at least not more than daily life risk?': ethicalData?.table4Answers?.table4b ?? '',
                    'Qualitative research on sensitive topics which may disturb young/vulnerable/female data collectors without provision of counseling and training': ethicalData?.table5Answers?.table5a ?? '',
                    'Contact with harmful agents or risk of physical injury': ethicalData?.table5Answers?.table5b ?? '',
                    'Contact with infectious patients and risk to health': ethicalData?.table5Answers?.table5c ?? '',
                    'Traveling in unsafe areas and risk of accidents/violence': ethicalData?.table5Answers?.table5d ?? '',
                    'Risk of facing improper behavior by approaching some risky community (drug abusers/mentally challenged/persons involved in risky behaviors)': ethicalData?.table5Answers?.table5e ?? '',
                    'Industry funded research with conditions of not disclosing risks to patients': ethicalData?.table5Answers?.table5f ?? '',
                    'Research findings having the potential to expose big industry/mafia trends': ethicalData?.table5Answers?.table5g ?? '',
                    'New knowledge gained and scientific development': ethicalData?.table6Answers?.table6a ?? '',
                    'Trainings/ educational interventions for participants': ethicalData?.table6Answers?.table6b ?? '',
                    'Early disease diagnosis/ screening of disease that helps patient in getting timely treatment. For such benefit research should include a step of informing patients of their diagnosis after data collection.': ethicalData?.table6Answers?.table6c ?? '',
                    'Ethical Risk': ethicalData?.ethicalRisk ?? '',
                    'Benefit Score': ethicalData?.table6Score ?? '',
                }
            };
            const raw = JSON.stringify(payload);
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const token = getCookie("token");
            myHeaders.append("Authorization", `Bearer ${token}`);
            const requestOptions = {
                method: "PATCH",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
                credentials: 'include',
            };
            const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/submit-section`, requestOptions);
            const result = await response.json();
            if (response.ok) {
                updateSavingStatus('EthicalReview', false);
                toast.success("Data updated successfully!");
            } else {
                updateSavingStatus('EthicalReview', false);
                toast.error(result.message || "Failed to update data.");
                console.log(result.message || "Failed to update data.");
            }
        } catch (error) {
            updateSavingStatus('EthicalReview', false);
            toast.error("Failed to update data.");
            console.log(error);
        }
    };
    const ScientificReviewChange = (newData) => {
        setScientificData(prevData => ({ ...prevData, ...newData }));
    };
    const handleScientificDataSubmission = async () => {
        updateSavingStatus('ScientificReview', true);
        try {
            const questions = {
                "Supervisor Name": scientificData?.supervisorName ?? '',
                "Applicant Name": scientificData?.applicantName ?? '',
                "Research Title": scientificData?.researchTitle ?? '',
                "Start Date": scientificData?.startDate ?? '',
                "End Date": scientificData?.endDate ?? '',
                "Sample Size": scientificData?.answer13 ?? 'N/A',
                'Name the beneficiary group clearly identified that will benefit from the information generated in your research': scientificData?.answer4 ?? '',
                'Add literature review findings on this topic from most relevant articles (those closely matching with yours in terms of variables studied), share what information is already available with them, methodology used by researchers, and on which population it was studied and in how much past. Provide URL link to all studies mentioned.': scientificData?.answer5 ?? '',
                'What information remained missing in other researches that you will cover in your project/ Research Gap found through literature review (evidence/ temporal/ methodology/ population gap)': scientificData?.answer6 ?? '',
                'Explain the rationale/ intended value of covering this research gap, detailing why the topic is of interest, benefit or relevance in your setting. Explain in your own words.': scientificData?.answer7 ?? '',
                'Objectives of Research': scientificData?.researchObjectives ?? '',
                'Main Variable under Study': scientificData?.mainVariable ?? '',
                'Operational Definition of Variable': scientificData?.operationalDefinition ?? '',
                "Study Design": scientificData?.answer11 ?? '',
                "Type of Analysis": scientificData?.answer12 ?? 'N/A',
                'Sample Size': scientificData?.answer13 ?? 'N/A',
                "For the case-control study, the sample size was calculated using an online OpenEpi sample size calculator. Keeping the ratio of controls to cases as": scientificData?.answer14a ?? 'N/A',
                "Proportion of controls with exposure as": scientificData?.answer14b ?? 'N/A',
                "Both proportions reported by a researcher from article title and URL:": scientificData?.answer14c ?? 'N/A',
                "Confidence limits": scientificData?.answer14d ?? 'N/A',
                "Percentage of test": scientificData?.answer14e ?? 'N/A',
                "Sample size came out to be": scientificData?.answer14f ?? 'N/A',
                "For cohort study, sample size was calculated using online OpenEpi sample size calculator. Keeping ratio of Unexposed/Exposed as": scientificData?.answer15a ?? 'N/A',
                "Percent of Unexposed with Outcome": scientificData?.answer15b ?? 'N/A',
                "Percent of exposed with Outcome": scientificData?.answer15c ?? 'N/A',
                "Both proportions reported by a researcher from article title and URL:": scientificData?.answer15d ?? 'N/A',
                "Confidence limits": scientificData?.answer15e ?? 'N/A',
                "Percentage of test": scientificData?.answer15f ?? 'N/A',
                "Sample size came out to be": scientificData?.answer15g ?? 'N/A',
                "For before-after comparison study, sample size was calculated using online OpenEpi sample size calculator. Keeping Mean value for group 1 as": scientificData?.answer16a ?? 'N/A',
                "Mean value for group 2": scientificData?.answer16b ?? 'N/A',
                "SD value for group 1": scientificData?.answer16c ?? 'N/A',
                "SD for group 2": scientificData?.answer16d ?? 'N/A',
                "Reported by a researcher from article title and URL:": scientificData?.answer16e ?? 'N/A',
                "Confidence level ": scientificData?.answer16f ?? 'N/A',
                "Percentage power of test": scientificData?.answer16g ?? 'N/A',
                "Sample size came out to": scientificData?.answer16h ?? 'N/A',
                "Non-Random Sampling Methods": scientificData?.answer17 ?? 'N/A',
                "Random Sampling Methods": scientificData?.answer18 ?? 'N/A',
                "Sample inclusion exclusion criteria and sampling technique in detail for quantitative research": scientificData?.answer19 ?? 'N/A',
                "Sample inclusion-exclusion criteria and sampling methods in detail for interviews": scientificData?.answer20 ?? 'N/A',
                "Place/s for data collection (give all available details including organization/ forum name, location, city, country etc.)": scientificData?.answer21 ?? 'N/A',
                "Data collection procedures and tools": scientificData?.answer22 ?? 'N/A',
                "For cross sectional survey, sample size was calculated using online OpenEpi sample size calculator for proportion. Keeping estimated population size as": scientificData?.answer23a ?? 'N/A',
                "Prevalence of “outcome of interest” as": scientificData?.answer23b ?? 'N/A',
                "Reported by a researcher from article title and URL": scientificData?.answer23c ?? 'N/A',
                "Absolute precision as": scientificData?.answer23d ?? 'N/A',
                "Sample size came out to be": scientificData?.answer23e ?? 'N/A',
                "For a confidence level of": scientificData?.answer23f ?? 'N/A',
                "For case control study, sample size was calculated using online OpenEpi sample size calculator for proportion. Keeping ratio of controls to cases as": scientificData?.answer24a ?? 'N/A',
                "For case control study, Proportion of controls with exposure as": scientificData?.answer24b ?? 'N/A',
                "For case control study, Proportion of cases with exposure as": scientificData?.answer24c ?? 'N/A',
                "For case control study, Both proportions reported by a researcher from article title and url": scientificData?.answer24d ?? 'N/A',
                "Both proportions reported by a researcher with confidence limit as": scientificData?.answer24e ?? 'N/A',
                "%, power of test": scientificData?.answer24f ?? 'N/A',
                "For case control study sample size comes out to be": scientificData?.answer24g ?? 'N/A',
                "Online questionnaires/ google forms": scientificData?.onlineQuestionnaires ?? 'N/A',
            };
            const payload = {
                "proposalId": proposalData?.id,
                "section": "scientificReview",
                "questions": questions
            };
            const raw = JSON.stringify(payload);
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const token = getCookie("token");
            myHeaders.append("Authorization", `Bearer ${token}`);
            const requestOptions = {
                method: "PATCH",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
                credentials: 'include',
            };
            const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/submit-section`, requestOptions);
            const result = await response.json();
            if (response.ok) {
                updateSavingStatus('ScientificReview', false);
                toast.success("Data updated successfully!");
            } else {
                updateSavingStatus('ScientificReview', false);
                console.log(result.message)
                toast.error(result.message || "Failed to update data.");
            }
        } catch (error) {
            updateSavingStatus('ScientificReview', false);
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
        updateSavingStatus('Consent', false);
        try {
            const payload = {
                "proposalId": proposalData?.id,
                "section": "consent",
                "questions": {
                    "Will the project require approval by any other ethics committee other than the BMY Ethics Committee?": consentData?.question1 || '',
                    "From where additional IRB approval is required": consentData?.question2 || '',
                    "Have the research team and data collectors got the relevant training?": consentData?.question3 || '',
                    "Are there any financial or other interests to the researcher(s) or department arising from this study, known to you": consentData?.question4 || ''
                }
            };
            const raw = JSON.stringify(payload);
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const token = getCookie("token");
            myHeaders.append("Authorization", `Bearer ${token}`);
            const requestOptions = {
                method: "PATCH",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
                credentials: 'include',
            };
            const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/submit-section`, requestOptions);
            const result = await response.json();
            if (response.ok) {
                updateSavingStatus('Consent', false);
                toast.success("Data updated successfully!");
            } else {
                updateSavingStatus('Consent', false);
                toast.error(result.message || "Failed to update data.");
            }
        } catch (error) {
            updateSavingStatus('Consent', false);
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
                        sectionAssigned={sectionAssigned}
                        formData={informationData}
                        onInputChange={handleInformationChange}
                        onSubmit={handleInformationSubmission}
                        updateFormData={handleUpdateInformationData}
                    />
                );
            case 'scientificReview':
                return (
                    <ScientificReview
                        sectionAssigned={sectionAssigned}
                        scientificData={scientificData}
                        onChange={ScientificReviewChange}
                        onSubmit={handleScientificDataSubmission}
                    />
                )
            case 'ethicalReview':
                return (
                    <EthicalReview
                        sectionAssigned={sectionAssigned}
                        ethicalData={ethicalData}
                        updateState={updateState}
                        onSubmit={handleEthicalSectionSubmission}
                    />
                );
            case 'consent':
                return (
                    <Consent
                        sectionAssigned={sectionAssigned}
                        formData={consentData}
                        onInputChange={handleConsentChange}
                        onSubmit={handleConsentSubmission}
                        onUpdateConsent={handleUpdateConsent}
                    />
                );
            default:
                return (
                    <Information
                        sectionAssigned={sectionAssigned}
                        savingStatus={savingStatus}
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
            <Toaster
            />
            <div className="md:my-10 my-5">
                <div className="flex flex-wrap gap-5 text-xl text-epsilon">
                    {sections.map((section, index) => (
                        <div className='flex flex-col'>
                            <button
                                key={index}
                                onClick={() => handleButtonClick(section)}
                                className={`py-1 px-3 rounded-md group relative overflow-hidden bg-epsilon  text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon  ${clickedSection === section ? 'bg-zeta hover:from-zeta' : ''}`}
                            >
                                <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                                {section === 'information' && 'Information'}
                                {section === 'scientificReview' && 'Scientific Review'}
                                {section === 'consent' && 'Consent'}
                                {section === 'ethicalReview' && 'Ethical Review'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                {renderSection()}
            </div>
        </>
    );
}
