import React from 'react'
import CreateSvg from '../../assets/svgs/CreateSvg.jsx'
export default function Affiliation() {
    return (
        <>
            <h1 className='text-3xl font-bold font-Satoshi-Black'>Affiliation</h1>
            <header className='bg-white shadow-sm my-5 p-10'>
                <section>
                    <div className='my-2'>
                        <h1 className='font-bold  text-xl'>Designation</h1>
                        <p className='font-semibold my-2'>Current Service</p>
                        <label htmlFor="designation-name" className='text-sm '>Designation</label>
                        <div className='w-full md:w-[40%] h-fit relative'>
                            <input
                                name='designation-name'
                                id='designation-name'
                                className='border rounded-md block py-2 bg-lightBackground border-stone-300 px-2 w-full outline-none' type="text" placeholder='Designation' />
                            <CreateSvg />
                        </div>
                    </div>
                    <div className='my-8'>
                        <h1 className='font-bold text-xl'>Institute / Organization</h1>
                        <p className='font-semibold my-2'>Affiliation</p>
                        <label htmlFor="designation-name" className='text-sm '>Institute or Organization Name</label>
                        <div className='w-full md:w-[40%] h-fit relative'>
                            <input
                                name='organization-name'
                                id='organization-name'
                                className='border rounded-md block py-2 bg-lightBackground border-stone-300 px-2 w-full outline-none' type="text" placeholder='BMY Health' />
                            <CreateSvg />
                        </div>
                    </div>

                    <button
                                   
                                   className="mb-2 py-2 px-5 rounded-md group relative overflow-hidden  bg-epsilon  text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon ">
                                   <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                                   Update 
                               </button>
                  
                </section>
                <section>
                    <div className='my-2'>
                        <h1 className='font-bold  text-xl'>Location</h1>
                        <p className='font-semibold my-2'>Country</p>
                        <label htmlFor="country-name" className='text-sm '>Located in Country</label>
                        <div className='w-full md:w-[40%] h-fit relative'>
                            <input
                                name='country-name'
                                id='country-name'
                                className='border rounded-md block py-2 bg-lightBackground border-stone-300 px-2 w-full outline-none' type="text" placeholder='Designation' />
                            <CreateSvg />
                        </div>
                    </div>
                    <label htmlFor="city-name-name" className='text-sm '>City</label>
                    <div className='w-full md:w-[40%] h-fit relative'>
                        <input
                            name='city-name'
                            id='city-name'
                            className='border rounded-md block py-2 bg-lightBackground border-stone-300 px-2 w-full outline-none' type="text" placeholder='Lahore' />
                        <CreateSvg />
                    </div>
                    <button
                                   
                                   className="my-5 py-2 px-5 rounded-md group relative overflow-hidden  bg-epsilon  text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon ">
                                   <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                                   Update 
                               </button>
                  
                </section>
            </header>
        </>
    )
}
