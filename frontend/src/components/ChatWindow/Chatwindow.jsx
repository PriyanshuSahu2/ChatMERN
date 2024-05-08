import React, { useEffect, useMemo, useState } from "react";
import { IoIosCall } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, sendMessages } from "../../redux/userRedux";
import { connectionSocket, socket } from "../../socket";

import { scrollToLast } from "../../util";
import { USER_ID } from "../../requestMethod";
import Message from "./Message";
import ChatFooter from "./ChatFooter";
const Chatwindow = ({ scrollRef }) => {
  const [inputMessage, setInputMessage] = useState("");

  const dispatch = useDispatch();
  const currChatWindow = useSelector((state) => state.appUI.currChat);
  const messages = useSelector(
    (state) => state?.user?.messages?.[currChatWindow?._id]
  );
  const recipient = useMemo(() => {
    return currChatWindow?.members?.filter(
      (data) => data._id !== USER_ID
    )[0];
  }, [currChatWindow?.members])

  const handleMessage = (e) => {
    if (connectionSocket) {
      socket.emit("send-message", {
        message: inputMessage,
        sender: { _id: USER_ID },
        recipient: recipient,
        type: "Text",
        conversationId: currChatWindow._id,
      });
    }
    dispatch(
      sendMessages({
        message: inputMessage,
        sender: { _id: USER_ID },
        recipient: recipient,
        type: "Text",
        conversationId: currChatWindow._id,
        createdAt: Date.now(),

      })
    );
    scrollToLast(scrollRef);
  };

  const onEmojiClick = (data) => {
    setInputMessage(inputMessage + data.emoji)
  }

  useEffect(() => {
    if (currChatWindow) {
      dispatch(getMessages({ conversationId: currChatWindow }));
    }
  }, [currChatWindow, dispatch]);
  return (
    <div className="w-full flex flex-col">
      <section className="w-full flex justify-between items-center border-b  py-[0.64rem] ">
        <div className="flex gap-4 items-center px-6 w-full ">
          <figure className=" h-10 w-10">
            <img
              className="h-full w-full rounded-full object-cover"
              src="https://images.squarespace-cdn.com/content/v1/5521b031e4b06ebe90178744/1560360135937-3YXVZ3124L1YL2FOASSQ/headshots-linkedin-photographer.jpg"
              alt=""
            />
          </figure>
          <div className="flex flex-col">
            <span className="text-gray-500">Priyanshu sahu</span>
            <span className="font-semibold  text-sm">+91-8839128532</span>
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
      <section
        className="chat-area flex-grow overflow-y-scroll h-1 transition-all"
        ref={scrollRef}
      >
        {currChatWindow !== undefined
          &&
          messages &&
          messages?.map((message) => (
            <Message message={message} />
          ))}

        {/* <div className="chat-msg owner mt-1">
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
                </div> */}
      </section>
      <ChatFooter handleMessage={handleMessage} inputMessage={inputMessage} setInputMessage={setInputMessage} onEmojiClick={onEmojiClick} />
    </div>
  );
};

export default Chatwindow;
