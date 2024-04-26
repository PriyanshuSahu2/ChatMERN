import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

import { socket } from "../socket";

import { USER_ID } from "../requestMethod";

const FriendRequestModal = ({ isOpen, closeModal }) => {
  const [recipient, setRecipient] = useState();

  const handleSend = async (e) => {
    try {
      // const res = await userRequest.post("/user/send-friend-request", { recipient: recipient })
      // console.log(res)
      socket.emit("friend-request", { sender: USER_ID, recipient: recipient });
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
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
                    <input
                      type="text"
                      name="recipient"
                      onChange={(e) => setRecipient(e.target.value)}
                      className="px-4 w-full py-2 border rounded border-black"
                      placeholder="Enter Username or Email.."
                    />
                  </form>

                  <div
                    style={{ scrollbarWidth: "none" }}
                    className="mt-3 max-h-[9rem] overflow-y-scroll "
                  >
                    <div className="flex gap-4 items-center w-full mb-2">
                      <figure className=" h-10 w-10">
                        <img
                          className="h-full w-full rounded-full object-cover"
                          src="https://images.squarespace-cdn.com/content/v1/5521b031e4b06ebe90178744/1560360135937-3YXVZ3124L1YL2FOASSQ/headshots-linkedin-photographer.jpg"
                          alt=""
                        />
                      </figure>
                      <div className="flex flex-col justify-center">
                        <span className="text-gray-500 text-sm">
                          Priyanshu sahu
                        </span>
                        <span className="font-semibold  text-xs">
                          +91-8839128532
                        </span>
                      </div>
                      <div className="flex-grow" />
                      <div className="flex w-fit items-center text-center">
                        <button
                          type="button"
                          className="inline-flex w-8 h-8 mr-1 rounded-full py-2 px-2 justify-center bg-[#3a4dfc] text-white shadow-sm hover:bg-gray-50 hover:text-zinc-700 hover:ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                        >
                          <FaCheck />
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-8 h-8 rounded-full py-2 px-2 justify-center  bg-white  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-zinc-100  hover:ring-0 sm:mt-0 sm:w-auto"
                        >
                          <RxCross2 className="" />
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-4 items-center w-full mb-2">
                      <figure className=" h-10 w-10">
                        <img
                          className="h-full w-full rounded-full object-cover"
                          src="https://images.squarespace-cdn.com/content/v1/5521b031e4b06ebe90178744/1560360135937-3YXVZ3124L1YL2FOASSQ/headshots-linkedin-photographer.jpg"
                          alt=""
                        />
                      </figure>
                      <div className="flex flex-col justify-center">
                        <span className="text-gray-500 text-sm">
                          Priyanshu sahu
                        </span>
                        <span className="font-semibold  text-xs">
                          +91-8839128532
                        </span>
                      </div>
                      <div className="flex-grow" />
                      <div className="flex w-fit items-center text-center">
                        <button
                          type="button"
                          className="inline-flex w-8 h-8 mr-1 rounded-full py-2 px-2 justify-center bg-[#3a4dfc] text-white shadow-sm hover:bg-gray-50 hover:text-zinc-700 hover:ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                        >
                          <FaCheck />
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-8 h-8 rounded-full py-2 px-2 justify-center  bg-white  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-zinc-100  hover:ring-0 sm:mt-0 sm:w-auto"
                        >
                          <RxCross2 className="" />
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-4 items-center w-full mb-2">
                      <figure className=" h-10 w-10">
                        <img
                          className="h-full w-full rounded-full object-cover"
                          src="https://images.squarespace-cdn.com/content/v1/5521b031e4b06ebe90178744/1560360135937-3YXVZ3124L1YL2FOASSQ/headshots-linkedin-photographer.jpg"
                          alt=""
                        />
                      </figure>
                      <div className="flex flex-col justify-center">
                        <span className="text-gray-500 text-sm">
                          Priyanshu sahu
                        </span>
                        <span className="font-semibold  text-xs">
                          +91-8839128532
                        </span>
                      </div>
                      <div className="flex-grow" />
                      <div className="flex w-fit items-center text-center">
                        <button
                          type="button"
                          className="inline-flex w-8 h-8 mr-1 rounded-full py-2 px-2 justify-center bg-[#3a4dfc] text-white shadow-sm hover:bg-gray-50 hover:text-zinc-700 hover:ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                        >
                          <FaCheck />
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-8 h-8 rounded-full py-2 px-2 justify-center  bg-white  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-zinc-100  hover:ring-0 sm:mt-0 sm:w-auto"
                        >
                          <RxCross2 className="" />
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-4 items-center w-full mb-2">
                      <figure className=" h-10 w-10">
                        <img
                          className="h-full w-full rounded-full object-cover"
                          src="https://images.squarespace-cdn.com/content/v1/5521b031e4b06ebe90178744/1560360135937-3YXVZ3124L1YL2FOASSQ/headshots-linkedin-photographer.jpg"
                          alt=""
                        />
                      </figure>
                      <div className="flex flex-col justify-center">
                        <span className="text-gray-500 text-sm">
                          Priyanshu sahu
                        </span>
                        <span className="font-semibold  text-xs">
                          +91-8839128532
                        </span>
                      </div>
                      <div className="flex-grow" />
                      <div className="flex w-fit items-center text-center">
                        <button
                          type="button"
                          className="inline-flex w-8 h-8 mr-1 rounded-full py-2 px-2 justify-center bg-[#3a4dfc] text-white shadow-sm hover:bg-gray-50 hover:text-zinc-700 hover:ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                        >
                          <FaCheck />
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-8 h-8 rounded-full py-2 px-2 justify-center  bg-white  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-zinc-100  hover:ring-0 sm:mt-0 sm:w-auto"
                        >
                          <RxCross2 className="" />
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-4 items-center w-full mb-2">
                      <figure className=" h-10 w-10">
                        <img
                          className="h-full w-full rounded-full object-cover"
                          src="https://images.squarespace-cdn.com/content/v1/5521b031e4b06ebe90178744/1560360135937-3YXVZ3124L1YL2FOASSQ/headshots-linkedin-photographer.jpg"
                          alt=""
                        />
                      </figure>
                      <div className="flex flex-col justify-center">
                        <span className="text-gray-500 text-sm">
                          Priyanshu sahu
                        </span>
                        <span className="font-semibold  text-xs">
                          +91-8839128532
                        </span>
                      </div>
                      <div className="flex-grow" />
                      <div className="flex w-fit items-center text-center">
                        <button
                          type="button"
                          className="inline-flex w-8 h-8 mr-1 rounded-full py-2 px-2 justify-center bg-[#3a4dfc] text-white shadow-sm hover:bg-gray-50 hover:text-zinc-700 hover:ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                        >
                          <FaCheck />
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-8 h-8 rounded-full py-2 px-2 justify-center  bg-white  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-zinc-100  hover:ring-0 sm:mt-0 sm:w-auto"
                        >
                          <RxCross2 className="" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    onClick={handleSend}
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-[#3a4dfc] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#4447ff] sm:ml-3 sm:w-auto"
                  >
                    Send
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FriendRequestModal;
