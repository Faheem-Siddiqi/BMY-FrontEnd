import './App.css';
import Test from './components/Test.jsx';
import { Link } from 'react-router-dom';
// Context
import { AppContextProvider } from './AppContext.jsx';
// Routing
import { Route, Routes } from 'react-router-dom';
// General Components
import Letter from './components/letters/Letter.jsx';
import Home from './components/Home.jsx';
import Loader from './components/layout/Loader.jsx';
import PageNotFound from './components/PageNotFound.jsx';
// Registration Components
import Login from './components/registration/Login.jsx';
import Signup from './components/registration/Signup.jsx';
import ForgetPassword from './components/registration/ForgetPassword.jsx';
import ResetPassword from './components/registration/ResetPassword.jsx';
import OTP from './components/registration/Otp.jsx';
// Profile
import Profile from './components/profile/Profile.jsx';
import EditProfile from './components/profile/EditProfile.jsx';
// Researcher Components
import TeamMembers from './components/Researcher/common-researcher-page/TeamMembers.jsx';
import ResearcherProposal from './components/Researcher/common-researcher-page/ResearcherProposal.jsx';
import AddTeamMembers from './components/Researcher/group-members/AddTeamMembers.jsx';
import Supervisor from './components/Researcher/group-lead-pages/Supervisor.jsx';
import ResercherLeadProposals from './components/Researcher/group-lead-pages/ResercherLeadProposals.jsx';
import ResercherLeadTeam from './components/Researcher/group-lead-pages/ResercherLeadTeam.jsx';
import ResearcherSupervisor from './components/Researcher/common-researcher-page/ResearcherSupervisor.jsx';
import ResearcherLeadProposalPage from './components/Researcher/group-lead-pages/LeadProposalPage.jsx';
import MemberProposalPage from './components/Researcher/common-researcher-page/MemberProposal.jsx'
import Dashboard from './components/Researcher/common-researcher-page/Dashboard.jsx';
import ResearcherDashboard from './components/Researcher/group-lead-pages/ResercherLeadDashboard.jsx';
import ResercherLeadNewProposal from './components/Researcher/group-lead-pages/ResercherLeadNewProposal.jsx'
// Supervisor Components
import SupervisorDashboard from './components/Supervisor/Pages/SupervisorDashboard.jsx';
import SupervisorProposals from './components/Supervisor/Pages/SupervisorProposals.jsx';
import SupervisorTeam from './components/Supervisor/Pages/SupervisorTeam.jsx';
import ViewERCMembers from './components/Supervisor/Pages/ViewERCMembers.jsx';
import MentorProposal from './components/Supervisor/Pages/MentorProposal.jsx';
// ERC Member Components
import ErcMemberProposal from './components/ErcMembers/SidePannel/ErcMemberProposal.jsx'
import ErcMemberDashboard from './components/ErcMembers/SidePannel/ErcMemberDashboard.jsx'
import AssignedTeams from './components/ErcMembers/SidePannel/ErcMemberAssignedTeams.jsx'
import ErcCommittee from './components/ErcMembers/SidePannel/ErcCommittee.jsx'
import ErcMemberViewProposal from './components/ErcMembers/ErcMemberViewProposal.jsx';
//ERC Head components
import ErcHeadDashboard from './components/ErcHead/SidePannel/ErcHeadDashboard.jsx'
import ErcHeadProposal from './components/ErcHead/SidePannel/ErcHeadProposal.jsx'
import ErcHeadTeam from './components/ErcHead/SidePannel/ErcHeadTeam.jsx'
import ErcHeadViewProposal from './components/ErcHead/ErcHeadViewProposal.jsx'
import AllTeams from './components/ErcHead/SidePannel/AllTeams.jsx'
// Admin Components
import Admin from './components/Admin/Admin.jsx'
import LearnMore from './components/registration/LearnMore.jsx';
import Prop from './components/letters/Proposal.jsx'
function App() {
  return (
    <>
      {/*  */}
      <AppContextProvider>
       
        <Routes>
          {/* Admin */}
          <Route path="/admin" element={<Admin />} />
          {/* Rest */}
          <Route path="/letter" element={<Letter/>} />
          <Route path="/learn-more" element={<LearnMore/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/forget-password-otp" element={<OTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          {/* Researchers */}
          <Route path="/researcher-team" element={<TeamMembers />} />
          <Route path="/add-team-members" element={<AddTeamMembers />} />
          <Route path="/researcher-proposal" element={<ResearcherProposal />} />
          <Route path="/proposal-section" element={<MemberProposalPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Researchers-Lead */}
          <Route path="/group-lead-team" element={<ResercherLeadTeam />} />
          <Route path="/group-lead-proposal" element={<ResercherLeadProposals />} />
          <Route path="/supervisor" element={<ResearcherSupervisor />} />
          <Route path="/group-lead-dashboard" element={<ResearcherDashboard />} />
          <Route path="/create-new-proposal" element={<ResercherLeadNewProposal />} />
          <Route path="/lead-proposal" element={<ResearcherLeadProposalPage />} />
          {/*  */}
          <Route path="/Letter" element={<Letter />} />
          {/* Supervisors */}
          <Route path="/supervisor-dashboard" element={<SupervisorDashboard />} />
          <Route path="/supervisor-teams" element={<SupervisorTeam />} />
          <Route path="/supervisor-proposal" element={<SupervisorProposals />} />
          <Route path="/supervisor-details" element={<Supervisor />} />
          <Route path="/view-erc-team" element={<ViewERCMembers />} />
          <Route path="/mentor-proposal/:proposalId" element={<MentorProposal />} />
          {/* <Route path="/mentor-proposal" element={<MentorProposal />} /> */}
          {/* Erc Members */}
          <Route path="/erc-member-dashboard" element={<ErcMemberDashboard />} />
          <Route path="/assigned-proposals" element={<ErcMemberProposal />} />
          <Route path="/assigned-teams" element={<AssignedTeams />} />

          <Route path="/evaluate-proposal/:proposalId" element={<ErcMemberViewProposal />} />
          <Route path="/erc-panel" element={<ErcCommittee />} />
          <Route path="*" element={<PageNotFound />} />
          {/* Erc Head */}
          <Route path="/erc-head-dashboard" element={<ErcHeadDashboard />} />
          <Route path="/all-proposals" element={<ErcHeadProposal />} />
          <Route path="/all-bmy-teams" element={<ErcHeadTeam />} />
          <Route path="/head-evaluate-proposal/:proposalId" element={<ErcHeadViewProposal />} />
          <Route path="/all-reearchers-teams" element={<AllTeams />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AppContextProvider>
    </>
  )
}
export default App
