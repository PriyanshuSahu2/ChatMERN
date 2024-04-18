import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
// import { BsFillPlusCircleFill } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";
import FriendRequestModal from './FriendRequestModal';
const SideChatbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };
    return (
        <div className='w-96 bg-white h-screen border-r'>
            <FriendRequestModal openModal={openModal} closeModal={closeModal} isOpen={isOpen} />
            <section className='flex justify-between items-center px-6 py-4 border-b'>
                <h1 className='font-[poppins] font-semibold text-lg -tracking-tight flex items-center'>Messages <IoIosArrowDown className='mt-1' /></h1>
                <div className='p-1 bg-[#615ef0] rounded-full h-fit cursor-pointer' onClick={openModal}>
                    <IoAdd size={20} color='white' />
                </div>
            </section>
            <section className='flex flex-col px-4 '>

                <section className='flex items-center gap-4 py-5 px-4  hover:bg-[#ededf9] cursor-pointer rounded-lg'>
                    <figure className=' h-12 rounded-full'>
                        <img className='rounded-full w-full h-full object-cover' src="https://images.squarespace-cdn.com/content/v1/5521b031e4b06ebe90178744/1560360135937-3YXVZ3124L1YL2FOASSQ/headshots-linkedin-photographer.jpg" alt="Profile" />
                    </figure>
                    <section className='flex flex-col w-full'>
                        <span className='flex justify-between items-center w-full'><span className='text-base font-medium text-black'>Priyanshu Sahu</span> <span className='text-xs text-gray-400'>12m</span></span>
                        {/* <span className='text-xs text-gray-600'>+91 8839 128 532</span> */}
                        <span className='text-xs text-gray-400'>You: <span className='text-gray-600 font-medium'>I Am HEHHEHHE</span></span>
                    </section>
                </section>
                <section className='flex items-center gap-4 py-5 px-4  hover:bg-[#ededf9] cursor-pointer rounded-lg'>
                    <figure className=' h-12 rounded-full'>
                        <img className='rounded-full w-full h-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0x0f-dlVahghz6S_6PoVvt6xYb-KL54B1K2ps_Hn80A&s" alt="Profile" />
                    </figure>
                    <section className='flex flex-col w-full'>
                        <span className='flex justify-between items-center w-full'><span className='text-base font-medium text-black'>Priyanshu Sahu</span> <span className='text-xs text-gray-400'>12m</span></span>
                        {/* <span className='text-xs text-gray-600'>+91 8839 128 532</span> */}
                        <span className='text-xs text-gray-400'>You: <span className='text-gray-600 font-medium'>I Am HEHHEHHE</span></span>
                    </section>
                </section>
                <section className='flex items-center gap-4 py-5 px-4  hover:bg-[#ededf9] cursor-pointer rounded-lg'>
                    <figure className=' h-12 rounded-full'>
                        <img className='rounded-full w-full h-full object-cover' src="https://images.squarespace-cdn.com/content/v1/5521b031e4b06ebe90178744/1560360135937-3YXVZ3124L1YL2FOASSQ/headshots-linkedin-photographer.jpg" alt="Profile" />
                    </figure>
                    <section className='flex flex-col w-full'>
                        <span className='flex justify-between items-center w-full'><span className='text-base font-medium text-black'>Priyanshu Sahu</span> <span className='text-xs text-gray-400'>12m</span></span>
                        {/* <span className='text-xs text-gray-600'>+91 8839 128 532</span> */}
                        <span className='text-xs text-gray-400'>You: <span className='text-gray-600 font-medium'>I Am HEHHEHHE</span></span>
                    </section>
                </section>
                <section className='flex items-center gap-4 py-5 px-4  hover:bg-[#ededf9] cursor-pointer rounded-lg'>
                    <figure className=' h-12 rounded-full'>
                        <img className='rounded-full w-full h-full object-cover' src="https://images.squarespace-cdn.com/content/v1/5521b031e4b06ebe90178744/1560360135937-3YXVZ3124L1YL2FOASSQ/headshots-linkedin-photographer.jpg" alt="Profile" />
                    </figure>
                    <section className='flex flex-col w-full'>
                        <span className='flex justify-between items-center w-full'><span className='text-base font-medium text-black'>Priyanshu Sahu</span> <span className='text-xs text-gray-400'>12m</span></span>
                        {/* <span className='text-xs text-gray-600'>+91 8839 128 532</span> */}
                        <span className='text-xs text-gray-400'>You: <span className='text-gray-600 font-medium'>I Am HEHHEHHE</span></span>
                    </section>
                </section>



            </section>

        </div>
    )
}

export default SideChatbar  