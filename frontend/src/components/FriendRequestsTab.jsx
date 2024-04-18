import React, { useEffect, useState } from 'react'
import FriendRequestComponents from './FriendRequestComponents'
import { BASE_URL, userRequest } from '../requestMethod'

const FriendRequestsTab = () => {
    const [friendRequest, setFriendRequests] = useState([])
    useEffect(() => {
        const fetchFriendRequests = async () => {
            try {
                const res = await userRequest.get(`${BASE_URL}/user/get-friend-requests/${localStorage.getItem("id")}`)
                setFriendRequests(res.data.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchFriendRequests()
    }, [])
    return (
        <div className='w-96 bg-white h-screen border-r'>

            <section className='flex flex-col  gap-2'>

                {friendRequest.map((data) => {
                    return <FriendRequestComponents data={data.sender} />

                })}



            </section>

        </div>
    )
}

export default FriendRequestsTab