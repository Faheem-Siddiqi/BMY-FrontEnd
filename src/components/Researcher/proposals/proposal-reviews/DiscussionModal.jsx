import { useState } from "react";
import React from 'react'
import { IoCloseCircleSharp } from "react-icons/io5";
import { FaReplyAll } from "react-icons/fa6";
import Modal from 'react-modal';
export default function DiscussionModal() {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }
    function closeModal() {
        setIsOpen(false);
    }
  
    const [reviews, setReviews] = useState([
        { id: 1, user: "John Doe", role: "ERC Member", review: "Great service!", replies: [] },
        { id: 2, user: "Jane Smith", role: "Supervisor", review: "Very satisfied!", replies: [] },
    ]);
    const [reply, setReply] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [activeReview, setActiveReview] = useState(null);
    const [currentUser, setCurrentUser] = useState({ name: "Alice Johnson", role: "Researcher-Lead" });
    const handleReply = (id) => {
        setReviews((prevReviews) =>
            prevReviews.map((review) =>
                review.id === id
                    ? { ...review, replies: [...review.replies, { user: currentUser.name, role: currentUser.role, text: reply }] }
                    : review
            )
        );
        setReply("");
    };
    const handleReview = () => {
        const newReview = {
            id: reviews.length + 1,
            user: currentUser.name,
            role: currentUser.role,
            review: reviewText,
            replies: [],
        };
        setReviews([...reviews, newReview]);
        setReviewText("");
    };
    return (
        <>
            <div>
                <div
                    onClick={openModal}>
                    <div
                        className="  py-2 px-5 rounded-md  group relative inline-flex items-center justify-center overflow-hidden border border-epsilon font-medium text-epsilon shadow-md transition duration-300 ease-out ">
                        <span className="ease absolute  inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-epsilon text-white duration-300 group-hover:translate-x-0">
                            <span className='mb-1 mr-1'>
                                1 Review
                            </span>
                        </span>
                        <span className="ease absolute gap-2  flex h-full w-full transform items-center justify-center text-epsilontransition-all duration-300 group-hover:translate-x-full ">
                            <button className=' bg-epsilon top-0 -right-2  rounded-full  w-[10px] h-[10px]'>
                            </button>
                            Reviews</span>
                        <span className="invisible relative"> x Reviews </span>
                    </div>
                </div>
                <Modal
                    className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95vw] h-[95vh] md:p-10 p-5 bg-white shadow-sm outline-none border rounded-lg'
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    contentLabel="Delete Confirmation Modal"
                >
                    <div className="flex gap-5 flex-col">
                        <div className='h-[75vh] overflow-auto p-4 border rounded-md border-zeta w-full'>
                            <div className="min-h-screen flex flex-col   ">
                                <div className="flex flex-col  mb-4">
                                    <h1 className="text-xl text-zeta font-bold mb-2">Project Name</h1>
                                    <p className="text-lg text-zeta font-semibold mb-2">Add Review</p>
                                    <div className="flex flex-col items-start w-full mt-4">
                                        <div className="md:w-[50%] w-full">
                                            <textarea
                                                className="  w-full p-2 border outline-epsilon border-gray-300 rounded-lg mb-2"
                                                rows="4"
                                                value={reviewText}
                                                onChange={(e) => setReviewText(e.target.value)}
                                                placeholder="Write your review..."
                                            />
                                            <button
                                                onClick={handleReview}
                                                className="my-3 py-2 px-4  font-semibold rounded-md group relative overflow-hidden  bg-epsilon  text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-epsilon hover:to-epsilon ">
                                                <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40"></span>
                                                Add Review
                                            </button>
                                        </div>
                                    </div>
                                    {/* reviews */}
                                    <div className="bg-epsilon bg-opacity-10 my-4 border-l-4 border-epsilon p-4 mt-4 rounded-md" role="alert">
                                        <p className="font-semibold">
                                            Reminder:
                                        </p>
                                        <p>
                                            Please remain polite and respectful when adding your review or reply. Thank you!
                                        </p>
                                    </div>
                                    <div className="w-full md:w-[50%]">
                                        <p className="text-lg text-zeta font-semibold mb-2">Previous Reviews</p>
                                        {reviews.map((review) => (
                                            <div key={review.id} className="mb-4 bg-epsilon bg-opacity-10 px-4 py-2 rounded-lg">
                                                <div className="flex justify-between  items-center mb-2">
                                                    <div>
                                                        <h2 className="text-lg font-semibold">{review.user} <span className="text-sm text-gray-500">({review.role})</span></h2>
                                                        <p className="text-gray-700">{review.review}</p>
                                                    </div>
                                                    <button
                                                        className="text-epsilon"
                                                        onClick={() =>
                                                            setActiveReview(activeReview === review.id ? null : review.id)
                                                        }
                                                    >
                                                        {activeReview === review.id ? "Hide Replies" : "Show Replies"}
                                                    </button>
                                                </div>
                                                {activeReview === review.id && (
                                                    <div className="ml-2">
                                                        <div className="mb-2">
                                                            {review.replies.map((reply, index) => (
                                                                <div key={index} className="mb-1">
                                                                    <p className="text-gray-600">
                                                                        {reply.user}
                                                                        <span className="text-sm text-gray-500"> ({reply.role}) </span>: <br />{reply.text}
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className="flex   gap-5 items-center">
                                                            <input
                                                                type="text"
                                                                className="flex-1 mb-2 p-2 outline-none border  rounded-lg
                                                                border-white"
                                                                value={reply}
                                                                onChange={(e) => setReply(e.target.value)}
                                                                placeholder="Write a reply..."
                                                            />
                                                            <button
                                                                onClick={() => handleReply(review.id)}
                                                                className=" mb-2 py-2 px-5 rounded-md  group relative inline-flex items-center justify-center overflow-hidden border border-epsilon font-medium text-epsilon shadow-md transition duration-300 ease-out ">
                                                                <span className="ease  absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-epsilon text-white duration-300 group-hover:translate-x-0">
                                                                    <FaReplyAll className='text-1xl' />   <span className='mx-2'>
                                                                        Reply
                                                                    </span>
                                                                </span>
                                                                <span className="ease absolute flex h-full w-full transform items-center justify-center text-epsilontransition-all duration-300 group-hover:translate-x-full">Reply</span>
                                                                <span className="invisible relative"> x Reply </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='h-[10vh] '>
                            <button
                                onClick={closeModal}
                                className=" w-fit h-fit py-2 px-5 rounded-md  group relative inline-flex items-center justify-center overflow-hidden border border-epsilon font-medium text-epsilon shadow-md transition duration-300 ease-out ">
                                <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-epsilon text-white duration-300 group-hover:translate-x-0">
                                    <IoCloseCircleSharp className='text-2xl' />   <span className='mx-2'>
                                        Close
                                    </span>
                                </span>
                                <span className="ease absolute flex h-full w-full transform items-center justify-center text-epsilontransition-all duration-300 group-hover:translate-x-full">Close</span>
                                <span className="invisible relative"> x Close </span>
                            </button>
                        </div>
                    </div>
                </Modal>
            </div></>
    )
}
