import { useState } from "react";
import { TextField } from "@fluentui/react";
import NoRecordsFound from "../utils/NoRecordsFound";
import { useThemes } from "../../context/Context";
import PageIcon from "../custom/icons/PageIcon";
import Person from "../custom/Persona";

// const employees = [
//   { id: 1, name: "Alice Johnson", phone: "555-1234" },
//   { id: 2, name: "Bob Smith", phone: "555-5678" },
//   { id: 3, name: "Charlie Brown", phone: "555-8765" },
//   { id: 4, name: "Diana Prince", phone: "555-4321" },
//   { id: 5, name: "Eve Adams", phone: "555-2468" },
//   { id: 6, name: "Frank Castle", phone: "555-1357" },
// ];

const Contact = ({ users }: any) => {
  const [filter, setFilter] = useState("");
  const [activeLetter, setActiveLetter] = useState("");
  const { bgColor, fontColor } = useThemes();

  const handleFilterChange = (event: any) => {
    setFilter(event.target.value);
    setActiveLetter("");
  };

  const handleLetterClick = (letter: any) => {
    setFilter(letter);
    setActiveLetter(letter);
  };

  const filteredEmployees = users.filter(
    (employee: any) =>
      employee.name.toLowerCase().startsWith(filter.toLowerCase()) ||
      employee.phone.toLowerCase().includes(filter.toLowerCase())
  );

  const alphabet = Array.from(Array(26)).map((_, i) =>
    String.fromCharCode(i + 65)
  );

  return (
    <div className="h-full flex w-[90%] m-auto">
      <div className="flex-1 p-4">
        <TextField
          label="Search Employees"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Search by name..."
          className="mb-4"
        />

        <ul className="space-y-2">
          {filteredEmployees.length < 1 ? (
            <div className="h-full w-full flex justify-center items-center">
              <NoRecordsFound className="w-[20%] flex justify-center items-center" />
            </div>
          ) : (
            filteredEmployees.map((employee: any) => (
              <li
                key={employee.id}
                className="flex justify-between items-center p-3 border rounded-lg shadow-md bg-white transition duration-200 hover:shadow-lg"
              >
                <div className="flex justify-between items-center w-full">
                  <div>
                    <Person
                      imageUrl={employee.image}
                      imageInitials={employee.name[0]}
                      text={employee.name}
                      secondaryText={employee.phone}
                    />
                  </div>

                  <a
                    href={`tel:${employee.phone}`}
                    className="text-gray-600 hover:underline"
                  >
                    <PageIcon iconName="Phone" />
                  </a>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="flex flex-col items-center border-l pl-4">
        <button
          className={`py-1 w-full text-center p-2 mt-12 rounded transition duration-200 `}
          onClick={() => handleLetterClick("")}
          style={{
            backgroundColor: activeLetter === "" ? bgColor : undefined,
            color: activeLetter === "" ? fontColor : "black",
          }}
        >
          All
        </button>
        {alphabet.map((letter) => (
          <button
            key={letter}
            className={`py-1 w-full rounded transition duration-200 text-center p-2 `}
            onClick={() => handleLetterClick(letter)}
            style={{
              backgroundColor: activeLetter === letter ? bgColor : undefined,
              color: activeLetter === letter ? fontColor : "black",
            }}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Contact;
