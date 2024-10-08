import { useState } from "react";
import { Toggle, Icon } from "@fluentui/react";
import SearchFilters from "../settings/SearchFilters";
import Themes from "../settings/Themes";

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
      { name: "Show Hide Feature", icon: "Hide3" },
      { name: "Exclude Users", icon: "UserRemove" },
    ],
  },
  {
    category: "Privacy",
    items: [
      { name: "Data Sharing", icon: "DataManagement" },
      { name: "Cookies", icon: "Cookies" },
    ],
  },
  {
    category: "Notifications",
    items: [
      { name: "Email Alerts", icon: "Mail" },
      { name: "SMS Alerts", icon: "Message" },
    ],
  },
  {
    category: "Billing",
    items: [
      { name: "Payment Methods", icon: "PaymentCard" },
      { name: "Invoices", icon: "Receipt" },
    ],
  },
];

const Settings = () => {
  const [activeSetting, setActiveSetting] = useState("Language");
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [dataSharing, setDataSharing] = useState(false);

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
        <h2 className="text-2xl font-semibold mb-5">
          {activeSetting && `${activeSetting}`}
        </h2>

        {
          activeSetting === "Search Filters" && <SearchFilters/>
        }

        {
          activeSetting === "Theme" && <Themes/>
        }

        {activeSetting === "Show Hide Feature" && (
          <div className="bg-gray-50 p-4 rounded-md mb-4 shadow">
            <div className="flex justify-between items-center border-b border-gray-300 py-2">
              <label htmlFor="emailAlerts" className="font-semibold">
                Show Events
              </label>
              <Toggle
                checked={emailAlerts}
                onChange={() => setEmailAlerts(!emailAlerts)}
              />
            </div>

            <div className="flex justify-between items-center border-b border-gray-300 py-2">
              <label htmlFor="smsAlerts" className="font-semibold">
                Show Dashboard
              </label>
              <Toggle
                checked={smsAlerts}
                onChange={() => setSmsAlerts(!smsAlerts)}
              />
            </div>
            <div className="flex justify-between items-center border-b border-gray-300 py-2">
              <label htmlFor="smsAlerts" className="font-semibold">
                Show Meetings
              </label>
              <Toggle
                checked={smsAlerts}
                onChange={() => setSmsAlerts(!smsAlerts)}
              />
            </div>

            <div className="flex justify-between items-center py-2">
              <label htmlFor="dataSharing" className="font-semibold">
                Show Organization Chart
              </label>
              <Toggle
                checked={dataSharing}
                onChange={() => setDataSharing(!dataSharing)}
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Settings;
