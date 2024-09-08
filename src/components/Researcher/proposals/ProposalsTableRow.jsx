import React, { useState, useEffect } from 'react';
import Proposal from '../../letters/Proposal.jsx';
import { ImFilesEmpty } from "react-icons/im";
import { MdAttachEmail } from "react-icons/md";
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
    const [selectedOption, setSelectedOption] = useState('nothing');
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

              
                    <div className='flex  items-center justify-center gap-2  w-fit  rounded '>
                    {
                            selectedOption === 'approvalLetter' && (
                                <Approval
                                    title={title}
                                    GroupLead={GroupLead}
                                    PropossalID={PropossalID}
                                    approvalErcMember={approvalErcMember}
                                    acceptedAt={acceptedAt}
                                    BMYid={BMYid}
                                />
                            )}
                        {
                            selectedOption === 'auditLetter' &&
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
                            selectedOption === 'momLetter' &&
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

{
                            selectedOption === 'nothing' 
                              &&
                            (<MdAttachEmail  className='text-2xl text-epsilon'/>                             
                            )
                        }

                
<select 
 value={selectedOption}
 onChange={handleChange}
 className="select select-info  border-epsilon border rounded  w-fit outline-none bg-transparent">
<option className='' value="nothing">Select Letter</option>
<option value="approvalLetter">Approval</option>
<option value="momLetter">MOM</option>
</select>
                        
                    </div>
                </td>
            </>
        </tr>
    );
};
export default ProposalsTableRow;
