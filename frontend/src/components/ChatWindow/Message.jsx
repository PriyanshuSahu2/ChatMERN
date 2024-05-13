import React, { useMemo, useState } from 'react'
import { USER_ID } from '../../requestMethod'
import { convertTimestamps } from '../../utils/misc'

const Message = ({ message }) => {

    const owner = useMemo(() => message.sender._id === USER_ID, [message.sender._id])
    const time = useMemo(() => convertTimestamps(message.createdAt), [message])
    const status = {
        Progress: 'Progress',
        Sent: 'Sent',
        Recieved: "Recieved",
        Seen: "Seen"
    }
    return (
        <div
            className={`chat-msg  ${owner ? "owner" : ""
                }`}
        >
            <div className="chat-msg-profile">
                <img
                    className="chat-msg-img"
                    src={message.sender.profile}
                    alt=""
                />
                {owner && <div className="chat-msg-date">
                    {status[message.status]}
                </div>}
                {/* Adjust this part */}
            </div>
            <div className="chat-msg-content">
                <div className="chat-msg-text">{message.message}</div>
            </div>
        </div>
    )
}

export default Message