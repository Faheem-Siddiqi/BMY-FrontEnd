import React, { useState, useEffect } from 'react';
import Table1 from '../EthicalReviewTables.jsx/Table1.jsx'
import Table2 from '../EthicalReviewTables.jsx/Table2.jsx'
import Table3 from '../EthicalReviewTables.jsx/Table3.jsx'
import Table4 from './../EthicalReviewTables.jsx/Table4';
import Table5 from '../EthicalReviewTables.jsx/Table5.jsx'
import Table6 from '../EthicalReviewTables.jsx/Table6.jsx';
export default function EthicalReview() {
    //--------------------------------------------------------- Table-1 + Question 2
    const [table1Answers, setTable1Answe5s] = useState({
        table1a: 'Yes',
        table1b: '',
        table1c: '',
        table1d: 'Yes',
        table1e: '',
        table1f: '',
        table1g: '',
    });
    // In case of any such risk, is the participant informed about risks in detail at the time of informed consent?
    const [question1, setQuestion1] = useState('No');
    const [table1InnerScore, setTable1InnerScore] = useState(0);
    const [table1Score, setTable1Score] = useState(0);
    useEffect(() => {
        // Compute the score based on the answers
        let newScore = 0;
        for (const key in table1Answers) {
            if (key !== 'table1g') {
                if (table1Answers[key] === 'Yes') {
                    newScore += 1;
                }
            }
        }
        const finalScore = question1 === 'No' ? newScore * 5 : 0;
        setTable1InnerScore(newScore);
        setTable1Score(finalScore);
    }, [table1Answers, question1]);
    const handleTable1AnswerChange = (e, id) => {
        const selectedValue = e.target.value;
        setTable1Answers(prevAnswers => ({
            ...prevAnswers,
            [id]: selectedValue
        }));
    };
    const handleQuestion1Change = (e) => {
        setQuestion1(e.target.value);
    };
    //--------------------------------------------------------- Table-1
    //--------------------------------------------------------- Table-2
    const [table2Answers, setTable2Answers] = useState({
        table2a: '',
        table2b: '',
        table2c: '',
    });
    const [table2Score, setTable2Score] = useState(0);
    useEffect(() => {
        let newScore = 0;
        for (const key in table2Answers) {
            if (key === 'table2a' && table2Answers[key] === 'Yes') {
                newScore += 1;
            }
            if (key === 'table2b' && table2Answers[key] === 'No') {
                newScore += 1;
            }
            if (key === 'table2c' && table2Answers[key] === 'No') {
                newScore += 1;
            }
        }
        setTable2Score(newScore);
    }, [table2Answers]);
    const handleTable2AnswerChange = (e, id) => {
        const selectedValue = e.target.value;
        setTable2Answers(prevAnswers => ({
            ...prevAnswers,
            [id]: selectedValue
        }));
    };
    //--------------------------------------------------------- Table-2
    //--------------------------------------------------------- Table-3
    const [table3Answers, setTable3Answers] = useState({
        table3a: '',
        table3b: '',
        table3c: '',
        table3d: '',
        table3e: '',
        table3f: 'Yes',
        table3g: '',
    });
    const handleTable3AnswerChange = (e, id) => {
        const selectedValue = e.target.value;
        setTable3Answers(prevAnswers => ({
            ...prevAnswers,
            [id]: selectedValue
        }));
    };
    //--------------------------------------------------------- Table-3
    //--------------------------------------------------------- Table-4
    const [table4Answers, setTable4Answers] = useState({
        table4a: '',
        table4b: '',
    });
    const [question2, setQuestion2] = useState('');
    const [question3, setQuestion3] = useState('');
    const [table4Score, setTable4Score] = useState(0);
    const handleTable4AnswerChange = (e, id) => {
        const selectedValue = e.target.value;
        setTable4Answers(prevAnswers => ({
            ...prevAnswers,
            [id]: selectedValue
        }));
    };
    const handleQuestion2Change = (e) => {
        setQuestion2(e.target.value);
    };
    const handleQuestion3Change = (e) => {
        setQuestion3(e.target.value);
    };
    useEffect(() => {
        let newScore = 0;
        if (table4Answers.table4a === 'No') {
            newScore += 10;
        }
        if (table4Answers.table4b === 'No') {
            newScore += 10;
        }
        if (question2 === 'No') {
            newScore = 0;
        }
        if (question3 === 'Yes') {
            newScore += 1;
        }
        setTable4Score(newScore);
    }, [table4Answers, question2, question3]);
    //--------------------------------------------------------- Table-4
    //--------------------------------------------------------- Table-5
    const [table5Answers, setTable5Answers] = useState({
        table5a: 'Yes',
        table5b: '',
        table5c: '',
        table5d: 'Yes',
        table5e: '',
        table5f: '',
        table5g: ''
    });
    const [table5Score, setTable5Score] = useState(0);
    useEffect(() => {
        let newScore = 0;
        for (const key in table1Answers) {
            if (key !== 'table5g') {
                if (table1Answers[key] === 'Yes') {
                    newScore += 1;
                }
            }
        }
        const finalScore = question1 === 'No' ? newScore * 5 : 0;
        setTable1InnerScore(newScore);
        setTable1Score(finalScore);
    }, [table1Answers, question1]);
    const handleTable5AnswerChange = (e, id) => {
        const selectedValue = e.target.value;
        setTable5Answers(prevAnswers => ({
            ...prevAnswers,
            [id]: selectedValue
        }));
    };
    //--------------------------------------------------------- Table-5
//--------------------------------------------------------- Table-6
const [table6Answers, setTable6Answers] = useState({
    table6a: 'N/A',
    table6b: 'Moderate gains',
    table6c: 'Minor gains',
});
const [table6Score, setTable6Score] = useState(0);
useEffect(() => {
    let newScore = 0;
    for (const key in table6Answers) {
        if (table6Answers[key] === 'Moderate gains') {
            newScore += 20;
        }
        if (table6Answers[key] === 'Minor gains') {
            newScore += 5;
        }
        if (table6Answers[key] === 'Major gains') {
            newScore += 30;
        }
    }
    setTable6Score(newScore);
}, [table6Answers]);
const handleTable6AnswerChange = (id, selectedValue) => {
    setTable6Answers(prevAnswers => ({
        ...prevAnswers,
        [id]: selectedValue
    }));
};
//--------------------------------------------------------- Table-6
    const Risk = table1Score + table2Score + table4Score + table5Score
    return (
        <div className='WorkSans-Regular'>
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black '>Ethical Review</h1>
            <header className='bg-white shadow-sm my-5 p-10'>
                <Table1
                    table1answers={table1Answers}
                    question1={question1}
                    table1InnerScore={table1InnerScore}
                    onAnswerChange={handleTable1AnswerChange}
                    onAnswer1Change={handleQuestion1Change}
                />
                <Table2
                    table2Answers={table2Answers}
                    handleTable2AnswerChange={handleTable2AnswerChange}
                />
                <Table3
                    table3Answers={table3Answers}
                    handleTable3AnswerChange={handleTable3AnswerChange}
                />
                <Table4
                    table4Answers={table4Answers}
                    question2={question2}
                    question3={question3}
                    onAnswerChange={handleTable4AnswerChange}
                    onQuestion2Change={handleQuestion2Change}
                    onQuestion3Change={handleQuestion3Change}
                />
                <Table5 answers={table5Answers} setAnswers={setTable5Answers} setTable5Score={setTable5Score} />
                <section className='mb-4 w-full md:w-[50%] '>
                    <label htmlFor="Ethical-Risk" className='text-zeta  font-semibold '>ERC Risk Score Total</label>
                    <input
                        type='text'
                        name='Ethical-Risk'
                        value={Risk}
                        id='Ethical-Risk'
                        className='border mt-2 rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none' />
                </section>
                <Table6 answers={table6Answers} onAnswerChange={handleTable6AnswerChange} />
                <section className='mb-4 w-full md:w-[50%] '>
                    <label htmlFor="research-title" className='text-zeta  font-semibold '>Benefit Score</label>
                    <input
                        value={table6Score}
                        type='text'
                        name='rBenefit-Score'
                        id='Benefit-Score'
                        onChange={(e) => { setResearchTitle(e.target.value) }}
                        className=' mt-2 border rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none' />
                </section>
            </header>
            <button className="mt-6 px-8 py-3 rounded-md group relative overflow-hidden bg-epsilon text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon">
                <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                Save
            </button>
        </div>
    );
}
