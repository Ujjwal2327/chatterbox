import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { GET_ALL_CONTACTS_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiArrowBack, BiSearchAlt2 } from "react-icons/bi";
import ChatLIstItem from "./ChatLIstItem";

function ContactsList() {
  const [allContacts, setAllContacts] = useState({});
  const [{}, dispatch] = useStateProvider();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const { data } = await axios.get(GET_ALL_CONTACTS_ROUTE);
        setAllContacts(data.usersGroups);
      } catch (error) {
        console.log("error in contactsList/getContacts: ", error);
      }
    };
    getContacts();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="h-24 flex items-end px-3 py-4">
        <div className="flex items-center gap-12 text-white">
          <BiArrowBack
            className="cursor-pointer text-xl"
            onClick={() => {
              dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE });
            }}
          />
          <span>New Chat</span>
        </div>
      </div>

      <div className="bg-search-input-container-background h-full flex-auto overflow-auto custom-scrollbar">
        <div className="bg-search-input-container-background flex items-center gap-3 h-14 py-3 px-5">
          <div className="bg-panel-header-background flex items-center gap-5 flex-grow px-3 py-1 rounded-lg">
            <div>
              <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-xl" />
            </div>
            <div>
              <input
                type="text"
                placeholder="Search Contacts"
                className="bg-transparent text-sm focus:outline-none text-white w-full"
              />
            </div>
          </div>
        </div>

        {Object.entries(allContacts).map(([initialLetter, usersList]) => (
          <div key={initialLetter}>
            <div className="text-teal-light pl-10 py-5">{initialLetter}</div>
            {usersList.map((contact) => (
              <ChatLIstItem
                key={contact.id}
                data={contact}
                isAllContactsPage={true}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactsList;
