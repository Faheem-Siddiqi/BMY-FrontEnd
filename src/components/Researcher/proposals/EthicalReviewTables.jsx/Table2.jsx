import React from 'react';
export default function Table2({ handleTable2AnswerChange, table2Answers }) {
    const questions = [
        { id: 'table2a', text: 'Is there a power differential between researchers and participants (researchers in a position of authority/ influencing decisions of participants care where they may readily give consent for data collection)?' },
        { id: 'table2b', text: 'With questionnaires, will you give participants the option of omitting questions they don’t want to answer?' },
        { id: 'table2c', text: 'Will you tell participants that their data will be treated with full confidentiality and if published, it will not be identifiable as theirs?' },
    ];
    return (
        <section className='mb-4 overflow-x-scroll'>
            <p className="mb-2 text-zeta font-semibold w-full md:w-[50%]">
                Other Ethical considerations in informed consent:
            </p>
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
                                    checked={table2Answers[question.id] === "Yes"}
                                    onChange={(e) => handleTable2AnswerChange(e, question.id)}
                                    className="w-[20px] h-[20px] cursor-pointer"
                                />
                            </td>
                            <td className='border-epsilon border p-3'>
                                <input
                                    type="radio"
                                    name={question.id}
                                    value="No"
                                    checked={table2Answers[question.id] === "No"}
                                    onChange={(e) => handleTable2AnswerChange(e, question.id)}
                                    className="w-[20px] h-[20px] cursor-pointer"
                                />
                            </td>
                            <td className='border-epsilon border p-3'>
                                <input
                                    type="radio"
                                    name={question.id}
                                    value="N/A"
                                    checked={table2Answers[question.id] === "N/A"}
                                    onChange={(e) => handleTable2AnswerChange(e, question.id)}
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