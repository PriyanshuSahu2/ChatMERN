import React, { useMemo } from 'react'
import { convertTimestamps, getUserProfile } from '../utils/misc';
import { useSelector } from 'react-redux';
import { USER_ID } from '../requestMethod';

const UserChatProfile = ({ handleCurrChat, data }) => {

    const userProfile = useMemo(() => getUserProfile(data), [data])
    const fullName = `${userProfile.firstName} ${userProfile.lastName}`;
    const { unread } = data
    return (
        <section
            onClick={() => {
                handleCurrChat(data);
            }}
            key={data._id}
            className={`flex items-center gap-4 py-5 px-4  hover:bg-[#ededf9] cursor-pointer ${unread > 0 ? "unread" : ""}`}
        >
            <figure className="rounded-full">
                <img
                    className="rounded-full  object-cover"
                    src={userProfile.profile}
                    alt="Profile"
                />
            </figure>
            <section className="flex flex-col w-full">
                <span className="flex justify-between items-center w-full">
                    <span className="text-base font-normal text-black">
                        {fullName}
                    </span>{" "}
                    <span className="text-xs text-gray-400">{convertTimestamps(data.lastmessage.createdAt)}</span>
                </span>
                {/* <span className='text-xs text-gray-600'>+91 8839 128 532</span> */}
                <span className="text-xs text-gray-400 flex items-center justify-between">
                    <span>
                        {data.lastmessage.sender === USER_ID ? "You: " : `${userProfile.firstName.trim()}: `}
                        <span className="text-gray-600 font-normal">
                            {data.lastmessage.message}
                        </span>
                    </span>
                    {(unread > 0) && (<span className='py-1 px-[6px]  bg-blue-500 text-white rounded-full'>4</span>)}
                </span>
            </section>
        </section>
    )
}

export default UserChatProfile