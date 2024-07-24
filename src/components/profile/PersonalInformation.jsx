import React from 'react'
import profile from '../../assets/images/Profile.png'
import { AiOutlineCloudUpload } from "react-icons/ai";
import CreateSvg from '../../assets/svgs/CreateSvg'
export default function PersonalInformation() {
    return (
        <>
            <div className='flex  my-5 items-center justify-start gap-3'>
                <div className='w-[70px] h-[70px] rounded-full'>
                    <img src={profile} className='w-full object-cover rounded-full h-full' alt="profile" />
                </div>
                <div>
                    <h1 className='font-bold text-lg'>User Name</h1>
                    <p className=' text-stone-700 text-sm'>Researcher</p>
                </div>
            </div>
            <h1 className='text-3xl font-bold font-Satoshi-Black'>Profile</h1>
            <header className='bg-white shadow-sm my-5 p-10'>
                <section>
                    <h1 className='font-bold  text-xl'>Profile Picture</h1>
                    <p className='font-semibold my-2'>Dispaly Picture</p>
                    <div className='flex justify-center  items-center'>
                        <div className='w-[8rem] h-[8rem] border rounded-full p-1 '>
                            <img src={profile} className='w-full object-cover  rounded-full h-full' alt="" />
                        </div>
                    </div>
                    <div className=" gap-4 md:my-7 my-5 ">
                        <input name='profile-image' id='profile-image' className='w-0' type="file" />
                      <div className="flex md:flex-row flex-col  justify-center gap-4">
                      <label
                                   htmlFor='profile-image'
                                    className=" py-2 px-5 rounded-md group relative overflow-hidden  bg-epsilon  text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon ">
                                    <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                                  Upload
                                </label>
                                <button
                                    className="  py-2 px-5 rounded-md  group relative inline-flex items-center justify-center overflow-hidden border border-epsilon font-medium text-epsilon shadow-md transition duration-300 ease-out ">
                                    <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-epsilon text-white duration-300 group-hover:translate-x-0">
                                   <AiOutlineCloudUpload className='text-2xl'/>   <span className='mx-2'>Update</span>
                                    </span>
                                    <span className="ease absolute flex h-full w-full transform items-center justify-center text-epsilontransition-all duration-300 group-hover:translate-x-full">Update</span>
                                    <span className="invisible relative"> x Update </span>
                                </button>
                      </div>
                    </div>
                </section>
                <section className='mt-10'>
                    <h1 className='font-bold  text-xl'>Profile Name</h1>
                    <p className='font-semibold my-2'>Dispaly Name</p>
                    <label htmlFor="full-name" className='text-sm '>Full-Name</label>
                    <div className='w-full md:w-[40%] h-fit relative'>
                        <input
                            name='full-name'
                            id='full-name'
                            className='border rounded-md block py-2 bg-lightBackground border-stone-300 px-2 w-full outline-none ' type="text" placeholder='John Doe' />
                        <CreateSvg />
                    </div>
                    <button
                                    className="my-5 py-2 px-5 rounded-md group relative overflow-hidden  bg-epsilon  text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon ">
                                    <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                                    Update Name
                                </button>
                </section>
            </header>
        </>
    )
}
