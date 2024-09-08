import React from 'react';
export default function Table4({
    table4Answers,
    question2,
    question3,
    onAnswerChange,
    onQuestion2Change,
    onQuestion3Change
}) {
    const { table4a, table4b } = table4Answers;
    const questions = [
        { id: 'table4a', text: 'Are you considering special care for taking informed consent, with no coercion?' },
        { id: 'table4b', text: 'Are the Risks to these participants (as mentioned in first table) less/ or at least not more than daily life risk?' },
    ];
    return (
        <section className='mb-4 overflow-x-scroll'>
            <p className="mb-2 text-zeta font-semibold w-full md:w-[50%]">
                If you have included these special groups in your study:
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
                                    checked={table4Answers[question.id] === "Yes"}
                                    onChange={(e) => onAnswerChange(e, question.id)}
                                    className="w-[20px] h-[20px] cursor-pointer"
                                />
                            </td>
                            <td className='border-epsilon border p-3'>
                                <input
                                    type="radio"
                                    name={question.id}
                                    value="No"
                                    checked={table4Answers[question.id] === "No"}
                                    onChange={(e) => onAnswerChange(e, question.id)}
                                    className="w-[20px] h-[20px] cursor-pointer"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* question-2 */}
            {!(
                table4Answers.table4a === "Yes" &&
                table4Answers.table4b === "Yes"
            ) && (
                    <>
                        <section className='my-5 md:w-[80%]'>
                            <p className="mb-2 text-zeta font-semibold">
                                In case of any risk to the special group, have you assigned a member to monitor those risks?
                            </p>
                            <div className="border rounded-md block p-5">
                                <div className="mb-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            value="Yes"
                                            checked={question2 === 'Yes'}
                                            onChange={onQuestion2Change}
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
                                            checked={question2 === 'No'}
                                            onChange={onQuestion2Change}
                                            className="mr-2"
                                        />
                                        No
                                    </label>
                                </div>
                            </div>
                        </section>
                    </>
                )}
            {/* Question-3 */}
            <section className='mt-5'>
                <p className="mb-2 text-zeta font-semibold">
                    Is the research excluding groups such as elderly, women, pregnant, language barrier from research without scientific evidence of these groups being at risk in given scenario of your research?
                </p>
                <div className="border rounded-md block p-5">
                    <div className="mb-2">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                value="Yes"
                                checked={question3 === 'Yes'}
                                onChange={onQuestion3Change}
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
                                checked={question3 === 'No'}
                                onChange={onQuestion3Change}
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