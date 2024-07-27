import './App.css';
import { Link } from 'react-router-dom';
// Context
import { AppContextProvider } from './AppContext.jsx';
// Routing
import { Route, Routes } from 'react-router-dom';
// General Components
import Letter from './components/Letter';
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
import ResearcherProposalPage from './components/Researcher/group-lead-pages/LeadProposalPage.jsx';
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
import ErcMemberViewProposal from './components/ErcMembers/ErcMemberViewProposal';
function App() {
  return (
    <>


<ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/sign-up">Sign Up</Link></li>
        <li><Link to="/forget-password">Forget Password</Link></li>
        <li><Link to="/forget-password-otp">Forget Password OTP</Link></li>
        <li><Link to="/reset-password">Reset Password</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/edit-profile">Edit Profile</Link></li>
        {/* Researchers */}
        <li><Link to="/researcher-team">Researcher Team</Link></li>
        <li><Link to="/add-team-members">Add Team Members</Link></li>
        <li><Link to="/researcher-proposal">Researcher Proposal</Link></li>
        <li><Link to="/proposal-section">Proposal Section</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        {/* Researchers-Lead */}
        <li><Link to="/group-lead-team">Group Lead Team</Link></li>
        <li><Link to="/group-lead-proposal">Group Lead Proposal</Link></li>
        <li><Link to="/supervisor">Supervisor</Link></li>
        <li><Link to="/group-lead-dashboard">Group Lead Dashboard</Link></li>
        <li><Link to="/create-new-proposal">Create New Proposal</Link></li>
        <li><Link to="/lead-proposal">Lead Proposal</Link></li>
        {/*  */}
        <li><Link to="/Letter">Letter</Link></li>
        {/* Supervisors */}
        <li><Link to="/supervisor-dashboard">Supervisor Dashboard</Link></li>
        <li><Link to="/supervisor-teams">Supervisor Teams</Link></li>
        <li><Link to="/supervisor-proposal">Supervisor Proposal</Link></li>
        <li><Link to="/supervisor-details">Supervisor Details</Link></li>
        <li><Link to="/view-erc-team">View ERC Team</Link></li>
        <li><Link to="/mentor-proposal">Mentor Proposal</Link></li>
        {/* Erc Members */}
        <li><Link to="/Erc-member-dashboard">ERC Member Dashboard</Link></li>
        <li><Link to="/Erc-member-proposals">ERC Member Proposals</Link></li>
        <li><Link to="/assigned-teams">Assigned Teams</Link></li>
        <li><Link to="/evaluate-proposal">Evaluate Proposal</Link></li>
        <li><Link to="/erc-panel">ERC Panel</Link></li>
        <li><Link to="*">Page Not Found</Link></li>
      </ul>

      <AppContextProvider>
        {/* <Table data={data} colNames={columnNames} renderRow={renderRow} /> */}
        <Routes>
          <Route path="/" element={<Home />} />
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
          <Route path="/lead-proposal" element={<ResearcherProposalPage />} />
          {/*  */}
          <Route path="/Letter" element={<Letter />} />
          {/* Supervisors */}
          <Route path="/supervisor-dashboard" element={<SupervisorDashboard />} />
          <Route path="/supervisor-teams" element={<SupervisorTeam />} />
          <Route path="/supervisor-proposal" element={<SupervisorProposals />} />
          <Route path="/supervisor-details" element={<Supervisor />} />
          <Route path="/view-erc-team" element={<ViewERCMembers />} />
          <Route path="/mentor-proposal" element={<MentorProposal />} />
          {/* Erc Members */}
          <Route path="/Erc-member-dashboard" element={<ErcMemberDashboard />} />
          <Route path="/Erc-member-proposals" element={<ErcMemberProposal />} />
          <Route path="/assigned-teams" element={<AssignedTeams />} />
          <Route path="/evaluate-proposal" element={<ErcMemberViewProposal />} />
          <Route path="/erc-panel" element={<ErcCommittee />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AppContextProvider>
    </>
  )
}
export default App
