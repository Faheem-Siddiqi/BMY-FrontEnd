import React from 'react';
const SupervisorTableRow = ({ profileImage, name, email, institution, designation }) => {
    return (
        <tr className='w-full'>
            <td className='px-4'>
                <section className='flex gap-2 items-center  font-Satoshi-Black'>
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
                    <button className='bg-epsilon text-white rounded px-1'>Send</button>
                    <button className='bg-stone-400 text-white rounded px-3'>Sent</button>
                    
                </div>
            </td>
        </tr>
    );
};
export default SupervisorTableRow;
