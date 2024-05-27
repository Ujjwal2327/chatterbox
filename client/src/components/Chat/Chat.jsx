import React, { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatContainer from "./ChatContainer";
import MessageBar from "./MessageBar";
import axios from "axios";
import { CHANGE_CURRENT_CHAT_USER } from "@/utils/ApiRoutes";
import { useStateProvider } from "@/context/StateContext";

function Chat({ loading }) {
  const [{ userInfo, currentChatUser }] = useStateProvider();

  useEffect(() => {
    const changeCurrentUser = async (currentChatUserId) => {
      try {
        await axios.post(`${CHANGE_CURRENT_CHAT_USER}`, {
          userId: userInfo?.id,
          currentChatUserId,
        });
      } catch (error) {
        console.log("error in chat/changeCurrentUser", error);
      }
    };

    changeCurrentUser(currentChatUser?.id);

    return () => {
      changeCurrentUser(-1);
    };
  }, [currentChatUser]);

  return (
    <div className="border-conversation-border border-l w-full bg-conversation-panel-background flex flex-col h-screen z-10">
      <ChatHeader />
      <ChatContainer loading={loading} />
      <MessageBar />
    </div>
  );
}

export default Chat;
