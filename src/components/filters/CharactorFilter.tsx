// import "../../css/main.css";
import { FC, useState } from "react";
import { CommandBar, ICommandBarItemProps } from "@fluentui/react";
import { useAuth, useThemes } from "../../context/Context";

const CharactorFilter: FC<any> = ({ setUsers }) => {
  const { bgColor, fontColor } = useThemes();
  const [activeTab, setActiveTab] = useState("all");
  const { allUsers } = useAuth()

  function handleSearch(text: string, mode: string) {
    // setSearchTexts((prev) => ({ ...prev, [mode]: text }));
    setActiveTab(text);
    if (text == "all") {
      setUsers(allUsers);
      return;
    }
    if (text === "") {
      setUsers(allUsers);
    } else {
      const filteredUsers = allUsers.filter((item: any) => {
        const property = item[mode];
        return (
          property &&
          property
            .toString()
            .toLowerCase()
            .startsWith(text.trim().toLowerCase())
        );
      });
      setUsers(filteredUsers);
    }
  }

  // Generate buttons A-Z (uppercase)
  const buttons: ICommandBarItemProps[] = Array.from(
    { length: 26 },
    (_, index) => {
      const letter = String.fromCharCode(65 + index); // ASCII A-Z (65 is 'A')
      return {
        id:letter,
        key: letter,
        text: letter, // Already uppercase
        onClick: () => handleSearch(letter.toLowerCase(), "name"),
        className:
          activeTab.toLowerCase() == letter.toLowerCase() ? "activeLetter" : "",
      };
    }
  );

  const commandBarItems: ICommandBarItemProps[] = [...buttons];
  commandBarItems.unshift({
    id:"All",
    key: "All",
    text: "All", // Already uppercase
    onClick: () => handleSearch("All".toLowerCase(), "name"),
    className:
      activeTab.toLowerCase() == "All".toLowerCase() ? "activeLetter" : "",
  });

  return (
    <div className="w-full">
      <CommandBar
        id="commandBarFilters"
        styles={{
          root: {
            height: "35px",
            marginTop: "10px",
            width: "100%",
            padding: "0px",
            "& .ms-Button--commandBar:hover ": {
              backgroundColor: bgColor,
              color: fontColor,
            },
            "& .activeLetter": {
              backgroundColor: bgColor,
              color: fontColor,
            },
            "& .ms-CommandBar-primaryCommand": {
              backgroundColor: "rgb(240, 240, 240)",
            },
          },
        }}
        // className={`${fontColor}`}
        items={commandBarItems}
      />
    </div>
  );
};

export default CharactorFilter;
