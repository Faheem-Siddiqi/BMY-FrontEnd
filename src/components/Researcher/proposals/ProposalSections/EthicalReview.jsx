import React, { useState, useEffect } from 'react';
import Table1 from '../EthicalReviewTables.jsx/Table1.jsx';
import Table2 from '../EthicalReviewTables.jsx/Table2.jsx';
import Table3 from '../EthicalReviewTables.jsx/Table3.jsx';
import Table4 from '../EthicalReviewTables.jsx/Table4.jsx';
import Table5 from '../EthicalReviewTables.jsx/Table5.jsx';
import Table6 from '../EthicalReviewTables.jsx/Table6.jsx';

export default function EthicalReview({
    formState,
    onChange,
    onQuestionChange,
    onResearchTitleChange,
    Risk,
    handleSubmit
}) {
    const [localTable5Answers, setLocalTable5Answers] = useState(formState.table5Answers);
    const [localTable5Score, setLocalTable5Score] = useState(formState.table5Score);

    const handleTable5Change = (e, id) => {
        const selectedValue = e.target.value;
        const updatedAnswers = {
            ...localTable5Answers,
            [id]: selectedValue
        };
        setLocalTable5Answers(updatedAnswers);

        // Calculate the score based on the updated answers
        let score = 0;
        for (const key in updatedAnswers) {
            if (key !== 'table5g') {
                if (updatedAnswers[key] === 'Yes') {
                    score += 1;
                }
            }
        }
        setLocalTable5Score(score);

        // Update the form state
        onChange(e, 'table5Answers', id);
        onChange({ target: { value: score } }, 'table5Score');
    };

    const handleInputChange = (e, name) => {
        onChange(e, name);
    };

    return (
        <div className='WorkSans-Regular'>
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black '>Ethical Review</h1>
            <header className='bg-white shadow-sm my-5 p-10'>
                <Table1
                    table1Answers={formState.table1Answers}
                    question1={formState.question1}
                    table1InnerScore={formState.table1InnerScore}
                    onAnswerChange={(e, id) => onChange(e, 'table1Answers', id)}
                    onAnswer1Change={(e) => onQuestionChange(e, 'question1')}
                />
                <Table2
                    table2Answers={formState.table2Answers}
                    handleTable2AnswerChange={(e, id) => onChange(e, 'table2Answers', id)}
                />
                <Table3
                    table3Answers={formState.table3Answers}
                    handleTable3AnswerChange={(e, id) => onChange(e, 'table3Answers', id)}
                />
                <Table4
                    table4Answers={formState.table4Answers}
                    question2={formState.question2}
                    question3={formState.question3}
                    onAnswerChange={(e, id) => onChange(e, 'table4Answers', id)}
                    onQuestion2Change={(e) => onQuestionChange(e, 'question2')}
                    onQuestion3Change={(e) => onQuestionChange(e, 'question3')}
                />
                <Table5
                     table5Answers={formState.table5Answers}
                    onAnswerChange={(e, id) => onChange(e, 'table5Answers', id)}
                />
                <section className='mb-4 w-full md:w-[50%] '>
                    <label htmlFor="Ethical-Risk" className='text-zeta font-semibold '>ERC Risk Score Total</label>
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
                    answers={formState.table6Answers}
                    onAnswerChange={(id, selectedValue) => onChange({ target: { value: selectedValue } }, 'table6Answers', id)}
                />
                <section className='mb-4 w-full md:w-[50%] '>
                    <label htmlFor="research-title" className='text-zeta font-semibold '>Benefit Score</label>
                    <input
                        value={formState.table6Score}
                        type='text'
                        name='rBenefit-Score'
                        id='Benefit-Score'
                        onChange={onResearchTitleChange}
                        className=' mt-2 border rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none'
                    />
                </section>

                <button 
                
                onClick={handleSubmit}
                className="mt-6 px-8 py-3 rounded-md group relative overflow-hidden bg-epsilon text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon">
                <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                Save
            </button>
            </header>
           
        </div>
    );
}
