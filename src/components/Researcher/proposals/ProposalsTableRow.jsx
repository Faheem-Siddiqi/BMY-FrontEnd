import React from 'react';
import AppContext from "../../../AppContext";
import { IoDocumentText } from "react-icons/io5";
const ProposalsTableRow = ({ name, supervisor, groupdLead, status }) => {
    return (
        <tr className='w-full font-Satoshi-Black'>
            <td className='p-4 flex items-center justify-start gap-1' >
                <IoDocumentText className='text-theta text-xl' />
                {name}</td>
            <td className='p-4'>{supervisor}</td>
            <td className='p-4'>{groupdLead}</td>
            <td className='p-4'>{status}</td>
            <td className='p-4'>
                <div className='flex gap-2'>
                    based on status:
                    <button className='bg-epsilon text-white rounded h-fit py-1 my-auto px-2'>Download</button>
                    <button className='bg-stone-400 text-white rounded h-fit py-1 px-2 my-auto'>Edit FOR RESEARCHERS ONLY</button>
                </div>
            </td>
        </tr>
    );
};
export default ProposalsTableRow;
