// EthicalReview.js
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Table1 from '../EthicalReviewTables.jsx/Table1.jsx';
import Table2 from '../EthicalReviewTables.jsx/Table2.jsx';
import Table3 from '../EthicalReviewTables.jsx/Table3.jsx';
import Table4 from './../EthicalReviewTables.jsx/Table4';
import Table5 from '../EthicalReviewTables.jsx/Table5.jsx';
import Table6 from '../EthicalReviewTables.jsx/Table6.jsx';
export default function EthicalReview({ ethicalData, updateState, risk, onSubmit, sectionAssigned }) {
f
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
                return !sectionAssigned.includes('ethicalReview');
            }
            return false;
        };
        if (sectionAssigned.includes('ethicalReview')) {
            setAssigned(true)
        }
        const checkBtn = isValidRole(signUserRole, sectionAssigned);
        setIsButtonEnabled(checkBtn);
    }, [signUserRole, sectionAssigned]);
    return (
        <div className='WorkSans-Regular'>
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'>Ethical Review</h1>
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
                <Table1
                    table1answers={ethicalData.table1Answers}
                    question1={ethicalData.question1}
                    table1InnerScore={ethicalData.table1InnerScore}
                    handleTable1AnswerChange={(e, id) => updateState({
                        table1Answers: { ...ethicalData.table1Answers, [id]: e.target.value }
                    })}
                    onAnswer1Change={(e) => updateState({ question1: e.target.value })}
                />
                <Table2
                    table2Answers={ethicalData.table2Answers}
                    handleTable2AnswerChange={(e, id) => updateState({
                        table2Answers: { ...ethicalData.table2Answers, [id]: e.target.value }
                    })}
                />
                <Table3
                    table3Answers={ethicalData.table3Answers}
                    handleTable3AnswerChange={(e, id) => updateState({
                        table3Answers: { ...ethicalData.table3Answers, [id]: e.target.value }
                    })}
                />
                {(
                    ethicalData.table3Answers.table3a === "Yes" ||
                    ethicalData.table3Answers.table3b === "Yes" ||
                    ethicalData.table3Answers.table3c === "Yes" ||
                    ethicalData.table3Answers.table3d === "Yes" ||
                    ethicalData.table3Answers.table3e === "Yes" ||
                    ethicalData.table3Answers.table3f === "Yes" ||
                    ethicalData.table3Answers.table3g === "Yes"
                ) && (
                        <>
                            <Table4
                                table4Answers={ethicalData.table4Answers}
                                question2={ethicalData.question2}
                                question3={ethicalData.question3}
                                onAnswerChange={(e, id) => updateState({
                                    table4Answers: { ...ethicalData.table4Answers, [id]: e.target.value }
                                })}
                                onQuestion2Change={(e) => updateState({ question2: e.target.value })}
                                onQuestion3Change={(e) => updateState({ question3: e.target.value })}
                            />
                        </>)}
                <Table5
                    table5Answers={ethicalData.table5Answers}
                    onAnswerChange={(e, id) => updateState({
                        table5Answers: { ...ethicalData.table5Answers, [id]: e.target.value }
                    })}
                />
                <Table6
                    answers={ethicalData.table6Answers}
                    onAnswerChange={(id, selectedValue) => updateState({
                        table6Answers: { ...ethicalData.table6Answers, [id]: selectedValue }
                    })}
                />
                <section className='mb-4 w-full md:w-[50%] '>
                    <label htmlFor="ethicalRisk" className='text-zeta font-semibold '>ERC Risk Score Total</label>
                    <input
                        type='text'
                        name='ethicalRisk'
                        onChange={(e) => updateState({ ethicalRisk: e.target.value })}
                        value={ethicalData.ethicalRisk}
                        id='Ethical-Risk'
                        className='border mt-2 rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none'
                        readOnly
                    />
                </section>
                <section className='my-5 md:w-[80%]'>
                    <p className="mb-2 text-zeta font-semibold">
                        What level of confidentiality is provided to maintain privacy of patient information?
                    </p>
                    <div className="border rounded-md block p-5">
                        {/* option */}
                        <div className="mb-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="Anonymous data collection (no patients IDs collected); highest level of confidentiality"
                                    name='question4'
                                    checked={ethicalData.question4 === 'Anonymous data collection (no patients IDs collected); highest level of confidentiality'}
                                    onChange={(e) => updateState({ question4: e.target.value })}
                                    className="mr-2"
                                />
                                Anonymous data collection (no patients IDs collected); highest level of confidentiality
                            </label>
                        </div>
                        {/* option */}
                        <div className="mb-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="Anonymized data (removing direct identifiers after data collection irreversibly) without keeping a list of codes"
                                    name='question4'
                                    checked={ethicalData.question4 === 'Anonymized data (removing direct identifiers after data collection irreversibly) without keeping a list of codes'}
                                    onChange={(e) => updateState({ question4: e.target.value })}
                                    className="mr-2"
                                />
                                Anonymized data (removing direct identifiers after data collection irreversibly) without keeping a list of codes
                            </label>
                        </div>
                        {/* option */}
                        <div className="mb-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="Coding (converting patient IDs into codes after data collection) in data entry"
                                    name='question4'
                                    checked={ethicalData.question4 === 'Coding (converting patient IDs into codes after data collection) in data entry'}
                                    onChange={(e) => updateState({ question4: e.target.value })}
                                    className="mr-2"
                                />
                                Coding (converting patient IDs into codes after data collection) in data entry
                            </label>
                        </div>
                        {/* option */}
                        <div className="mb-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="Indirectly identifying information (date of birth, place of residence) but ensuring not to combine indirect identifiers to identify someone later"
                                    name='question4'
                                    checked={ethicalData.question4 === 'Indirectly identifying information (date of birth, place of residence) but ensuring not to combine indirect identifiers to identify someone later'}
                                    onChange={(e) => updateState({ question4: e.target.value })}
                                    className="mr-2"
                                />
                                Indirectly identifying information (date of birth, place of residence) but ensuring not to combine indirect identifiers to identify someone later
                            </label>
                        </div>
                        {/* option */}
                        <div className="mb-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="Collecting directly identifying information (name, NIC, registration number, or hospital IDs, for studies that maybe requiring follow up for further inquiry sometimes) but without including personal data in analysis and publishing"
                                    name='question4'
                                    checked={ethicalData.question4 === 'Collecting directly identifying information (name, NIC, registration number, or hospital IDs, for studies that maybe requiring follow up for further inquiry sometimes) but without including personal data in analysis and publishing'}
                                    onChange={(e) => updateState({ question4: e.target.value })}
                                    className="mr-2"
                                />
                                Collecting directly identifying information (name, NIC, registration number, or hospital IDs, for studies that maybe requiring follow up for further inquiry sometimes) but without including personal data in analysis and publishing
                            </label>
                        </div>
                    </div>
                </section>
                <section className='my-5 md:w-[80%]'>
                    <p className="mb-2 text-zeta font-semibold">
                        What steps will you take to ensure security of data?
                    </p>
                    <div className="border rounded-md block p-5">
                        {/* option */}
                        <div className="mb-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="Secure passwords"
                                    name='question5'
                                    checked={ethicalData.question5 === 'Secure passwords'}
                                    onChange={(e) => updateState({ question5: e.target.value })}
                                    className="mr-2"
                                />
                                Secure passwords
                            </label>
                        </div>
                        {/* option */}
                        <div className="mb-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="Password protected computers"
                                    name='question5'
                                    checked={ethicalData.question5 === 'Password protected computers'}
                                    onChange={(e) => updateState({ question5: e.target.value })}
                                    className="mr-2"
                                />
                                Password protected computers
                            </label>
                        </div>
                        {/* option */}
                        <div className="mb-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="Password protected files"
                                    name='question5'
                                    checked={ethicalData.question5 === 'Password protected files'}
                                    onChange={(e) => updateState({ question5: e.target.value })}
                                    className="mr-2"
                                />
                                Password protected files
                            </label>
                        </div>
                        {/* option */}
                        <div className="mb-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="Data encryption"
                                    name='question5'
                                    checked={ethicalData.question5 === 'Data encryption'}
                                    onChange={(e) => updateState({ question5: e.target.value })}
                                    className="mr-2"
                                />
                                Data encryption
                            </label>
                        </div>
                        {/* option */}
                        <div className="mb-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="Automatic log off computers"
                                    name='question5'
                                    checked={ethicalData.question5 === 'Automatic log off computers'}
                                    onChange={(e) => updateState({ question5: e.target.value })}
                                    className="mr-2"
                                />
                                Automatic log off computers
                            </label>
                        </div>
                        {/* option */}
                        <div className="mb-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="None"
                                    name='question5'
                                    checked={ethicalData.question5 === 'None'}
                                    onChange={(e) => updateState({ question5: e.target.value })}
                                    className="mr-2"
                                />
                                None
                            </label>
                        </div>
                    </div>
                </section>
                <section className='mb-4 w-full md:w-[50%] '>
                    <label htmlFor="research-title" className='text-zeta font-semibold '>Benefit Score</label>
                    <input
                        value={ethicalData.table6Score}
                        type='text'
                        name='table6Score'
                        id='Benefit-Score'
                        onChange={(e) => updateState({ table6Score: e.target.value })}
                        className=' mt-2 border rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none'
                    />
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
    );
}
