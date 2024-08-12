import React from 'react';
import PropTypes from 'prop-types';
import profileImage from '../../../assets/images/Profile.png';
import DeleteMembers from '../../modals/DeleteMembers.jsx';

function  CurrentGroupMembers({ myMembers }) {
  if (!myMembers || !myMembers.team) {
    return <div>No team data available</div>;
  }
  const { owner, researchers = [], supervisors = [] } = myMembers.team;

  return (
    <header className='bg-white shadow-sm my-10 md:p-10 p-5 w-full'>
      <div className="grid md:grid-cols-2 grid-col-1 md:gap-10">
        <div>
          <h1 className='font-semibold text-lg'>Group Lead</h1>
          <section className='flex gap-2 my-5 items-center md:px-2 font-Satoshi-Black'>
            <div className='flex justify-center items-center min-w-[70px] min-h-[70px] max-w-[70px] max-h-[70px]'>
              <img className='rounded-full' src={owner.pfp || profileImage} alt='profile' />
            </div>
            <div className='py-5'>
              <p className='text-[1rem] md:full truncate w-[150px] font-bold'>{owner.fullname}</p>
              <p className='text-light md:full truncate w-[150px] text-sm'>{owner.workemail}</p>
            </div>
          </section>
          <h1 className='font-semibold text-lg'>Group</h1>
          <div id='members' className="flex flex-row w-full sm:gap-5 flex-wrap">
            {researchers.map((researcher) => (
              <section key={researcher._id} className='flex gap-2 items-center font-Satoshi-Black'>
                <div className='flex justify-center items-center w-[60px] h-[60px]'>
                  <img className='rounded-full w-full h-full' src={researcher.pfp || profileImage} alt='profile' />
                </div>
                <div className='py-5 break-words'>
                  <p className='text-[1rem] md:full truncate w-[150px] font-bold'>{researcher.fullname}</p>
                  <p className='text-light md:full truncate w-[150px] text-sm'>{researcher.workemail}</p>
                  {/* <DeleteMembers ownerId={owner._id} memberId={researcher._id} /> */}
                </div>
              </section>
            ))}
          </div>
        </div>
        <div>
          {supervisors.length > 0 && (
            <div>
              <h1 className='font-semibold text-lg'>Supervisor</h1>
              <section className='grid md:grid-cols-2 gap-4'>
                {supervisors.map((supervisor) => (
                  <section key={supervisor._id} className='flex gap-2 my-5 items-center md:px-2 font-Satoshi-Black'>
                    <div className='flex justify-center items-center min-w-[85px] min-h-[85px] max-w-[85px] max-h-[85px]'>
                      <img className='rounded-full' src={supervisor.pfp || profileImage} alt='profile' />
                    </div>
                    <div className='py-5'>
                      <p className='text-[1rem] md:full truncate w-[150px] font-bold'>{supervisor.fullname}</p>
                      <p className='text-light md:full truncate w-[150px] text-sm'>{supervisor.workemail}</p>
                    </div>
                  </section>
                ))}
              </section>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

CurrentGroupMembers.propTypes = {
  myMembers: PropTypes.shape({
    team: PropTypes.shape({
      owner: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        pfp: PropTypes.string,
        fullname: PropTypes.string.isRequired,
        workemail: PropTypes.string.isRequired,
      }).isRequired,
      researchers: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        pfp: PropTypes.string,
        fullname: PropTypes.string.isRequired,
        workemail: PropTypes.string.isRequired,
      })),
      supervisors: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        pfp: PropTypes.string,
        fullname: PropTypes.string.isRequired,
        workemail: PropTypes.string.isRequired,
      })),
    }),
  }),
};

export default CurrentGroupMembers;
