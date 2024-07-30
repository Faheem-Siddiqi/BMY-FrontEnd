
import Sidebar from './../layout/Sidebar';
import Affiliation from './Affiliation';
import Signature from './Signature';
import PersonalInformation from './PersonalInformation';
import UserNavbar from '../layout/Navs/UserNavbar';
// Backend-Integration-Imports




// Backend-Integration-Imports
export default function Profile() {
  return (
    <>
      <header className="flex  xl:flex-row flex-col h-[100vh] font-Satoshi-Black   ">
        <Sidebar pageName='profile' />
        <header className=' w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
          <UserNavbar />
          <div className='xl:px-10 px-5'>
            <PersonalInformation />
            <Affiliation />
            <Signature />
          </div>
        </header>
      </header>
    </>
  );
}
