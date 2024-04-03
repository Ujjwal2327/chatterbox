"use client";
import React, { useEffect, useRef, useState } from "react";
import ChatList from "./Chatlist/ChatList";
import Empty from "./Empty";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { useStateProvider } from "@/context/StateContext";
import axios from "axios";
import { useRouter } from "next/router";
import { CHECK_USER_ROUTE, GET_MESSAGES_ROUTE, HOST } from "@/utils/ApiRoutes";
import { reducerCases } from "@/context/constants";
import Chat from "./Chat/Chat";
import io from "socket.io-client";

function Main() {
  const router = useRouter();
  const [redirectLogin, setRedirectLogin] = useState(false);
  const [{ userInfo, currentChatUser }, dispatch] = useStateProvider();
  const socket = useRef();
  const [socketEvent, setSocketEvent] = useState(false);

  onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
    if (!firebaseUser) setRedirectLogin(true);
    if (!userInfo && firebaseUser?.email) {
      try {
        const { data } = await axios.post(CHECK_USER_ROUTE, {
          email: firebaseUser.email,
        });
        if (!data.status) {
          router.push("/login");
        } else {
          const {
            id,
            name,
            email,
            profilePicture: profileImage,
            about: status,
          } = data.user;
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id,
              name,
              email,
              profileImage,
              status,
            },
          });
          router.push("/");
        }
      } catch (error) {
        console.log("error in login/handleLogin: ", error);
      }
    }
  });

  useEffect(() => {
    if (redirectLogin) router.push("/login");
  }, [redirectLogin]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axios.get(
          `${GET_MESSAGES_ROUTE}/${userInfo.id}/${currentChatUser.id}`
        );
        dispatch({ type: reducerCases.SET_MESSAGES, messages: data.messages });
      } catch (error) {
        console.log(`error in main/useEffect/getMessages: ${error}`);
      }
    };
    if (userInfo?.id && currentChatUser?.id) getMessages();
  }, [currentChatUser, userInfo]);

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST);
      socket.current.emit("add-user", userInfo.id);
      dispatch({ type: reducerCases.SET_SOCKET, socket: socket.current });
    }
    return () => {
      if (socket.current) socket.current.disconnect();
    };
  }, [userInfo]);

  useEffect(() => {
    if (socket.current && !socketEvent) {
      socket.current.on("msg-receive", (data) => {
        console.log("emit received", data);
        dispatch({
          type: reducerCases.ADD_MESSAGE,
          newMessage: { ...data.message },
        });
      });
      setSocketEvent(true);
    }
  }, [socket.current]);

  return (
    <>
      <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
        <ChatList />
        {currentChatUser ? <Chat /> : <Empty />}
      </div>
    </>
  );
}

export default Main;
