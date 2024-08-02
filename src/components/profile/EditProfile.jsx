import React, { useState, useEffect } from "react";
import Sidebar from "./../layout/Sidebar";
import Affiliation from "./Affiliation";
import Signature from "./Signature";
import PersonalInformation from "./PersonalInformation";
import UserNavbar from "../layout/Navs/UserNavbar";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loader";
export default function EditProfile() {
  const [userEmail, setUseEmail] = useState('')
  const [loading, setLoading] = useState(true);
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
  });
  // GET METHOD FOR CHILD COMPONENTS
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
        if (isMounted) {
          if (result.success) {
            // console.log(result.user) all user detail
            const { fullname, pfp, workemail, experience, residence, signature } = result.user;
            setUseEmail(workemail)
            setPersonalInformation((prevState) => ({
              ...prevState,
              fullName: fullname || '',
              profileImg: pfp || '',
              designation: experience.designation || "",
            }));
            setAffiliationInformation((prevState) => ({
              ...prevState,
              designation: experience.designation || "",
              institute: experience.company || "",
              country: residence.country || "",
              city: residence.city || "",
            }));
            setSignatureInformation((prevState) => ({
              ...prevState,
              signatureLink: signature || "",
              userSignature: signature || "",
            }));
            setLoading(false);
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
  // HANDLE PARENT AND LOCAL STATE CHANGES FOR PEROSONAL INFORMATION COMPONENT. USING ASYC SINCE WE NEED URL FOR IMAGE
  const handlePersonalInformation = async (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      if (file) {
        setLoading(true);
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
        setLoading(false);
      }
    } else {
      setPersonalInformation((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  //PUT RESQUEST FOR PERSONAL  INFORMATION
  const handlePersonalInformationSubmission = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/v1/user/updateprofile", {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Cookie": "token=your_token_here"
        },
        credentials: 'include',
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
    setLoading(false);
  };
  // HANDLE PARENT AND LOCAL STATE CHANGES FOR AFFILIATION COMPONENT 
  const handleAffiliationInformation = (e) => {
    const { name, value } = e.target;
    setAffiliationInformation((prevState) => ({ ...prevState, [name]: value }));
  };
  //PUT RESQUEST FOR AFFILIATION COMPONENT
  const handleAffiliationInformationSubmission = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/v1/user/updateprofile", {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          experience: {
            designation: affiliationInformation.designation,
            company: affiliationInformation.institute
          },
          residence: {
            country: affiliationInformation.country,
            city: affiliationInformation.city
          }
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
    setLoading(false);
  };
  // HANDLE PARENT AND LOCAL STATE CHANGES FOR SIGNATURE COMPONENT . ASYNC SINCE WE NEET TO CONVERT IAMGE TO URL 
  const handleSignatureInformation = async (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      if (file) {
        setLoading(true);
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
            setSignatureInformation((prevState) => ({
              ...prevState,
              userSignature: fileUrl,
            }));
          } else {
            console.error('Error uploading file:', result.message || 'Unknown error');
          }
        } catch (error) {
          console.error('Error uploading file:', error);
        }
        setLoading(false);
      }
    } else {
      setSignatureInformation((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };



  //PUT RESQUEST FOR SIGNATURE COMPONENT
 const handleSignatureSubmission = async () => {

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/v1/user/updateprofile", {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          signature: signatureInformation.userSignature,
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
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
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
