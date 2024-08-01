import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./../layout/Sidebar";
import Affiliation from "./Affiliation";
import Signature from "./Signature";
import PersonalInformation from "./PersonalInformation";
import UserNavbar from "../layout/Navs/UserNavbar";
import DefaultDisplayPic from "../../assets/images/Profile.png";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;
export default function EditProfile() {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      // try {
      //   const token = localStorage.getItem("token");

      //   const response = await axios.get("/api/v1/user/getuserdetails", {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   });

      //   if (response.data.success) {
      //     setUserDetails(response.data.user);
      //   } else {
      //     toast.error("Failed to load user details.");
      //     navigate("/login"); 
      //   }
      // } catch (error) {
      //   toast.error("Error fetching user details.");
      //   navigate("/login"); 
      // }
      
      const requestOptions = {
        method: "GET",
        redirect: "follow",
        credentials:"include"
      };
      
      fetch("http://localhost:3000/api/v1/user/getuserdetails", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          //console.log(result)
          if (result.success){
            setUserDetails(result.user)
          }
          else{
            toast.error("Failed to load user details.");
            navigate("/login")
          }
        })
        .catch((error) => console.error(error));
    };

    fetchUserDetails();
  }, []);

  console.log(userDetails);
  const dataUpdateSuccess = () => toast.success("Data Update Successfully");
  const dataUpdateFail = () => toast.error("Data Update Failed");
  //************************     Personal Component
  //Values-Required
  const [personalInformation, setPersonalInformation] = useState({
    profileImg: DefaultDisplayPic,
    fullName: "",
  });
  const handlePersonalInformation = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setPersonalInformation((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setPersonalInformation((prevState) => ({ ...prevState, [name]: value }));
    }
  };
  //Integration-Method
  const handlePersonalInformationSubmission = async () => {
    console.log(personalInformation);
    dataUpdateSuccess();
    dataUpdateFail();
  };
  //************************     Affiliation Component
  //Values-Required
  const [affiliationInformation, setAffiliationInformation] = useState({
    designation: "",
    institute: "",
    country: "",
    city: "",
  });
  const handleAffiliationInformation = (e) => {
    const { name, value } = e.target;
    setAffiliationInformation((prevState) => ({ ...prevState, [name]: value }));
  };
  //Integration-Method
  const handleAffiliationInformationSubmission = async () => {
    dataUpdateSuccess();
    dataUpdateFail();
    console.log(affiliationInformation);
  };
  //************************     Signature Component
  //Values-Required
  const [signatureInformation, setSignatureInformation] = useState({
    userSignature: "",
    signatuerLink: "",
  });
  const handleSignatureInformation = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setSignatureInformation((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setSignatureInformation((prevState) => ({ ...prevState, [name]: value }));
    }
  };
  //Integration-Method
  const handleSignatureSubmission = async () => {
    // We need to add check if file is upload or link is added
    console.log(signatureInformation);
    dataUpdateSuccess();
    dataUpdateFail();
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <header className="flex  xl:flex-row flex-col  font-Satoshi-Black   ">
        <Sidebar pageName="profile" />
        <header className=" w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll">
          <UserNavbar />
          <div className="xl:px-10 px-5">
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
              formData={signatureInformation}
              onInputChange={handleSignatureInformation}
              onSubmit={handleSignatureSubmission}
            />
          </div>
        </header>
      </header>
    </>
  );
}
