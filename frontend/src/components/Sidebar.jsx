import React from 'react';
import { BiSolidMessageSquareDetail } from 'react-icons/bi';
import { HiOutlineChatBubbleOvalLeftEllipsis } from 'react-icons/hi2';
import { FaUserFriends } from 'react-icons/fa';

const Sidebar = ({setCurrentTab}) => {
    return (
        <div className="h-screen min-w-10 bg-[#191A1C] flex items-center flex-col  px-2 ">
            <figure className=' h-11 rounded-full p-[2px] border-1 border-[white] mb-2'>
                <img className='rounded-full w-full h-full object-cover' src="https://images.squarespace-cdn.com/content/v1/5521b031e4b06ebe90178744/1560360135937-3YXVZ3124L1YL2FOASSQ/headshots-linkedin-photographer.jpg" alt="Profile" />
            </figure>
            <div className="p-[6px] hover:bg-[#ffffff1b] rounded">
                <HiOutlineChatBubbleOvalLeftEllipsis color="#ffffff87" size={24}  onClick={()=>{setCurrentTab("conversation")}}/>
            </div>
            <div className="p-[6px] rounded-lg hover:bg-[#ffffff1b]">
                <FaUserFriends color="white" size={24} onClick={()=>{setCurrentTab("friends")}}/>
            </div>

        </div>
    );
};

export default Sidebar;
