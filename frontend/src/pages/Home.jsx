import React, { useEffect, useRef, useState } from 'react'
import SideChatbar from '../components/SideChatbar'
import Chatwindow from '../components/ChatWindow/Chatwindow'
import { connectionSocket, socket } from '../socket'
import Sidebar from '../components/Sidebar'
import FriendRequestsTab from '../components/FriendRequestsTab'
import { useDispatch } from 'react-redux'
import { getConversations, getCurrMessages, getFriendRequests, getMessages } from '../redux/userRedux'
import FriendRequestToast from '../components/Toasts/FriendRequestToast'
import { toast } from 'react-toastify'
import { scrollToLast } from '../util'
import { USER_ID } from '../requestMethod'

const Home = () => {
    if (!socket && USER_ID) {
        connectionSocket(USER_ID);
    }
    const [currentTab, setCurrentTab] = useState("conversation") //* requests
    const dispatch = useDispatch()
    const tabComponents = {
        conversation: <SideChatbar />,
        friends: <FriendRequestsTab />,
    };
    useEffect(() => {
        dispatch(getFriendRequests())
        dispatch(getConversations())
    }, [dispatch])


    const scrollRef = useRef(null);


    useEffect(() => {
        if (!socket) {
            connectionSocket(USER_ID)
        }
        socket.on("new-friend-request", ({ data, message }) => {
            console.log("first")
            dispatch(getFriendRequests())
            toast(<FriendRequestToast message={message} userData={data} />)
        })
        socket.on("friend-request-accepted", ({ data, message }) => {
            toast(<FriendRequestToast message={message} userData={data} />)
        })
        socket.on('new-message', (data) => {
            console.log(data)
            dispatch(getMessages(data))
            scrollToLast(scrollRef)
        })
    }, [dispatch])

    return (
        <div className="flex">
            <Sidebar setCurrentTab={setCurrentTab} currentTab={currentTab} />
            {tabComponents[currentTab]}
            <Chatwindow scrollRef={scrollRef} />
        </div>
    );

}

export default Home