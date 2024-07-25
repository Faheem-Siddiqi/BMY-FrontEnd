import './App.css';
// Context
import { AppContextProvider } from './AppContext.jsx';
// Routing
import { Route, Routes } from 'react-router-dom';
// General Components
import Letter from './components/Letter';
import Home from './components/Home.jsx';
import PageNotFound from './components/PageNotFound.jsx';
// Registration Components
import Login from './components/registration/Login.jsx';
import Signup from './components/registration/Signup.jsx';
import ForgetPassword from './components/registration/ForgetPassword.jsx';
import ResetPassword from './components/registration/ResetPassword.jsx';
import OTP from './components/registration/Otp.jsx';
// ERC Head and ERC TeamMembers


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

import Dashboard from './components/Researcher/common-researcher-page/Dashboard.jsx';
import ResearcherDashboard from './components/Researcher/group-lead-pages/ResercherLeadDashboard.jsx';
import ResercherLeadNewProposal from './components/Researcher/group-lead-pages/ResercherLeadNewProposal.jsx'


// Supervisor Components
import SupervisorDashboard from './components/Supervisor/Pages/SupervisorDashboard.jsx';
import SupervisorProposals from './components/Supervisor/Pages/SupervisorProposals.jsx';
import SupervisorTeam from './components/Supervisor/Pages/SupervisorTeam.jsx';
import ViewERCMembers from './components/Supervisor/Pages/ViewERCMembers.jsx';
function App() {
  return (
    <>
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
          {/* <Route path="/contact" element={<Contact/>}/> */}
          {/* <Route path="*" element={</>} */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {/* <Footer/> */}
      </AppContextProvider>
    </>
  )
}
export default App
