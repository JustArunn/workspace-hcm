import { TextField } from "@fluentui/react";
import { useAuth } from "../../context/Context";
import { useState } from "react";
import PageIcon from "../custom/icons/PageIcon";

const SearchFilters = ({ setUsers, allUsers }: any) => {
  const [searchTexts, setSearchTexts] = useState<{ [key: string]: string }>({});
  const { searchFilters } = useAuth();

  function handleSearch(text: string, mode: string) {
    setSearchTexts((prev) => ({ ...prev, [mode]: text }));

    if (text === "") {
      setUsers(allUsers);
    } else {
      const filteredUsers = allUsers.filter((item: any) => {
        const property = item[mode];
        return (
          property &&
          property.toString().toLowerCase().includes(text.trim().toLowerCase())
        );
      });
      console.log("filteredUsers", filteredUsers);
      setUsers(filteredUsers);
    }
  }

  return (
    <div className="flex gap-5 items-center">
      {searchFilters
        .filter((item: any) => item.active)
        .map((filter: any) => (
          <TextField
            key={filter.value}
            placeholder={`Search ${filter.value}`}
            value={searchTexts[filter.value] || ""}
            onChange={(e: any) => handleSearch(e.target.value, filter.value)}
            styles={{
              root: {
                "& .ms-TextField-fieldGroup": {
                  border: "none",
                  borderBottom: "1px solid black",
                },
                "& .ms-TextField-fieldGroup:focus": {
                  outline: "none",
                  border: "none",
                },
              },
            }}
          />
        ))}
      <PageIcon
        className="cursor-pointer text-xl"
        onClick={() => {
          document.getElementById("All")?.click();
        }}
        iconName="ClearFilter"
      />
    </div>
  );
};

export default SearchFilters;
