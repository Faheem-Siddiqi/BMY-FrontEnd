import React from 'react';
import { MdDeleteOutline } from "react-icons/md";
import Modal from 'react-modal';
import toast, { Toaster } from 'react-hot-toast';

export default function DeleteMembers({ ownerId, memberId }) {
  const handleDelete = async () => {
    const myHeaders = new Headers({
      "Content-Type": "application/json",
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ ownerId, researcherId: memberId }), 
      redirect: "follow",
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/team/remove-researcher`, requestOptions);
      const result = await response.json();

      if (response.ok) {
        toast.success("Member removed successfully.");
        closeModal(); 
        window.location.reload(); 
      } else {
        toast.error(result.message || "Failed to remove member.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while removing the member.");
    }
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // Custom styles for the modal after opening, if needed
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div>
        <MdDeleteOutline className='text-red-600 cursor-pointer' onClick={openModal} />
        <Modal
          className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%]  md:w-[40%] py-16 px-10 bg-white shadow-sm outline-none border rounded-lg'
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          contentLabel="Delete Confirmation Modal"
        >
          <div className='font-semibold text-xl'>
            Are you sure you want to remove this member?
          </div>
          <div className='flex-row flex md:gap-2 gap-5 md:mt-5'>
            <button
              className='bg-epsilon py-1 px-5 rounded-md w-fit mt-5 text-white outline-none'
              onClick={handleDelete}
            >
              Yes
            </button>
            <button
              className='bg-white border-epsilon border w-fit outline-none md:mt-5 py-1 px-5 rounded-md text-epsilon'
              onClick={closeModal}
            >
              No
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
}
