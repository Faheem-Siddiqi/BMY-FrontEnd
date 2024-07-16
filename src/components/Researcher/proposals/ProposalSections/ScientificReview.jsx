import { React, useState } from 'react'
export default function ScientificReview() {
    // Name the beneficiary group clearly identified that will benefit from the information generated in your research
    const [beneficiaryGroupBenefited, setBeneficiaryGroup] = useState('');
    const beneficiaryGroupBenefitedLimit = 80;
    const [remainingChars1, setRemainingChars1] = useState(beneficiaryGroupBenefitedLimit);
  
    const beneficiaryGroupBenefitedChange = (event) => {
      const newText = event.target.value;
      setBeneficiaryGroup(newText);
      setRemainingChars1(beneficiaryGroupBenefitedLimit - newText.length);
    };



    const[researchTitle,setResearchTitle]=useState('')
    const [selectedCriterion, setSelectedCriterion] = useState('Feasible (have manpower, budget, time for data collection and writing)');
    const handleCriteriaChange = (event) => {
        setSelectedCriterion(event.target.name);
    };
    return (
        <>
            <div className='xl:m-10 m-5  font-WorkSans-Regular'>
                <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '> Scientific Review (Synopsis)  </h1>
                <header className='bg-white shadow-sm my-5 p-10'>
                    <section className='mb-4'>
                        <label htmlFor="supervisor-name">Supervisor </label>
                        <div className='w-full md:w-[50%] h-fit relative'>
                            <input
                                type='text'
                                name='supervisor-name'
                                id='supervisor-name'
                                className='border rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none' type="text" placeholder='Backend Value of group supervisor' />
                            <div className='absolute top-0 right-0'>
                            </div>
                        </div>
                    </section>


                    <section className='mb-4'>
                        <label htmlFor="applicant-name">Applicant Name </label>
                        <div className='w-full md:w-[50%] h-fit relative'>
                            <input
                                type='text'
                                name='applicant-name'
                                id='applicant-name'
                                className='border rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none' type="text" placeholder='Backend Value of group lead' />
                            <div className='absolute top-0 right-0'>
                            </div>
                        </div>
                    </section>


                    <section className='mb-4'>
                        <label htmlFor="research-title">Research Title</label>
                        <div className='w-full md:w-[50%] h-fit relative'>
                            <input
                            value={researchTitle}
                            type='text'
                                name='research-title'
                                id='research-title'
                                onChange={(e)=>{setResearchTitle(e.target.value)}}
                                className='border rounded-md block py-[0.67rem] bg-lightBackground border-stone-300 px-2 w-full outline-none' type="text" placeholder='Enter Research Title' />
                            <div className='absolute top-0 right-0'>
                            </div>
                        </div>
                    </section>



                    <p className="mt-5 mb-2 w-full md:w-[50%]">
        Name the beneficiary group clearly identified that will benefit from the information generated in your research
      </p>
      <section className="mb-4">
        <div className="w-full md:w-[50%] h-fit relative">
          <div className={` ${remainingChars1 < 10 && ('text-red-600')} absolute right-4 top-1`}>
            {remainingChars1} /{beneficiaryGroupBenefitedLimit}
          </div>
          <textarea
            value={beneficiaryGroupBenefited}
            className="border rounded-md block pt-8 pb-[0.67rem] bg-lightBackground border-stone-300 px-3 w-full outline-none"
            rows="4"
            cols="50"
            maxLength={beneficiaryGroupBenefitedLimit}
            placeholder="Enter text here..."
            onChange={beneficiaryGroupBenefitedChange}
          ></textarea>
        </div>
      </section>


                  
                    <button className='bg-epsilon px-6 py-2 rounded-md text-white'>
                        Save
                    </button>
                </header>
            </div>
        </>
    )
}
