import React, { useState } from 'react';
import profile from '../../assets/images/Profile.png';
import { MdModeEditOutline } from "react-icons/md";
import CreateSvg from '../../assets/svgs/CreateSvg';
export default function PersonalInformation({ formData, onInputChange, onSubmit, email }) {
  const [localImage, setLocalImage] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLocalImage(file);
      onInputChange(event); // Ensure the parent component also gets the updated image
    }
  };
  // Determine the image source
  const imageSrc = localImage ? URL.createObjectURL(localImage) : formData.profileImg || profile;
  return (
    <>
      <div className='flex my-5 items-center justify-start gap-3'>
        <div className='w-[70px] h-[70px] rounded-full border-epsilon border-2'>
          <img src={imageSrc} className='w-full object-cover rounded-full h-full' alt="profile" />
        </div>
        <div>
          <h1 className='font-bold text-lg'>{formData.fullName}</h1>
          <p className='text-stone-700 text-sm'>{email}</p>
        </div>
      </div>
      <h1 className='text-3xl font-bold font-Satoshi-Black'>Profile</h1>
      <header className='bg-white shadow-sm my-5 p-10'>
        <section>
          <h1 className='font-bold text-xl'>Profile Picture</h1>
          <p className='font-semibold my-2'>Display Picture</p>
          <div className='flex justify-center items-center'>
            <div className='relative w-[8rem] h-[8rem] rounded-full border-epsilon border-2'>
              <img src={imageSrc} className='w-full object-cover rounded-full h-full' alt="user-image" />
              <label
                htmlFor='profile-image'
                className='w-[33px] h-[33px] rounded-full cursor-pointer right-[0.15rem] bg-epsilon p-1 absolute bottom-[0.25rem]'
              >
                <MdModeEditOutline className='text-xl x text-white mt-[.2rem] ml-[.2rem]' />
              </label>
            </div>
          </div>
          <div className="">
            <input
              name='profileImg'
              id='profile-image'
              type="file"
              accept="image/png,image/jpeg"
              onChange={handleImageChange}
              className='w-0'
            />
          </div>
        </section>
        <section className='mt-5'>
          <h1 className='font-bold text-xl'>Profile Name</h1>
          <p className='font-semibold my-2'>Display Name</p>
          <label htmlFor="full-name" className='text-sm'>Full Name</label>
          <div className='w-full md:w-[40%] h-fit relative'>
            <input
              name='fullName'
              id='full-name'
              value={formData.fullName}
              onChange={onInputChange}
              className='border rounded-md block py-2 bg-lightBackground border-stone-300 px-2 w-full outline-none'
              type="text"
              placeholder='John Doe'
            />
            <CreateSvg />
          </div>
          <button
            onClick={onSubmit}
            className="my-5 py-2 px-5 rounded-md group relative overflow-hidden bg-epsilon text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon"
          >
            <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
            Update
          </button>
        </section>
      </header>
    </>
  );
}
