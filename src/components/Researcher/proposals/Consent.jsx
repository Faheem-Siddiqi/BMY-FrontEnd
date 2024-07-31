import React, { useState, useEffect } from 'react';
export default function Consent({ formData, onInputChange, onSubmit }) {
    const [iAgree, setIAgree] = useState(false);
    // Update iAgree based on checkbox
    const handleIagree = (e) => {
        if (e.target) {
            setIAgree(e.target.checked);
        } else {
            console.error('Event target is missing');
        }
    };
    // Radio Box Handling for local and parent state
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [answer3, setAnswer3] = useState('');
    const [answer4, setAnswer4] = useState('');
    // Sync local state with formData when it changes
    useEffect(() => {
        if (formData) {
            setAnswer1(formData.question1 || '');
            setAnswer2(formData.question2 || '');
            setAnswer3(formData.question3 || '');
            setAnswer4(formData.question4 || '');
        } else {
            console.error('formData is undefined or null');
        }
    }, [formData]);
    // Handle radio button changes
    const handleOptionAnswer1 = (e) => {
        if (e.target) {
            const value = e.target.value;
            setAnswer1(value);
            onInputChange({ ...formData, question1: value });
        } else {
            console.error('Event target is missing');
        }
    };
    const handleOptionAnswer2 = (e) => {
        if (e.target) {
            const value = e.target.value;
            setAnswer2(value);
            onInputChange({ ...formData, question2: value });
        } else {
            console.error('Event target is missing');
        }
    };
    const handleOptionAnswer3 = (e) => {
        if (e.target) {
            const value = e.target.value;
            setAnswer3(value);
            onInputChange({ ...formData, question3: value });
        } else {
            console.error('Event target is missing');
        }
    };
    const handleOptionAnswer4 = (e) => {
        if (e.target) {
            const value = e.target.value;
            setAnswer4(value);
            onInputChange({ ...formData, question4: value });
        } else {
            console.error('Event target is missing');
        }
    };
    return (
        <>
            <div className='font-WorkSans-Regular'>
                <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'>Consent</h1>
                <header className='bg-white shadow-sm my-5 p-10'>
                    <section className='my-5 md:w-[50%]'>
                        <p className="mb-2 text-zeta font-semibold">
                            Will the project require approval by any other ethics committee other than the BMY Ethics Committee? *
                        </p>
                        <div className="border rounded-md block p-5">
                            <div className="mb-2">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="question1"
                                        value="Yes"
                                        checked={answer1 === 'Yes'}
                                        onChange={handleOptionAnswer1}
                                        className="mr-2"
                                    />
                                    Yes
                                </label>
                            </div>
                            <div className="mb-2">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="question1"
                                        value="No"
                                        checked={answer1 === 'No'}
                                        onChange={handleOptionAnswer1}
                                        className="mr-2"
                                    />
                                    No
                                </label>
                            </div>
                        </div>
                    </section>
                    <section className='mb-4 w-full md:w-[50%]'>
                        <label htmlFor="question2" className='text-zeta font-semibold'>
                            From where additional IRB approval is required
                        </label>
                        <input
                            type='text'
                            id='question2'
                            name='question2'
                            value={answer2}
                            onChange={handleOptionAnswer2}
                            className='border mt-2 rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none'
                            placeholder='Add Details'
                        />
                    </section>
                    <section className='my-5 md:w-[50%]'>
                        <p className="mb-2 text-zeta font-semibold">
                            Have the research team and data collectors got the relevant training?
                        </p>
                        <div className="border rounded-md block p-5">
                            <div className="mb-2">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="question3"
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
                                        name="question3"
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
                    <section className='my-5 md:w-[50%]'>
                        <p className="mb-2 text-zeta font-semibold">
                            Are there any financial or other interests to the researcher(s) or department arising from this study, known to you?
                        </p>
                        <div className="border rounded-md block p-5">
                            <div className="mb-2">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="question4"
                                        value="Yes"
                                        checked={answer4 === 'Yes'}
                                        onChange={handleOptionAnswer4}
                                        className="mr-2"
                                    />
                                    Yes
                                </label>
                            </div>
                            <div className="mb-2">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="question4"
                                        value="No"
                                        checked={answer4 === 'No'}
                                        onChange={handleOptionAnswer4}
                                        className="mr-2"
                                    />
                                    No
                                </label>
                            </div>
                        </div>
                    </section>
                    <section className='my-5 text-justify'>
                        <label className="flex items-start">
                            <input
                                type="checkbox"
                                checked={iAgree}
                                onChange={handleIagree}
                                className="mr-2 mt-1"
                            />
                            <p className="mb-2 text-zeta ">
                                I undertake to carry out this research in accordance with the BMY Health Pakistan ERC policy and will inform the committee of any changes to the protocol of this project, will submit proofs of genuine data collection, and will publish ethically.
                            </p>
                        </label>
                    </section>
                </header>
                <button
                    onClick={onSubmit}
                    disabled={!iAgree}
                    className={`mt-6 px-8 py-3 rounded-md group relative overflow-hidden bg-epsilon ${!iAgree ? 'opacity-50 cursor-not-allowed' : ''} text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon`}
                >
                    <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                    Save
                </button>
            </div>
        </>
    );
}
