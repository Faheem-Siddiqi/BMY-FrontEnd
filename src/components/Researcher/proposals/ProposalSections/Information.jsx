import { React, useState } from 'react'
export default function Information() {
    const [group, setGroup] = useState('')
    const [selectedCriterion, setSelectedCriterion] = useState('Feasible (have manpower, budget, time for data collection and writing)');
    const handleCriteriaChange = (event) => {
        setSelectedCriterion(event.target.name);
    };
    return (
        <>
        Navigation 
        approve 
        comment add 
            <div className='xl:p-10 p-5  font-WorkSans-Regular'>
                <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '> Information </h1>
                <header className='bg-white shadow-sm my-5 p-10'>
                    <section className='mb-4'>
                        <label
                        className='text-zeta  font-semibold '
                        htmlFor="email">Email</label>
                        <div className='w-full md:w-[50%] h-fit relative'>
                            <input

                                name='email'
                                id='email'
                                className='mt-2 border rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none' type="text" placeholder='Backend Value of group lead' />
                            <div className='absolute top-0 right-0'>
                            </div>
                        </div>
                    </section>
                    <section className='mb-4  '>
                        <p className='mt-5 mb-2  text-zeta  font-semibold '>Your research topic fulfills which of these criteria </p>
                        <div className='border p-3 w-full md:w-[50%] h-fit rounded-lg'>
                            <label className="flex my-3 items-center text-[0.89rem]">
                                <input
                                    type="checkbox"
                                    name="  Addressing research question on right time as community/decision makers are looking for the answers"
                                    checked={selectedCriterion === '  Addressing research question on right time as community/decision makers are looking for the answers'}
                                    onChange={handleCriteriaChange}
                                    className="mr-2"
                                />
                                Addressing research question on right time as community/decision makers are looking for the answers
                            </label>
                            <label className="flex my-3 items-center text-[0.89rem]">
                                <input
                                    type="checkbox"
                                    name="Feasible (have manpower, budget, time for data collection and writing)"
                                    checked={selectedCriterion === 'Feasible (have manpower, budget, time for data collection and writing)'}
                                    onChange={handleCriteriaChange}
                                    className="mr-2"
                                />
                                Feasible (have manpower, budget, time for data collection and writing)
                            </label>
                        </div>
                        <p className='mt-5 mb-2 w-full md:w-[50%]   text-zeta  font-semibold '>
                            Name the beneficiary group clearly identified that will benefit from the information generated in your research
                        </p>
                        <section className='mb-4'>
                            <div className='w-full md:w-[50%] h-fit relative'>
                                <input
                                    name='group'
                                    id='group'
                                    vale={group}
                                    onChange={(e) => { setGroup(e.target.value) }}
                                    className='border rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none' type="text" placeholder='Group Name' />
                                <div className='absolute top-0 right-0'>
                                </div>
                            </div>
                        </section>
                    </section>
                    <button className="mt-6 px-8 py-3 rounded-md group relative overflow-hidden bg-epsilon text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon">
            <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
          Save
          </button>
                </header>
            </div>
        </>
    )
}
