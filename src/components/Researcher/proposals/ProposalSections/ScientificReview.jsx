import { React, useState } from 'react'
import { BsFillCloudUploadFill } from "react-icons/bs"
export default function ScientificReview() {
    //Question-2 Start date..
    const [answer2, setAnswer2] = useState('');
    //Question-3 End Date...
    const [answer3, setAnswer3] = useState('');
    //Question: 4  Name the beneficiary group...
    const [answer4, setAnswer4] = useState('');
    const questionFourLimit = 250;
    const [remainingAnswer4, setRemainingAnswer4] = useState(questionFourLimit);
    const questionFourChange = (event) => {
        const newText = event.target.value;
        setAnswer4(newText);
        setRemainingAnswer4(questionFourLimit - newText.length);
    };
    // Question-5 Add literature review ..
    const [answer5, setAnswer5] = useState('');
    const questionFiveLimit = 800;
    const [remainingAnswer5, setRemainingAnswer5] = useState(questionFiveLimit);
    const questionFiveChange = (event) => {
        const newText = event.target.value;
        setAnswer5(newText);
        setRemainingAnswer5(questionFiveLimit - newText.length);
    };
    // Question-6 What Information Remain ..
    const [answer6, setAnswer6] = useState('');
    const questionSixLimit = 100;
    const [remainingAnswer6, setRemainingAnswer6] = useState(questionSixLimit);
    const questionSixChange = (event) => {
        const newText = event.target.value;
        setAnswer6(newText);
        setRemainingAnswer6(questionSixLimit - newText.length);
    };
    // Question-7 Explain Rationale ..
    const [answer7, setAnswer7] = useState('');
    const questionSevenLimit = 100;
    const [remainingAnswer7, setRemainingAnswer7] = useState(questionSevenLimit);
    const questionSevenChange = (event) => {
        const newText = event.target.value;
        setAnswer7(newText);
        setRemainingAnswer7(questionSevenLimit - newText.length);
    };
    // Question-8 Objective..
    const [answer8, setAnswer8] = useState('')
    // Question-9 Main Varaible..
    const [answer9, setAnswer9] = useState('')
    // Question-10 Main Varaible..
    const [answer10, setAnswer10] = useState('')
    // Question-11 Study Design..
    const [answer11, setAnswer11] = useState('')
    const handleOptionAnswer11 = (e) => {
        setAnswer11(e.target.value);
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
    // Question-17 NonRandom Sampling Methods..
    const [answer17, setAnswer17] = useState('');
    const handleOptionAnswer17 = (e) => {
        setAnswer17(e.target.value);
    };
    // Question-18  Random Sampling Methods..
    const [answer18, setAnswer18] = useState('');
    const handleOptionAnswer18 = (e) => {
        setAnswer18(e.target.value);
    };
    const [answer19, setAnswer19] = useState('');
    const [answer20, setAnswer20] = useState('');
    const [answer21, setAnswer21] = useState('');
    const [answer22, setAnswer22] = useState('');
    const [performa, setPerforma] = useState('')
    return (
        <>
            <div className='font-WorkSans-Regular'>
                <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '> Scientific Review (Synopsis)  </h1>
                <header className='bg-white shadow-sm my-5 p-10'>
                    <section className='mb-4 w-full md:w-[50%] '>
                        <label htmlFor="supervisor-name" className='text-zeta  font-semibold '>Supervisor </label>
                        <input
                            type='text'
                            name='supervisor-name'
                            id='supervisor-name'
                            className='border mt-2 rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none' placeholder='Backend Value of group supervisor' />
                    </section>
                    <section className='mb-4 w-full md:w-[50%] '>
                        <label htmlFor="supervisor-name" className='text-zeta  font-semibold '>Applicant Name </label>
                        <input
                            type='text'
                            name='applicant-name'
                            id='applicant-name'
                            className='mt-2 border rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none' placeholder='Backend Value of group lead' />
                    </section>
                    <section className='mb-4 w-full md:w-[50%] '>
                        <label htmlFor="research-title" className='text-zeta  font-semibold '>Research Title</label>
                        <input
                            value={'Backend'}
                            type='text'
                            name='research-title'
                            id='research-title'
                            onChange={(e) => { setResearchTitle(e.target.value) }}
                            className=' mt-2 border rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none' />
                    </section>
                    {/* Question-2 */}
                    <section className='mb-4 w-full md:w-[50%] '>
                        <label htmlFor="start-date" className='text-zeta  font-semibold '>Start Date of Data Collection (as planned) </label>
                        <input
                            type='date'
                            name='start-date'
                            id='start-date'
                            onChange={(e) => { setAnswer2(e.target.value) }}
                            className='mt-2 border rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none' />
                    </section>
                    {/* Question-3 */}
                    <section className='mb-4 w-full md:w-[50%]'>
                        <label htmlFor="end-date" className='text-zeta  font-semibold '>End Date of Data Collection (expected) </label>
                        <input
                            onChange={(e) => { setAnswer3(e.target.value) }}
                            type='date'
                            name='end-date'
                            id='end-date'
                            className='border  mt-2 rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none' />
                    </section>
                    {/* Question-4*/}
                    <section className="mb-4">
                        <p className="mt-5 mb-2 w-full md:w-[50%] text-zeta  font-semibold ">
                            Name the beneficiary group clearly identified that will benefit from the information generated in your research
                        </p>
                        <div className="relative w-full md:w-[50%] ">
                            <div className={` ${remainingAnswer4 < 10 && ('text-red-600')} absolute right-4 top-1`}>
                                {remainingAnswer4} /{questionFourLimit}
                            </div>
                            <textarea
                                value={answer4}
                                className="border rounded-md block pt-8 pb-[0.67rem] bg-lightBackground border-stone-300 px-3 w-full outline-none"
                                rows="4"
                                cols="50"
                                maxLength={questionFourLimit}
                                placeholder="Add Details"
                                onChange={questionFourChange}
                            ></textarea>
                        </div>
                    </section>
                    {/* Question-5 */}
                    <section className="mb-4 w-full md:w-[50%] ">
                        <p className="mt-5 mb-2  text-zeta  font-semibold md:">
                            Add literature review findings on this topic from most relevant articles (those closely matching with yours in terms of variables studied), share what information is already available with them, methodology used by researchers, and on which population it was studied and in how much past. Provide URL link to all studies mentioned.
                        </p>
                        <div className="relative">
                            <div className={` ${remainingAnswer5 < 10 && ('text-red-600')} absolute right-4 top-1`}>
                                {remainingAnswer5} /{questionFiveLimit}
                            </div>
                            <textarea
                                value={answer5}
                                className="border rounded-md block pt-8 pb-[0.67rem] bg-lightBackground border-stone-300 px-3 w-full outline-none"
                                rows="4"
                                cols="50"
                                maxLength={questionFiveLimit}
                                placeholder="Add Details"
                                onChange={questionFiveChange}
                            ></textarea>
                        </div>
                    </section>
                    {/* Question-6 */}
                    <section className="mb-4 md:w-[50%]">
                        <p className="mt-5 mb-2 text-zeta  font-semibold ">
                            What information remained missing in other researches that you will cover in your project/ Research Gap found through literature review (evidence/ temporal/ methodology/ population gap)
                        </p>
                        <div className="relative ">
                            <div className={` ${remainingAnswer6 < 10 && ('text-red-600')} absolute right-4 top-1`}>
                                {remainingAnswer6} /{questionSixLimit}
                            </div>
                            <textarea
                                value={answer6}
                                className="border rounded-md block pt-8 pb-[0.67rem] bg-lightBackground border-stone-300 px-3 w-full outline-none"
                                rows="4"
                                cols="50"
                                maxLength={questionSixLimit}
                                placeholder="Add Details"
                                onChange={questionSixChange}
                            ></textarea>
                        </div>
                    </section>
                    {/* Question-7 */}
                    <section className="mb-4 w-full md:w-[50%]">
                        <p className="mt-5 mb-2  text-zeta  font-semibold ">
                            Explain the rationale/ intended value of covering this research gap, detailing why the topic is of interest, benefit or relevance in your setting. Explain in your own words.
                        </p>
                        <div className="relative ">
                            <div className={` ${remainingAnswer7 < 10 && ('text-red-600')} absolute right-4 top-1`}>
                                {remainingAnswer7} /{questionSevenLimit}
                            </div>
                            <textarea
                                value={answer7}
                                className="border rounded-md block pt-8 pb-[0.67rem] bg-lightBackground border-stone-300 px-3 w-full outline-none"
                                rows="4"
                                cols="50"
                                maxLength={questionSevenLimit}
                                placeholder="Add Details"
                                onChange={questionSevenChange}
                            ></textarea>
                        </div>
                    </section>
                    {/* Question-8 */}
                    <section className='mb-4 w-full md:w-[50%] '>
                        <label className='text-zeta  font-semibold md:' htmlFor="research-objectives   ">Objectives of Research</label>
                        <input
                            value={answer8}
                            name='research-objectives'
                            id='research-objectives'
                            onChange={(e) => { setAnswer8(e.target.value) }}
                            className='mt-2 border rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none' type="text" placeholder='Purpose Map' />
                    </section>
                    {/* Question-9 */}
                    <section className='mb-4 w-full md:w-[50%] '>
                        <label htmlFor="question9" className='text-zeta  font-semibold '>Main Variable under Study</label>
                        <input
                            value={answer9}
                            name='question9'
                            id='question9'
                            onChange={(e) => { setAnswer9(e.target.value) }}
                            className='mt-2 border rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none' type="text" placeholder='Virus' />
                    </section>
                    {/* question-10 */}
                    <section className="mb-4">
                        <p className="mt-5 mb-2  text-zeta  font-semibold   w-full md:w-[50%]">
                            Operational Definition of Variable
                        </p>
                        <div className="w-full md:w-[50%] ">
                            <textarea
                                value={answer10}
                                className="border rounded-md block p-5 bg-lightBackground border-stone-300 px-3 w-full outline-none"
                                rows="4"
                                cols="50"
                                placeholder="Add Definition"
                                onChange={(e) => { setAnswer10(e.target.value) }}
                            ></textarea>
                        </div>
                    </section>
                    {/* Question-11 */}
                    <section className='  md:w-[50%] '>
                        <p className="mb-2  text-zeta  font-semibold   w-full md:w-[50%]">
                            Study Design
                        </p>
                        <div className="border rounded-md block p-5 ">
                            <div className="mb-2">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="Cross-sectional survey (information of a group recorded just once, without following-up on them)"
                                        checked={answer11 === 'Cross-sectional survey (information of a group recorded just once, without following-up on them)'}
                                        onChange={handleOptionAnswer11}
                                        className="mr-2"
                                    />
                                    Cross-sectional survey (information of a group recorded just once without following-up on them)
                                </label>
                            </div>
                            <div className="mb-2">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="Prospective Cohort study (starting with 2 groups exposed and unexposed, and following-up for comparing their disease incidence)"
                                        checked={answer11 === 'Prospective Cohort study (starting with 2 groups exposed and unexposed, and following-up for comparing their disease incidence)'}
                                        onChange={handleOptionAnswer11}
                                        className="mr-2"
                                    />
                                    Prospective Cohort study (starting with 2 groups exposed and unexposed, and following-up for comparing their disease incidence)
                                </label>
                            </div>
                            <div className="mb-2">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="Case-control study (starting with 2 groups cases and controls, and recalling past history of exposures)"
                                        checked={answer11 === 'Case-control study (starting with 2 groups cases and controls, and recalling past history of exposures)'}
                                        onChange={handleOptionAnswer11}
                                        className="mr-2"
                                    />
                                    Case-control study (starting with 2 groups cases and controls, and recalling past history of exposures)
                                </label>
                            </div>
                            <div className="mb-2">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="Retrospective cohort study (Records of exposure already recorded in past, and study starts with finding disease outcome in 2 groups)"
                                        checked={answer11 === 'Retrospective cohort study (Records of exposure already recorded in past, and study starts with finding disease outcome in 2 groups)'}
                                        onChange={handleOptionAnswer11}
                                        className="mr-2"
                                    />
                                    Retrospective cohort study (Records of exposure already recorded in past, and study starts with finding disease outcome in 2 groups)
                                </label>
                            </div>
                            <div className="mb-2">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="Longitudinal study (follow-up of 1 group for disease incidence; descriptive)"
                                        checked={answer11 === 'Longitudinal study (follow-up of 1 group for disease incidence; descriptive)'}
                                        onChange={handleOptionAnswer11}
                                        className="mr-2"
                                    />
                                    Longitudinal study (follow-up of 1 group for disease incidence; descriptive)
                                </label>
                            </div>
                            <div className="mb-2">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="Before-after comparison study for 1 group which undergoes an exposure."
                                        checked={answer11 === 'Before-after comparison study for 1 group which undergoes an exposure.'}
                                        onChange={handleOptionAnswer11}
                                        className="mr-2"
                                    />
                                    Before-after comparison study for 1 group which undergoes an exposure
                                </label>
                            </div>
                            <div className="mb-2">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="Qualitative study (detailed interviews)"
                                        checked={answer11 === 'Qualitative study (detailed interviews)'}
                                        onChange={handleOptionAnswer11}
                                        className="mr-2"
                                    />
                                    Qualitative study (detailed interviews)
                                </label>
                            </div>
                            <div className="mb-2">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="Mixed-methods study (interviews for quality of variable AS WELL AS close ended questionnaire surveys for quantity of variable)"
                                        checked={answer11 === 'Mixed-methods study (interviews for quality of variable AS WELL AS close ended questionnaire surveys for quantity of variable)'}
                                        onChange={handleOptionAnswer11}
                                        className="mr-2"
                                    />
                                    Mixed-methods study (Interviews for quality of variable AS WELL AS close ended questionnaire surveys for quantity of variable)
                                </label>
                            </div>
                        </div>
                    </section>
                    {/* Question-12 */}
                    {answer11 === 'Cross-sectional survey (information of a group recorded just once, without following-up on them)'   && (
<section className=' my-5  md:w-[50%]'>
<p className="mb-2  text-zeta  font-semibold   w-full md:w-[50%]">
    Type of Analysis
</p>
<div className=" border rounded-md block p-5 ">
    <div className="mb-2">
        <label className="flex items-center">
            <input
                type="radio"
                value="Estimating prevalence, and/or relating variables using test of significance (inferential analysis)"
                checked={answer12 === 'Estimating prevalence, and/or relating variables using test of significance (inferential analysis)'}
                onChange={handleOptionAnswer12}
                className="mr-2"
            />
            Estimating prevalence, and/or relating variables using test of significance (inferential analysis)
        </label>
    </div>
    <div className="mb-2">
        <label className="flex items-center">
            <input
                type="radio"
                value="Calculating frequencies in sample and other descriptive analysis only, no inferential analysis"
                checked={answer12 === 'Calculating frequencies in sample and other descriptive analysis only, no inferential analysis'}
                onChange={handleOptionAnswer12}
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
                    
                    answer11 !== 'Cross-sectional survey (information of a group recorded just once, without following-up on them)'  

                   
                     
                    
                    
                    
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
                    {answer11 !== 'Cross-sectional survey (information of a group recorded just once, without following-up on them)' &&
answer11 !== 'Estimating prevalence, and/or relating variables using test of significance (inferential analysis)' 
 




&&



answer11 !== 'Longitudinal study (follow-up of 1 group for disease incidence; descriptive)'

            

                &&
                 answer11!=='Qualitative study (detailed interviews)'
                 &&
                    answer11 !== 'Case-control study (starting with 2 groups cases and controls, and recalling past history of exposures)' 


                    &&
  answer11!=='Mixed-methods study (interviews for quality of variable AS WELL AS close ended questionnaire surveys for quantity of variable)'
                    && 
                    
                    (
                    <section className="my-5 md:leading-[2rem] md:w-[50%] border rounded-md block p-5">
                       {
                       
                      ( 
                       answer11 !== 'Prospective Cohort study (starting with 2 groups exposed and unexposed, and following-up for comparing their disease incidence)'  
                       &&

                       answer11 !== 'Retrospective cohort study (Records of exposure already recorded in past, and study starts with finding disease outcome in 2 groups)'
                       

                       &&
 answer11 !=='Before-after comparison study for 1 group which undergoes an exposure.'

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
   
 answer11 !=='Before-after comparison study for 1 group which undergoes an exposure.' 

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
                            answer11 !== 'Prospective Cohort study (starting with 2 groups exposed and unexposed, and following-up for comparing their disease incidence)'  
                            &&
     
                            answer11 !== 'Retrospective cohort study (Records of exposure already recorded in past, and study starts with finding disease outcome in 2 groups)'
                            
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
        answer11 === 'Case-control study (starting with 2 groups cases and controls, and recalling past history of exposures)'

        ||
          answer11 === 'Longitudinal study (follow-up of 1 group for disease incidence; descriptive)'
||
        answer11==='Retrospective cohort study (Records of exposure already recorded in past, and study starts with finding disease outcome in 2 groups)'


        ||
        answer11 ==='Before-after comparison study for 1 group which undergoes an exposure.'

        ||
        answer11==='Qualitative study (detailed interviews)'
        ||
        answer11==='Mixed-methods study (interviews for quality of variable AS WELL AS close ended questionnaire surveys for quantity of variable)'
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

     answer11==='Cross-sectional survey (information of a group recorded just once without following-up on them)' ||
     

     answer11==='Prospective Cohort study (starting with 2 groups exposed and unexposed, and following-up for comparing their disease incidence)' ||
      answer11 === 'Case-control study (starting with 2 groups cases and controls, and recalling past history of exposures)'
    
||


    answer11 === 'Longitudinal study (follow-up of 1 group for disease incidence; descriptive)'
    ||
    answer11==='Retrospective cohort study (Records of exposure already recorded in past, and study starts with finding disease outcome in 2 groups)') 
      
  ||
        answer11 ==='Before-after comparison study for 1 group which undergoes an exposure.'
    
      ||
        answer11==='Mixed-methods study (interviews for quality of variable AS WELL AS close ended questionnaire surveys for quantity of variable)'
      
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

                    { answer11 !== 'Mixed-methods study (interviews for quality of variable AS WELL AS close ended questionnaire surveys for quantity of variable)' &&
                    (
                    <section className="mb-4">
                        <p className="mt-5 mb-2  text-zeta  font-semibold  w-full md:w-[50%]">
                            Sample inclusion exclusion criteria and sampling technique in detail for quantitative research 
                        </p>
                        <div className="w-full md:w-[50%] ">
                            <textarea
                                value={answer19}
                                className="border rounded-md block p-5 bg-lightBackground border-stone-300 px-3 w-full outline-none"
                                rows="4"
                                cols="50"
                                placeholder="Add Definition"
                                onChange={(e) => { setAnswer19(e.target.value) }}
                            ></textarea>
                        </div>
                    </section> )}
                    {/* question-20*/}
                    {answer11 !== 'Cross-sectional survey (information of a group recorded just once, without following-up on them)'   &&
                    answer11 !== 'Prospective Cohort study (starting with 2 groups exposed and unexposed, and following-up for comparing their disease incidence)'   
                    &&



                        answer11 !== 'Case-control study (starting with 2 groups cases and controls, and recalling past history of exposures)'
                        &&

                    answer11 !== 'Retrospective cohort study (Records of exposure already recorded in past, and study starts with finding disease outcome in 2 groups)'

                    &&
                    answer11 !== 'Longitudinal study (follow-up of 1 group for disease incidence; descriptive)'

&&
answer11 !== 'Before-after comparison study for 1 group which undergoes an exposure.'
                     
                    &&
                    (
                    <section className="mb-4">
                        <p className="mt-5 mb-2  text-zeta font-semibold   w-full md:w-[50%]">
                            Sample inclusion-exclusion criteria and sampling methods in detail for interviews
                        </p>
                        <div className="w-full md:w-[50%] ">
                            <textarea
                                value={answer20}
                                className="border rounded-md block p-5 bg-lightBackground border-stone-300 px-3 w-full outline-none"
                                rows="4"
                                cols="50"
                                placeholder="Add Definition"
                                onChange={(e) => { setAnswer20(e.target.value) }}
                            ></textarea>
                        </div>
                    </section>)}
                    {/*  Question-21*/}
                    <section className='mb-4 md:w-[50%]'>
                        <label htmlFor="answer-21" className='text-zeta  font-semibold'>Place/s for data collection (give all available details including organization/ forum name, location, city, country etc.) </label>
                        <div className='w-full mt-2 '>
                            <input
                                type='text'
                                name='answer-21'
                                value={answer21}
                                onChange={(e) => { setAnswer21(e.target.value) }}
                                id='answer-21'
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
                                value={answer22}
                                className="border rounded-md block p-5 bg-lightBackground border-stone-300 px-3 w-full outline-none"
                                rows="4"
                                cols="50"
                                placeholder="Add Definition"
                                onChange={(e) => { setAnswer22(e.target.value) }}
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
                                onChange={(e) => { setPerforma(e.target.value) }}
                                name='performa'
                                id='performa' className='w-0' type="file"
                            />
                        </label>
                        <section className='mb-4'>
                            <label className='text-zeta '>For online questionnaires/ google forms, share link  *  </label>
                            <div className='w-full  '>
                                <input
                                    onChange={(e) => { setPerforma(e.target.value) }}
                                    type='text'
                                    value={performa}
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
