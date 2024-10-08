import React, { useState, useEffect } from 'react';
export default function Information({ formData, onInputChange, onSubmit, updateFormData, sectionAssigned }) {
    const [selectedCriteria, setSelectedCriteria] = useState([]);
    const [signUserRole, setSignUserRole] = useState('');
    const [readOnly,setReadOnly]=useState(false)
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [assigned, setAssigned] = useState(false)
    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role) {
            setSignUserRole(role);
        } else {
            console.log('Local storage: role not found.');
        }
    }, []);
    useEffect(() => {
        setSelectedCriteria(formData.question2 || []);
    }, [formData.question2]);
    useEffect(() => {
        const isValidRole = (signUserRole, sectionAssigned) => {




            if (signUserRole === 'erc-head' || signUserRole === 'erc-members') {
                setReadOnly(true)
                return true;
            }
            if (signUserRole === 'researchers') {
                return !sectionAssigned.includes('information');
            }
            return false;
        };
        if (sectionAssigned.includes('information')) {
            setAssigned(true)
        }
        const checkBtn = isValidRole(signUserRole, sectionAssigned);
        setIsButtonEnabled(checkBtn);
    }, [signUserRole, sectionAssigned]);
    const handleCriteriaChange = (event) => {
        const { name, checked } = event.target;
        setSelectedCriteria(prev => {
            const updatedCriteria = checked
                ? [...prev, name]
                : prev.filter(criterion => criterion !== name);
            updateFormData({ ...formData, question2: updatedCriteria });
            return updatedCriteria;
        });
    };
    return (
        <>
            <div className='font-WorkSans-Regular'>
                <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'>Information</h1>
                <header className='bg-white shadow-sm my-5 p-10'>
                    {
                        signUserRole === 'researchers' && (
                            <>
                                <p className='flex justify-end text-epsilon'>
                                    {assigned ? 'Assigned' : 'Not Assigned'}
                                </p>
                            </>
                        )
                    }
                    <section className='mb-4'>
                        <label className='text-zeta font-semibold' htmlFor="question1">Email</label>
                        <div className='w-full md:w-[50%] h-fit relative'>
                            <input
                             disabled={readOnly}
                                name='question1'
                                id='question1'
                                value={formData.question1}
                                onChange={onInputChange}
                                className='mt-2 border rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none'
                                type="text"
                            />
                            <div className='absolute top-0 right-0'></div>
                        </div>
                    </section>
                    <section className='mb-4'>
                        <p className='mt-5 mb-2 text-zeta font-semibold'>Your research topic fulfills which of these criteria</p>
                        <div className='border p-3 w-full md:w-[50%] h-fit rounded-lg'>
                            <label className="flex my-3 items-center text-[0.89rem]">
                                <input
                                    type="checkbox"
                                    disabled={readOnly}
                                    name="Addressing research question on right time as community/decision makers are looking for the answers"
                                    checked={selectedCriteria.includes('Addressing research question on right time as community/decision makers are looking for the answers')}
                                    onChange={handleCriteriaChange}
                                    className="mr-2"
                                />
                                Addressing research question on right time as community/decision makers are looking for the answers
                            </label>
                            <label className="flex my-3 items-center text-[0.89rem]">
                                <input
                                 disabled={readOnly}
                                    type="checkbox"
                                    name="Feasible (have manpower, budget, time for data collection and writing)"
                                    checked={selectedCriteria.includes('Feasible (have manpower, budget, time for data collection and writing)')}
                                    onChange={handleCriteriaChange}
                                    className="mr-2"
                                />
                                Feasible (have manpower, budget, time for data collection and writing)
                            </label>
                        </div>
                        <p className='mt-5 mb-2 w-full md:w-[50%] text-zeta font-semibold'>
                            Name the beneficiary group clearly identified that will benefit from the information generated in your research
                        </p>
                        <section className='mb-4'>
                            <div className='w-full md:w-[50%] h-fit relative'>
                                <input
                                 disabled={readOnly}
                                    name='question3'
                                    id='question3'
                                    value={formData.question3}
                                    onChange={onInputChange}
                                    className='border rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none'
                                    type="text"
                                    placeholder='Group Name'
                                />
                                <div className='absolute top-0 right-0'></div>
                            </div>
                        </section>
                    </section>
                    <button
                        disabled={isButtonEnabled}
                        onClick={onSubmit}
                        className=
                        {` ${isButtonEnabled === true && 'hidden'} mt-6 px-8 py-3 rounded-md group relative overflow-hidden bg-epsilon text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon`}
                    >
                        <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                        Save
                    </button>
                    <br />
                </header>
            </div>
        </>
    );
}
