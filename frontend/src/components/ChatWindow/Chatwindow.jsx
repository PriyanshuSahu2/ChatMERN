import React, { useEffect, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getMessages, sendMessages } from "../../redux/userRedux";
import { connectionSocket, socket } from "../../socket";

import { scrollToLast } from "../../util";
import { USER_ID } from "../../requestMethod";
import Message from "./Message";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
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
    e.preventDefault()
    console.log(currChatWindow)
    if (connectionSocket) {
      socket.emit("send-message", {
        message: inputMessage,
        sender: { _id: USER_ID },
        recipient: recipient,
        type: "Text",
        conversationId: currChatWindow._id,
        status:'sent'
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
    setInputMessage("")
    scrollToLast(scrollRef);
  };

  const onEmojiClick = (data) => {
    setInputMessage(inputMessage + data.emoji)
  }

  useEffect(() => {
    if (currChatWindow) {
      dispatch(getMessages({ conversationId: currChatWindow._id}));
    }
  }, [currChatWindow, dispatch]);


  return (
    <div className="w-full flex flex-col">
      <ChatHeader recipient={recipient} />
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



