import React, { useEffect, useState } from 'react'
import SideChatbar from '../components/SideChatbar'
import Chatwindow from '../components/Chatwindow'
import { connectionSocket, socket } from '../socket'
import Sidebar from '../components/Sidebar'
import FriendRequestsTab from '../components/FriendRequestsTab'
import { useDispatch } from 'react-redux'
import { getConversations, getFriendRequests } from '../redux/userRedux'
import FriendRequestToast from '../components/Toasts/FriendRequestToast'
import { toast } from 'react-toastify'

const Home = () => {
    if (!socket && localStorage.getItem("id")) {
        connectionSocket(localStorage.getItem("id"));
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

    useEffect(() => {
        if (!socket) {
            connectionSocket(localStorage.getItem('id'))
        }
        socket.on("new-friend-request", ({ data, message }) => {
            console.log("first")
            dispatch(getFriendRequests())
            toast(<FriendRequestToast message={message} userData={data} />)
        })
        socket.on("friend-request-accepted", ({ data, message }) => {
            toast(<FriendRequestToast message={message} userData={data} />)
        })
    }, [dispatch])
    return (
        <div className="flex">
            <Sidebar setCurrentTab={setCurrentTab} />
            {tabComponents[currentTab]}
            <Chatwindow />
        </div>
    );

}

export default Home