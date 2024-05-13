import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
// import { BsFillPlusCircleFill } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";
import FriendRequestModal from "./FriendRequestModal";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChat } from "../redux/appRedux";
// import { getFullName } from "../utils/misc";
import UserChatProfile from "./UserChatProfile";
const SideChatbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [conversations, setConversations] = useState([])

  const conversation = useSelector((state) => state.user.conversations);


  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const dispatch = useDispatch();

  const handleCurrChat = (id) => {
    dispatch(setCurrentChat(id));
  };



  return (
    <div className="w-[400px] bg-white h-screen border-r">
      <FriendRequestModal
        openModal={openModal}
        closeModal={closeModal}
        isOpen={isOpen}
      />
      <section className="flex justify-between items-center px-6 py-5 border-b">
        <h1 className="font-[poppins] font-semibold -tracking-tight flex items-center">
          Messages <IoIosArrowDown className="mt-1" />
        </h1>
        <div
          className="p-1 bg-[#3a4dfc] rounded-full h-fit cursor-pointer"
          onClick={openModal}
        >
          <IoAdd size={20} color="white" />
        </div>
      </section>
      <section className="flex flex-col">
        {conversation?.map((data) => {
          return (
            <UserChatProfile handleCurrChat={handleCurrChat} data={data} />
          );
        })}
      </section>
    </div>
  );
};

export default SideChatbar;
