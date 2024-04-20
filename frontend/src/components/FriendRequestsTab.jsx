import React from 'react'
import FriendRequestComponents from './FriendRequestComponents'

import { useDispatch, useSelector } from 'react-redux'
import { socket } from '../socket'
import { userRequest } from '../requestMethod'
import { rejectFriendRequest } from '../redux/userRedux'

const FriendRequestsTab = () => {
    // const [friendRequest, setFriendRequests] = useState([])
    const friendRequest = useSelector(state => state.user.friendRequests)
    const handleAcceptFriendRequest = async (sender) => {
        try {
            const recipient = localStorage.getItem("id")
            socket.emit("accept-friend-request", { sender: sender, recipient: recipient })
        } catch (error) {

        }
    }
    const dispatch = useDispatch()
    const handleRejectFriendRequest = async (requestId) => {
        try {

            dispatch(rejectFriendRequest({ friendRequestId: requestId }))
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className='w-96 bg-white h-screen border-r'>

            <section className='flex flex-col gap-2 flex-grow overflow-y-scroll h-full  no-scrollbar'>

                {friendRequest?.map((data) => {
                    return <FriendRequestComponents key={data._id} id={data._id} data={data.sender} handleAcceptFriendRequest={handleAcceptFriendRequest} handleRejectFriendRequest={handleRejectFriendRequest} />

                })}



            </section>

        </div>
    )
}

export default FriendRequestsTab