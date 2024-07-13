import React, { useState } from 'react';
import ResearcherTableRow from '../Researcher/group-members/ResearcherTableRow.jsx';
import SupervisorTableRow from '../Researcher/supervisor/SupervisorTableRow.jsx';
import ProposalsTableRow from '../Researcher/proposals/ProposalsTableRow.jsx'
import ResercherLeadTableRow from '../Researcher/group-lead/ResercherLeadTableRow.jsx'

const Table = ({ header, rowData, rowRenderComponent }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
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
        <div className="overflow-x-auto shadow-sm border border-opacity-25  rounded-lg">
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
                    className={`${currentPage === 1 ? 'bg-epsilon bg-opacity-40 text-black' : 'bg-epsilon bg-opacity-100'} text-white rounded px-3 py-1`}
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className={`${currentPage === totalPages ? 'bg-epsilon bg-opacity-40 text-black' : 'bg-epsilon bg-opacity-100'} text-white rounded px-3 py-1`}
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};
export default Table;
