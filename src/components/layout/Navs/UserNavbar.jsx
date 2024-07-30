import React, { useEffect, useState } from 'react';
import Notifications from './Notifications.jsx'
import { Link } from 'react-router-dom'
import { CgLogOut } from "react-icons/cg";
import { TiEdit } from 'react-icons/ti';
import { useLocation } from 'react-router-dom';
// Backend-Integration-Imports
// Backend-Integration-Imports
export default function UserNavbar() {
  const location = useLocation();
  const [shouldShowBanner, setShouldShowBanner] = useState(false);
  useEffect(() => {
    // Check if the current path includes the word 'admin' to show logo and hide notification icon
    const pathname = location.pathname.toLowerCase();
    if (pathname.includes('admin')) {
      setShouldShowBanner(true);
    } else {
      setShouldShowBanner(false);
    }
  }, [location.pathname]);
  return (
    <>
      <div className="navbar px-4 md:h-20 md:py-0 py-5 bg-iota shadow-sm ">
        <div className="flex-1">
          {shouldShowBanner && (<>
            <div className='font-CormorantGaramond-Regular items-center justify-center  flex flex-col w-fit  ' >
              <h1 className="md:text-3xl text-xl  gap-1 flex">
                <p className='text-zeta font-bold '>BMY</p>
                <p className='text-primary font-semibold'>Health</p>
              </h1>
              <p className='font-light md:text-lg    text-mist'>Pakistan</p>
            </div>
          </>)}
        </div>
        <div className="flex-none gap-2">
          {!shouldShowBanner && (<>
            <Notifications />
          </>
          )}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className=" avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-sm z-[1] mt-1   w-52 p-5 shadow">
             
             {!shouldShowBanner && (<>
              <li className=' hover:bg-epsilon hover:bg-opacity-35 rounded-sm duration-300 my-1  py-1 cursor-pointer'>
                <Link to='/edit-profile' className=' text-base flex items-center gap-1 cursor-pointer'>
                  <TiEdit className='' />
                  <p>Edit Profile</p>
                </Link>
              </li>
              </>)}
              <li className=' hover:bg-epsilon hover:bg-opacity-35 rounded-sm duration-300 my-1  py-1 cursor-pointer'>
                <Link to='/edit-profile' className=' text-base flex items-center gap-1 cursor-pointer'>
                  <CgLogOut className='' />
                  <p>Logout</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
