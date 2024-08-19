import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
const ResearcherTableRow = ({ id, profileImage, name, email, institution, designation }) => {
  const handleRequest = async (status) => {
    try {
      const payload = JSON.stringify({
        requestId: id,
        status,
      });
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const token = getCookie("token");
      myHeaders.append("Authorization", `Bearer ${token}`);
      const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/team/respond-to-request`,
        {
          method: "POST",
          credentials: "include",
          headers: myHeaders,
          body: payload,
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success(`Request ${status} successfully!`);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(`Error: ${data.message}`);
        setTimeout(() => {
          window.location.reload();
        }, 1000); // Reload after 1 second
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while processing the request.");
      setTimeout(() => {
        window.location.reload();
      }, 1000); // Reload after 1 second
    }
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <tr className='w-full'>
        <td className='px-4'>
          <section className='flex gap-2 items-center font-Satoshi-Black'>
            <div className='flex justify-center items-center w-[50px] h-[50px]'>
              <img className='rounded-full w-full h-full object-cover' src={profileImage} alt='profile-image' />
            </div>
            <div className='py-5'>
              <p className='text-[1rem] font-bold'>{name}</p>
              <p className='text-light text-sm'>{email}</p>
            </div>
          </section>
        </td>
        <td className='px-4'>{institution}</td>
        <td className='px-4'>{designation}</td>
        <td className='px-4'>
          <div className='flex gap-2'>
            <button
              onClick={() => handleRequest('accepted')}
              className='bg-epsilon text-white rounded px-2 py-1'>
              Accept
            </button>
            <button
              onClick={() => handleRequest('declined')}
              className='bg-red-500 text-white rounded  px-2 py-1'>
              Decline
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};
export default ResearcherTableRow;
