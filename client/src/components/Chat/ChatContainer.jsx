import { useStateProvider } from "@/context/StateContext";
import { calculateTime } from "@/utils/CalculateTime";
import React, { useEffect, useRef, useState } from "react";
import MessageStatus from "../common/MessageStatus";
import ImageMessage from "./ImageMessage";
import { DELETE_MSG_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { reducerCases } from "@/context/constants";
import dynamic from "next/dynamic";
const VoiceMessage = dynamic(() => import("./VoiceMessage"), {
  ssr: false,
});

function ChatContainer({ loading }) {
  const [{ userInfo, currentChatUser, messages }, dispatch] =
    useStateProvider();

  // Scroll to bottom of chat container
  const chatContainerRef = useRef(null);

  const deleteMsg = async (messageId) => {
    try {
      await axios.post(`${DELETE_MSG_ROUTE}/${messageId}`, {
        userId: userInfo.id,
      });
      const filteredMessages = messages.filter((msg) => {
        return msg.id != messageId;
      });
      dispatch({ type: reducerCases.SET_MESSAGES, messages: filteredMessages });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    }, 1000);
  }, [messages]);

  return (
    <div
      ref={chatContainerRef}
      className="h-[80vh] w-full relative flex-grow overflow-auto custom-scrollbar"
    >
      <div className=" bg-fixed h-full w-full absolute left-0 top-0 bg-opacity-5">
        <div className="sm:mx-10 mx-2 my-6 relative bottom-0 z-40 left-0">
          <div className="flex w-full justify-center items-center">
            {loading ? (
              <div className="h-[70vh] flex w-full justify-center items-center">
                <span className="loader"></span>
              </div>
            ) : (
              <div className="flex flex-col justify-end w-full gap-1 overflow-auto">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex group items-center ${
                      message.senderId === currentChatUser?.id
                        ? "justify-start"
                        : "justify-end"
                    }`}
                  >
                    {/* {message.senderId === currentChatUser?.id && (
                      <div className="text-white items-center justify-center hidden group-hover:block hover:cursor-pointer">
                        <MdDelete
                          onClick={async () => {
                            await deleteMsg(message.id);
                          }}
                        />
                      </div>
                    )} */}

                    {message.type === "text" && (
                      <div
                        className={`text-white px-2 py-1.5 text-sm rounded-md flex gap-2 items-end max-w-[45%] flex-wrap ${
                          message.senderId === currentChatUser?.id
                            ? "bg-incoming-background"
                            : "bg-outgoing-background"
                        }`}
                      >
                        <span className="break-all">{message.message}</span>
                        <div className="flex gap-1 items-end">
                          <span className="text-bubble-meta text-[11px] pt-1 min-w-fit">
                            {calculateTime(message.createdAt)}
                          </span>
                          <span>
                            {message.senderId === userInfo?.id && (
                              <MessageStatus
                                messageStatus={message.messageStatus}
                              />
                            )}
                          </span>
                        </div>
                      </div>
                    )}

                    {message.type === "image" && (
                      <ImageMessage message={message} />
                    )}

                    {message.type === "audio" && (
                      <VoiceMessage message={message} />
                    )}

                    {message.senderId !== currentChatUser?.id && (
                      <div className="text-white items-center justify-center hidden group-hover:block hover:cursor-pointer">
                        <MdDelete
                          onClick={async () => {
                            await deleteMsg(message.id);
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
