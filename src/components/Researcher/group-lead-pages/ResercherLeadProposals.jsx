import React, { useEffect, useState } from 'react'
import Sidebar from '../../layout/Sidebar.jsx'
import { MdAdd } from "react-icons/md";
import { Link } from 'react-router-dom';
import Table from '../../Common/Table.jsx';
import UserNavbar from '../../layout/Navs/UserNavbar.jsx';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import DefaultImage from '../../../assets/images/Profile.png'
import Loader from '../../layout/Loader.jsx';
import { MdOutlineGroupOff } from "react-icons/md";
export default function ResercherLeadProposals() {
  const [loading, setLoading] = useState(true);
  const [leadTeam, setLeadTeam] = useState([]);
  const [supervisorCheck,setSupervisorCheck] =useState('')
  const [researchersCheck,setResearcherCheck] =useState('')
  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates on unmounted components
    const fetchLeadsTeam = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/team/getOwnerTeam`, {
          method: 'GET',
          redirect: 'follow',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (isMounted) {
          if (result.success) {
console.log(result)
if (result.team.researchers.length === 0 ) {
setResearcherCheck(true)
}
if ( result.team.supervisors.length === 0) {
  setSupervisorCheck(true)
  }
            const formattedLeads = result.team.researchers.map(LeadsTeam => ({
              id: LeadsTeam._id,
              profileImage: LeadsTeam.pfp ? LeadsTeam.pfp : '',
              name: LeadsTeam.fullname ? LeadsTeam.fullname : '',
              email: LeadsTeam.workemail ? LeadsTeam.workemail : '',
              institution: LeadsTeam.experience?.company ? LeadsTeam.experience.company : 'No Data Available',
              designation: LeadsTeam.experience?.designation ? LeadsTeam.experience.designation : 'No Data Available'
            }));
            setLeadTeam(formattedLeads);
          } else {
            toast.error('Failed to load user details.');
          }
        }
      } catch (error) {
        toast.error('An error occurred while fetching user details.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchLeadsTeam();
    return () => {
      isMounted = false;
    };
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex  xl:flex-row flex-col min-h-[100vh]   font-Satoshi-Black overflow ">
        <Sidebar pageName='teamLead-proposals' />
        <section className=' w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
          <UserNavbar />
          <div className='xl:m-10 m-5  '>
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black  '> Proposal </h1>
          {researchersCheck && ( <>              
            <header className='bg-white shadow-sm my-5 p-5 md:p-10'>
                <h1 className='font-semibold flex items-center  mb-3 gap-2'>
                  <MdOutlineGroupOff className='text-2xl' />
                  Team  Not Found
                </h1>
                <Link 
                className=''
                to='/group-lead-team'>
                Manage Teams
                </Link>
              </header>
                                </>)}
 {supervisorCheck && ( <>              
              <header className='bg-white shadow-sm my-5 p-5 md:p-10'>
                <h1 className='font-semibold flex items-center  mb-3 gap-2'>
                  <MdOutlineGroupOff className='text-2xl' />
                  Supervisor  Not Found
                </h1>
                <Link 
                className=''
                to='supervisor-details'>
                Manage Supervisors
                </Link>
              </header>
              </>)}
              <header className='bg-white shadow-sm my-5 p-16'>
              <Link to='/create-new-proposal'>
                <div className='h-[40vh] md:w-[60%] w-full mx-auto bg-lightEpsilon border-2 border-dashed flex flex-col items-center justify-center border-epsilon  p-10 rounded-md'>
                  <MdAdd className='text-epsilon text-5xl border-2 border-dashed rounded-full border-epsilon my-4 ' />
                  <h1 className='font-semibold text-xl'>Create Proposal</h1>
                </div>
              </Link>
            </header>
or
            <header className='bg-white shadow-sm my-5 px-5 py-5 md:py-10 w-full '>
              <h1 className='text-lg md:text-2xl font-bold font-Satoshi-Black  '>Proposal Name </h1>
              <div>
                <span className='font-bold my-2'>Supervisor</span>
                <span className='mx-2 my-2'>Name</span>
              </div>
              <div>
                <span className='font-bold my-2'>Lead</span>
                <span className='mx-2 my-2'>Lead</span>
              </div>
              <Link
                to='/lead-proposal'
                className='text-epsilon text-sm'>View Details. </Link>
            </header>
            <h1 className='font-semibold text-xl my-5'>Assign Section </h1>
            <Table
              className='w-[99%] '
              rowData={leadTeam.map(leadsTeamMember => ({
                id: leadsTeamMember.id,
                profileImage: leadsTeamMember.profileImage || DefaultImage,
                name: leadsTeamMember.name,
                email: leadsTeamMember.email,
                institution: leadsTeamMember.institution,
                designation: leadsTeamMember.designation
              }))}
              header={['Researcher', 'Section', 'Action']}
              rowRenderComponent='AssignResearcherTableRow'
            />
            <h1 className='font-semibold text-xl my-5'>Previous Proposals</h1>
            <Table
              className='w-[99%] '
              rowData={[
                {
                  name: 'Proposal XYZ',
                  supervisor: 'ahmed',
                  groupdLead: 'Faheem',
                  status: 'Submitted, ERC Approval pending',
                },
                {
                  name: 'Proposal XYZ',
                  supervisor: 'ahmed',
                  groupdLead: 'Faheem',
                  status: 'Group Lead Approval Pending',
                },
                {
                  name: 'Proposal XYZ',
                  supervisor: 'ahmed',
                  groupdLead: 'Faheem',
                  status: 'Accepted',
                },
                {
                  name: 'Proposal XYZ',
                  supervisor: 'ahmed',
                  groupdLead: 'Faheem',
                  status: 'ERC Remarks On Assigned Section',
                },
              ]
              }
              header={[' Name', 'Supervised By', 'Group Lead', 'Status', 'Action']}
              rowRenderComponent='previousProposalsRow'
            />
          </div>
        </section>
      </div>
    </>
  )
}
