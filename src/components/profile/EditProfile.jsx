import React, { useState, useRef } from 'react';
import Sidebar from './../layout/Sidebar';
import Affiliation from './Affiliation';
import Signature from './Signature';
import PersonalInformation from './PersonalInformation';
import UserNavbar from '../layout/Navs/UserNavbar';
import DefaultDisplayPic from '../../assets/images/Profile.png'
// Backend-Integration
import toast, { Toaster } from "react-hot-toast";
// Backend-Integration
export default function EditProfile() {
  const dataUpdateSuccess = () => toast.success("Data Update Successfully");
  const dataUpdateFail = () => toast.error("Data Update Failed");
  
//************************     Personal Component 
  //Values-Required
  const [personalInformation, setPersonalInformation] = useState({
    profileImg: DefaultDisplayPic,
    fullName: '',
  });
  const handlePersonalInformation = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setPersonalInformation(prevState => ({ ...prevState, [name]: files[0] }));
    } else {
      setPersonalInformation(prevState => ({ ...prevState, [name]: value }));
    }
  };
  //Integration-Method
  const handlePersonalInformationSubmission = async () => {
    console.log(personalInformation);
    dataUpdateSuccess()
    dataUpdateFail()
  };
  //************************     Affiliation Component 
  //Values-Required
  const [affiliationInformation, setAffiliationInformation] = useState({
    designation: '',
    institute: '',
    country:'',
    city:''
  });
  const handleAffiliationInformation = (e) => {
    const { name, value } = e.target;
    setAffiliationInformation(prevState => ({ ...prevState, [name]: value }));
  };
  //Integration-Method
  const handleAffiliationInformationSubmission = async () => {
    dataUpdateSuccess()
    dataUpdateFail()
    console.log(affiliationInformation);
  };
//************************     Signature Component
  // abi rhta ha
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <header className="flex  xl:flex-row flex-col  font-Satoshi-Black   ">
        <Sidebar pageName='profile' />
        <header className=' w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll'>
          <UserNavbar />
          <div className='xl:px-10 px-5'>
            <PersonalInformation
              formData={personalInformation}
              onInputChange={handlePersonalInformation}
              onSubmit={handlePersonalInformationSubmission}
            />
            <Affiliation 
            
            formData={affiliationInformation}
            onInputChange={handleAffiliationInformation}
            onSubmit={handleAffiliationInformationSubmission}
            />
            <Signature
            formData={personalInformation}
            onInputChange={handlePersonalInformation}
            onSubmit={handlePersonalInformationSubmission}/>
          </div>
        </header>
      </header>
    </>
  );
}
