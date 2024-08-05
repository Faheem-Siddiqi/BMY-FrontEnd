import { React, useState } from 'react'
import { BsFillCloudUploadFill } from "react-icons/bs"
export default function ScientificReview() {
    const [scientificData, setScienificData] = useState({
        supervisorName: 'Supervisor',
        applicantName: 'Applicant',
        researchTitle: 'Title',
        startDate: '2024-08-01', //we have to use this format
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
        answer11: 'Cross-sectional survey (information of a group recorded just once, without following-up on them)', // Default value
      
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
        answer17: '',
        answer18: '',
        answer19: '',
        answer20: '',
        answer21: '',
        answer22: '',
        performa: '',
        onlineQuestionnaires:''
    });
    const handleScientificDataChange = (event) => {
        const { name, value, type, files } = event.target;
        console.log(`Handling change for: ${name}, type: ${type}, value: ${value}`);
        if (type === 'radio') {
            // Handle radio button changes
            setScienificData(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else if (type === 'file') {
            // Handle file input changes
            setScienificData(prevState => ({
                ...prevState,
                [name]: files[0] // Handle single file upload
            }));
        } else {
            // Handle text and other input field changes
            setScienificData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };
    // Question-12 Type of Analysis..
    const [answer12, setAnswer12] = useState('')
    const handleOptionAnswer12 = (e) => {
        setAnswer12(e.target.value);
    };
    // Question-13 Study Design..
    const [answer13, setAnswer13] = useState('')
    // Question 14 -16 labels
    const [answer14a, setAnswer14a] = useState('');
    const [answer14b, setAnswer14b] = useState('');
    const [answer14c, setAnswer14c] = useState('');
    const [answer14d, setAnswer14d] = useState('');
    const [answer14e, setAnswer14e] = useState('');
    const [answer14f, setAnswer14f] = useState('');
    const [answer14g, setAnswer14g] = useState('');
    const [answer15a, setAnswer15a] = useState('');
    const [answer15b, setAnswer15b] = useState('');
    const [answer15c, setAnswer15c] = useState('');
    const [answer15d, setAnswer15d] = useState('');
    const [answer15e, setAnswer15e] = useState('');
    const [answer15f, setAnswer15f] = useState('');
    const [answer15g, setAnswer15g] = useState('');
    const [answer16a, setAnswer16a] = useState('');
    const [answer16b, setAnswer16b] = useState('');
    const [answer16c, setAnswer16c] = useState('');
    const [answer16d, setAnswer16d] = useState('');
    const [answer16e, setAnswer16e] = useState('');
    const [answer16f, setAnswer16f] = useState('');
    const [answer16g, setAnswer16g] = useState('');

    const [answer17, setAnswer17] = useState('');
    const handleOptionAnswer17 = (e) => {
        setAnswer17(e.target.value);
    };
    // Question-18  Random Sampling Methods..
    const [answer18, setAnswer18] = useState('');
    const handleOptionAnswer18 = (e) => {
        setAnswer18(e.target.value);
    };
    return (
        <>
 {scientificData.answer11}
            <div className='font-WorkSans-Regular'>
                <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '> Scientific Review (Synopsis)  </h1>
          {scientificData.answer1}
                <header className='bg-white shadow-sm my-5 p-10'>
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
                        <p className="mt-5 mb-2 w-full md:w-[50%] text-zeta  font-semibold ">
                            Name the beneficiary group clearly identified that will benefit from the information generated in your research
                        </p>
                        {scientificData.answer4}
                        <div className="relative w-full md:w-[50%]">
                            <div
                                className={` ${scientificData.answer4.length >= scientificData.answer4Limit ? 'text-red-600' : ''
                                    } border-stone-300 z-10 absolute right-4 top-1`}
                            >
                                {scientificData.answer4.length} / {scientificData.answer4Limit}
                            </div>
                            <textarea
                                name="answer4"
                                value={scientificData.answer4}
                                className="border rounded-md block py-5 bg-lightBackground border-stone-300 px-3 w-full outline-none"
                                rows="4"
                                cols="50"
                                maxLength={scientificData.answer4Limit}
                                placeholder="Add Details"
                                onChange={handleScientificDataChange}
                            ></textarea>
                        </div>
                    </section>
                    {/* Question-5 */}
                    <section className="mb-4 w-full md:w-[50%] ">
                        <p className="mt-5 mb-2  text-zeta  font-semibold md:">
                            Add literature review findings on this topic from most relevant articles (those closely matching with yours in terms of variables studied), share what information is already available with them, methodology used by researchers, and on which population it was studied and in how much past. Provide URL link to all studies mentioned.
                        </p>
                        <div className="relative w-full ">
                            <div
                                className={` ${scientificData.answer5.length >= scientificData.answer5Limit ? 'text-red-600' : ''
                                    } border-stone-300 z-10 absolute right-4 top-1 `}
                            >
                                {scientificData.answer5.length} / {scientificData.answer5Limit}
                            </div>
                            <textarea
                                name="answer5"
                                value={scientificData.answer5}
                                className="border rounded-md block py-5 bg-lightBackground border-stone-300 px-3 w-full outline-none"
                                rows="4"
                                cols="50"
                                maxLength={scientificData.answer5Limit}
                                placeholder="Add Details"
                                onChange={handleScientificDataChange}
                            ></textarea>
                        </div>
                    </section>
                    {/* Question-6 */}
                    <section className="mb-4 md:w-[50%]">
                        <p className="mt-5 mb-2 text-zeta  font-semibold ">
                            What information remained missing in other researches that you will cover in your project/ Research Gap found through literature review (evidence/ temporal/ methodology/ population gap)
                        </p>
                        <div className="relative w-full ">
                            <div
                                className={` ${scientificData.answer6.length >= scientificData.answer6Limit ? 'text-red-600' : ''
                                    } border-stone-300 z-10 absolute right-4 top-1 `}
                            >
                                {scientificData.answer6.length} / {scientificData.answer6Limit}
                            </div>
                            <textarea
                                name="answer6"
                                value={scientificData.answer6}
                                className="border rounded-md block py-5 bg-lightBackground border-stone-300 px-3 w-full outline-none"
                                rows="4"
                                cols="50"
                                maxLength={scientificData.answer6Limit}
                                placeholder="Add Details"
                                onChange={handleScientificDataChange}
                            ></textarea>
                        </div>
                    </section>
                    {/* Question-7 */}
                    <section className="mb-4 w-full md:w-[50%]">
                        <p className="mt-5 mb-2  text-zeta  font-semibold ">
                            Explain the rationale/ intended value of covering this research gap, detailing why the topic is of interest, benefit or relevance in your setting. Explain in your own words.
                        </p>
                        <div className="relative w-full ">
                            <div
                                className={` ${scientificData.answer7.length >= scientificData.answer7Limit ? 'text-red-600' : ''
                                    } border-stone-300 z-10 absolute right-4 top-1 `}
                            >
                                {scientificData.answer7.length} / {scientificData.answer7Limit}
                            </div>
                            <textarea
                                name="answer7"
                                value={scientificData.answer7}
                                onChange={handleScientificDataChange}
                                className="border rounded-md block py-5 bg-lightBackground border-stone-300 px-3 w-full outline-none"
                                rows="4"
                                cols="50"
                                maxLength={scientificData.answer7Limit}
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
                            name='researchObjectivesives'
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
                                name="answer10"
                                value={scientificData.answer10}
                                onChange={handleScientificDataChange}
                            ></textarea>
                        </div>
                    </section>
                    {/* Question-11 */}
                    <section className='md:w-[50%]'>
    <p className="mb-2 text-zeta font-semibold w-full md:w-[50%]">
        Study Design
    </p>
    <div className="border rounded-md block p-5">
        {[
            "Cross-sectional survey (information of a group recorded just once, without following-up on them)",
            "Prospective Cohort study (starting with 2 groups exposed and unexposed, and following-up for comparing their disease incidence)",
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
                    {scientificData.answer11 === 'Cross-sectional survey (information of a group recorded just once, without following-up on them)' && (
                         <section className='my-5 md:w-[50%]'>
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
                        scientificData.answer11 !== 'Cross-sectional survey (information of a group recorded just once, without following-up on them)'
                        && (
                            <section className='my-4 w-full md:w-[50%]'>
                                <label htmlFor="question13" className='text-zeta  font-semibold '>Sample Size</label>
                                <input
                                    value={answer13}
                                    name='question13'
                                    id='question13'
                                    onChange={(e) => { setAnswer13(e.target.value) }}
                                    className='border mt-2 rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none' type="text" placeholder='10%' />
                            </section>
                        )}
                    {/* Question-14 labels section */}
                    {scientificData.answer11 !== 'Cross-sectional survey (information of a group recorded just once, without following-up on them)' &&
                        scientificData.answer11 !== 'Estimating prevalence, and/or relating variables using test of significance (inferential analysis)'
                        &&
                        scientificData.answer11 !== 'Longitudinal study (follow-up of 1 group for disease incidence; descriptive)'
                        &&
                        scientificData.answer11 !== 'Qualitative study (detailed interviews)'
                        &&
                        scientificData.answer11 !== 'Case-control study (starting with 2 groups cases and controls, and recalling past history of exposures)'
                        &&
                        scientificData.answer11 !== 'Mixed-methods study (interviews for quality of variable AS WELL AS close ended questionnaire surveys for quantity of variable)'
                        &&
                        (
                            <section className="my-5 md:leading-[2rem] md:w-[50%] border rounded-md block p-5">
                                {
                                    (
                                        scientificData.answer11 !== 'Prospective Cohort study (starting with 2 groups exposed and unexposed, and following-up for comparing their disease incidence)'
                                        &&
                                        scientificData.answer11 !== 'Retrospective cohort study (Records of exposure already recorded in past, and study starts with finding disease outcome in 2 groups)'
                                        &&
                                        scientificData.answer11 !== 'Before-after comparison study for 1 group which undergoes an exposure.'
                                    )
                                    && (
                                        <div className="">
                                            For the case-control study, the sample size was calculated using an online OpenEpi sample size calculator. Keeping the ratio of controls to cases as
                                            <input
                                                className="outline-none my-1 px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                value={answer14a}
                                                onChange={(e) => setAnswer14a(e.target.value)}
                                            />
                                            , the proportion of controls with exposure as
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                value={answer14b}
                                                onChange={(e) => setAnswer14b(e.target.value)}
                                            />
                                            , both proportions reported by a researcher from article title and URL:
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                value={answer14c}
                                                onChange={(e) => setAnswer14c(e.target.value)}
                                            />
                                            , confidence limits as
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                value={answer14d}
                                                onChange={(e) => setAnswer14d(e.target.value)}
                                            />
                                            %, power of test
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                value={answer14e}
                                                onChange={(e) => setAnswer14e(e.target.value)}
                                            />
                                            , sample size came out to be
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                value={answer14f}
                                                onChange={(e) => setAnswer14f(e.target.value)}
                                            />
                                        </div>
                                    )}
                                {/* Question-15 labels section */}
                                {
                                    scientificData.answer11 !== 'Before-after comparison study for 1 group which undergoes an exposure.'
                                    && (
                                        <div className="md:my-10  my-3">
                                            For cohort study, sample size was calculated using online OpenEpi sample size calculator. Keeping ratio of Unexposed/Exposed as
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                value={answer15a}
                                                onChange={(e) => setAnswer15a(e.target.value)}
                                            />
                                            , Percent of Unexposed with Outcome as
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                value={answer15b}
                                                onChange={(e) => setAnswer15b(e.target.value)}
                                            />
                                            , and Percent of exposed with Outcome
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                value={answer15c}
                                                onChange={(e) => setAnswer15c(e.target.value)}
                                            />
                                            , both Percent values reported by a researcher from article title and URL:
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                value={answer15d}
                                                onChange={(e) => setAnswer15d(e.target.value)}
                                            />
                                            , confidence level as
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                value={answer15e}
                                                onChange={(e) => setAnswer15e(e.target.value)}
                                            />
                                            %, power of test
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                value={answer15f}
                                                onChange={(e) => setAnswer15f(e.target.value)}
                                            />
                                            , sample size came out to be
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                value={answer15g}
                                                onChange={(e) => setAnswer15g(e.target.value)}
                                            />
                                        </div>
                                    )}
                                {/* Question-16 labels section */}
                                {
                                    (
                                        scientificData.answer11 !== 'Prospective Cohort study (starting with 2 groups exposed and unexposed, and following-up for comparing their disease incidence)'
                                        &&
                                        scientificData.answer11 !== 'Retrospective cohort study (Records of exposure already recorded in past, and study starts with finding disease outcome in 2 groups)'
                                    )
                                    && (
                                        <div className="md:my-10  my-3">
                                            For before-after comparison study, sample size was calculated using online OpenEpi sample size calculator. Keeping Mean value for group 1 as
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                value={answer16a}
                                                onChange={(e) => setAnswer16a(e.target.value)}
                                            />
                                            , Mean value for group 2 as
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                value={answer16b}
                                                onChange={(e) => setAnswer16b(e.target.value)}
                                            />
                                            , SD value for group 1 as
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                value={answer16c}
                                                onChange={(e) => setAnswer16c(e.target.value)}
                                            />
                                            , SD for group 2 as
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                value={answer16d}
                                                onChange={(e) => setAnswer16d(e.target.value)}
                                            />
                                            , as reported by a researcher from article title and URL:
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                value={answer16e}
                                                onChange={(e) => setAnswer16e(e.target.value)}
                                            />
                                            , confidence level as
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                value={answer16f}
                                                onChange={(e) => setAnswer16f(e.target.value)}
                                            />
                                            %, power of test
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                value={answer16g}
                                                onChange={(e) => setAnswer16g(e.target.value)}
                                            />
                                            , sample size came out to be
                                            <input
                                                className="outline-none px-2 w-[150px] border-b text-epsilon border-epsilon"
                                                type="text"
                                                value={answer16g}
                                                onChange={(e) => setAnswer16g(e.target.value)}
                                            />
                                        </div>
                                    )}
                            </section>
                        )}
                    {/* Question-17 */}
                    {
                        (answer12 === 'Calculating frequencies in sample and other descriptive analysis only, no inferential analysis'
                            ||
                            scientificData.answer11 === 'Case-control study (starting with 2 groups cases and controls, and recalling past history of exposures)'
                            ||
                            scientificData.answer11 === 'Longitudinal study (follow-up of 1 group for disease incidence; descriptive)'
                            ||
                            scientificData.answer11 === 'Retrospective cohort study (Records of exposure already recorded in past, and study starts with finding disease outcome in 2 groups)'
                            ||
                            scientificData.answer11 === 'Before-after comparison study for 1 group which undergoes an exposure.'
                            ||
                            scientificData.answer11 === 'Qualitative study (detailed interviews)'
                            ||
                            scientificData.answer11 === 'Mixed-methods study (interviews for quality of variable AS WELL AS close ended questionnaire surveys for quantity of variable)'
                        )
                        &&
                        (
                            <section className=' my-5  md:w-[50%]'>
                                <p className="mb-2  text-zeta  font-semibold   w-full ">
                                    Non-Random Sampling Methods
                                </p>
                                <div className=" border rounded-md block p-5 ">
                                    <div className="mb-2">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                value="Including participants in study as per convenience in data collection and choosing whoever comes first/ met easily (Convenience sampling)"
                                                checked={answer17 === 'Including participants in study as per convenience in data collection and choosing whoever comes first/ met easily (Convenience sampling)'}
                                                onChange={handleOptionAnswer17}
                                                className="mr-2"
                                            />
                                            Including participants in study as per convenience in data collection and choosing whoever comes first/ met easily (Convenience sampling)
                                        </label>
                                    </div>
                                    <div className="mb-2">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                value="Including all participants fulfilling some judgmental criteria during a given time in the study setting for the purpose of reaching some desired results e.g. selecting more vocal participants (Purposive sampling)"
                                                checked={answer17 === 'Including all participants fulfilling some judgmental criteria during a given time in the study setting for the purpose of reaching some desired results e.g. selecting more vocal participants (Purposive sampling)'}
                                                onChange={handleOptionAnswer17}
                                                className="mr-2"
                                            />
                                            Including all participants fulfilling some judgmental criteria during a given time in the study setting for the purpose of reaching some desired results e.g. selecting more vocal participants (Purposive sampling)
                                        </label>
                                    </div>
                                    <div className="mb-2">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                value="Approaching one participant fulfilling criteria and then asking them to help approach more such participants fulfilling criteria (Snow ball sampling; required in marginalized/ stigmatized/ hidden communities)"
                                                checked={answer17 === 'Approaching one participant fulfilling criteria and then asking them to help approach more such participants fulfilling criteria (Snow ball sampling; required in marginalized/ stigmatized/ hidden communities)'}
                                                onChange={handleOptionAnswer17}
                                                className="mr-2"
                                            />
                                            Approaching one participant fulfilling criteria and then asking them to help approach more such participants fulfilling criteria (Snow ball sampling; required in marginalized/ stigmatized/ hidden communities)
                                        </label>
                                    </div>
                                </div>
                            </section>
                        )}
                    {/* Question-18 */}
                    {
                        (
                            answer12 === 'Estimating prevalence, and/or relating variables using test of significance (inferential analysis)' ||
                            scientificData.answer11 === 'Cross-sectional survey (information of a group recorded just once without following-up on them)' ||
                            scientificData.answer11 === 'Prospective Cohort study (starting with 2 groups exposed and unexposed, and following-up for comparing their disease incidence)' ||
                            scientificData.answer11 === 'Case-control study (starting with 2 groups cases and controls, and recalling past history of exposures)'
                            ||
                            scientificData.answer11 === 'Longitudinal study (follow-up of 1 group for disease incidence; descriptive)'
                            ||
                            scientificData.answer11 === 'Retrospective cohort study (Records of exposure already recorded in past, and study starts with finding disease outcome in 2 groups)')
                        ||
                        scientificData.answer11 === 'Before-after comparison study for 1 group which undergoes an exposure.'
                        ||
                        scientificData.answer11 === 'Mixed-methods study (interviews for quality of variable AS WELL AS close ended questionnaire surveys for quantity of variable)'
                        &&
                        (
                            <section className='md:my-10 my-5  md:w-[50%]'>
                                <p className="mb-2  text-zeta  font-semibold   w-full ">
                                    Random Sampling Methods
                                </p>
                                <div className=" border rounded-md block p-5 ">
                                    <div className="mb-2">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                value="Including participants by collecting population list, assigning numbers to individuals and picking numbers by lottery method/ table of random numbers to include individuals in sample (Simple Random Sampling)"
                                                checked={answer18 === 'Including participants by collecting population list, assigning numbers to individuals and picking numbers by lottery method/ table of random numbers to include individuals in sample (Simple Random Sampling)'}
                                                onChange={handleOptionAnswer18}
                                                className="mr-2"
                                            />
                                            Including participants by collecting population list, assigning numbers to individuals and picking numbers by lottery method/ table of random numbers to include individuals in sample (Simple Random Sampling)
                                        </label>
                                    </div>
                                    <div className="mb-2">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                value="Selecting every nth number fulfilling criteria, from population list (Systematic Random Sampling)."
                                                checked={answer18 === 'Selecting every nth number fulfilling criteria, from population list (Systematic Random Sampling).'}
                                                onChange={handleOptionAnswer18}
                                                className="mr-2"
                                            />
                                            Selecting every nth number fulfilling criteria, from population list (Systematic Random Sampling).
                                        </label>
                                    </div>
                                    <div className="mb-2">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                value="Dividing population in strata/ groups and selecting individuals in all groups by simple random or systematic random method (Stratified Random Sampling)"
                                                checked={answer18 === 'Dividing population in strata/ groups and selecting individuals in all groups by simple random or systematic random method (Stratified Random Sampling)'}
                                                onChange={handleOptionAnswer18}
                                                className="mr-2"
                                            />
                                            Dividing population in strata/ groups and selecting individuals in all groups by simple random or systematic random method (Stratified Random Sampling)
                                        </label>
                                    </div>
                                    <div className="mb-2">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                value="Dividing population in clusters, and then selecting individuals further using other random method (Cluster sampling)"
                                                checked={answer18 === 'Dividing population in clusters, and then selecting individuals further using other random method (Cluster sampling)'}
                                                onChange={handleOptionAnswer18}
                                                className="mr-2"
                                            />
                                            Dividing population in clusters, and then selecting individuals further using other random method (Cluster sampling)
                                        </label>
                                    </div>
                                </div>
                            </section>
                        )}
                    {/* question-19 */}
                    {scientificData.answer11 !== 'Mixed-methods study (interviews for quality of variable AS WELL AS close ended questionnaire surveys for quantity of variable)' &&
                        (
                            <section className="mb-4">
                                <p className="mt-5 mb-2  text-zeta  font-semibold  w-full md:w-[50%]">
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
                    {scientificData.answer11 !== 'Cross-sectional survey (information of a group recorded just once, without following-up on them)' &&
                        scientificData.answer11 !== 'Prospective Cohort study (starting with 2 groups exposed and unexposed, and following-up for comparing their disease incidence)'
                        &&
                        scientificData.answer11 !== 'Case-control study (starting with 2 groups cases and controls, and recalling past history of exposures)'
                        &&
                        scientificData.answer11 !== 'Retrospective cohort study (Records of exposure already recorded in past, and study starts with finding disease outcome in 2 groups)'
                        &&
                        scientificData.answer11 !== 'Longitudinal study (follow-up of 1 group for disease incidence; descriptive)'
                        &&
                        scientificData.answer11 !== 'Before-after comparison study for 1 group which undergoes an exposure.'
                        &&
                        (
                            <section className="mb-4">
                                <p className="mt-5 mb-2  text-zeta font-semibold   w-full md:w-[50%]">
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
                    <section className='mb-4 md:w-[50%]'>
                        <label htmlFor="answer21" className='text-zeta  font-semibold'>Place/s for data collection (give all available details including organization/ forum name, location, city, country etc.) </label>
                        <div className='w-full mt-2 '>
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
                            Data collection procedures and tools *
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
                        <p className='text-zeta  font-semibold '>Proforma/ Questionnaire * </p>
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
    className="w-0" // Hidden input field
/>
                        </label>
                        <section className='mb-4'>
                            <label
                            htmlFor='onlineQuestionnaires'
                            className='text-zeta '>For online questionnaires/ google forms, share link    </label>
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
                    <button className="mt-6 px-8 py-3 rounded-md group relative overflow-hidden bg-epsilon text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon">
                        <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                        Save
                    </button>
                </header>
            </div>
        </>
    )
}
