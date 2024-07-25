import React from 'react'
import Notifications from './Notifications.jsx'
import { Link } from 'react-router-dom'
import { BiSolidLogInCircle } from "react-icons/bi";
export default function Navbar() {
    return (
        <>
            <div className="md:flex-row flex-col justify-between items-center flex  md:p-10 p-5  min-h-fit px-4 md:h-20 md:py-0 py-5 bg-white shadow-sm ">
                <div className="">
                    <div className='font-CormorantGaramond-Regular items-center justify-center  flex flex-col w-fit  ' >
                        <h1 className="text-3xl  gap-1 flex">
                            <p className='text-zeta font-bold '>BMY</p>
                            <p className='text-primary font-semibold'>Health</p>
                        </h1>
                        <p className='font-light text-lg   text-mist'>Pakistan</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Link to='/login'
                        className="my-5 py-2 px-7  font-semibold rounded-md group relative overflow-hidden  bg-epsilon  text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon ">
                        <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                        Login
                    </Link>
                    <Link to='/sign-up'
                        className=" max-h-fit h-fit  min-h-fit py-2 px-3 rounded-md  group relative inline-flex items-center justify-center overflow-hidden border border-epsilon font-medium text-epsilon shadow-md transition duration-300 ease-out ">
                        <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-epsilon text-white duration-300 group-hover:translate-x-0">
                            <BiSolidLogInCircle className='text-2xl' />   <span className='mx-2'>Signup</span>
                        </span>
                        <span className="ease absolute flex h-full w-full transform items-center justify-center text-epsilontransition-all duration-300 group-hover:translate-x-full">Signup</span>
                        <span className="invisible relative"> x Signup </span>
                    </Link>
                </div>
            </div>
        </>
    )
}
