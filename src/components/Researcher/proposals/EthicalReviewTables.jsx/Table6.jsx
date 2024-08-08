import React from 'react';
export default function Table6({ answers, onAnswerChange }) {
    const questions = [
        { id: 'table6a', text: 'New knowledge gained and scientific development' },
        { id: 'table6b', text: 'Trainings/ educational interventions for participants' },
        { id: 'table6c', text: 'Early disease diagnosis/ screening of disease that helps patient in getting timely treatment. For such benefit research should include a step of informing patients of their diagnosis after data collection.' },
    ];
    const handleChange = (e, id) => {
        const selectedValue = e.target.value;
        onAnswerChange(id, selectedValue);
    };
    return (
        <section className='mb-4 overflow-x-scroll'>
            <p className="mb-2 text-zeta font-semibold w-full md:w-[50%]">
                What are the benefits to be conveyed to study participants?
            </p>
            <table className='w-full text-center border border-epsilon'>
                <thead>
                    <tr>
                        <th className='opacity-0 selection-none'>Category</th>
                        <th className='bg-epsilon text-white font-bold text-[0.91rem]  w-[70px] py-3'>Minor gains</th>
                        <th className='bg-epsilon text-white font-bold text-[0.91rem]  w-[70px] py-3'>Moderate gains</th>
                        <th className='bg-epsilon text-white font-bold text-[0.91rem]  w-[70px] py-3'>Major gains</th>
                        <th className='bg-epsilon text-white font-bold text-[0.91rem]  w-[70px] py-3'>N/A</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((question) => (
                        <tr key={question.id} className='border-epsilon border'>
                            <td className=' bg-epsilon text-left text-white border-b border-b-neutral-300 border-l border-l-epsilon border-r border-r-epsilon border-t border-t-epsilon p-3'>
                                {question.text}
                            </td>
                            <td className='border-epsilon border w-[70px] p-3'>
                                <input
                                    type="radio"
                                    name={question.id}
                                    value="Minor gains"
                                    checked={answers[question.id] === "Minor gains"}
                                    onChange={(e) => handleChange(e, question.id)}
                                    className="w-[20px] h-[20px] cursor-pointer"
                                />
                            </td>
                            <td className='border-epsilon border max-w-[70px]  p-3'>
                                <input
                                    type="radio"
                                    name={question.id}
                                    value="Moderate gains"
                                    checked={answers[question.id] === "Moderate gains"}
                                    onChange={(e) => handleChange(e, question.id)}
                                    className="w-[20px] h-[20px] cursor-pointer"
                                />
                            </td>
                            <td className='border-epsilon border w-[70px]  p-3'>
                                <input
                                    type="radio"
                                    name={question.id}
                                    value="Major gains"
                                    checked={answers[question.id] === "Major gains"}
                                    onChange={(e) => handleChange(e, question.id)}
                                    className="w-[20px] h-[20px] cursor-pointer"
                                />
                            </td>
                            <td className='border-epsilon border w-[70px]  p-3'>
                                <input
                                    type="radio"
                                    name={question.id}
                                    value="N/A"
                                    checked={answers[question.id] === "N/A"}
                                    onChange={(e) => handleChange(e, question.id)}
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