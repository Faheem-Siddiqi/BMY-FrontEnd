import React, { useState, useEffect } from 'react';
export default function Table4({ setTable4Score }) {
    const [answer2, setAnswer2] = useState('');
    const [answer3, setAnswer3] = useState('');
    const [answers, setAnswers] = useState({
        table4a: '',
        table4b: '',
    });
    const [score, setScore] = useState(0);
    const [finalScore, setFinalScore] = useState(0);
    const handleChange = (e, id) => {
        const selectedValue = e.target.value;
        setAnswers({
            ...answers,
            [id]: selectedValue
        });
        if (id === 'table4a' || id === 'table4b') {
            if (selectedValue === 'No' && answers[id] !== 'No') {
                setScore(score + 10);
            } else if (selectedValue !== 'No' && answers[id] === 'No') {
                setScore(score - 10);
            }
        }
    };
    const handleOptionAnswer2 = (e) => {
        setAnswer2(e.target.value);
    };
    const handleOptionAnswer3 = (e) => {
        setAnswer3(e.target.value);
    };
    useEffect(() => {
        let calculatedFinalScore = score;
        if (answer2 === 'No') {
            calculatedFinalScore = 0;
        }
        if (answer3 === 'Yes') {
            calculatedFinalScore = calculatedFinalScore + 1;
        }
        // Update finalScore state
        setFinalScore(calculatedFinalScore);
        setTable4Score(finalScore);
    }, [answer2, answer3, score, setTable4Score]);
    const questions = [
        { id: 'table4a', text: 'Are you considering special care for taking informed consent, with no coercion?' },
        { id: 'table4b', text: 'Are the Risks to these participants (as mentioned in first table) less/ or at least not more than daily life risk?' },
    ];
    return (
        <section className='mb-4 overflow-x-scroll'>
            <p className="mb-2 text-zeta font-semibold w-full md:w-[50%]">
                Ethical considerations for special care and risk assessment
            </p>
            <table className='w-full text-center border border-epsilon'>
                <thead>
                    <tr>
                        <th className='opacity-0 selection-none'>Question</th>
                        <th className='bg-epsilon text-white font-bold py-3'>Yes</th>
                        <th className='bg-epsilon text-white font-bold py-3'>No</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((question) => (
                        <tr key={question.id} className='border-epsilon border'>
                            <td className='bg-epsilon text-left text-white border-b border-b-neutral-300 border-l border-l-epsilon border-r border-r-epsilon border-t border-t-epsilon p-3'>
                                {question.text}
                            </td>
                            <td className='border-epsilon border p-3'>
                                <input
                                    type="radio"
                                    name={question.id}
                                    value="Yes"
                                    checked={answers[question.id] === "Yes"}
                                    onChange={(e) => handleChange(e, question.id)}
                                    className="w-[20px] h-[20px] cursor-pointer"
                                />
                            </td>
                            <td className='border-epsilon border p-3'>
                                <input
                                    type="radio"
                                    name={question.id}
                                    value="No"
                                    checked={answers[question.id] === "No"}
                                    onChange={(e) => handleChange(e, question.id)}
                                    className="w-[20px] h-[20px] cursor-pointer"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* question-2 */}
            <section className='my-5 md:w-[50%]'>
                <p className="mb-2 text-zeta font-semibold">
                    In case of any risk to the special group, have you assigned a member to monitor those risks?
                </p>
                <div className="border rounded-md block p-5">
                    <div className="mb-2">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                value="Yes"
                                checked={answer2 === 'Yes'}
                                onChange={handleOptionAnswer2}
                                className="mr-2"
                            />
                            Yes
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                value="No"
                                checked={answer2 === 'No'}
                                onChange={handleOptionAnswer2}
                                className="mr-2"
                            />
                            No
                        </label>
                    </div>
                </div>
            </section>
            {/* Question-3 */}
            <section className='my-5 md:w-[50%]'>
                <p className="mb-2 text-zeta font-semibold">
                    Is the research excluding groups such as elderly, women, pregnant, language barrier from research without scientific evidence of these groups being at risk in given scenario of your research?
                </p>
                <div className="border rounded-md block p-5">
                    <div className="mb-2">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                value="Yes"
                                checked={answer3 === 'Yes'}
                                onChange={handleOptionAnswer3}
                                className="mr-2"
                            />
                            Yes
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                value="No"
                                checked={answer3 === 'No'}
                                onChange={handleOptionAnswer3}
                                className="mr-2"
                            />
                            No
                        </label>
                    </div>
                </div>
            </section>
       
        </section>
    );
}
