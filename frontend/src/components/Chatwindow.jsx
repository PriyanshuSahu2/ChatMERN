import React, { useEffect, useState } from 'react'
import { IoIosCall } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
const Chatwindow = () => {
    const [webSocket, setWebSocket] = useState(null)

    const handleMessage = (e) => {
        console.log(e)
    }
    useEffect(() => {
        // const ws = new WebSocket("ws://localhost:5000")
        // setWebSocket(ws)
        // ws.addEventListener('message', handleMessage)
    }, [])
    return (
        <div className='w-full flex flex-col'>
            <section className='w-full flex justify-between items-center border-b  py-2 '>
                <div className='flex gap-4 items-center px-6 w-full '>
                    <figure className=' h-10 w-10'>
                        <img className='h-full w-full rounded-full object-cover' src="https://images.squarespace-cdn.com/content/v1/5521b031e4b06ebe90178744/1560360135937-3YXVZ3124L1YL2FOASSQ/headshots-linkedin-photographer.jpg" alt="" />
                    </figure>
                    <div className='flex flex-col'>
                        <span className='text-gray-500'>Priyanshu sahu</span>
                        <span className='font-semibold'>+91-8839128532</span>
                    </div>
                </div>
                <div className=' flex gap-2'>
                    <div className='p-2 bg-[#615ef0] rounded-full h-fit cursor-pointer'>
                        <IoIosCall size={20} color='white' />
                    </div>
                    <div className='p-2 bg-[#615ef0] rounded-full h-fit cursor-pointer'>
                        <FaVideo size={20} color='white' />
                    </div>
                    <div className='p-2 rounded-full h-fit cursor-pointer'>
                        <CiMenuKebab size={20} color='black' />
                    </div>
                </div>
            </section>
            <section className='chat-area'>
                <div className="chat-msg owner mt-1">
                    <div className="chat-msg-profile">
                        <img className="chat-msg-img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png" alt="" />
                        <div className="chat-msg-date">Message seen 1.22pm</div>
                    </div>
                    <div className="chat-msg-content">
                        <div className="chat-msg-text">Sit amet risus nullam eget felis eget. Dolor sed viverra ipsum😂😂😂</div>

                    </div>
                </div>
                <div className="chat-msg mt-1">
                    <div className="chat-msg-profile">
                        <img className="chat-msg-img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png" alt="" />
                        <div className="chat-msg-date">Message seen 1.22pm</div>
                    </div>
                    <div className="chat-msg-content">
                        <div className="chat-msg-text">Sit amet risus nullam eget felis eget. Dolor sed viverra ipsum😂😂😂</div>

                    </div>
                </div>
            </section>
            <div className="chat-area-footer mt-auto">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-video"
                >
                    <path d="M23 7l-7 5 7 5V7z" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-image"
                >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                </svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-plus-circle"
                >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v8M8 12h8" />
                </svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-paperclip"
                >
                    <path
                        d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"
                    />
                </svg>
                <input type="text" placeholder="Type something here..." />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-smile"
                >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
                </svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-thumbs-up"
                >
                    <path
                        d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"
                    />
                </svg>
            </div>
        </div>
    )
}

export default Chatwindow