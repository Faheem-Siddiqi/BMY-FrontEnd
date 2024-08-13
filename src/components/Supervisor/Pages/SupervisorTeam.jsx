import React, { useState, useEffect } from 'react';
import Sidebar from '../../layout/Sidebar';
import profileImage from '../../../assets/images/Profile.png';
import { LuCrown } from "react-icons/lu";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { MdAdd } from "react-icons/md";
import Table from '../../Common/Table';
import UserNavbar from '../../layout/Navs/UserNavbar.jsx';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import Loader from '../../layout/Loader.jsx';
import { PiEmptyBold } from "react-icons/pi";
import DefaultImage from '../../../assets/images/Profile.png';
import { useNavigate } from 'react-router-dom'; // Added for navigation

export default function SupervisorTeam() {
  const [owners, setOwners] = useState([]);
  const [supervisorId, setSupervisorId] = useState('');
  const [loading, setLoading] = useState(true); // Initialize loading as true
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [Groups, setGroups] = useState([]);
  const navigate = useNavigate(); // Initialize navigate for routing

  useEffect(() => {
    let isMounted = true;
    
    const fetchUserDetails = async () => {
      setLoading(true);
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
            const { _id } = result.user;
            setSupervisorId(_id);
            fetchResearcherTeam();
          } else {
            toast.error("Failed to load user details.");
            setLoading(false); // Set loading to false if there's an error
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error(error);
          toast.error("No Requests Found");
          setLoading(false); // Set loading to false if there's an error
        }
      }
    };

    const fetchResearcherTeam = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/teams/getSupervisorsRequests`, {
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
            const formattedOwner = result.teams.map(team => ({
              id: team._id,
              profileImage: team.owner.pfp ? team.owner.pfp : DefaultImage, // Use DefaultImage if no profileImage
              name: team.owner.fullname || 'N/A',
              institution: team.owner.experience?.company || 'N/A',
              researchers: Array.isArray(team.researchers) ? team.researchers.length : 0,
              email: team.owner.workemail || '',
              requestId: team.supervisorRequests?.filter(request => request.supervisor?._id === supervisorId)
                .map(request => request._id) || [],
            }));
            setOwners(formattedOwner);
          } else {
            toast.error("Failed to load team details.");
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error(error);
          toast.error("No Requests Found.");
        }
      } finally {
        if (isMounted) {
          setLoading(false); // Ensure loading is set to false after data fetching
        }
      }
    };

    fetchUserDetails();
    
    return () => {
      isMounted = false;
    };
  }, [supervisorId, navigate]); // Added dependencies

  const members = Groups[currentTeamIndex] || [];
  const nextTeam = () => {
    if (currentTeamIndex < Groups.length - 1) {
      setCurrentTeamIndex(currentTeamIndex + 1);
    }
  };
  const previousTeam = () => {
    if (currentTeamIndex > 0) {
      setCurrentTeamIndex(currentTeamIndex - 1);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex xl:flex-row flex-col font-WorkSans-Regular">
        <Sidebar pageName='supervisor-teams' />
        <section className='w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
          <UserNavbar />
          <div className='xl:m-10 m-5'>
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'>Teams Requests</h1>
            {owners.length > 0 ? (
              <Table
                className='w-[99%] md:[50vh]'
                rowData={owners.map(owner => ({
                  teamId: owner.id,
                  profileImage: owner.profileImage,
                  name: owner.name,
                  email: owner.email,
                  institution: owner.institution,
                  members: owner.researchers,
                  requestId: owner.requestId,
                }))}
                header={['Lead Details', 'Institution', 'Members', 'Action']}
                rowRenderComponent='TeamRequestsRow'
              />
            ) : (
              <header className='bg-white shadow-sm my-8 p-5 md:p-16'>
                <div className='h-[40vh] md:w-[60%] w-full mx-auto bg-lightEpsilon border-2 border-dashed flex flex-col items-center justify-center border-epsilon p-10 rounded-md'>
                  <PiEmptyBold className='text-epsilon text-5xl rounded-full border-epsilon my-4' />
                  <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'>Researchers</h1>
                  <p className='font-semibold my-2'>No Researcher Request Found.</p>
                </div>
              </header>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
