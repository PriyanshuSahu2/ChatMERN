import React, { useMemo, useState } from 'react'
import { USER_ID } from '../../requestMethod'
import { convertTimestamps } from '../../utils/misc'

const Message = ({ message }) => {

    const owner = useMemo(() => message.sender._id === USER_ID, [message.sender._id])

    const time = useMemo(() => convertTimestamps(message.createdAt), [message])
    return (
        <div
            className={`chat-msg mt-1 ${owner ? "owner" : ""
                }`}
        >
            <div className="chat-msg-profile">
                <img
                    className="chat-msg-img"
                    src={message.sender.profile}
                    alt=""
                />
                {owner && <div className="chat-msg-date">
                    Message seen {time}
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