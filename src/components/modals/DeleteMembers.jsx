import React from 'react'
import { MdDeleteOutline } from "react-icons/md";
import Modal from 'react-modal';
export default function DeleteMembers() {
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          width:'50%',
          padding:'10% 2% 10% 2%',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };
    //   Modal.setAppElement('#yourAppElement');
let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
  <>
  <div>
  <MdDeleteOutline className='text-red-600 cursor-pointer' onClick={openModal}/>
      <Modal
       className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%]  md:w-[40%] py-16 px-10 bg-white shadow-sm outline-none border rounded-lg'
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // style={customStyles}
        contentLabel="Delete Confirmation Modal"
      >
        {/* <button onClick={closeModal}>close</button> */}
        <div className='font-semibold text-xl'>
          
          
     
          Are you sure you want to remove member?</div>
      <div className='flex-row  flex md:gap-2 gap-5 my-5'>
      <button className='bg-epsilon py-1 px-5 rounded-md w-fit text-white outline-none'> Yes</button>
      <button className='bg-white border-epsilon border w-fit outline-none py-1 px-5 rounded-md text-epsilon' onClick={closeModal}>No</button>
      </div>
      </Modal>
    </div></>
  )
}
