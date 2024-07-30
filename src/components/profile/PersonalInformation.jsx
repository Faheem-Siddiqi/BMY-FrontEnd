import React, { useState } from 'react'
import profile from '../../assets/images/Profile.png'
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import CreateSvg from '../../assets/svgs/CreateSvg'
export default function PersonalInformation() {

    const [profileimg, setProfileImg] = useState('no-file')
    const [fullName, setFullName] = useState('')
    return (
        <>
        
            <div className='flex  my-5 items-center justify-start gap-3'>
                <div className='  w-[70px] h-[70px] rounded-full'>
                    <img src={profile} className=' w-full object-cover rounded-full h-full' alt="profile" />
                   
                
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
                        
                        <div className=' relative w-[8rem] h-[8rem] rounded-full'>
                            <img src={profile} className='w-full object-cover  rounded-full h-full' alt="user-image" />
                       
                            <label
                            
                            htmlFor='profile-image'
                            className='w-[33px] h-[33px] rounded-full cursor-pointer right-[0.15rem] bg-epsilon p-1 absolute bottom-[0.25rem]'>
                    <MdModeEditOutline className='text-xl text-white mt-[.2rem] ml-[.2rem]' />
                </label>
                        </div>
                    </div>
                    <div className="  ">
                        <input
                           
                             accept="image/png,image/jpeg"
                            name='profile-image' id='profile-image'
                            onChange={(e) => { setProfileImg(e.target.files) }}
                            className='w-0' type="file" />
                        
                    </div>
                </section>
                <section className='mt-5'>
                    <h1 className='font-bold  text-xl'>Profile Name</h1>
                    <p className='font-semibold my-2'>Dispaly Name</p>
                    <label htmlFor="full-name" className='text-sm '>Full-Name</label>
                    <div className='w-full md:w-[40%] h-fit relative'>
                        <input
                            name='full-name'
                            id='full-name'
                            value={fullName}
                            onChange={(e)=>{setFullName(e.target.val)}}
                            className='border rounded-md block py-2 bg-lightBackground border-stone-300 px-2 w-full outline-none ' type="text" placeholder='John Doe' />
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
