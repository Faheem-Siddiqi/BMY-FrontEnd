import React, { useState } from 'react';
import DefautImage from '../../../assets/images/Profile.png'
const AssignResearcherTableRow = ({ profileImage, name, email }) => {
  const [section, setSection] = useState('');
  const handleSectionChange = (event) => {
    setSection(event.target.value);
  };
  return (
    <tr className='w-full'>
      <td className='px-4'>
        <section className='flex gap-2 items-center  font-Satoshi-Black'>
          <div className='flex justify-center items-center min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px]'>
            <img className='rounded-full' src={DefautImage} alt='profile-image' />
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
          <option value="" >Select a section</option>
          <option value="information">Information</option>
          <option value="scientificReview">Scientific Review</option>
          <option value="ethicalReview">Ethical Review</option>  
          <option value="consent">Consent</option>
        </select>
      </td>
      <td className='px-4'>
        <div className='flex gap-2'>
          <button className='bg-epsilon text-white rounded px-1'>Assign</button>

        </div>
      </td>
    </tr>
  );
};
export default AssignResearcherTableRow;
