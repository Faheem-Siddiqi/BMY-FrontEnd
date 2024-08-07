import React from 'react';
export default function Table1({
    table1Answers, // Ensure this matches the prop name in the parent component
    question1,
    table1InnerScore,
    onAnswerChange,
    onAnswer1Change
}) {
    const questions = [
        { id: 'table1a', text: 'Is there any contact with potentially harmful items or substances?' },
        { id: 'table1b', text: 'Is there any risk of emotional disturbance of participant with any sensitive question in your proforma?' },
        { id: 'table1c', text: 'Is there a risk of breach of privacy (e.g. subjects\' names, initials, or hospital numbers, pictures going to be published in manuscripts) without informed consent?' },
        { id: 'table1d', text: 'Is there any risk of social stigma for the community (such as high prevalence of a disease with stigma) if data is published with name of that community (geographical/ religious/ ethnic group etc)?' },
        { id: 'table1e', text: 'Is there any economic risk/ effect on career (such as employee feedback/ medical diagnosis are shared) for participant if data is disclosed outside research team?' },
        { id: 'table1f', text: 'Is there any chance of disclosure requirements for participants details? For example, research outside the usual legal and ethical reporting, CR research for reporting harmful diseases and ethical issue regarding for research outside institutions disclosing personal info to research sponsors (pharma company) or other regulatory agencies/ community enterprise?' },
        { id: 'table1g', text: 'Are any of the above risks to participants more than what they experience in everyday life?' }
    ];
    return (
        <section className='mb-4 overflow-x-scroll'>
            <p className="mb-2 text-zeta font-semibold">
                Ethical consideration in risk exposure for participants
            </p>
            <table className='w-full text-center border border-epsilon'>
                <thead>
                    <tr>
                        <th className='opacity-0 selection-none'>content</th>
                        <th className='bg-epsilon text-white font-bold py-3'>Yes</th>
                        <th className='bg-epsilon text-white font-bold py-3'>No</th>
                        <th className='bg-epsilon text-white font-bold py-3'>N/A</th>
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
                                    checked={table1Answers[question.id] === "Yes"}
                                    onChange={(e) => onAnswerChange(e, question.id)}
                                    className="w-[20px] h-[20px] cursor-pointer"
                                />
                            </td>
                            <td className='border-epsilon border p-3'>
                                <input
                                    type="radio"
                                    name={question.id}
                                    value="No"
                                    checked={table1Answers[question.id] === "No"}
                                    onChange={(e) => onAnswerChange(e, question.id)}
                                    className="w-[20px] h-[20px] cursor-pointer"
                                />
                            </td>
                            <td className='border-epsilon border p-3'>
                                <input
                                    type="radio"
                                    name={question.id}
                                    value="N/A"
                                    checked={table1Answers[question.id] === "N/A"}
                                    onChange={(e) => onAnswerChange(e, question.id)}
                                    className="w-[20px] h-[20px] cursor-pointer"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <section className='my-4 w-full md:w-[50%]'>
                <label htmlFor="risk-score" className='text-zeta font-semibold'>Risk Score </label>
                <input
                    type='text'
                    name='risk-score'
                    id='risk-score'
                    value={table1InnerScore}
                    disabled
                    className='border mt-2 rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none'
                    placeholder='Risk Score'
                />
            </section>
            <section className='my-5 md:w-[50%]'>
                <p className="mb-2 text-zeta font-semibold">
                    In case of any such risk, is the participant informed about risks in detail at the time of informed consent?
                </p>
                <div className="border rounded-md block p-5">
                    <div className="mb-2">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                value="Yes"
                                checked={question1 === 'Yes'}
                                onChange={onAnswer1Change}
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
                                checked={question1 === 'No'}
                                onChange={onAnswer1Change}
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
