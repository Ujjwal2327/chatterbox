import { useStateProvider } from "@/context/StateContext";
import { ADD_MESSAGE_ROUTE } from "@/utils/ApiRoutes";
import React, { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import axios from "axios";
import { reducerCases } from "@/context/constants";

function MessageBar() {
  const [{ userInfo, currentChatUser, socket, messages }, dispatch] =
    useStateProvider();
  const [message, setMessage] = useState("");
  const handleSendMessage = async () => {
    try {
      const { data } = await axios.post(ADD_MESSAGE_ROUTE, {
        message,
        from: userInfo?.id,
        to: currentChatUser?.id,
      });
      // console.log("data",data)
      socket.emit("send-msg", {
        message: data.message,
        from: userInfo?.id,
        to: currentChatUser?.id,
      });
      dispatch({
        type: reducerCases.ADD_MESSAGE,
        newMessage: data.message,
      });
      setMessage("");
    } catch (error) {
      console.log("error in messageBar/handleSendMessage: ", error);
    }
  };

  return (
    <div className="bg-panel-header-background h-20 px-4 flex items-center gap-6 relative">
      <>
        <div className="flex gap-6">
          <BsEmojiSmile
            className="text-panel-header-icon cursor-pointer text-xl"
            title="Emoji"
          />
          <ImAttachment
            className="text-panel-header-icon cursor-pointer text-xl"
            title="Attach File"
          />
        </div>

        <div className="w-full rounded-lg h-10 flex items-center">
          <input
            type="text"
            placeholder="Type a message"
            className="bg-input-background text-sm focus:outline-none text-white h-10 rounded-lg px-5 py-4 w-full"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="flex w-10 items-center justify-center">
          <button>
            <MdSend
              className="text-panel-header-icon cursor-pointer text-xl"
              title="Send Message"
              onClick={handleSendMessage}
            />
            {/* <FaMicrophone className="text-panel-header-icon cursor-pointer text-xl"
            title="Record "/> */}
          </button>
        </div>
      </>
    </div>
  );
}

export default MessageBar;
