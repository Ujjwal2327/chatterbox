import { useStateProvider } from "@/context/StateContext";
import { calculateTime } from "@/utils/CalculateTime";
import React, { useEffect, useRef } from "react";
import MessageStatus from "../common/MessageStatus";

function ChatContainer() {
  const [{ userInfo, currentChatUser, messages }] = useStateProvider();

  // Scroll to bottom of chat container
  const chatContainerRef = useRef(null);
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
        <div className="mx-10 my-6 relative bottom-0 z-40 left-0">
          <div className="flex w-full">
            <div className="flex flex-col justify-end w-full gap-1 overflow-auto">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.senderId === currentChatUser.id
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  {message.type === "text" && (
                    <div
                      className={`text-white px-2 py-1.5 text-sm rounded-md flex gap-2 items-end max-w-[45%] flex-wrap ${
                        message.senderId === currentChatUser.id
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
                          {message.senderId === userInfo.id && (
                            <MessageStatus
                              messageStatus={message.messageStatus}
                            />
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
