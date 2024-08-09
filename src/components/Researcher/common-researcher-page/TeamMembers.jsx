import React, { useState, useEffect } from 'react';
import Sidebar from '../../layout/Sidebar.jsx';
import Table from '../../Common/Table.jsx';
import { MdOutlineGroupOff } from "react-icons/md";
import UserNavbar from '../../layout/Navs/UserNavbar.jsx';
import Loader from '../../layout/Loader.jsx';
import DefaultImage from '../../../assets/images/Profile.png';
import toast from 'react-hot-toast';
import Fellows from '../group-members/Fellows.jsx';
export default function TeamMembers() {
  const [showTeam, setShowTeam] = useState(false);
  const [team, setTeam] = useState({});
  const [loading, setLoading] = useState(false);
  const [groupLeads, setGroupLeads] = useState([]);
  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates on unmounted components
    let hasFetched = false; // Flag to prevent multiple fetches
    const fetchResearcherTeam = async () => {
      if (hasFetched) return; // Prevent additional fetch
      hasFetched = true;
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/team/getResearcherTeam`, {
          method: "GET",
          redirect: "follow",
          credentials: "include",
        });
        if (!response.ok) {
          setLoading(false);
          setShowTeam(true);
          return;
        }
        const result = await response.json();
        if (isMounted) {
          if (result.success) {
            console.log(result)
            setLoading(false);
            if (result.team && Object.keys(result.team).length > 0) {
              setShowTeam(true);
              setTeam(result.team);
            } else {
              setShowTeam(false);
              fetchAllLeads();
            }
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error(error);
          toast.error("An error occurred while fetching user details.");
        }
      }
    };
    const fetchAllLeads = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/team/getAllGroupLeads`, {
          method: "GET",
          redirect: "follow",
        });
        if (!response.ok) {
          setLoading(false);
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (isMounted) {
          if (result.success) {
            const formattedLeads = result.groupLeads.map(lead => ({
              id: lead._id,
              profileImage: lead.pfp ? lead.pfp : '',
              name: lead.fullname ? lead.fullname : '',
              email: lead.workemail ? lead.workemail : '',
              institution: lead.experience?.company ? lead.experience.company : 'No Data Available',
              designation: lead.experience?.designation ? lead.experience.designation : 'No Data Available'
            }));
            setGroupLeads(formattedLeads);
            setLoading(false);
          } else {
            toast.error("Failed to load user details.");
          }
        }
      } catch (error) {
        if (isMounted) {
          toast.error("An error occurred while fetching user details.");
        }
      }
    };
    fetchResearcherTeam();
    fetchAllLeads()
    return () => {
      isMounted = false;
    };
  }, [showTeam]);
  useEffect(() => {
  }, [team]);
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="flex xl:flex-row flex-col min-h-[100vh] font-Satoshi-Black overflow">
        <Sidebar pageName='team-members' />
        <section className='w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
          <UserNavbar />
          <div className='xl:m-10 m-5'>
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'>Group Members</h1>
            {showTeam && (<>
              <p className='font-semibold my-2'>Members</p>
              <Fellows myMembers={team} />
            </>)}
          </div>
          {!showTeam && (
            <section className='my-5 xl:m-10 m-5'>
              <header className='bg-white shadow-sm my-5 p-5 md:p-10'>
                <h1 className='font-semibold flex items-center gap-2'>
                  <MdOutlineGroupOff className='text-2xl' />
                  Team Not Found
                </h1>
              </header>
              <p className='font-semibold my-2'>Join Now</p>
              <Table
                className='w-[99%]'
                rowData={groupLeads.map(lead => ({
                  id: lead.id,
                  profileImage: lead.profileImage || DefaultImage,
                  name: lead.name,
                  email: lead.email,
                  institution: lead.institution,
                  designation: lead.designation
                }))}
                header={['Group Lead', 'Institution', 'Designation', 'Requests']}
                rowRenderComponent='ShowResearcherLeads'
              />
            </section>
          )}
        </section>
      </div>
    </>
  );
}
