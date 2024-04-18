import React, { useState } from 'react'
import SideChatbar from '../components/SideChatbar'
import Chatwindow from '../components/Chatwindow'
import { connectionSocket, socket } from '../socket'
import Sidebar from '../components/Sidebar'
import FriendRequestsTab from '../components/FriendRequestsTab'

const Home = () => {
    if (!socket && localStorage.getItem("id")) {
        connectionSocket(localStorage.getItem("id"));
    }
    const [currentTab, setCurrentTab] = useState("conversation") //* requests

    const tabComponents = {
        conversation: <SideChatbar />,
        friends: <FriendRequestsTab />,
        // Add more tab components as needed
    };

    return (
        <div className="flex">
            <Sidebar setCurrentTab={setCurrentTab}/>
            {tabComponents[currentTab]}
            <Chatwindow />
        </div>
    );

}

export default Home