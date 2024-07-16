import './App.css'
import { AppContextProvider } from './AppContext.jsx';
import { Route, Routes } from 'react-router-dom'
import Letter from './components/Letter'
import Home from './components/Home.jsx'
import Login from './components/registration/Login.jsx'
import Signup from './components/registration/Signup.jsx'
import ForgetPassword from './components/registration/ForgetPassword.jsx'
import ErcHeadDashboard from './components/ErcDashboard/ErcHeadDashboard.jsx'
import ResetPassword from './components/registration/ResetPassword.jsx'
import OTP from './components/registration/Otp.jsx'
import Profile from './components/profile/Profile.jsx'
import EditProfile from './components/profile/EditProfile.jsx'
import TeamMembers from './components/Researcher/common-researcher-page/TeamMembers.jsx'
import ResearcherProposal from './components/Researcher/common-researcher-page/ResearcherProposal.jsx'
import AddTeamMembers from './components/Researcher/group-members/AddTeamMembers.jsx'
import Supervisor from './components/Researcher/common-researcher-page/Supervisor.jsx'
import ResercherLeadProposals from './components/Researcher/group-lead-pages/ResercherLeadProposals.jsx'
import ResercherLeadTeam from './components/Researcher/group-lead-pages/ResercherLeadTeam.jsx'
import Proposal from './components/Researcher/proposals/Proposal.jsx'
// Supervisor
import SupervisorDashboard from './components/Supervisor/Pages/SupervisorDashboard.jsx';
import SupervisorProposals from './components/Supervisor/Pages/SupervisorProposals.jsx';
import SupervisorTeam from './components/Supervisor/Pages/SupervisorTeam.jsx';
import ViewERCMembers from './components/Supervisor/Pages/ViewERCMembers.jsx'
import PageNotFound from './components/PageNotFound.jsx';
function App() {
  return (
    <>
      <AppContextProvider>
        {/* <Table data={data} colNames={columnNames} renderRow={renderRow} /> */}
        <Routes>
          <Route path="/" element={<Proposal />} />
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
          <Route path="/dashboard" element={<ErcHeadDashboard />} />
          <Route path="/researcher-proposal" element={<ResearcherProposal />} />
          {/* Researchers-Lead */}
          <Route path="/group-lead-team" element={<ResercherLeadTeam />} />
          <Route path="/group-lead-proposal" element={<ResercherLeadProposals />} />
          <Route path="/supervisor" element={<Supervisor />} />
          <Route path="/Letter" element={<Letter />} />
          {/* Supervisors */}
          <Route path="/supervisor-dashboard" element={<SupervisorDashboard />} />
          <Route path="/supervisor-teams" element={<SupervisorTeam />} />
          <Route path="/supervisor-proposal" element={<SupervisorProposals />} />
          <Route path="/view-erc-team" element={<ViewERCMembers />} />
          {/* <Route path="/contact" element={<Contact/>}/> */}
          {/* <Route path="*" element={</>} */}


          <Route path="*"  element={<PageNotFound />} />

        

        </Routes>
        {/* <Footer/> */}
      </AppContextProvider>
    </>
  )
}
export default App
