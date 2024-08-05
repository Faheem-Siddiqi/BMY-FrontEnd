import React from 'react';
export default function Table5({  table5Answers, onAnswerChange }) {
    const questions = [
        { id: 'table5a', text: 'Qualitative research on sensitive topics which may disturb young/vulnerable/female data collectors without provision of counseling and training' },
        { id: 'table5b', text: 'Contact with harmful agents or risk of physical injury' },
        { id: 'table5c', text: 'Contact with infectious patients and risk to health' },
        { id: 'table5d', text: 'Traveling in unsafe areas and risk of accidents/violence' },
        { id: 'table5e', text: 'Risk of facing improper behavior by approaching some risky community (drug abusers/mentally challenged/persons involved in risky behaviors)' },
        { id: 'table5f', text: 'Industry funded research with conditions of not disclosing risks to patients' },
        { id: 'table5g', text: 'Research findings having the potential to expose big industry/mafia trends' }
    ];
    return (
        <section className='mb-4 overflow-x-scroll'>
            <p className="mb-2 text-zeta font-semibold">Any Risk to researchers</p>
            <table className='w-full text-center border border-epsilon'>
                <thead>
                    <tr>
                        <th className='opacity-0 selection-none'>Content</th>
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
                                    checked={table5Answers[question.id] === "Yes"}
                                    onChange={(e) => onAnswerChange(e, question.id)}
                                    className="w-[20px] h-[20px] cursor-pointer"
                                />
                            </td>
                            <td className='border-epsilon border p-3'>
                                <input
                                    type="radio"
                                    name={question.id}
                                    value="No"
                                    checked={table5Answers[question.id] === "No"}
                                    onChange={(e) => onAnswerChange(e, question.id)}
                                    className="w-[20px] h-[20px] cursor-pointer"
                                />
                            </td>
                            <td className='border-epsilon border p-3'>
                                <input
                                    type="radio"
                                    name={question.id}
                                    value="N/A"
                                    checked={table5Answers[question.id] === "N/A"}
                                    onChange={(e) => onAnswerChange(e, question.id)}
                                    className="w-[20px] h-[20px] cursor-pointer"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}
