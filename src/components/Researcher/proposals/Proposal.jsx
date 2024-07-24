import React from 'react'
import Information from './ProposalSections/Information';
import ScientificReview from './ProposalSections/ScientificReview';
import EthicalReview from './ProposalSections/EthicalReview';
export default function Proposal() {
    return (
       <>
       
       <div className='bg-stone-200'>
       <EthicalReview/>
       <Information/>
       <ScientificReview/>
      


       </div>
    
       </>
    )
}
