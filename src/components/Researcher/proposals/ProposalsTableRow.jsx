import React from 'react';
import { IoDocumentText } from "react-icons/io5";
const ProposalsTableRow = ({ name, supervisor, groupdLead, status }) => {
    return (
        <tr className='w-full font-Satoshi-Black'>
            <td className='p-4 flex items-end justify-start gap-1' >
            <IoDocumentText className='text-theta text-xl'/>
                {name}</td>
            <td className='p-4'>{supervisor}</td>
            <td className='p-4'>{groupdLead}</td>
            <td className='p-4'>{status}</td>
            <td className='p-4'>
                <div className='flex gap-2'>
                    based on status:
                    <button className='bg-epsilon text-white rounded px-1'>Download</button>
                    <button className='bg-stone-400 text-white rounded px-3'>Edit</button>
                </div>
            </td>
        </tr>
    );
};
export default ProposalsTableRow;
