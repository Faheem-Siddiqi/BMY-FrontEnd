import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
const SupervisorTableRow = ({ supervisorId, teamId, profileImage, name, email, institution, designation }) => {
    const handleRequest = async (supervisorId, teamId) => {
        try {
            const payload = JSON.stringify({
                teamId: teamId,
                supervisorId: supervisorId,
            });
            // Send the request
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/teams/request-to-add-supervisor`,
                {
                    method: "POST",
                    credentials: "include", 
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: payload,
                }
            );
            const data = await response.json();
            console.log("Response data:", data);
            if (response.ok) {
                toast.success("Request sent successfully!");
            } else {
                toast.error(` ${data.message}`);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred while sending the request.");
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
                            <img className='rounded-full  min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px]' src={profileImage} alt='profile-image' />
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
                            onClick={() => handleRequest(supervisorId, teamId)}
                            className='bg-epsilon text-white rounded px-2 py-1'
                        >
                            Send Request
                        </button>                
                    </div>
                </td>
            </tr>
        </>
    );
};
export default SupervisorTableRow;
