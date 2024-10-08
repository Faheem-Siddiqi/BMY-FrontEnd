import React, { useState, useEffect } from "react";
import Sidebar from "./../layout/Sidebar";
import Affiliation from "./Affiliation";
import Signature from "./Signature";
import PersonalInformation from "./PersonalInformation";
import UserNavbar from "../layout/Navs/UserNavbar";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loader";
import { getCookie } from "cookies-next";

export default function EditProfile() {
  const [userEmail, setUseEmail] = useState('')
  const [loading, setLoading] = useState(false);
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
  const navigate = useNavigate();
  useEffect(() => {
    let isMounted = true;
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const token = getCookie("token");
        myHeaders.append("Authorization", `Bearer ${token}`);
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/user/getuserdetails`, {
          method: "GET",
          headers: myHeaders,
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
  const dataUpdateSuccess = () => toast.success("Data Updated Successfully");
  const dataUpdateFail = () => toast.error("Data Update Failed");
  // HANDLE PARENT AND LOCAL STATE CHANGES FOR PEROSONAL INFORMATION COMPONENT. USING ASYC SINCE WE NEED URL FOR IMAGE
  const handlePersonalInformation = async (e) => {
  const { name, value, type, files } = e.target;
  if (type === "file") {
    const file = files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("filename", file);

        const token = getCookie("token");

        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/uploadFile?filename`, {
          method: "POST",
          body: formData,
          headers: {
            "Authorization": `Bearer ${token}`,  // Only include the Authorization header
          },
          credentials: "include",  // If you're using cookies or need credentials
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
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const token = getCookie("token");
      myHeaders.append("Authorization", `Bearer ${token}`);
      const SignUser = getCookie('role');
      const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/user/updateprofile`, {
        method: 'PUT',
        headers: myHeaders,
        credentials: 'include',
        body: JSON.stringify({
          fullname: personalInformation.fullName,
          pfp: personalInformation.profileImg
        }),
        redirect: "follow"
      });
      const data = await response.json();
      if (response.ok) {
        // console.log('Profile updated successfully:', data);
        dataUpdateSuccess();
      } else {
        console.error('Profile update failed:', data);
        dataUpdateFail();
      }
    } catch (error) {
      console.error('Error:', error);
      dataUpdateFail();
    }
  };
  // HANDLE PARENT AND LOCAL STATE CHANGES FOR AFFILIATION COMPONENT 
  const handleAffiliationInformation = (e) => {
    const { name, value } = e.target;
    setAffiliationInformation((prevState) => ({ ...prevState, [name]: value }));
  };
  //PUT RESQUEST FOR AFFILIATION COMPONENT
  const handleAffiliationInformationSubmission = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const token = getCookie("token");
      myHeaders.append("Authorization", `Bearer ${token}`);
      const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/user/updateprofile`, {
        method: 'PUT',
        headers: myHeaders,
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
        // console.log('Profile updated successfully:', data);
        dataUpdateSuccess();
      } else {
        console.error('Profile update failed:', data);
        dataUpdateFail();
      }
    } catch (error) {
      console.error('Error:', error);
      dataUpdateFail();
    }
  };
  // HANDLE PARENT AND LOCAL STATE CHANGES FOR SIGNATURE COMPONENT . ASYNC SINCE WE NEET TO CONVERT IAMGE TO URL 
  const handleSignatureInformation = async (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      if (file) {
        try {
          const formData = new FormData();
          formData.append("filename", file);
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          const token = getCookie("token");
          myHeaders.append("Authorization", `Bearer ${token}`);
          const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/uploadFile?filename`, {
            method: "POST",
            body: formData,
            headers: myHeaders,
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
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const token = getCookie("token");
      myHeaders.append("Authorization", `Bearer ${token}`);
      const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/user/updateprofile`, {
        method: 'PUT',
        headers: myHeaders,
        credentials: 'include',
        body: JSON.stringify({
          signature: signatureInformation.userSignature,
        }),
        redirect: "follow"
      });
      const data = await response.json();
      if (response.ok) {
        // console.log('Profile updated successfully:', data);
        dataUpdateSuccess();
      } else {
        console.error('Profile update failed:', data);
        dataUpdateFail();
      }
    } catch (error) {
      console.error('Error:', error);
      dataUpdateFail();
    }
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
