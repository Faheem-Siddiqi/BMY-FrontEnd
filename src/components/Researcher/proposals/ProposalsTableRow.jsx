import React, { useState, useEffect } from 'react';
import Proposal from '../../letters/Proposal.jsx';
import { ImFilesEmpty } from "react-icons/im";
import Audit from '../../letters/Audit.jsx'
import Approval from '../../letters/Approval.jsx'
import MOM from '../../letters/MOM.jsx'
const ProposalsTableRow = ({ BMYid, PropossalID, GroupLead, EthicalRisk, BenefitScore, sections, title, approvalErcMember, ercMembers, acceptedAt }) => {
    const [signUserRole, setSignUserRole] = useState('');
    useEffect(() => {
        const SignUserRole = localStorage.getItem('role');
        if (SignUserRole) {
            setSignUserRole(SignUserRole);
        } else {
            console.log('Local storage: role  not found.');
        }
    }, []);
    const [selectedOption, setSelectedOption] = useState('option1');
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };
    return (
        <tr className='w-full font-Satoshi-Black'>
            <td className='p-4 flex items-center'>
                <ImFilesEmpty className='text-' />
                <span className='mx-2 my-2 text-epsilon '>
                   BMY-{BMYid || 'N/A'}
                </span>
            </td>
            <td className='p-4 '>{GroupLead}</td>
            <td className='p-4'>{EthicalRisk}</td>
            <td className='p-4'>{BenefitScore}</td>
            <td className='p-4'>
                <div className='flex  gap-2'>
                    <Proposal
                        sections={sections}
                        title={title}
                    />
                </div>
            </td>
            <>
                <td className='p-4'>
                    <div className='flex  items-center   border-epsilon border py-1 px-2  w-fit  rounded gap-2'>
                        {
                            selectedOption === 'option2' && (
                                <Approval
                                    title={title}
                                    GroupLead={GroupLead}
                                    PropossalID={PropossalID}
                                    approvalErcMember={approvalErcMember}
                                    acceptedAt={acceptedAt}
                                    BMYid={BMYid}
                                />
                            ) }
                            {
                            selectedOption === 'option1' &&
                            (
                                <Audit
                                    title={title}
                                    GroupLead={GroupLead}
                                    PropossalID={PropossalID}
                                    approvalErcMember={approvalErcMember}
                                    acceptedAt={acceptedAt}
                                    BMYid={BMYid}
                                />
                            )
                        }


{
                            selectedOption === 'option3' &&
                            (
                                <MOM
                                    title={title}
                                    GroupLead={GroupLead}
                                    PropossalID={PropossalID}
                                    approvalErcMember={approvalErcMember}
                                    acceptedAt={acceptedAt}
                                    BMYid={BMYid}
                                    ercMembers={ercMembers}
                                />
                            )
                        }
                        <select
                            className='w-fit  bg-transparent outline-none bg-none'
                            name="options"
                            id="options"
                            value={selectedOption}
                            onChange={handleChange}
                        >
                            <option value="option1">Audit</option>
                            <option value="option2">Approval</option>
                            <option value="option3">MOM</option>
                            <option value="option4">Synopsis</option>
                        </select>
                    </div>
                </td>
            </>
        </tr>
    );
};
export default ProposalsTableRow;
