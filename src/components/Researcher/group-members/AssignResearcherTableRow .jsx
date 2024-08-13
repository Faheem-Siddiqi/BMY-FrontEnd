import React, { useState } from 'react';
import DefautImage from '../../../assets/images/Profile.png';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
const AssignResearcherTableRow = ({ researcherId, proposalId, profileImage, name, email }) => {
  const [section, setSection] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSectionChange = (event) => {
    setSection(event.target.value);
  };
  const handleAssignClick = async () => {
    if (!section) {
      toast.error('Please select a section.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/proposals/assign-section-to-researcher`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        redirect: "follow",
        body: JSON.stringify({
          proposalId,
          section,
          researcherId,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
        setSection('');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('An error occurred while assigning the section.');
    } finally {
      setLoading(false); 
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
    }
  };
  return (
    <>
      <tr className='w-full'>
        <td className='px-4'>
          <section className='flex gap-2 items-center font-Satoshi-Black'>
            <div className='flex justify-center items-center min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px]'>
              <img className='rounded-full  min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px]' src={profileImage || DefautImage} alt='profile-image' />
            </div>
            <div className='py-5'>
              <p className='text-[1rem] font-bold'>{name}</p>
              <p className='text-light text-sm'>{email}</p>
            </div>
          </section>
        </td>
        <td className='px-4'>
          <select
            id="section"
            value={section}
            onChange={handleSectionChange}
            className="p-1 border pr-2 bg-transparent outline-0 rounded"
          >
            <option disabled value="">Select a section</option>
            <option value="information">Information</option>
            <option value="scientificReview">Scientific Review</option>
            <option value="ethicalReview">Ethical Review</option>
            <option value="consent">Consent</option>
          </select>
        </td>
        <td className='px-4'>
          <div className='flex gap-2'>
            <button
              className='bg-epsilon px-2 py-1 text-white rounded '
              onClick={handleAssignClick}
              disabled={loading}
            >
              Assign
            </button>
          </div>
        </td>
      </tr>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};
export default AssignResearcherTableRow;
