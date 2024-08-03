import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
const ResercherLeadTableRow = ({ id, profileImage, name, email, institution, designation }) => {
  const handleRequest = async (leadId) => {
    try {
      // Set up the request payload
      const payload = JSON.stringify({
        ownerId: leadId,
      });
      // Send the request
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/team/request-to-join`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            'Cookie': 'token'
          },
          body: payload,
        }
      );
      // Parse the response
      const data = await response.json();

      console.log(data.message)
      if (response.ok) {
        toast.success("Request sent successfully!");
      } else {
        toast.error(` ${data.message}`);

      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
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
        <td className='px-4'>{designation}</td>
        <td className='px-4'>
          <div className='flex gap-2'>
            <button
              onClick={() => handleRequest(id)} // Pass the id as an argument
              className='hover:text-epsilon border-b border-b-epsilon duration-300'
            >
              Send Request
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};
export default ResercherLeadTableRow;
