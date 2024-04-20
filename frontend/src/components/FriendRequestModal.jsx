import React, { useEffect, useState } from 'react'

import { connectionSocket, socket } from '../socket'
import { toast } from 'react-toastify'
import FriendRequestToast from './Toasts/FriendRequestToast'
import { useDispatch } from 'react-redux'
import { getFriendRequests } from '../redux/userRedux'

const FriendRequestModal = ({ isOpen, closeModal }) => {

    const [recipient, setRecipient] = useState()
    const dispatch = useDispatch()
    const handleSend = async (e) => {
        try {
            // const res = await userRequest.post("/user/send-friend-request", { recipient: recipient })
            // console.log(res)
            socket.emit("friend-request", { sender: localStorage.getItem('id'), recipient: recipient })
        } catch (error) {
            console.error(error)
        }
    }





    return (
        <>
            {isOpen && (<div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                {/* <!--
            Background backdrop, show/hide based on modal state.

            Entering: "ease-out duration-300"
            From: "opacity-0"
            To: "opacity-100"
            Leaving: "ease-in duration-200"
            From: "opacity-100"
            To: "opacity-0"
  --> */}
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        {/* <!--
                    Modal panel, show/hide based on modal state.

                    Entering: "ease-out duration-300"
                    From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    To: "opacity-100 translate-y-0 sm:scale-100"
                    Leaving: "ease-in duration-200"
                    From: "opacity-100 translate-y-0 sm:scale-100"
                    To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      --> */}
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <form onSubmit={null}>
                                    <input type="text" name='recipient' onChange={(e) => setRecipient(e.target.value)} className='px-4 w-full py-2 border rounded border-black' placeholder='Enter Username or Email..' />

                                </form>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button onClick={handleSend} type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Send</button>
                                <button type="button" onClick={closeModal} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}
        </>
    )
}

export default FriendRequestModal