
import './App.css'
import { Route, Routes} from 'react-router-dom'  
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

import TeamMembers from './components/Researcher/Pages/TeamMembers.jsx'
import ResearcherProposal from './components/Researcher/Pages/ResearcherProposal.jsx'
import AddTeamMembers from './components/Researcher/group-members/AddTeamMembers.jsx'
import Supervisor from './components/Researcher/Pages/Supervisor.jsx'

function App() {
  

  return (
    <>

{/* <Table data={data} colNames={columnNames} renderRow={renderRow} /> */}
  <Routes>
 <Route path="/" element={<Home/>}/>
 <Route path="/login" element={<Login/>}/>
 <Route path="/sign-up" element={<Signup/>}/>
 <Route path="/forget-password" element={<ForgetPassword/>}/>
 <Route path="/forget-password-otp" element={<OTP/>}/>
 <Route path="/reset-password" element={<ResetPassword/>}/>
 <Route path="/profile" element={<Profile/>}/>
 <Route path="/edit-profile" element={<EditProfile/>}/>
 {/* Researchers */}
 <Route path="/team-members" element={<TeamMembers/>}/>
 <Route path="/add-team-members" element={<AddTeamMembers/>}/>
 <Route path="/dashboard" element={<ErcHeadDashboard/>}/>

 <Route path="/supervisor" element={<Supervisor/>}/>
 <Route path="/researcher-proposal" element={<ResearcherProposal/>}/>
      <Route path="/Letter" element={<Letter/>}/>
      {/* <Route path="/contact" element={<Contact/>}/> */}
  {/* <Route path="*" element={</>} */}
    </Routes>
    {/* <Footer/> */}




    </>
  )
}
export default App
