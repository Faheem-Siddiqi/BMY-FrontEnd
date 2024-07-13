import React from 'react'
import profile from '../../assets/images/Profile.png'
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
                    <div className="flex md:flex-row flex-col justify-center items-center gap-4 my-5 md:my-10">
                        <input name='profile-image' id='profile-image' className='w-0' type="file" />
                        <label htmlFor='profile-image' className='py-2 px-5 rounded-md  cursor-pointer text-white w-fit bg-epsilon'>Upload Image</label>
                        <button className='py-2 px-5 rounded-md  hover:text-white border   text-epsilon  border-epsilon w-fit duration-500 hover:bg-epsilon'>Update Image</button>
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
                    <button className='py-2 px-5 rounded-md my-5 text-white w-fit bg-epsilon'>Update Name</button>
                </section>
            </header>
        </>
    )
}
