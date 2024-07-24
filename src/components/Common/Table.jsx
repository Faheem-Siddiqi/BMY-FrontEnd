import React, { useState } from 'react';
import ResearcherTableRow from '../Researcher/group-members/ResearcherTableRow.jsx';
import SupervisorTableRow from '../Researcher/supervisor/SupervisorTableRow.jsx';
import ProposalsTableRow from '../Researcher/proposals/ProposalsTableRow.jsx'
import ResercherLeadTableRow from '../Researcher/group-lead-pages/ResercherLeadTableRow.jsx'
import TeamRequestsRow from '../Supervisor/TeamRequestsRow.jsx'
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
const Table = ({ header, rowData, rowRenderComponent }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 3;
    const totalPages = Math.ceil(rowData.length / rowsPerPage);
    const currentPageData = rowData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );
    const handlePreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };
    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };
    return (
        <div className="overflow-x-scroll my-5  border border-opacity-25  rounded-lg">
            <table className="w-full">
                <thead className=''>
                    <tr className="bg-epsilon  text-white ">
                        {header.map((item, index) => (
                            <th key={index} className="py-4 px-4 font-normal text-left">{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody >
                    {currentPageData.map((rowDataItem, index) => (
                        rowRenderComponent === 'TeamRequestsRow' && (
                            <TeamRequestsRow key={rowDataItem.id || index} {...rowDataItem} />
                        )
                    ))}
                    {currentPageData.map((rowDataItem, index) => (
                        rowRenderComponent === 'ShowResearcherLeads' && (
                            <ResercherLeadTableRow key={rowDataItem.id || index} {...rowDataItem} />
                        )
                    ))}
                    {currentPageData.map((rowDataItem, index) => (
                        rowRenderComponent === 'previousProposalsRow' && (
                            <ProposalsTableRow key={rowDataItem.id || index} {...rowDataItem} />
                        )
                    ))}
                    {currentPageData.map((rowDataItem, index) => (
                        rowRenderComponent === 'researchersRow' && (
                            <ResearcherTableRow key={rowDataItem.id || index} {...rowDataItem} />
                        )
                    ))}
                    {currentPageData.map((rowDataItem, index) => (
                        rowRenderComponent === 'supervisorsRow' && (
                            <SupervisorTableRow key={rowDataItem.id || index} {...rowDataItem} />
                        )
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between items-center w-fit gap-2 mx-auto my-5 mt-4">
                <button
                    className={`${currentPage === 1 ? 'bg-epsilon bg-opacity-40 text-black' : 'bg-epsilon bg-opacity-100'} text-white  p-2 rounded-full`}
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    <IoIosArrowBack />
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className={`${currentPage === totalPages ? 'bg-epsilon bg-opacity-40 text-black' : 'bg-epsilon bg-opacity-100'} text-white  p-2 rounded-full`}
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    <IoIosArrowForward />
                </button>
            </div>
        </div>
    );
};
export default Table;
