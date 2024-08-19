import React, { useState, useEffect } from 'react';
import Sidebar from '../../layout/Sidebar.jsx';
import Table from '../../Common/Table.jsx';
import { MdOutlineGroupOff } from "react-icons/md";
import UserNavbar from '../../layout/Navs/UserNavbar.jsx';
import Loader from '../../layout/Loader.jsx';
import DefaultImage from '../../../assets/images/Profile.png';
import toast from 'react-hot-toast';
import Fellows from '../group-members/Fellows.jsx';
import { getCookie } from "cookies-next";

export default function TeamMembers() {
  const [noTeam, setNoTeam] = useState(false);
  const [team, setTeam] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [groupLeads, setGroupLeads] = useState([]);
  useEffect(() => {
    let isMounted = true; 
    const fetchResearcherTeam = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const token = getCookie("token");
        myHeaders.append("Authorization", `Bearer ${token}`);
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/team/getResearcherTeam`, {
          method: "GET",
          redirect: "follow",
          headers: myHeaders,
          credentials: "include",
        });
        if (response.status === 404) {
          console.log('Researcher has no team');
          setNoTeam(true);
          setLoading(false);
          return;
        }
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (isMounted) {
          if (result.success) {
            setTeam(result.team);
            setNoTeam(false);
          } else {
            toast.error("Failed to load team details.");
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error(error);
          toast.error("An error occurred while fetching team details.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    const fetchAllLeads = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const token = getCookie("token");
        myHeaders.append("Authorization", `Bearer ${token}`);
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/team/getAllGroupLeads`, {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (isMounted) {
          if (result.success) {
            const formattedLeads = result.groupLeads.map(lead => ({
              id: lead._id,
              profileImage: lead.pfp || DefaultImage,
              name: lead.fullname || 'No Name',
              email: lead.workemail || 'No Email',
              institution: lead.experience?.company || 'No Data Available',
              designation: lead.experience?.designation || 'No Data Available'
            }));
            setGroupLeads(formattedLeads);
          } else {
            toast.error("Failed to load group leads.");
          }
        }
      } catch (error) {
        if (isMounted) {
          toast.error("An error occurred while fetching group leads.");
        }
      }
    };
    fetchResearcherTeam();
    fetchAllLeads();
    return () => {
      isMounted = false;
    };
  }, []);
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
            <p className='font-semibold my-2'>Members</p>
            {team ? (
              <Fellows myMembers={team} />
            ) : noTeam ? (
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
            ) : 'null'}
          </div>
        </section>
      </div>
    </>
  );
}
