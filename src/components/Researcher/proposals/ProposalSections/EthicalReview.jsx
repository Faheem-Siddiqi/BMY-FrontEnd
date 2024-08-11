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

export default function EthicalReview({ ethicalData, updateState, risk ,onSubmit }) {

    const [signUserRole, setSignUserRole] = useState('');
    useEffect(() => {
        const SignUserRole = localStorage.getItem('role');
        if (SignUserRole) {
            setSignUserRole(SignUserRole);
        } else {
            console.log('Local storage: role  not found.');
        }
    }, []);
   
    return (
        <div className='WorkSans-Regular'>
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'>Ethical Review</h1>
            <header className='bg-white shadow-sm my-5 p-10'>
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
                <Table5
                    table5Answers={ethicalData.table5Answers}
                    onAnswerChange={(e, id) => updateState({
                        table5Answers: { ...ethicalData.table5Answers, [id]: e.target.value }
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
                <Table6
                    answers={ethicalData.table6Answers}
                    onAnswerChange={(id, selectedValue) => updateState({
                        table6Answers: { ...ethicalData.table6Answers, [id]: selectedValue }
                    })}
                />
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


                {signUserRole === 'researchers' && (<>
                <button
                onClick={onSubmit}
                    className="mt-6 px-8 py-3 rounded-md group relative overflow-hidden bg-epsilon text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon">
                    <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                    Save
                </button>

            </>)}
            </header>
        </div>
    );
}
