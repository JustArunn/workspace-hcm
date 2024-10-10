import { useState } from "react";
import { useAuth } from "../../context/Context";

const employees = [
  { id: 1, name: "HR" },
  { id: 2, name: "Manager 1" },
  { id: 3, name: "Manager 2" },
  { id: 4, name: "Team Lead" },
];

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("birthdays");
  const { sendEmail } = useAuth();
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
    // const settings = {
    //   recipients,
    // };
    // // Save settings logic here (e.g., API call)
    // console.log(settings);
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
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Notification Settings
      </h2>

      <div className="flex mb-4">
        <button
          className={`flex-1 py-2 text-center ${
            activeTab === "birthdays"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("birthdays")}
        >
          Birthdays
        </button>
        <button
          className={`flex-1 py-2 text-center ${
            activeTab === "anniversaries"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("anniversaries")}
        >
          Anniversaries
        </button>
        <button
          className={`flex-1 py-2 text-center ${
            activeTab === "incorrectInfo"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
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

      <button
        onClick={handleSave}
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
      >
        Save Settings
      </button>
    </div>
  );
};

export default Notifications;
