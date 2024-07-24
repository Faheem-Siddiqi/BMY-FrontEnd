import React from 'react'
import { IoLogoFacebook } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
export default function Footer() {
  return (
    <>
      <footer className='bg-iota'>
        <div className="xl:p-10 p-5 ">
          <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8   ">
            <div className="flex flex-col font-CormorantGaramond-Regular ">
              <h2 className="font-bold  text-zeta text-4xl">BMY </h2>
              <p className=" text-4xl text-primary">Health</p>
              <p className=" text-mist">PAKISTAN</p>
            </div>
            <div className="flex flex-col">
              <h1 className=" font-bold  font-WorkSans-Regular text-2xl text-black">About Us</h1>
              <p className="mt-2  md:pr-[5rem] text-primary">
                This is a project for Developing a Culture of Ethical and Quality
                Research in Country by Capacity Building, Facilitation and
                Collaborations.
              </p>
            </div>
            <div className="flex flex-col">
              <h1 className=" font-bold  font-WorkSans-Regular text-2xl text-black">Reach Us</h1>
              <div className='mt-2'>
                <div className="flex flex-col mt-2">
                  <p className="font-bold  font-WorkSans-Regular text-lg text-black ">Email</p>
                  <p className='text-primary'> info@bmyhealth.com</p>
                </div>
                <div className="flex flex-col mt-2">
                  <p className="font-bold  font-WorkSans-Regular text-lg text-black ">Address</p>
                  <p className='text-primary'> DHA Lahore, Pakistan</p>
                </div>
                <div className="flex flex-col mt-2">
                  <p className="font-bold  font-WorkSans-Regular text-lg text-black ">BMY Health Pakistan</p>
                  <p className='text-primary'>bmyhealth.com</p>
                </div>
                <div className="flex flex-col mt-2">
                  <p className="font-bold  font-WorkSans-Regular text-lg text-black ">BMY Health Canada</p>
                  <p className='text-primary'> bmyhealth.ca</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold font-WorkSans-Regular text-2xl text-black">Download Our Newsletter</h1>
              <button className="mt-6 px-6 max-w-fit py-3 rounded-md group relative overflow-hidden bg-epsilon text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon">
                <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                News Letter
              </button>
              <h1 className="font-bold font-WorkSans-Regular rounded-box text-2xl my-2 text-black">Our Socials</h1>
              <div className="flex gap-3 mt-2 items-center">
                <a href="https://www.facebook.com/BMYHealthPak" target="_blank" rel="noopener noreferrer">
                  <IoLogoFacebook className="text-epsilon text-[1.7rem]" />
                </a>
                <a href="https://www.instagram.com/bmyhealthpak/?igsh=MXQ0aGt5OXMzbmU5MA%3D%3D" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="text-epsilon text-2xl" />
                </a>
                <a href="https://www.linkedin.com/company/bmy-health/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="text-epsilon text-2xl" />
                </a>
                <a href="https://twitter.com/bmyhealth" target="_blank" rel="noopener noreferrer">
                  <BsTwitterX className="text-epsilon text-xl ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <hr className='border-primary  border-opacity-20' />
        <div className="text-center py-8">
          <p className="text-primary font-Satoshi-Black text-sm">Copyright © 2024 - BMY Health Pakistan</p>
        </div>
      </footer></>
  )
}
