import React, { useState, useEffect } from 'react';
import Sidebar from '../../layout/Sidebar.jsx';
import profileImage from '../../../assets/images/Profile.png';
import CreateSvg from '../../../assets/svgs/CreateSvg.jsx';
import UserNavbar from '../../layout/Navs/UserNavbar.jsx';
import Table from '../../Common/Table.jsx';
import { MdOutlineKeyboardBackspace, MdOutlineGroupOff } from "react-icons/md";
import Loader from '../../layout/Loader.jsx';
import toast from 'react-hot-toast';
import { getCookie } from "cookies-next";

export default function AddTeamMembers() {
  const [membersRequesting, setMembersRequesting] = useState([]);
  const [filterMembersRequesting, setFilterMembersRequesting] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    let isMounted = true;
    const fetchLeadTeam = async () => {
      setLoading(true);
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const token = getCookie("token");
        myHeaders.append("Authorization", `Bearer ${token}`);
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/team/getOwnerTeam`, {
          method: "GET",
          redirect: "follow",
          headers: myHeaders,
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (isMounted) {
          if (result.success) {
            const formattedLeads = result.team.requests.map(request => ({
              id: request._id,
              profileImage: request.researcher.pfp || '',
              name: request.researcher.fullname || '',
              email: request.researcher.workemail || '',
              institution: request.researcher.experience?.company || 'No Data Available',
              designation: request.researcher.experience?.designation || 'No Data Available',
              status: request.status || 'No Status Available'
            }));
            setMembersRequesting(formattedLeads);
          } else {
            toast.error("Failed to load user details.");
          }
        }
      } catch (error) {
        if (isMounted) {
          toast.error("An error occurred while fetching user details.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchLeadTeam();
    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    const filteredLeads = membersRequesting.filter(member =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilterMembersRequesting(filteredLeads);
  }, [searchQuery, membersRequesting]);
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  if (loading) {
    return <Loader />;
  }
  const noRequest = membersRequesting.length === 0;
  return (
    <>
      <header className="flex xl:flex-row flex-col h-[100vh] font-Satoshi-Black">
        <Sidebar pageName='researcher-proposals' />
        <section className='w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
          <UserNavbar />
          <div className='xl:m-10 m-5'>
            <header className='xl:px-10 px-5 my-5'>
              <div className="flex flex-col gap-5 md:justify-between justify-start md:items-center items-start md:flex-row">
                <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'>Add Team Members</h1>
                <div onClick={() => window.history.back()} className='group cursor-pointer flex items-center gap-1'>
                  <MdOutlineKeyboardBackspace className='group-hover:-translate-x-1 duration-500' />
                  <button className='font-semibold'>Go Back</button>
                </div>
              </div>
              {noRequest ? (
                <header className='bg-white shadow-sm my-5 p-5 md:p-10'>
                  <h1 className='font-semibold flex items-center gap-2'>
                    <MdOutlineGroupOff className='text-2xl' />
                    Requests Not Found
                  </h1>
                </header>
              ) : (
                <p className='font-semibold my-2'>All Researchers Available</p>
              )}
            </header>
            {!noRequest && (
              <div className='xl:m-10 m-5'>
                <div className="flex md:justify-end my-5">
                  <div className='w-full md:px-0 px-5 md:w-[30%] h-fit relative'>
                    <input
                      name='search-name'
                      id='search-name'
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className='border rounded-md block py-2 bg-lightBackground border-stone-300 px-2 w-full outline-none'
                      type="text"
                      placeholder='Search by email'
                    />
                    <CreateSvg className='md:block hidden' />
                  </div>
                </div>
                <Table
                  className='w-[99%]'
                  rowData={filterMembersRequesting.map(lead => ({
                    id: lead.id,
                    profileImage: lead.profileImage || profileImage,
                    name: lead.name,
                    email: lead.email,
                    institution: lead.institution,
                    designation: lead.designation
                  }))}
                  header={['Researchers', 'Institution', 'Designation', 'Requests']}
                  rowRenderComponent='researchersRow'
                />
              </div>
            )}
          </div>
        </section>
      </header>
    </>
  );
}
