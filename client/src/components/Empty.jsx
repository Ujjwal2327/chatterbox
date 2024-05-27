import { useStateProvider } from "@/context/StateContext";
import { CHANGE_CURRENT_CHAT_USER } from "@/utils/ApiRoutes";
import Image from "next/image";
import React, { useEffect } from "react";
import axios from "axios";

function Empty() {
  const [{ userInfo }] = useStateProvider();

  // useEffect(() => {
  //   const changeCurrentUser = async () => {
  //     try {
  //       await axios.post(`${CHANGE_CURRENT_CHAT_USER}`, {
  //         userId: userInfo?.id,
  //         currentChatUserId: -1,
  //       });
  //       console.log("change")
  //     } catch (error) {
  //       console.log("error in empty/changeCurrentUser", error);
  //     }
  //   };

  //   changeCurrentUser();
  // }, []);

  return (
    <div className="border-conversation-border border-l w-full bg-panel-header-background flex flex-col justify-center items-center h-screen border-b-4 border-b-icon-green">
      <Image src="/logo.png" alt="logo" height={300} width={300} />
    </div>
  );
}

export default Empty;
