import { useState } from "react";
import { useAuth, useThemes } from "../../context/Context";
import Button from "../custom/buttons/Button";

const employees = [
  { id: 1, name: "HR" },
  { id: 2, name: "Manager 1" },
  { id: 3, name: "Manager 2" },
  { id: 4, name: "Team Lead" },
];

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("birthdays");
  const { sendEmail } = useAuth();
  const { bgColor, fontColor } = useThemes();
  const [recipients, setRecipients] = useState({
    birthdays: [],
    anniversaries: [],
    incorrectInfo: [],
  });

  const handleRecipientChange = (event: any, type: any) => {
    const { value, checked } = event.target;
    setRecipients((prev: any) => {
      const newRecipients = checked
        ? [...prev[type], value]
        : prev[type].filter((recipient: any) => recipient !== value);
      return { ...prev, [type]: newRecipients };
    });
  };

  const handleSave = async () => {
    await sendEmail(
      [
        "just.arunn@gmail.com",
        "adele.v@megazap.us",
        "james@megazap.us",
        "kambojsama84@gmail.com",
      ],
      "Hey there",
      "how are youuuuuuuuu"
    );
  };

  return (
    <div className=" mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex mb-4">
        <button
          style={{
            backgroundColor: activeTab === "birthdays" ? bgColor : "white",
            color: activeTab === "birthdays" ? fontColor : "black",
          }}
          className={`flex-1 py-2 text-center`}
          onClick={() => setActiveTab("birthdays")}
        >
          Birthdays
        </button>

        <button
          style={{
            backgroundColor: activeTab === "anniversaries" ? bgColor : "white",
            color: activeTab === "anniversaries" ? fontColor : "black",
          }}
          className={`flex-1 py-2 text-center`}
          onClick={() => setActiveTab("anniversaries")}
        >
          Anniversaries
        </button>

        <button
          style={{
            backgroundColor: activeTab === "incorrectInfo" ? bgColor : "white",
            color: activeTab === "incorrectInfo" ? fontColor : "black",
          }}
          className={`flex-1 py-2 text-center`}
          onClick={() => setActiveTab("incorrectInfo")}
        >
          Incorrect Info
        </button>
      </div>

      {activeTab === "birthdays" && (
        <div>
          <h3 className="font-semibold text-gray-700">Select Recipients:</h3>
          {employees.map((employee: any) => (
            <div key={employee.id} className="my-1">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value={employee.name}
                  checked={recipients.birthdays.includes(
                    employee.name as never
                  )}
                  onChange={(e) => handleRecipientChange(e, "birthdays")}
                  className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <span className="text-gray-600">{employee.name}</span>
              </label>
            </div>
          ))}
        </div>
      )}

      {activeTab === "anniversaries" && (
        <div>
          <h3 className="font-semibold text-gray-700">Select Recipients:</h3>
          {employees.map((employee: any) => (
            <div key={employee.id} className="my-1">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value={employee.name}
                  checked={recipients.anniversaries.includes(
                    employee.name as never
                  )}
                  onChange={(e) => handleRecipientChange(e, "anniversaries")}
                  className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <span className="text-gray-600">{employee.name}</span>
              </label>
            </div>
          ))}
        </div>
      )}

      {activeTab === "incorrectInfo" && (
        <div>
          <h3 className="font-semibold text-gray-700">Select Recipients:</h3>
          {employees.map((employee: any) => (
            <div key={employee.id} className="my-1">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value={employee.name}
                  checked={recipients.incorrectInfo.includes(
                    employee.name as never
                  )}
                  onChange={(e) => handleRecipientChange(e, "incorrectInfo")}
                  className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <span className="text-gray-600">{employee.name}</span>
              </label>
            </div>
          ))}
        </div>
      )}

      <Button onClick={handleSave} className="mt-4">
        Save
      </Button>
    </div>
  );
};

export default Notifications;
