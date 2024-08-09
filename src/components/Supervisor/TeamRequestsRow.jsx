import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
const TeamRequestsRow = ({ requestId, teamId, profileImage, name, email, institution, members }) => {
  const handleRequest = async (status, requestId, teamId) => {
    try {
      const payload = JSON.stringify({
        requestId,
        teamId,
        status,
      });
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/teams/respond-to-supervisor-request`
        , {
          method: "PATCH",
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: payload,
        });
      console.log('Response Status:', response.status);
      const data = await response.json();
      if (response.ok) {
        toast.success(`Request ${status} successfully!`);
      } else {
        toast.error(`Error: ${data.message || 'Unknown error occurred'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while processing the request.');
    } finally {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <tr className='w-full'>
        <td className='px-4'>
          <section className='flex gap-2 items-center font-Satoshi-Black'>
            <div className='flex justify-center items-center min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px]'>
              <img className='rounded-full' src={profileImage} alt='profile-image' />
            </div>
            <div className='py-5'>
              <p className='text-[1rem] font-bold'>{name}</p>
              <p className='text-light text-sm'>{email}</p>
            </div>
          </section>
        </td>
        <td className='px-4'>{institution}</td>
        <td className='px-4'>{members}</td>
        <td className='px-4'>
          <div className='flex gap-2'>
            <button
              className='text-white bg-epsilon rounded px-2 py-1'
              onClick={() => handleRequest('accepted', requestId, teamId)}
            >
              Accept
            </button>
            <button
              className='text-white bg-red-400 rounded px-2 py-1'
              onClick={() => handleRequest('declined', requestId, teamId)}
            >
              Deny
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};
export default TeamRequestsRow;
