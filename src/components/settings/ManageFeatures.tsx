import { Toggle } from "@fluentui/react";
import { useState } from "react";

const ManageFeatures = () => {
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [dataSharing, setDataSharing] = useState(false);
  return (
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
        <Toggle checked={smsAlerts} onChange={() => setSmsAlerts(!smsAlerts)} />
      </div>
      <div className="flex justify-between items-center border-b border-gray-300 py-2">
        <label htmlFor="smsAlerts" className="font-semibold">
          Show Meetings
        </label>
        <Toggle checked={smsAlerts} onChange={() => setSmsAlerts(!smsAlerts)} />
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
  );
};

export default ManageFeatures;
