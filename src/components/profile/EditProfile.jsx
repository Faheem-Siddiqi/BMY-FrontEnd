import React, { useState, useEffect } from "react";
import Sidebar from "./../layout/Sidebar";
import Affiliation from "./Affiliation";
import DefaultProfile from '../../assets/images/Profile.png';
import Signature from "./Signature";
import PersonalInformation from "./PersonalInformation";
import UserNavbar from "../layout/Navs/UserNavbar";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loader"; // Import the Loader component

export default function EditProfile() {
  const [userEmail,setUseEmail]=useState('')
  const [loading, setLoading] = useState(true); // Loader state for initial data fetching
  const [personalInformation, setPersonalInformation] = useState({
    profileImg: '',
    fullName: '',
  });
  const [affiliationInformation, setAffiliationInformation] = useState({
    designation: "",
    institute: "",
    country: "",
    city: "",
  });
  const [signatureInformation, setSignatureInformation] = useState({
    userSignature: "",
    signatureLink: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates on unmounted components
    const fetchUserDetails = async () => {
      setLoading(true); // Show loader during data fetching
      try {
        const response = await fetch("http://localhost:3000/api/v1/user/getuserdetails", {
          method: "GET",
          redirect: "follow",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        if (isMounted) { // Only update state if the component is still mounted
          if (result.success) {
            const { fullname, pfp , workemail} = result.user;

            setUseEmail(workemail)
            setPersonalInformation((prevState) => ({
              ...prevState,
              fullName: fullname || '',
              profileImg: pfp || '',
            }));
            setLoading(false); // Hide loader after data is fetched
          } else {
            toast.error("Failed to load user details.");
            navigate("/login");
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error(error);
          toast.error("An error occurred while fetching user details.");
          navigate("/login");
        }
      }
    };

    fetchUserDetails();
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const dataUpdateSuccess = () => toast.success("Data Update Successfully");
  const dataUpdateFail = () => toast.error("Data Update Failed");

  // Handle changes in the personal information form
  const handlePersonalInformation = async (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      if (file) {
        setLoading(true); // Show loader during file upload
        try {
          const formData = new FormData();
          formData.append("filename", file);
          const response = await fetch("http://localhost:3000/api/v1/uploadFile?filename", {
            method: "POST",
            body: formData,
            redirect: "follow"
          });

          const result = await response.json();
          if (response.ok) {
            const fileUrl = result.url;
            setPersonalInformation((prevState) => ({
              ...prevState,
              profileImg: fileUrl,
            }));
          } else {
            console.error('Error uploading file:', result.message || 'Unknown error');
          }
        } catch (error) {
          console.error('Error uploading file:', error);
        }
        setLoading(false); // Hide loader after file upload
      }
    } else {
      setPersonalInformation((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Handle submission of personal information form
  const handlePersonalInformationSubmission = async () => {
    setLoading(true); // Show loader during submission
    try {
      const response = await fetch("http://localhost:3000/api/v1/user/updateprofile", {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Cookie": "token=your_token_here"
        },
        credentials: 'include', // Include cookies if necessary
        body: JSON.stringify({
          fullname: personalInformation.fullName,
          pfp: personalInformation.profileImg
        }),
        redirect: "follow"
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Profile updated successfully:', data);
        dataUpdateSuccess();
      } else {
        console.error('Profile update failed:', data);
        dataUpdateFail();
      }
    } catch (error) {
      console.error('Error:', error);
      dataUpdateFail();
    }
    setLoading(false); // Hide loader after submission
  };

  // Handle changes in the affiliation form
  const handleAffiliationInformation = (e) => {
    const { name, value } = e.target;
    setAffiliationInformation((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle submission of affiliation form
  const handleAffiliationInformationSubmission = async () => {
    dataUpdateSuccess();
    dataUpdateFail();
    console.log(affiliationInformation);
  };

  // Handle changes in the signature form
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

  // Handle submission of signature form
  const handleSignatureSubmission = async () => {
    dataUpdateSuccess();
    dataUpdateFail();
    console.log(signatureInformation);
  };

  if (loading) {
    return <Loader />; // Display loader if loading is true
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <header className="flex xl:flex-row flex-col font-Satoshi-Black">
        <Sidebar pageName="profile" />
        <header className="w-full xl:w-[85%] bg-lightBackground h-screen overflow-y-scroll">
          <section className='xl:mt-0 mt-5'>
            <UserNavbar />
          </section>
          <div className="xl:px-10 px-5">
            <PersonalInformation
            email={userEmail}
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
