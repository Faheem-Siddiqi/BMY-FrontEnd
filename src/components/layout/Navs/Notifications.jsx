import React from 'react'
import { IoNotifications } from "react-icons/io5";
export default function Notifications() {
    return (
        <>
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className=" avatar">
                    <div className="mx-5">
                        <IoNotifications
                            className='text-zeta text-opacity-50 text-2xl' />
                    </div>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-sm z-[1] mt-1  w-[18rem]  lg:w-96 md:w-80  p-5 shadow">
                    <li className='hover:bg-epsilon hover:bg-opacity-35 rounded-sm duration-300 my-1  px-2 py-1 cursor-pointer'>Settings</li>
                    <li className='hover:bg-epsilon hover:bg-opacity-35 rounded-sm duration-300 my-1  px-2 py-1 cursor-pointer'>Logout</li>
                </ul>
            </div>
        </>
    )
}
