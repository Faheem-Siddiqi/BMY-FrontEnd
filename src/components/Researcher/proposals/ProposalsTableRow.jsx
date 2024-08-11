import React from 'react';
import AppContext from "../../../AppContext";
import Proposal from '../../letters/Proposal.jsx';
import { ImFilesEmpty } from "react-icons/im";
const ProposalsTableRow = ({ PropossalID, GroupLead, EthicalRisk, BenefitScore, sections, title }) => {
    return (
        <tr className='w-full font-Satoshi-Black'>
            <td className='p-4 flex items-center'>
                <ImFilesEmpty className='text-' />
                <span className='mx-2 my-2  '>
                    BMY-{PropossalID ? PropossalID.slice(-4) : 'N/A'}
                </span>
            </td>
            <td className='p-4'>{GroupLead}</td>
            <td className='p-4'>{EthicalRisk}</td>
            <td className='p-4'>{BenefitScore}</td>
            <td className='p-4'>
                <div className='flex  gap-2'>
                    <Proposal
                        sections={sections}
                        title={title}
                    />
                    <button className='text-epsilon rounded h-fit py-1 my-auto px-2'>Letter 1</button>
                    <button className='text-epsilon rounded h-fit py-1 my-auto px-2'>Letter 2</button>
                    <button className='text-epsilon rounded h-fit py-1 my-auto px-2'>Letter 3</button>
                </div>
            </td>
        </tr>
    );
};
export default ProposalsTableRow;
