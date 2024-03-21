import React, { useEffect, useState } from "react";
import ChatList from "./Chatlist/ChatList";
import Empty from "./Empty";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { useStateProvider } from "@/context/StateContext";
import axios from "axios";
import { useRouter } from "next/router";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { reducerCases } from "@/context/constants";
import Chat from "./Chat/Chat";

function Main() {
  const router = useRouter();
  const [redirectLogin, setRedirectLogin] = useState(false);
  const [{ userInfo }, dispatch] = useStateProvider();

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

  return (
    <>
      <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
        <ChatList />
        {/* <Empty /> */}
        <Chat />
      </div>
    </>
  );
}

export default Main;
