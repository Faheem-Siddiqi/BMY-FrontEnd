import React from 'react';

export default function Table3({ table3Answers={},  handleTable3AnswerChange }) {
    // Define the questions
    const questions = [
        { id: 'table3a', text: 'People with impaired decision making capacity' },
        { id: 'table3b', text: 'Children under 16' },
        { id: 'table3c', text: 'Medically vulnerable' },
        { id: 'table3d', text: 'Prisoners' },
        { id: 'table3e', text: 'Economically or educationally disadvantaged' },
        { id: 'table3f', text: 'Racial or ethnic minorities' },
        { id: 'table3g', text: 'Institutionalized persons (correctional facilities, nursing homes, or mental health)' },
    ];

    return (
        <section className='mb-4 overflow-x-scroll'>
            <p className="mb-2 text-zeta font-semibold w-full md:w-[50%]">
                Ethical considerations for specific populations
            </p>
            <table className='w-full text-center border border-epsilon'>
                <thead>
                    <tr>
                        <th className='opacity-0 selection-none'>Category</th>
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
                                    checked={table3Answers[question.id] === "Yes"}
                                    onChange={(e) => handleTable3AnswerChange(e, question.id)}
                                    className="w-[20px] h-[20px] cursor-pointer"
                                />
                            </td>
                            <td className='border-epsilon border p-3'>
                                <input
                                    type="radio"
                                    name={question.id}
                                    value="No"
                                    checked={table3Answers[question.id] === "No"}
                                    onChange={(e) => handleTable3AnswerChange(e, question.id)}
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
