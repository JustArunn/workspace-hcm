import { useState } from "react";
import { Modal, PersonaSize } from "@fluentui/react";
import { Icon } from "@fluentui/react/lib/Icon";
import Person from "../custom/Persona";
import { useThemes } from "../../context/Context";

const EmployeeInfo = ({ employee, manager, isOpen, onDismiss }: any) => {
  const [activeTab, setActiveTab] = useState("office");
  const { bgColor } = useThemes();

  const renderTabContent = () => {
    switch (activeTab) {
      case "office":
        return (
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Info Type</th>
                <th className="px-4 py-2 text-left">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Work Email</td>
                <td className="border px-4 py-2">{employee.email}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Work Phone</td>
                <td className="border px-4 py-2">{employee.phone}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Office Location</td>
                <td className="border px-4 py-2">{employee.location}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Date of Joining</td>
                <td className="border px-4 py-2">{employee.DOJ}</td>
              </tr>
            </tbody>
          </table>
        );
      case "personal":
        return (
          <div>
            <p className="py-2">Email : {employee.email}</p>
            <p className="py-2">Phone : {employee.phone}</p>
            <p className="py-2">Date of Birth : </p>
            <p className="py-2">Address : </p>
          </div>
        );
      case "hr":
        return (
          <div>
            <p className="py-2">HR settings go here.</p>
            <p className="py-2">Leave balance : </p>
            <p className="py-2">
              Performance reviews :
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onDismiss={onDismiss}
      isBlocking={false}
      styles={{ main: { minWidth: "65%", margin: "auto" } }}
    >
      <div className="flex flex-col p-6">
        <Icon
          iconName="ChromeClose"
          onClick={onDismiss}
          styles={{ root: { textAlign: "end", cursor: "pointer" } }}
        />

        <div className="flex mb-4">
          <div className="w-1/8">
            <Person
              imageUrl={employee.imageUrl}
              imageInitials={employee.name[0]}
              size={PersonaSize.size100}
              block
            />
          </div>
          <div className="w-2/3 pl-4">
            <h2 className="text-xl font-bold">{employee.name}</h2>
            <p className="text-gray-700">
              {employee.department} | {employee.jobTitle}
            </p>

            <p className="text-gray-700">{employee.location}</p>
            <div className="flex mt-4">
              <Icon styles={{root:{fontSize:"16px"}}} iconName="Phone" className="mr-4 cursor-pointer" />
              <Icon styles={{root:{fontSize:"16px"}}} iconName="Mail" className="mr-4 cursor-pointer" />
              <Icon styles={{root:{fontSize:"16px"}}} iconName="Org" className="mr-4 cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-around border-b pb-2">
            <button
              onClick={() => setActiveTab("office")}
              className={`py-2 px-4 focus:outline-none ${
                activeTab === "office"
                  ? "font-bold border-b-2 border-blue-500"
                  : ""
              }`}
              style={{
                borderColor: activeTab === "office" ? bgColor : "",
              }}
            >
              Office Info
            </button>
            <button
              onClick={() => setActiveTab("personal")}
              className={`py-2 px-4 focus:outline-none ${
                activeTab === "personal"
                  ? "font-bold border-b-2 border-blue-500"
                  : ""
              }`}
              style={{
                borderColor: activeTab === "personal" ? bgColor : "",
              }}
            >
              Personal Info
            </button>
            <button
              onClick={() => setActiveTab("hr")}
              className={`py-2 px-4 focus:outline-none ${
                activeTab === "hr" ? "font-bold border-b-2 border-blue-500" : ""
              }`}
              style={{
                borderColor: activeTab === "hr" ? bgColor : "",
              }}
            >
              HR Settings
            </button>
          </div>
          <div className="p-4 mt-2">{renderTabContent()}</div>
        </div>
        {manager !== undefined && <div className="border border-[#ddd]"></div>}
        {manager !== undefined && (
          <div className="w-1/8 mt-2">
            <Person
              imageUrl={manager.imageUrl}
              text={manager.name}
              secondaryText={`${manager.jobTitle} | ${manager.department}`}
              imageInitials={employee.name[0]}
              size={PersonaSize.size56}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default EmployeeInfo;
