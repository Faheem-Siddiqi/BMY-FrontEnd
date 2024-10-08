import React, { useEffect, useState } from 'react';
import Sidebar from '../../layout/Sidebar.jsx';
import { MdAdd, MdOutlineGroupOff } from "react-icons/md";
import { Link } from 'react-router-dom';
import { ImFilesEmpty } from "react-icons/im";
import Table from '../../Common/Table.jsx';
import { isBefore, subMonths } from 'date-fns';
import UserNavbar from '../../layout/Navs/UserNavbar.jsx';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import DefaultImage from '../../../assets/images/Profile.png';
import Loader from '../../layout/Loader.jsx';
import { getCookie } from "cookies-next";
export default function ResercherLeadProposals() {
  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [leadTeam, setLeadTeam] = useState([]);
  const [loginUserEmail, setLoginUserEmail] = useState('N.A')
  const [supervisorCheck, setSupervisorCheck] = useState(false);
  const [researchersCheck, setResearcherCheck] = useState(false);
  const [proposalCheck, setProposalCheck] = useState(false);
  const [previousProposals, setFormattedPreviousProposal] = useState([]);
  const [proposalDetail, setProposalDetail] = useState({});
  useEffect(() => {
    let isMounted = true;
    const fetchUserDetails = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const token = getCookie("token");
        myHeaders.append("Authorization", `Bearer ${token}`);
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/user/getuserdetails`, {
          method: "GET",
          redirect: "follow",
          headers: myHeaders,
          credentials: "include",
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        if (result.success) {
          setLoginUserEmail(result.user?.workemail || 'N/A');
        } else {
          toast.error("Failed to load user details.");
        }
      } catch (error) {
        toast.error(`Error fetching user details: ${error.message}`);
      }
    };
    const fetchProposal = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const token = getCookie("token");
        myHeaders.append("Authorization", `Bearer ${token}`);
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/by-group-lead`, {
          method: 'GET',
          redirect: 'follow',
          headers: myHeaders,
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (isMounted) {
          if (result.success) {
            const formattedProposal = result.notAcceptedProposals?.[0] || {};
            const formattedProposalDetail = {
              id: formattedProposal._id || ' ',
              cretaedAt: formattedProposal.createdAt ? (() => {
                const date = new Date(formattedProposal.createdAt);
                const number = formattedProposal.proposalId || 'N/A';
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear();
                return `${number}-${month}-${year}`;
              })() : 'N/A',
              title: formattedProposal.title || ' ',
              status: formattedProposal.status || ' ',
              lead: formattedProposal.creator?.fullname || ' ',
            };
            setProposalDetail(formattedProposalDetail);
            const formattedPreviousProposal = result.acceptedProposals.map(proposal => {
              const sections = proposal.sections || {};
              const ethicalReview = sections.ethicalReview || {};
              const questions = ethicalReview.questions || {};
              return {
                ProposalID: proposal._id || 'id',
                leadName: proposal.creator?.fullname || 'Unknown',
                mainSupervisor: proposal.supervisorId || 'Not assigned',
                auditForm: proposal.auditForm || {},
                auditApproved: proposal.auditApproved || false,
                sections: sections,
                title: proposal.title || 'N/A',
                creator: proposal.creator.workemail || 'N/A',
                riskScore: questions['Ethical Risk'] || 0,
                benefitScore: questions['Benefit Score'] || 0,
                approvalMember: proposal.approvalMember || {},
                ercMembers: proposal.assignedErcMember || [],
                auditSubmitted: proposal.auditSubmitted || false,
                showAudit: proposal.showAudit || false,
                BMYid: proposal.createdAt ? (() => {
                  const date = new Date(proposal.createdAt);
                  const number = proposal.proposalId || 'N/A';
                  const month = (date.getMonth() + 1).toString().padStart(2, '0');
                  const year = date.getFullYear();
                  return `${number}-${month}-${year}`;
                })() : 'N/A',
                acceptedAt: proposal.acceptedAt ? (new Date(proposal.acceptedAt).toISOString().split('T')[0]) : 'N/A'
              };
            });
            // console.log(formattedPreviousProposal)
            setFormattedPreviousProposal(formattedPreviousProposal);
            setProposalCheck(result.notAcceptedProposals?.length > 0 || false);
          } else {
            toast.error('Failed to load proposal details.');
          }
        }
      } catch (error) {
        toast.error(`Error: ${error.message}`);
      }
    };
    const fetchLeadsTeam = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const token = getCookie("token");
        myHeaders.append("Authorization", `Bearer ${token}`);
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/team/getOwnerTeam`, {
          method: 'GET',
          redirect: 'follow',
          headers: myHeaders,
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (isMounted) {
          if (result.success) {
            if (result.team.researchers.length === 0) {
              setResearcherCheck(true);
            }
            if (result.team.supervisors.length === 0) {
              setSupervisorCheck(true);
            }
            const formattedLeads = result.team.researchers.map(LeadsTeam => ({
              id: LeadsTeam._id,
              profileImage: LeadsTeam.pfp || DefaultImage,
              name: LeadsTeam.fullname || 'No Data Available',
              email: LeadsTeam.workemail || 'No Data Available',
              institution: LeadsTeam.experience?.company || 'No Data Available',
              designation: LeadsTeam.experience?.designation || 'No Data Available'
            }));
            setLeadTeam(formattedLeads);
          } else {
            toast.error('Failed to load user details.');
          }
        }
      } catch (error) {
        toast.error('An error occurred while fetching user details.');
      }
    };
    const fetchData = async () => {
      await fetchProposal();
      await fetchLeadsTeam();
      await fetchUserDetails();
      if (isMounted) {
        setDataLoaded(true);
        setLoading(false);
      }
    };
    fetchData();
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
      <div className="flex xl:flex-row flex-col min-h-[100vh] font-Satoshi-Black overflow">
        <Sidebar pageName='teamLead-proposals' />
        <section className='w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
          <UserNavbar />
          <div className='xl:m-10 m-5'>
            <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'>Proposal</h1>
            {researchersCheck && (
              <header className='bg-white shadow-sm my-5 p-5 md:p-10'>
                <h1 className='font-semibold flex items-center mb-3 gap-2'>
                  <MdOutlineGroupOff className='text-2xl' />
                  Team Not Found
                </h1>
                <Link to='/group-lead-team'>
                  Manage Teams
                </Link>
              </header>
            )}
            {supervisorCheck && (
              <header className='bg-white shadow-sm my-5 p-5 md:p-10'>
                <h1 className='font-semibold flex items-center mb-3 gap-2'>
                  <MdOutlineGroupOff className='text-2xl' />
                  Supervisor Not Found
                </h1>
                <Link to='/supervisor-details'>
                  Manage Supervisors
                </Link>
              </header>
            )}
            {
              dataLoaded && !proposalCheck && !supervisorCheck && !researchersCheck && (
                <header className='bg-white shadow-sm my-5 p-16'>
                  <Link to='/create-new-proposal'>
                    <div className='h-[40vh] md:w-[60%] w-full mx-auto bg-lightEpsilon border-2 border-dashed flex flex-col items-center justify-center border-epsilon p-10 rounded-md'>
                      <MdAdd className='text-epsilon text-5xl border-2 border-dashed rounded-full border-epsilon my-4 ' />
                      <h1 className='font-semibold text-xl'>Create Proposal</h1>
                    </div>
                  </Link>
                </header>
              )
            }
            {proposalCheck && (
              <>
                <header className='bg-white shadow-sm my-5 px-5 py-5 md:py-10 w-full'>
                  <h1 className='text-lg mb-2 font-semibold italic font-Satoshi-Black'>{proposalDetail.title}</h1>
                  <div>
                    <span className='font-bold my-2'>Proposal Id</span>
                    <span className='mx-2 my-2 text-epsilon'>
                      BMY-
                      <span>
                        {proposalDetail.cretaedAt || 'N/A'}
                      </span>
                    </span>
                  </div>
                  <div>
                    <span className='font-bold my-2'>Status</span>
                    <span className='mx-2 my-2'>{proposalDetail.status}</span>
                  </div>
                  <Link to='/lead-proposal' className='text-epsilon font-semibold'>
                    View Details
                  </Link>
                </header>
                <h1 className='font-semibold text-xl my-5'>Assign Section</h1>
                <Table
                  className='w-[99%]'
                  rowData={leadTeam.map(leadsTeamMember => ({
                    researcherId: leadsTeamMember.id,
                    profileImage: leadsTeamMember.profileImage || DefaultImage,
                    name: leadsTeamMember.name,
                    email: leadsTeamMember.email,
                    institution: leadsTeamMember.institution,
                    designation: leadsTeamMember.designation,
                    proposalId: proposalDetail.id,
                  }))}
                  header={['Researcher', 'Section', 'Action']}
                  rowRenderComponent='AssignResearcherTableRow'
                />
              </>
            )}
            {/*  */}
            {previousProposals && previousProposals.length > 0 && (
              <>
                <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'>Authorship Opinion</h1>
                <header className='bg-white shadow-sm my-5 p-5 md:p-10'>
                  {
                    previousProposals.some(proposal => {
                      const acceptedDate = new Date(proposal.acceptedAt); // Parse the acceptedAt date
                      return (proposal.auditApproved === false || proposal.auditApproved === undefined) &&
                        isBefore(acceptedDate, subMonths(new Date(), 3)); // Check if older than 3 months
                    }) ? (
                      previousProposals.map(proposal => {
                        const acceptedDate = new Date(proposal.acceptedAt); // Parse the acceptedAt date again
                        return (
                          (proposal.auditApproved === false || proposal.auditApproved === undefined) &&
                            isBefore(acceptedDate, subMonths(new Date(), 3)) ? ( // Apply the same check in map
                            <div key={proposal.ProposalID} className="flex items-center mb-3 gap-1">
                              <ImFilesEmpty className='text-2xl' />
                              <Link to={`/authorship-opinion-table/${proposal.ProposalID}`}>
                                <span className='font-bold'>Opinion For Proposal:</span>
                                <span className='mx-1 text-epsilon'>
                                  BMY-{proposal.BMYid}
                                </span>
                              </Link>
                            </div>
                          ) : null
                        );
                      })
                    ) : (
                      <p className='flex gap-1'>
                        <ImFilesEmpty className='text-xl' />
                        No Proposal Available Opinion
                      </p>
                    )
                  }
                </header>
              </>
            )}
            {/*  */}
            {previousProposals && previousProposals.length > 0 && (
              <>
                <h1 className='text-xl md:text-3xl font-bold font-Satoshi-Black'>Audit Form</h1>
                <header className='bg-white shadow-sm my-5 p-5 md:p-10'>
                  {
                    previousProposals.some(proposal => {
                      const acceptedDate = new Date(proposal.acceptedAt);
                      return (
                        proposal.auditForm &&
                        Object.keys(proposal.auditForm).length === 0 &&
                        isBefore(acceptedDate, subMonths(new Date(), 3))
                        && loginUserEmail === proposal.creator
                      );
                    }) ? (
                      previousProposals.map(proposal => {
                        const acceptedDate = new Date(proposal.acceptedAt);
                        return (
                          proposal.auditForm &&
                            Object.keys(proposal.auditForm).length === 0 &&
                            isBefore(acceptedDate, subMonths(new Date(), 3)) && loginUserEmail === proposal.creator ? (
                            <div key={proposal.ProposalID} className="flex items-center gap-1 mb-3">
                              <ImFilesEmpty className='text-2xl' />
                              <Link to={`/audit-form/${proposal.ProposalID}`}>
                                {/* {proposal.creator} */}
                                <span className='font-bold'>Audit Form For Proposal:</span>
                                <span className='mx-1 text-epsilon'>
                                  BMY-{proposal.BMYid}
                                </span>
                              </Link>
                            </div>
                          ) : null
                        );
                      })
                    ) : (
                      <p className='flex gap-1'>
                        <ImFilesEmpty className='text-xl' />
                        No Audit Forms Available
                      </p>
                    )
                  }
                </header>
              </>
            )}
            {/*  */}
            <h1 className='font-semibold text-xl my-5'>Previous Proposals</h1>
            {previousProposals.length > 0 ? (
              <Table
                className='w-[99%]'
                rowData={previousProposals.map(proposal => ({
                  ProposalID: proposal.ProposalID,
                  GroupLead: proposal.leadName,
                  Supervisor: proposal.mainSupervisor,
                  title: proposal.title,
                  EthicalRisk: proposal.riskScore,
                  auditApproved: proposal.auditApproved,
                  sections: proposal.sections,
                  BenefitScore: proposal.benefitScore,
                  showAudit: proposal.showAudit,
                  approvalErcMember: proposal.approvalMember,
                  ercMembers: proposal.ercMembers,
                  acceptedAt: proposal.acceptedAt,
                  BMYid: proposal.BMYid,
                }))}
                header={[' Propossal ID', 'Group Lead', 'Ethical Risk', 'Benefit Score', 'Action', 'Letters']}
                rowRenderComponent='previousProposalsRow'
              />
            ) : (
              <header className='bg-white shadow-sm my-5 p-10'>
                <h1 className='text-lg mb-2 font-semibold'>No Previous Proposals</h1>
              </header>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
