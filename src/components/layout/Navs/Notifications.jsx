import React, { useState, useEffect } from 'react';
import { IoNotifications } from "react-icons/io5";
import { MdCheckCircle } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { toast } from 'react-toastify';
export default function Notifications() {
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const markAsSeen = async (notificationId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/notifications/mark-as-seen`, {
                method: 'PATCH',
                redirect: 'follow',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ notificationId }),
            });
            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message || 'Failed to mark notification as seen');
            }
            const result = await response.json();
            toast.success('Notification marked as seen');
            // Update local state to reflect the change
            setNotifications(prev =>
                prev.map(notification =>
                    notification.id === notificationId ? { ...notification, status: 'seen' } : notification
                )
            );
        } catch (error) {
            toast.error(`Error marking notification as seen: ${error.message}`);
            console.error(`Error marking notification as seen: ${error.message}`);
        }
    };
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/notifications/get-user-notifications`, {
                    method: "GET",
                    redirect: "follow",
                    credentials: "include",
                });
                if (response.status === 404) {
                    console.log('No notifications found');
                    setLoading(false);
                    return;
                }
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                // console.log(result);
                if (result.success) {
                    const formattedNotifications = result.notifications.map(notification => ({
                        id: notification._id,
                        createdAt: notification.createdAt || '',
                        status: notification.status || 'unseen',
                        description: notification.description || 'No description available',
                    }));
                    setNotifications(formattedNotifications);
                } else {
                    toast.error("Failed to load notifications.");
                }
            } catch (error) {
                console.error(error);
                toast.error("An error occurred while fetching notifications.");
            } finally {
                setLoading(false);
            }
        };
        fetchNotifications();
    }, []);
    const unseenNotifications = notifications.filter(notification => notification.status === 'unseen');
    const hasUnseenNotifications = unseenNotifications.length > 0;
    return (
        <>
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="relative w-fit avatar">
                    <div className="mx-5">
                        <IoNotifications
                            className={`text-zeta text-opacity-50 text-2xl ${hasUnseenNotifications ? 'relative' : ''}`}
                        />
                        {hasUnseenNotifications && (
                            <span className="absolute -top-1 right-3 w-2 h-2 bg-red-500 rounded-full"></span>
                        )}
                    </div>
                </div>
                <ul
                    tabIndex={0}
                    className="dropdown-content min-h-[13rem] max-h-[13rem] overflow-y-scroll bg-base-100 rounded-sm z-[1] mt-1 w-[18rem] lg:w-96 md:w-80 p-5 shadow"
                >
                    {loading ? (
                        <li>Loading...</li>
                    ) : hasUnseenNotifications ? (
                        unseenNotifications.map(notification => (
                            <React.Fragment key={notification.id}>
                                <li className="hover:bg-epsilon w-full  hover:bg-opacity-35 rounded-sm duration-300 my-1 px-2 py-1 ">
                                    <div className=" text-sm">{notification.description}</div>
                                    <div className="flex justify-between items-center">
                                        <div className="text-xs text-gray-500 mt-1">{new Date(notification.createdAt).toLocaleString()}</div>
                                        <FaCheck
                                            onClick={() => markAsSeen(notification.id)}
                                            className='text-epsilon cursor-pointer' />
                                    </div>
                                </li>
                                <hr className='my-2' />
                            </React.Fragment>
                        ))
                    ) : (
                        <div className='flex flex-col justify-center items-center w-full min-h-[13rem] max-h-[13rem]'>
                            <FaBoxOpen className='text-epsilon text-4xl' />
                            <p className='text-center my-4'>No Notifications Found</p>
                        </div>
                    )}
                    {unseenNotifications.length > 0 && (
                        <p className='text-center text-sm mt-5'>BMY Health Pakistan</p>
                    )}
                </ul>
            </div>
        </>
    );
}
