import { useState } from "react";
import { Icon } from "@fluentui/react";
import SearchFilters from "../settings/SearchFilters";
import Themes from "../settings/Themes";
import ManageFeatures from "../settings/ManageFeatures";
import LicenseDetails from "../settings/LicenseDetails";
import Notifications from "../settings/Notifications";

const settingsData = [
  {
    category: "General",
    items: [
      { name: "Language", icon: "LocaleLanguage" },
      { name: "Theme", icon: "Color" },
    ],
  },
  {
    category: "View",
    items: [
      { name: "Search Filters", icon: "Filter" },
      { name: "Exclude Users", icon: "UserRemove" },
      { name: "Manage Features", icon: "Hide3" },
      { name: "Manage Views", icon: "View" },
    ],
  },
  {
    category: "Access Control",
    items: [
      { name: "Restricted Access", icon: "Lock" },
      { name: "Hide User Properties", icon: "FabricUserFolder" },
      { name: "Roles and Permisstions", icon: "Permissions" },
    ],
  },
  {
    category: "Notifications",
    items: [
      { name: "Notifications Control", icon: "Message" },
    ],
  },
  {
    category: "License",
    items: [
      { name: "License Details", icon: "PaymentCard" },
      { name: "Invoices", icon: "Receipt" },
    ],
  },
];

const Settings = () => {
  const [activeSetting, setActiveSetting] = useState("Language");

  const handleSettingClick = (settingName: any) => {
    setActiveSetting(settingName);
  };

  return (
    <div className="flex">
      <div className="-ml-7 w-64 border-r text-black p-5 pr-0 overflow-y-auto max-h-screen">
        <h3 className="text-xl font-semibold">Settings</h3>
        {settingsData.map((section, index) => (
          <div key={index}>
            <h4 className="mt-4 text-lg font-semibold border-b pb-2">
              {section.category}
            </h4>
            <ul>
              {section.items.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center py-1 hover:bg-gray-200 rounded transition cursor-pointer"
                  onClick={() => handleSettingClick(item.name)}
                >
                  <Icon iconName={item.icon} className="mr-2" /> {item.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex-grow p-6 bg-white overflow-y-auto max-h-screen">
        <h2 className="text-2xl font-semibold mb-5">{activeSetting}</h2>
        {activeSetting === "Search Filters" && <SearchFilters />}
        {activeSetting === "Theme" && <Themes />}
        {activeSetting === "Show Hide Feature" && <ManageFeatures />}
        {activeSetting === "License Details" && <LicenseDetails/>}
        {activeSetting === "Notifications Control" && <Notifications/>}
      </div>
    </div>
  );
};

export default Settings;
