import React, { useState } from 'react';
import Modal from 'react-modal';
import toast, { Toaster } from 'react-hot-toast';
import { getCookie } from "cookies-next";
export default function DeleteMembers({ ownerId, memberId, memberName, onDelete }) {
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const handleDelete = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const token = getCookie("token");
      myHeaders.append("Authorization", `Bearer ${token}`);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          ownerId,
          researcherId: memberId
        }),
        redirect: "follow",
      };
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/team/remove-researcher`, requestOptions);
      const result = await response.json();
      if (response.ok) {
        setLoading(false);
        toast.success("Member removed successfully.");
        onDelete(memberId); // Call onDelete from props
        closeModal();
      } else {
        setLoading(false);
        toast.error(result.message || "Failed to remove member.");
      }
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred while removing the member.");
    }
  };
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div>
        <p className='text-red-600 text-sm cursor-pointer' onClick={openModal}>
          {loading ? 'Removing' : 'Remove'}
        </p>
        <Modal
          className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[40%] py-16 px-10 bg-white shadow-sm outline-none border rounded-lg'
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Delete Confirmation Modal"
        >
          <div className='font-semibold text-xl'>
            Are you sure you want to remove {memberName}?
          </div>
          <div className='flex-row flex md:gap-2 gap-5 md:mt-5'>
            <button
              className='bg-epsilon py-1 px-5 rounded-md w-fit mt-5 text-white outline-none'
              onClick={handleDelete}
            >
              {loading ? 'Removing' : 'Yes'}
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
