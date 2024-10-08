import { React, useState, useEffect } from 'react'
export default function ScientificReview({ scientificData, onChange, onSubmit, sectionAssigned }) {
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [assigned, setAssigned] = useState(false)
    const [signUserRole, setSignUserRole] = useState('');
    useEffect(() => {
        const SignUserRole = localStorage.getItem('role');
        if (SignUserRole) {
            setSignUserRole(SignUserRole);
        } else {
            console.log('Local storage: role  not found.');
        }
    }, []);
    useEffect(() => {
        const isValidRole = (signUserRole, sectionAssigned) => {
            if (signUserRole === 'erc-head' || signUserRole === 'erc-members') {
                return true;
            }
            if (signUserRole === 'researchers') {
                return !sectionAssigned.includes('scientificReview');
            }
            return false;
        };
        if (sectionAssigned.includes('scientificReview')) {
            setAssigned(true)
        }
        const checkBtn = isValidRole(signUserRole, sectionAssigned);
        setIsButtonEnabled(checkBtn);
    }, [signUserRole, sectionAssigned]);
    const handleScientificDataChange = (event) => {
        const { name, value, type, files } = event.target;
        if (type === 'radio') {
            onChange({ [name]: value });
        } else if (type === 'file') {
            onChange({ [name]: files[0] });
        } else {
            onChange({ [name]: value });
        }
    };
    return (
        <>
            <div className='font-WorkSans-Regular'>
                <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '> Scientific Review (Synopsis)  </h1>
                {scientificData.answer1}
                <header className='bg-white shadow-sm my-5 p-10'>
                    {
                        signUserRole === 'researchers' && (
                            <>
                                <p className='flex justify-end text-epsilon'>
                                    {assigned ? 'Assigned' : 'Not Assigned'}
                                </p>
                            </>
                        )
                    }
                    <section className='mb-4 w-full md:w-[50%] '>
                        <label htmlFor="supervisorName" className='text-zeta  font-semibold '>Supervisor </label>
                        <input
                            name="supervisorName"
                            value={scientificData.supervisorName}
                            onChange={handleScientificDataChange}
                            type="text"
                            id="supervisorName"
                            className='border mt-2 rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none'
                        />
                    </section>
                    <section className='mb-4 w-full md:w-[50%] '>
                        <label htmlFor="applicantName" className='text-zeta  font-semibold '>Applicant Name </label>
                        <input
                            value={scientificData.applicantName}
                            onChange={handleScientificDataChange}
                            type='text'
                            name='applicantName'
                            id='applicantName'
                            className='mt-2 border rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none' />
                    </section>
                    <section className='mb-4 w-full md:w-[50%] '>
                        <label htmlFor="researchTitle" className='text-zeta  font-semibold '>Research Title</label>
                        <input
                            value={scientificData.researchTitle}
                            onChange={handleScientificDataChange}
                            type='text'
                            name='researchTitle'
                            id='researchTitle'
                            className=' mt-2 border rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none' />
                    </section>
                    {/* Question-2 */}
                    <section className='mb-4 w-full md:w-[50%] '>
                        <label htmlFor="startDate" className='text-zeta  font-semibold '>Start Date of Data Collection (as planned) </label>
                        <input
                            type='date'
                            name='startDate'
                            id='startDate'
                            value={scientificData.startDate}
                            onChange={handleScientificDataChange}
                            className='mt-2 border rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none' />
                    </section>
                    {/* Question-3 */}
                    <section className='mb-4 w-full md:w-[50%]'>
                        <label htmlFor="endDate" className='text-zeta  font-semibold '>End Date of Data Collection (expected) </label>
                        <input
                            type='date'
                            value={scientificData.endDate}
                            onChange={handleScientificDataChange}
                            name='endDate'
                            id='endDate'
                            className='border  mt-2 rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none' />
                    </section>
                    {/* Question-4*/}
                    <section className="mb-4">
                        <p className="mt-5 mb-2 w-full text-zeta font-semibold ">
                            Name the beneficiary group clearly identified that will benefit from the information generated in your research.
                        </p>
                        <div className="relative w-full md:w-[50%]">
                            <div
                                className={` bg-stone-100 ${scientificData.answer4.split(/\s+/).length >= scientificData.answer4Limit ? 'text-red-600' : ''
                                    } border-stone-300 z-10 absolute right-4 top-1`}
                            >
                                {scientificData.answer4.split(/\s+/).length} / {scientificData.answer4Limit}
                            </div>
                            <textarea
                                name="answer4"
                                value={scientificData.answer4}
                                className="border rounded-md block py-5 bg-lightBackground border-stone-300 px-3 w-full outline-none"
                                rows="4"
                                cols="50"
                                // maxLength={scientificData.answer4Limit}
                                placeholder="Add Details"
                                onChange={handleScientificDataChange}
                            ></textarea>
                        </div>
                    </section>
                    {/* Question-5 */}
                    <section className="mb-4 w-full ">
                        <p className="mt-5 mb-2  text-zeta text-justify font-semibold md:">
                            Add literature review findings on this topic from most relevant articles (those closely matching with yours in terms of variables studied), share what information is already available with them, methodology used by researchers, and on which population it was studied and in how much past. Provide URL link to all studies mentioned.
                        </p>
                        <div className="relative  md:w-[50%] ">
                            <div
                                className={`bg-stone-100 ${scientificData.answer5.split(/\s+/).length >= scientificData.answer5Limit ? 'text-red-600' : ''
                                    } border-stone-300 z-10 absolute right-4 top-1 `}
                            >
                                {scientificData.answer5.split(/\s+/).length} / {scientificData.answer5Limit}
                            </div>
                            <textarea
                                name="answer5"
                                value={scientificData.answer5}
                                className="border rounded-md block py-5 bg-lightBackground border-stone-300 px-3 w-full outline-none"
                                rows="4"
                                cols="50"
                                // maxLength={scientificData.answer5Limit}
                                placeholder="Add Details"
                                onChange={handleScientificDataChange}
                            ></textarea>
                        </div>
                    </section>
                    {/* Question-6 */}
                    <section className="mb-4 ">
                        <p className="mt-5 mb-2 text-zeta text-justify  font-semibold ">
                            What information remained missing in other researches that you will cover in your project/ Research Gap found through literature review (evidence/ temporal/ methodology/ population gap)
                        </p>
                        <div className="relative md:w-[50%]">
                            <div
                                className={`bg-stone-100 ${scientificData.answer6.split(/\s+/).length >= scientificData.answer6Limit ? 'text-red-600' : ''
                                    } border-stone-300 z-10 absolute right-4 top-1 `}
                            >
                                {scientificData.answer6.split(/\s+/).length} / {scientificData.answer6Limit}
                            </div>
                            <textarea
                                name="answer6"
                                value={scientificData.answer6}
                                className="border rounded-md block py-5 bg-lightBackground border-stone-300 px-3 w-full outline-none"
                                rows="4"
                                cols="50"
                                // maxLength={scientificData.answer6Limit}
                                placeholder="Add Details"
                                onChange={handleScientificDataChange}
                            ></textarea>
                        </div>
                    </section>
                    {/* Question-7 */}
                    <section className="mb-4 w-full ">
                        <p className="mt-5   text-zeta  font-semibold ">
                            Explain the rationale/ intended value of covering this research gap, detailing why the topic is of interest, benefit or relevance in your setting. Explain in your own words.
                        </p>
                        <div className="relative md:w-[50%] ">
                            <div
                                className={`bg-stone-100 ${scientificData.answer7.split(/\s+/).length >= scientificData.answer7Limit ? 'text-red-600' : ''
                                    } border-stone-300 z-10 absolute right-4 top-1 `}
                            >
                                {scientificData.answer7.split(/\s+/).length} / {scientificData.answer7Limit}
                            </div>
                            <textarea
                                name="answer7"
                                value={scientificData.answer7}
                                onChange={handleScientificDataChange}
                                className="border rounded-md block py-5 bg-lightBackground border-stone-300 px-3 w-full outline-none"
                                rows="4"
                                cols="50"
                                // maxLength={scientificData.answer7Limit}
                                placeholder="Add Details"
                            ></textarea>
                        </div>
                    </section>
                    {/* Question-8 */}
                    <section className='mb-4 w-full md:w-[50%] '>
                        <label
                            htmlFor='researchObjectives'
                            className='text-zeta  font-semibold md:'>Objectives of Research</label>
                        <input
                            value={scientificData.researchObjectives}
                            onChange={handleScientificDataChange}
                            name='researchObjectives'
                            id='researchObjectives'
                            className='mt-2 border rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none' type="text" placeholder='Purpose Map' />
                    </section>
                    {/* Question-9 */}
                    <section className='mb-4 w-full md:w-[50%] '>
                        <label htmlFor="mainVariable" className='text-zeta  font-semibold '>Main Variable under Study</label>
                        <input
                            value={scientificData.mainVariable}
                            onChange={handleScientificDataChange}
                            name='mainVariable'
                            id='mainVariable'
                            className='mt-2 border rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none' type="text" placeholder='Virus' />
                    </section>
                    {/* question-10 */}
                    <section className="mb-4">
                        <p className="mt-5 mb-2  text-zeta  font-semibold   w-full md:w-[50%]">
                            Operational Definition of Variable
                        </p>
                        <div className="w-full md:w-[50%] ">
                            <textarea
                                className="border rounded-md block p-5 bg-lightBackground border-stone-300 px-3 w-full outline-none"
                                rows="4"
                                cols="50"
                                placeholder="Add Definition"
                                name="operationalDefinition"
                                value={scientificData.operationalDefinition}
                                onChange={handleScientificDataChange}
                            ></textarea>
                        </div>
                    </section>
                    {/* Question-11 */}
                    <section className='md:w-[80%]'>
                        <p className="mb-2 text-zeta font-semibold w-full md:w-[50%]">
                            Study Design
                        </p>
                        <div className="border rounded-md block p-5">
                            {[
                                "Descriptive cross-sectional survey (information of a group recorded just once, without following-up on them)",
                                "Cross-sectional study for finding association between variables",
                                "Prospective cohort study (starting with 2 groups exposed and unexposed, and following-up for comparing their disease incidence)",
                                "Case-control study (starting with 2 groups cases and controls, and recalling past history of exposures)",
                                "Retrospective cohort study (Records of exposure already recorded in past, and study starts with finding disease outcome in 2 groups)",
                                "Longitudinal study (follow-up of 1 group for disease incidence; descriptive)",
                                "Before-after comparison study for 1 group which undergoes an exposure",
                                "Qualitative study (detailed interviews)",
                                "Mixed-methods study (Interviews for quality of variable AS WELL AS close ended questionnaire surveys for quantity of variable)"
                            ].map((option, index) => (
                                <div className="mb-2" key={index}>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="answer11"
                                            value={option}
                                            checked={scientificData.answer11 === option}
                                            onChange={handleScientificDataChange}
                                            className="mr-2"
                                        />
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </section>
                    {/* Question-12 */}
                    {scientificData.answer11 === 'Descriptive cross-sectional survey (information of a group recorded just once, without following-up on them)' && (
                        <section className='my-5 md:w-[80%]'>
                            <p className="mb-2 text-zeta font-semibold w-full md:w-[50%]">
                                Type of Analysis
                            </p>
                            <div className="border rounded-md block p-5">
                                <div className="mb-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="answer12"
                                            value="Estimating prevalence, and/or relating variables using test of significance (inferential analysis)"
                                            checked={scientificData.answer12 === 'Estimating prevalence, and/or relating variables using test of significance (inferential analysis)'}
                                            onChange={handleScientificDataChange}
                                            className="mr-2"
                                        />
                                        Estimating prevalence, and/or relating variables using test of significance (inferential analysis)
                                    </label>
                                </div>
                                <div className="mb-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="answer12"
                                            value="Calculating frequencies in sample and other descriptive analysis only, no inferential analysis"
                                            checked={scientificData.answer12 === 'Calculating frequencies in sample and other descriptive analysis only, no inferential analysis'}
                                            onChange={handleScientificDataChange}
                                            className="mr-2"
                                        />
                                        Calculating frequencies in sample and other descriptive analysis only, no inferential analysis
                                    </label>
                                </div>
                            </div>
                        </section>
                    )
                    }
                    {/* Question-13 */}
                    {
                        scientificData.answer11 !== 'Descriptive cross-sectional survey (information of a group recorded just once, without following-up on them)'
                        && (
                            <section className='my-4 w-full md:w-[50%]'>
                                <label htmlFor="answer13" className='text-zeta  font-semibold '>Sample Size</label>
                                <input
                                    value={scientificData.answer13}
                                    name='answer13'
                                    id='answer13'
                                    onChange={handleScientificDataChange}
                                    className='border mt-2 rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none' type="text" placeholder='10%' />
                            </section>
                        )}
                    {
                        (
                            scientificData.answer11 === 'Case-control study (starting with 2 groups cases and controls, and recalling past history of exposures)'
                        )
                        && (
                            <section className='my-5 p-5 md:leading-[2rem] md:w-[80%] border rounded-md block '>
                                For case control study, sample size was calculated using online OpenEpi sample size calculator for proportion. Keeping ratio of controls to cases as
                                <input
                                    className="outline-none my-1 px-2 w-[150px] border-b text-epsilon border-epsilon"
                                    type="text"
                                    name='answer24a'
                                    value={scientificData.answer24a}
                                    onChange={handleScientificDataChange}
                                />
                                , proportion of controls with exposure as
                                <input
                                    className="outline-none my-1 px-2 w-[150px] border-b text-epsilon border-epsilon"
                                    type="text"
                                    name='answer24b'
                                    value={scientificData.answer24b}
                                    onChange={handleScientificDataChange}
                                />
                                and proportion of cases with exposure  <input
                                    className="outline-none my-1 px-2 w-[150px] border-b text-epsilon border-epsilon"
                                    type="text"
                                    name='answer24c'
                                    value={scientificData.answer24c}
                                    onChange={handleScientificDataChange}
                                />, both proportions reported by a researcher from article title and url
                                <input
                                    className="outline-none my-1 px-2 w-[150px] border-b text-epsilon border-epsilon"
                                    type="text"
                                    name='answer24d'
                                    value={scientificData.answer24d}
                                    onChange={handleScientificDataChange}
                                />
                                confidence limit as
                                <input
                                    className="outline-none my-1 px-2 w-[150px] border-b text-epsilon border-epsilon"
                                    type="text"
                                    name='answer24e'
                                    value={scientificData.answer24e}
                                    onChange={handleScientificDataChange}
                                />
                                %, power of test
                                <input
                                    className="outline-none my-1 px-2 w-[150px] border-b text-epsilon border-epsilon"
                                    type="text"
                                    name='answer24f'
                                    value={scientificData.answer24f}
                                    onChange={handleScientificDataChange}
                                />,
                                sample size comes out to be
                                <input
                                    className="outline-none my-1 px-2 w-[150px] border-b text-epsilon border-epsilon"
                                    type="text"
                                    name='answer24g'
                                    value={scientificData.answer24g}
                                    onChange={handleScientificDataChange}
                                />
                            </section>
                        )}
                    {
                        // Not to Include
                        (
                            scientificData.answer11 !== 'Qualitative study (detailed interviews)'
                            &&
                            scientificData.answer11 !== 'Before-after comparison study for 1 group which undergoes an exposure'
                            &&
                            scientificData.answer11 !== 'Longitudinal study (follow-up of 1 group for disease incidence; descriptive)'
                            &&
                            scientificData.answer11 !== 'Retrospective cohort study (Records of exposure already recorded in past, and study starts with finding disease outcome in 2 groups)'
                            &&
                            scientificData.answer11 !== 'Case-control study (starting with 2 groups cases and controls, and recalling past history of exposures)'
                            &&
                            scientificData.answer11 !== 'Prospective cohort study (starting with 2 groups exposed and unexposed, and following-up for comparing their disease incidence)'
                            &&
                            scientificData.answer11 !== 'Cross-sectional study for finding association between variables'
                        )
                        && (
                            <section className='my-5 p-5 md:leading-[2rem] md:w-[80%] border rounded-md block '>
                                For cross sectional survey, sample size was calculated using online OpenEpi sample size calculator for proportion. Keeping estimated population size as
                                <input
                                    className="outline-none my-1 px-2 w-[150px] border-b text-epsilon border-epsilon"
                                    type="text"
                                    name='answer23a'
                                    value={scientificData.answer23a}
                                    onChange={handleScientificDataChange}
                                />
                                , (write 1000000 if the population size is unknown), prevalence of “outcome of interest” as
                                <input
                                    className="outline-none my-1 px-2 w-[150px] border-b text-epsilon border-epsilon"
                                    type="text"
                                    name='answer23b'
                                    value={scientificData.answer23b}
                                    onChange={handleScientificDataChange}
                                />
                                %, as reported by a researcher from article title and URL: <input
                                    className="outline-none my-1 px-2 w-[150px] border-b text-epsilon border-epsilon"
                                    type="text"
                                    name='answer23c'
                                    value={scientificData.answer23c}
                                    onChange={handleScientificDataChange}
                                />, absolute precision as
                                <input
                                    className="outline-none my-1 px-2 w-[150px] border-b text-epsilon border-epsilon"
                                    type="text"
                                    name='answer23d'
                                    value={scientificData.answer23d}
                                    onChange={handleScientificDataChange}
                                />
                                sample size came out to be
                                <input
                                    className="outline-none my-1 px-2 w-[150px] border-b text-epsilon border-epsilon"
                                    type="text"
                                    name='answer23e'
                                    value={scientificData.answer23e}
                                    onChange={handleScientificDataChange}
                                />
                                , for a confidence level of
                                <input
                                    className="outline-none my-1 px-2 w-[150px] border-b text-epsilon border-epsilon"
                                    type="text"
                                    name='answer23f'
                                    value={scientificData.answer23f}
                                    onChange={handleScientificDataChange}
                                />
                            </section>
                        )}
                    {/* Question-14 labels section */}
                    {
                        // yha pr wo ain ga  jo ka honga jin ma complete hide chie 
                        scientificData.answer11 !== 'Qualitative study (detailed interviews)'
                        &&
                        scientificData.answer11 !== 'Descriptive cross-sectional survey (information of a group recorded just once, without following-up on them)' &&
                        scientificData.answer11 !== 'Estimating prevalence, and/or relating variables using test of significance (inferential analysis)'
                        &&
                        scientificData.answer11 !== 'Longitudinal study (follow-up of 1 group for disease incidence; descriptive)'
                        &&
                        scientificData.answer11 !== 'Qualitative study (detailed interviews)'
                        &&
                        scientificData.answer11 !== 'Mixed-methods study (Interviews for quality of variable AS WELL AS close ended questionnaire surveys for quantity of variable)'
                        &&
                        scientificData.answer11 !== 'Case-control study (starting with 2 groups cases and controls, and recalling past history of exposures)'
                        &&
                        (
                            <section className="my-5 md:leading-[2rem] md:w-[80%] border rounded-md block p-5">
                                {
                                    (
                                        scientificData.answer11 !== 'Prospective cohort study (starting with 2 groups exposed and unexposed, and following-up for comparing their disease incidence)'
                                        &&
                                        scientificData.answer11 !== 'Retrospective cohort study (Records of exposure already recorded in past, and study starts with finding disease outcome in 2 groups)'
                                        &&
                                        scientificData.answer11 !== 'Before-after comparison study for 1 group which undergoes an exposure'
                                        &&
                                        scientificData.answer11 !== 'Cross-sectional study for finding association between variables'
                                    )
                                    && (
                                        <div className="">
                                            For the case-control study, the sample size was calculated using an online OpenEpi sample size calculator. Keeping the ratio of controls to cases as
                                            <input
                                                className="outline-none my-1 px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                name='answer14a'
                                                value={scientificData.answer14a}
                                                onChange={handleScientificDataChange}
                                            />
                                            , the proportion of controls with exposure as
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                name='answer14b'
                                                value={scientificData.answer14b}
                                                onChange={handleScientificDataChange}
                                            />
                                            , both proportions reported by a researcher from article title and URL:
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                name='answer14c'
                                                value={scientificData.answer14c}
                                                onChange={handleScientificDataChange}
                                            />
                                            , confidence limits as
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                name='answer14d'
                                                value={scientificData.answer14d}
                                                onChange={handleScientificDataChange}
                                            />
                                            %, power of test
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                name='answer14e'
                                                value={scientificData.answer14e}
                                                onChange={handleScientificDataChange}
                                            />
                                            , sample size came out to be
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                name='answer14f'
                                                value={scientificData.answer14f}
                                                onChange={handleScientificDataChange}
                                            />
                                        </div>
                                    )}
                                {/* Question-15 labels section */}
                                {
                                    scientificData.answer11 !== 'Before-after comparison study for 1 group which undergoes an exposure'
                                    &&
                                    scientificData.answer11 !== 'Case-control study (starting with 2 groups cases and controls, and recalling past history of exposures)'
                                    &&
                                    (
                                        <div className="">
                                            Sample size was calculated using online OpenEpi sample size calculator. Keeping ratio of Unexposed/Exposed as
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                name='answer15a'
                                                value={scientificData.answer15a}
                                                onChange={handleScientificDataChange}
                                            />
                                            , Percent of Unexposed with Outcome as
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                name='answer15b'
                                                value={scientificData.answer15b}
                                                onChange={handleScientificDataChange}
                                            />
                                            , and Percent of exposed with Outcome
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                name='answer15c'
                                                value={scientificData.answer15c}
                                                onChange={handleScientificDataChange}
                                            />
                                            , both Percent values reported by a researcher from article title and URL:
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                name='answer15d'
                                                value={scientificData.answer15d}
                                                onChange={handleScientificDataChange}
                                            />
                                            , confidence level as
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                name='answer15e'
                                                value={scientificData.answer15e}
                                                onChange={handleScientificDataChange}
                                            />
                                            %, power of test
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                name='answer15f'
                                                value={scientificData.answer15f}
                                                onChange={handleScientificDataChange}
                                            />
                                            , sample size came out to be
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                name='answer15g'
                                                value={scientificData.answer15g}
                                                onChange={handleScientificDataChange}
                                            />
                                        </div>
                                    )}
                                {/* Question-16 labels section */}
                                {
                                    (
                                        scientificData.answer11 !== 'Prospective cohort study (starting with 2 groups exposed and unexposed, and following-up for comparing their disease incidence)'
                                        &&
                                        scientificData.answer11 !== 'Retrospective cohort study (Records of exposure already recorded in past, and study starts with finding disease outcome in 2 groups)'
                                        &&
                                        scientificData.answer11 !== 'Cross-sectional study for finding association between variables'
                                    )
                                    && (
                                        <div className="">
                                            For before-after comparison study, sample size was calculated using online OpenEpi sample size calculator. Keeping Mean value for group 1 as
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                name='answer16a'
                                                value={scientificData.answer16a}
                                                onChange={handleScientificDataChange}
                                            />
                                            , Mean value for group 2 as
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                name='answer16b'
                                                value={scientificData.answer16b}
                                                onChange={handleScientificDataChange}
                                            />
                                            , SD value for group 1 as
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                name='answer16c'
                                                value={scientificData.answer16c}
                                                onChange={handleScientificDataChange}
                                            />
                                            , SD for group 2 as
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                name='answer16d'
                                                value={scientificData.answer16d}
                                                onChange={handleScientificDataChange}
                                            />
                                            , as reported by a researcher from article title and URL:
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                name='answer16e'
                                                value={scientificData.answer16e}
                                                onChange={handleScientificDataChange}
                                            />
                                            , confidence level as
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                name='answer16f'
                                                value={scientificData.answer16f}
                                                onChange={handleScientificDataChange}
                                            />
                                            %, power of test
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                name='answer16g'
                                                value={scientificData.answer16g}
                                                onChange={handleScientificDataChange}
                                            />
                                            , sample size came out to be
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                name='answer16h'
                                                value={scientificData.answer16h}
                                                onChange={handleScientificDataChange}
                                            />
                                        </div>
                                    )}
                            </section>
                        )}
                    {/* Question-17 */}
                    {
                        (scientificData.answer12 === 'Calculating frequencies in sample and other descriptive analysis only, no inferential analysis'
                            ||
                            scientificData.answer11 === 'Qualitative study (detailed interviews)'
                        )
                        &&
                        scientificData.answer11 !== 'Before-after comparison study for 1 group which undergoes an exposure'
                        &&
                        scientificData.answer11 !== 'Longitudinal study (follow-up of 1 group for disease incidence; descriptive)'
                        &&
                        scientificData.answer11 !== 'Mixed-methods study (interviews for quality of variable AS WELL AS close ended questionnaire surveys for quantity of variable)'
                        &&
                        scientificData.answer11 !== 'Retrospective cohort study (Records of exposure already recorded in past, and study starts with finding disease outcome in 2 groups)'
                        &&
                        scientificData.answer11 !== 'Prospective cohort study (starting with 2 groups exposed and unexposed, and following-up for comparing their disease incidence)'
                        &&
                        scientificData.answer11 !== 'Case-control study (starting with 2 groups cases and controls, and recalling past history of exposures)'
                        &&
                        (
                            <section className=' my-5  md:w-[80%]'>
                                <p className="mb-2  text-zeta  font-semibold  w-full ">
                                    Non-Random Sampling Methods
                                </p>
                                <div className=" border rounded-md block p-5 ">
                                    <div className="mb-2">
                                        <label className="flex items-start ">
                                            <input
                                                name="answer17"
                                                type="radio"
                                                value="Including participants in study as per convenience in data collection and choosing whoever comes first/ met easily (Convenience sampling)"
                                                checked={scientificData.answer17 === 'Including participants in study as per convenience in data collection and choosing whoever comes first/ met easily (Convenience sampling)'}
                                                onChange={handleScientificDataChange}
                                                className="mr-2 mt-2"
                                            />
                                            Including participants in study as per convenience in data collection and choosing whoever comes first/ met easily (Convenience sampling)
                                        </label>
                                    </div>
                                    <div className="mb-2">
                                        <label className="flex items-start">
                                            <input
                                                name="answer17"
                                                type="radio"
                                                value="Including all participants fulfilling some judgmental criteria during a given time in the study setting for the purpose of reaching some desired results e.g. selecting more vocal participants (Purposive sampling)"
                                                checked={scientificData.answer17 === 'Including all participants fulfilling some judgmental criteria during a given time in the study setting for the purpose of reaching some desired results e.g. selecting more vocal participants (Purposive sampling)'}
                                                onChange={handleScientificDataChange}
                                                className="mr-2  mt-2"
                                            />
                                            Including all participants fulfilling some judgmental criteria during a given time in the study setting for the purpose of reaching some desired results e.g. selecting more vocal participants (Purposive sampling)
                                        </label>
                                    </div>
                                    <div className="mb-2">
                                        <label className="flex items-start">
                                            <input
                                                name="answer17"
                                                type="radio"
                                                value="Approaching one participant fulfilling criteria and then asking them to help approach more such participants fulfilling criteria (Snow ball sampling; required in marginalized/ stigmatized/ hidden communities)"
                                                checked={scientificData.answer17 === 'Approaching one participant fulfilling criteria and then asking them to help approach more such participants fulfilling criteria (Snow ball sampling; required in marginalized/ stigmatized/ hidden communities)'}
                                                onChange={handleScientificDataChange}
                                                className="mr-2  mt-2"
                                            />
                                            Approaching one participant fulfilling criteria and then asking them to help approach more such participants fulfilling criteria (Snow ball sampling; required in marginalized/ stigmatized/ hidden communities)
                                        </label>
                                    </div>
                                    <div className="mb-2">
                                        <label className="flex items-center">
                                            <input
                                                name="answer17"
                                                type="radio"
                                                value="Others"
                                                checked={scientificData.answer17 === 'Others'}
                                                onChange={handleScientificDataChange}
                                                className="mr-2  "
                                            />
                                            Others
                                        </label>
                                    </div>
                                </div>
                            </section>
                        )}
                    {/* Question-18 */}
                    {
                        (
                            scientificData.answer11 !== 'Qualitative study (detailed interviews)' &&
                            scientificData.answer11 !== 'Mixed-methods study (Interviews for quality of variable AS WELL AS close ended questionnaire surveys for quantity of variable)' &&
                            scientificData.answer12 === 'Estimating prevalence, and/or relating variables using test of significance (inferential analysis)' ||
                            scientificData.answer11 === 'Cross-sectional study for finding association between variables' ||
                            scientificData.answer11 === 'Case-control study (starting with 2 groups cases and controls, and recalling past history of exposures)'
                            ||
                            scientificData.answer11 === 'Before-after comparison study for 1 group which undergoes an exposure'
                            ||
                            scientificData.answer11 === 'Longitudinal study (follow-up of 1 group for disease incidence; descriptive)'
                            ||
                            scientificData.answer11 === 'Prospective cohort study (starting with 2 groups exposed and unexposed, and following-up for comparing their disease incidence)'
                            ||
                            scientificData.answer11 === 'Retrospective cohort study (Records of exposure already recorded in past, and study starts with finding disease outcome in 2 groups)'
                        )
                        &&
                        (
                            <section className='md:my-10 my-5  md:w-[80%]'>
                                <p className="mb-2  text-zeta  font-semibold  w-full ">
                                    Random Sampling Methods
                                </p>
                                <div className=" border rounded-md block p-5 ">
                                    <div className="mb-2">
                                        <label className="flex items-start">
                                            <input
                                                name="answer18"
                                                type="radio"
                                                value="Including participants by collecting population list, assigning numbers to individuals and picking numbers by lottery method/ table of random numbers to include individuals in sample (Simple Random Sampling)"
                                                checked={scientificData.answer18 === 'Including participants by collecting population list, assigning numbers to individuals and picking numbers by lottery method/ table of random numbers to include individuals in sample (Simple Random Sampling)'}
                                                onChange={handleScientificDataChange}
                                                className="mr-2 mt-2"
                                            />
                                            Including participants by collecting population list, assigning numbers to individuals and picking numbers by lottery method/ table of random numbers to include individuals in sample (Simple Random Sampling)
                                        </label>
                                    </div>
                                    <div className="mb-2">
                                        <label className="flex items-start">
                                            <input
                                                name="answer18"
                                                type="radio"
                                                value="Selecting every nth number fulfilling criteria, from population list (Systematic Random Sampling)."
                                                checked={scientificData.answer18 === 'Selecting every nth number fulfilling criteria, from population list (Systematic Random Sampling).'}
                                                onChange={handleScientificDataChange}
                                                className="mr-2 mt-2"
                                            />
                                            Selecting every nth number fulfilling criteria, from population list (Systematic Random Sampling).
                                        </label>
                                    </div>
                                    <div className="mb-2">
                                        <label className="flex items-start">
                                            <input
                                                name="answer18"
                                                type="radio"
                                                value="Dividing population in strata/ groups and selecting individuals in all groups by simple random or systematic random method (Stratified Random Sampling)"
                                                checked={scientificData.answer18 === 'Dividing population in strata/ groups and selecting individuals in all groups by simple random or systematic random method (Stratified Random Sampling)'}
                                                onChange={handleScientificDataChange}
                                                className="mr-2 mt-2"
                                            />
                                            Dividing population in strata/ groups and selecting individuals in all groups by simple random or systematic random method (Stratified Random Sampling)
                                        </label>
                                    </div>
                                    <div className="mb-2">
                                        <label className="flex items-start">
                                            <input
                                                name="answer18"
                                                type="radio"
                                                value="Dividing population in clusters, and then selecting individuals further using other random method (Cluster sampling)"
                                                checked={scientificData.answer18 === 'Dividing population in clusters, and then selecting individuals further using other random method (Cluster sampling)'}
                                                onChange={handleScientificDataChange}
                                                className="mr-2 mt-2"
                                            />
                                            Dividing population in clusters, and then selecting individuals further using other random method (Cluster sampling)
                                        </label>
                                    </div>
                                    <div className="mb-2">
                                        <label className="flex items-center">
                                            <input
                                                name="answer18"
                                                type="radio"
                                                value="Others"
                                                checked={scientificData.answer18 === 'Others'}
                                                onChange={handleScientificDataChange}
                                                className="mr-2"
                                            />
                                            Others
                                        </label>
                                    </div>
                                </div>
                            </section>
                        )}
                    {/* question-19 */}
                    {scientificData.answer11 !== 'Mixed-methods study (interviews for quality of variable AS WELL AS close ended questionnaire surveys for quantity of variable)' &&
                        scientificData.answer11 !== 'Qualitative study (detailed interviews)'
                        &&
                        (
                            <section className="mb-4">
                                <p className="mt-5 mb-2  text-zeta  font-semibold  w-full ">
                                    Sample inclusion exclusion criteria and sampling technique in detail for quantitative research
                                </p>
                                <div className="w-full md:w-[50%] ">
                                    <textarea
                                        className="border rounded-md block p-5 bg-lightBackground border-stone-300 px-3 w-full outline-none"
                                        rows="4"
                                        cols="50"
                                        placeholder="Add Definition"
                                        name='answer19'
                                        value={scientificData.answer19}
                                        onChange={handleScientificDataChange}
                                    ></textarea>
                                </div>
                            </section>)}
                    {/* question-20*/}
                    {scientificData.answer11 !== 'Descriptive cross-sectional survey (information of a group recorded just once, without following-up on them)' &&
                        scientificData.answer11 !== 'Prospective cohort study (starting with 2 groups exposed and unexposed, and following-up for comparing their disease incidence)'
                        &&
                        scientificData.answer11 !== 'Case-control study (starting with 2 groups cases and controls, and recalling past history of exposures)'
                        &&
                        scientificData.answer11 !== 'Retrospective cohort study (Records of exposure already recorded in past, and study starts with finding disease outcome in 2 groups)'
                        &&
                        scientificData.answer11 !== 'Longitudinal study (follow-up of 1 group for disease incidence; descriptive)'
                        &&
                        scientificData.answer11 !== 'Before-after comparison study for 1 group which undergoes an exposure'
                        &&
                        scientificData.answer11 !== 'Cross-sectional study for finding association between variables'
                        &&
                        (
                            <section className="mb-4">
                                <p className="mt-5 mb-2  text-zeta font-semibold  w-full ">
                                    Sample inclusion-exclusion criteria and sampling methods in detail for interviews
                                </p>
                                <div className="w-full md:w-[50%] ">
                                    <textarea
                                        className="border rounded-md block p-5 bg-lightBackground border-stone-300 px-3 w-full outline-none"
                                        rows="4"
                                        cols="50"
                                        placeholder="Add Definition"
                                        name='answer20'
                                        value={scientificData.answer20}
                                        onChange={handleScientificDataChange}
                                    ></textarea>
                                </div>
                            </section>)}
                    {/*  Question-21*/}
                    <section className='mb-4'>
                        <label htmlFor="answer21" className='text-zeta  font-semibold'>Place/s for data collection (give all available details including organization/ forum name, location, city, country etc.) </label>
                        <div className='w-full mt-2  md:w-[50%] '>
                            <input
                                type='text'
                                name='answer21'
                                value={scientificData.answer21}
                                onChange={handleScientificDataChange}
                                id='answer21'
                                className='border rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none' placeholder='ABC, XYZ, NYC, USA' />
                        </div>
                    </section>
                    {/* question-22*/}
                    <section className="mb-4">
                        <p className="mt-5 mb-2  text-zeta  font-semibold w-full md:w-[50%]">
                            Data collection procedures and tools
                        </p>
                        <div className="w-full md:w-[50%] ">
                            <textarea
                                className="border rounded-md block p-5 bg-lightBackground border-stone-300 px-3 w-full outline-none"
                                rows="4"
                                cols="50"
                                placeholder="Add Definition"
                                name='answer22'
                                value={scientificData.answer22}
                                onChange={handleScientificDataChange}
                            ></textarea>
                        </div>
                    </section>
                    <section className='md:w-[50%]'>
                        {/* <p className='text-zeta  font-semibold '>Proforma/ Questionnaire * </p>
                        <label
                            htmlFor='performa'
                            className="my-5 bg-alpha flex flex-col justify-center items-center gap-2 py-5 border-2 border-dashed border-epsilon   rounded-md  p-5">
                            <BsFillCloudUploadFill className='text-5xl text-epsilon' />
                            <h1 className='font-semibold'>
                                Upload Proforma/ Questionnaire
                            </h1>
                            <p className='text-neutral-600'>Drag and Drop Files Here</p>
                            <input
                                type="file"
                                name="performa"
                                id="performa"
                                onChange={handleScientificDataChange}
                                className="w-0" 
                            />
                        </label> */}
                        <section className='mb-4'>
                            <label
                                htmlFor='onlineQuestionnaires'
                                className='text-zeta font-semibold '>For online questionnaires/ google forms, share link    </label>
                            <div className='w-full  '>
                                <input
                                    name='onlineQuestionnaires'
                                    id='onlineQuestionnaires'
                                    value={scientificData.onlineQuestionnaires}
                                    onChange={handleScientificDataChange}
                                    type='text'
                                    className='border rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none' placeholder='Enter Link' />
                            </div>
                        </section>
                    </section>
                    <button
                        onClick={onSubmit}
                        disabled={isButtonEnabled}
                        className={` ${isButtonEnabled === true && 'hidden'} mt-6 px-8 py-3 rounded-md group relative overflow-hidden bg-epsilon text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon`}
                    >
                        <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                        Save
                    </button>
                </header>
            </div>
        </>
    )
}
