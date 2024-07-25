import React from 'react'
import Information from './ProposalSections/Information';
import ScientificReview from './ProposalSections/ScientificReview';
import EthicalReview from './ProposalSections/EthicalReview';
import { MdFileDownloadDone } from "react-icons/md";
import { MdOutlineAddTask } from "react-icons/md";
import Consent from './Consent';

import DiscussionModal from './proposal-reviews/DiscussionModal';
export default function Proposal() {
    return (
        <>

<DiscussionModal/>
            <button
                className="  py-2 px-5 rounded-md  group relative inline-flex items-center justify-center overflow-hidden border border-epsilon font-medium text-epsilon shadow-md transition duration-300 ease-out ">
                <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-epsilon text-white duration-300 group-hover:translate-x-0">
                    <MdOutlineAddTask className='text-2xl' />   <span className='mx-2'>
                    Upload
                    </span>
                </span>
                <span className="ease absolute flex h-full w-full transform items-center justify-center text-epsilontransition-all duration-300 group-hover:translate-x-full">Upload</span>
                <span className="invisible relative"> x Upload </span>
            </button>


            <button
                className="  py-2 px-5 rounded-md  group relative inline-flex items-center justify-center overflow-hidden border border-epsilon font-medium text-epsilon shadow-md transition duration-300 ease-out ">
                <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-epsilon text-white duration-300 group-hover:translate-x-0">
                    <MdOutlineAddTask className='text-2xl' />   <span className='mx-2'>
                    Submit
                    </span>
                </span>
                <span className="ease absolute flex h-full w-full transform items-center justify-center text-epsilontransition-all duration-300 group-hover:translate-x-full">Submit</span>
                <span className="invisible relative"> x Submit </span>
            </button>


            <button
                className="  py-2 px-5 rounded-md  group relative inline-flex items-center justify-center overflow-hidden border border-epsilon font-medium text-epsilon shadow-md transition duration-300 ease-out ">
                <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-epsilon text-white duration-300 group-hover:translate-x-0">
                    <MdFileDownloadDone className='text-2xl' />   <span className='mx-2'>Approve </span>
                </span>
                <span className="ease absolute flex h-full w-full transform items-center justify-center text-epsilontransition-all duration-300 group-hover:translate-x-full">Approve</span>
                <span className="invisible relative"> x Approve </span>
            </button>
            <div className='bg-stone-200'>

                <Information />
                <ScientificReview />
                <EthicalReview />
                <Consent />



            </div>

        </>
    )
}
