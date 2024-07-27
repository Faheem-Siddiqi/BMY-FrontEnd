import React from 'react';
import { IoDocumentText } from "react-icons/io5";
const SupervisorProposalRow = ({ proposalID, groupdLead, status }) => {
    return (
        <tr className='w-full font-Satoshi-Black'>
            <td className='p-4 flex items-center justify-start gap-1' >
                <IoDocumentText className='text-theta text-xl' />
                {proposalID}</td>
            <td className='p-4'>{groupdLead}</td>
            <td className='p-4'>{status}</td>
            <td className='p-4'>
                <div className='flex gap-2'>
                 
                    <button className='bg-epsilon text-white rounded h-fit py-1 my-auto px-2'>Download</button>
                   
                </div>
            </td>
        </tr>
    );
};
export default SupervisorProposalRow;
