import React from 'react'
import { CiMenuKebab } from 'react-icons/ci'
import { FaVideo } from 'react-icons/fa'
import { IoIosCall } from 'react-icons/io'
import { getFullName } from '../../utils/misc'

const ChatHeader = ({ recipient }) => {
    return (
        <section className="w-full flex justify-between items-center border-b  py-[0.64rem] ">
            <div className="flex gap-4 items-center px-6 w-full ">
                <figure className=" h-10 w-10">
                    <img
                        className="h-full w-full rounded-full object-cover"
                        src={recipient?.profile}
                        alt=""
                    />
                </figure>
                <div className="flex flex-col">
                    <span className="text-gray-500">{recipient && getFullName(recipient)}</span>
                    <span className="font-semibold  text-sm">{recipient?.email}</span>
                </div>
            </div>
            <div className=" flex gap-2">
                <div className="p-2 bg-[#3a4dfc] rounded-full h-fit cursor-pointer">
                    <IoIosCall size={20} color="white" />
                </div>
                <div className="p-2 bg-[#3a4dfc] rounded-full h-fit cursor-pointer">
                    <FaVideo size={20} color="white" />
                </div>
                <div className="p-2 rounded-full h-fit cursor-pointer">
                    <CiMenuKebab size={20} color="black" />
                </div>
            </div>
        </section>
    )
}

export default ChatHeader