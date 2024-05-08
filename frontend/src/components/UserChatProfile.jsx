import React, { useMemo } from 'react'
import { getUserProfile } from '../utils/misc';

const UserChatProfile = ({ handleCurrChat, data }) => {

    const userProfile = useMemo(() => getUserProfile(data), [data])
    const fullName = `${userProfile.firstName} ${userProfile.lastName}`;


    console.log(data)
    return (
        <section
            onClick={() => {
                handleCurrChat(data);
            }}
            key={data._id}
            className="flex items-center gap-4 py-5 px-4  hover:bg-[#ededf9] cursor-pointer rounded-lg"
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
                    <span className="text-base font-medium text-black">
                        {fullName}
                    </span>{" "}
                    <span className="text-xs text-gray-400">12m</span>
                </span>
                {/* <span className='text-xs text-gray-600'>+91 8839 128 532</span> */}
                <span className="text-xs text-gray-400">
                    You:{" "}
                    <span className="text-gray-600 font-medium">
                        I Am HEHHEHHE
                    </span>
                </span>
            </section>
        </section>
    )
}

export default UserChatProfile