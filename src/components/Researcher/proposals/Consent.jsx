import React, { useState } from 'react'
import SignaturePad from '../../profile/Signature.jsx'
export default function Consent() {
    const [answer1, setAnswer1] = useState('')
    const [answer3, setAnswer3] = useState('')
    const [answer2, setAnswer2] = useState('')
    const [answer4, setAnswer4] = useState('')
    const handleOptionAnswer1 = (e) => {
        setAnswer1(e.target.value);
    };
    const handleOptionAnswer3 = (e) => {
        setAnswer1(e.target.value);
    };
    const handleOptionAnswer4 = (e) => {
        setAnswer1(e.target.value);
    };
    return (
        <>
            <div className='xl:m-10 m-5  font-WorkSans-Regular'>
                <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '> Consent  </h1>
                <header className='bg-white shadow-sm my-5 p-10'>
                    <section className=' my-5  md:w-[50%]'>
                        <p className="mb-2  text-zeta  font-semibold ">
                            Will the project require approval by any other ethics committee other than the BMY Ethics Committee?  (e.g. if you are collecting onsite data from a tertiary care hospital having their own IRB, then their approval is also needed, or requirement by National Bioethics Committee for research spanning all provinces) *
                        </p>
                        <div className=" border rounded-md block p-5 ">
                            <div className="mb-2">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
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


                    <section className='mb-4 w-full md:w-[50%] '>
                        <label htmlFor="supervisor-name" className='text-zeta  font-semibold '>

                            From where additional IRB approval is required
                        </label>
                        <input
                            type='text'
                            name='answer2'
                            onChange={(e) => { setAnswer2(e.target.value) }}
                            id='answer2'
                            className='border mt-2 rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none'
                            placeholder='Add Details' />
                    </section>



                    <section className=' my-5  md:w-[50%]'>
                        <p className="mb-2  text-zeta  font-semibold ">
                            Have the research team and data collectors got the relevant training? This includes guiding them to ensure respect of humans during data collection, selecting suitable timing and appropriate ways of data collection according to target population and community norms, esp. for collecting sensitive information (involving stigma/ shame).
                        </p>
                        <div className=" border rounded-md block p-5 ">
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


                    <section className=' my-5  md:w-[50%]'>
                        <p className="mb-2  text-zeta  font-semibold ">
                            Are there any financial or other interests to the researcher(s) or department arising from this study, known to you?
                        </p>
                        <div className=" border rounded-md block p-5 ">
                            <div className="mb-2">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
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

                    <section className=' my-5  md:w-[50%]'>
                        <p className="mb-2  text-zeta  font-semibold ">
                        I undertake to carry out this research in accordance with the BMY Health Pakistan ERC policy and will inform the committee of any changes to the protocol of this project, will submit proofs of genuine data collection, and will publish ethically. 
                        </p>
                      
                        </section>

                  

                    
                    
                </header>
            </div>
        </>
    )
}
