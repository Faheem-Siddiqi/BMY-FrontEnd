import React, { useState } from 'react';
import profileImage from '../../../assets/images/Profile.png';
import ResearcherTableRow from '../ResearcherTableRow.jsx';
const researchersData = [
    {
        profileImage: profileImage,
        name: 'Maira Anjum',
        email: 'email1@example.com',
        institution: 'PIMS',
        designation: 'Doctor'
    },
    {
        profileImage: profileImage,
        name: 'Faheem Siddiqi',
        email: 'email1@example.com',
        institution: 'PIMS',
        designation: 'Doctor'
    },
    {
        profileImage: profileImage,
        name: 'Faheem Siddiqi',
        email: 'email1@example.com',
        institution: 'PIMS',
        designation: 'Doctor'
    },
];
const ResearchersTable = ({ header }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 1;
    const totalPages = Math.ceil(researchersData.length / rowsPerPage);
    const currentPageData = researchersData.slice(
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
        <>
            <section>
                <table className='w-full overflow-auto text-left'>
                    <thead>
                        <tr className='bg-epsilon text-white'>
                            {header.map((items, index) => {
                                return (
                                    <>
                                        <th key={index} className='py-4 font-normal px-5'>{items}</th>
                                    </>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {currentPageData.map((researcher, index) => (
                            <ResearcherTableRow key={index} {...researcher} />
                        ))}
                    </tbody>
                </table>
                <div className='flex justify-between items-center w-fit  gap-2 mx-auto my-5 mt-4'>
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
            </section>
        </>
    );
};
export default ResearchersTable;
