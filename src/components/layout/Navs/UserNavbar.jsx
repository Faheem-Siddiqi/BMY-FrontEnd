import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Notifications from './Notifications.jsx';
import { CgLogOut } from 'react-icons/cg';
import { TiEdit } from 'react-icons/ti';
import toast from 'react-hot-toast';
import DefaultImage from '../../../assets/images/Profile.png'
export default function UserNavbar() {
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation();
  const [shouldShowBanner, setShouldShowBanner] = useState(false);
  const [profilePic, setProfilePic] = useState('')
  // Handle logout
  const handleLogout = async () => {
    try {
      // Perform the logout request
      const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/user/logout`, {
        method: 'GET',
        credentials: 'include',
      });
      const result = await response.json();
      if (response.ok) {
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        toast.success('Logged out successfully');
        navigate('/');
      } else {
        toast.error(result.message || 'Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('An error occurred during logout');
    }
  };
  // fetching user image
  useEffect(() => {
    let isMounted = true;
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/user/getuserdetails`, {
          method: "GET",
          redirect: "follow",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (isMounted) {
          if (result.success) {
            const { pfp } = result.user;
            setProfilePic(pfp)
          } else {
            toast.error("Failed to load user details.");
            navigate("/login");
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error(error);
        }
      }
    };
    fetchUserDetails();
    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    const pathname = location.pathname.toLowerCase();
    if (pathname.includes('admin')) {
      setShouldShowBanner(true);
    } else {
      setShouldShowBanner(false);
    }
  }, [location.pathname]);
  return (
    <>
      <div className="navbar px-4 md:h-20 md:py-0 py-5 bg-iota border-b">
        <div className="flex-1">
          {shouldShowBanner && (
            <div className='font-CormorantGaramond-Regular items-center justify-center flex flex-col w-fit'>
              <h1 className="md:text-3xl text-xl gap-1 flex">
                <p className='text-zeta font-bold'>BMY</p>
                <p className='text-primary font-semibold'>Health</p>
              </h1>
              <p className='font-light md:text-lg text-mist'>Pakistan</p>
            </div>
          )}
        </div>
        <div className="flex-none gap-2">
          {!shouldShowBanner && <Notifications />}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="avatar">
              <div className="w-10 rounded-full">
                <img
                  className='object-cover'
                  alt="Profile"
                  src={profilePic || DefaultImage}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-sm z-[1] mt-1 w-52 p-5 shadow"
            >
              {!shouldShowBanner && (
                <li className='border-b hover:bg-epsilon hover:bg-opacity-35 rounded-sm duration-300 my-1 py-1 cursor-pointer'>
                  <Link to='/edit-profile' className='text-base flex items-center gap-1 cursor-pointer'>
                    <TiEdit />
                    <p>Edit Profile</p>
                  </Link>
                </li>
              )}
              <li className='hover:bg-epsilon hover:bg-opacity-35 rounded-sm duration-300 my-1 py-1 cursor-pointer'>
                <button onClick={handleLogout} className='text-base flex items-center gap-1 cursor-pointer'>
                  <CgLogOut />
                  <p>Logout</p>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
