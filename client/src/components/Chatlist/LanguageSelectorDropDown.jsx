import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import React, { useEffect, useState } from "react";

function LanguageSelectorDropDown() {

    const [{userLanguage},dispatch] = useStateProvider();
    const [selectedValue,setSelectedValue] = useState(userLanguage);
    const languages = [
        {
            name: "Choose Language",
            code: 'null',
        },
        {
            name:"German",
            code:"de"
        },
        {
            name:"English",
            code:"en"
        },
        {
            name:"Spanish",
            code:"es"
        },
        {
            name:"Italian",
            code:"it"
        },
        {
            name:"Portuguese",
            code:"pt"
        },
        {
            name:"French",
            code:"fr"
        },
        {
            name:"Japanese",
            code:"ja"
        },
        {
            name:"Korean",
            code:"ko"
        },
        {
            name:"Hindi",
            code:"hi"
        },
        {
            name:"Arabic",
            code:"ar"
        },
        {
            name:"Chinese (simplified)",
            code:"zh"
        },
        {
            name:"Chinese (traditional)",
            code:"zh-TW"
        },
    ]

    useEffect(() => {
        // localStorage.setItem('userLanguage',selectedValue);
        dispatch({type:reducerCases.SET_USER_LANGUAGE,userLanguage: selectedValue});
    },[selectedValue])

    

  return (
    <div className="bg-search-input-container-background flex items-center gap-3 h-14 py-3 pl-5">
      <div className="bg-panel-header-background flex items-center gap-5 flex-grow px-3 py-1 rounded-lg">
        <div className="flex w-full items-center">
            <select value={selectedValue} onChange = {(e) => setSelectedValue(e.target.value)} id = "language-picker">
                {languages.map((language) => (
                    <option value={language.code}>
                        {language.name}
                    </option>
                ))}
            </select>
        </div>
      </div>
    </div>
  );
}

export default LanguageSelectorDropDown;
