import React, { useState, useEffect } from 'react';
import Table1 from '../EthicalReviewTables.jsx/Table1.jsx';
import Table2 from '../EthicalReviewTables.jsx/Table2.jsx';
import Table3 from '../EthicalReviewTables.jsx/Table3.jsx';
import Table4 from './../EthicalReviewTables.jsx/Table4';
import Table5 from '../EthicalReviewTables.jsx/Table5.jsx';
import Table6 from '../EthicalReviewTables.jsx/Table6.jsx';
export default function EthicalReview() {
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
        researchTitle: ''
    });
    const updateState = (updates) => setEthicalData(prevState => ({ ...prevState, ...updates }));
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
        updateState({
            table5Score: newScore
        });
    }, [ethicalData.table5Answers, ethicalData.question1]);
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
    const Risk = ethicalData.table1Score + ethicalData.table2Score + ethicalData.table4Score + ethicalData.table5Score;
    return (
        <div className='WorkSans-Regular'>
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black '>Ethical Review</h1>
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
                    <label htmlFor="Ethical-Risk" className='text-zeta  font-semibold '>ERC Risk Score Total</label>
                    <input
                        type='text'
                        name='Ethical-Risk'
                        value={Risk}
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
                    <label htmlFor="research-title" className='text-zeta  font-semibold '>Benefit Score</label>
                    <input
                        value={ethicalData.table6Score}
                        type='text'
                        name='rBenefit-Score'
                        id='Benefit-Score'
                        onChange={(e) => updateState({ researchTitle: e.target.value })}
                        className=' mt-2 border rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none'
                    />
                </section>
                <button
                    className="mt-6 px-8 py-3 rounded-md group relative overflow-hidden bg-epsilon text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon">
                    <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                    Save
                </button>
            </header>
        </div>
    );
}
