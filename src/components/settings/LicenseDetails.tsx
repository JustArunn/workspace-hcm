const licenses = [
  {
    id: 1,
    planName: "Basic Plan",
    startDate: "2023-01-01",
    expirationDate: "2024-01-01",
    price: 99.99,
  },
  {
    id: 2,
    planName: "Premium Plan",
    startDate: "2023-06-01",
    expirationDate: "2024-06-01",
    price: 199.99,
  },
  {
    id: 3,
    planName: "Enterprise Plan",
    startDate: "2023-03-15",
    expirationDate: "2023-01-15",
    price: 499.99,
  },
  {
    id: 4,
    planName: "Trial Plan",
    startDate: "2023-10-01",
    expirationDate: "2023-10-05",
    price: 49.99,
  },
];

const LicenseDetails = () => {
  const calculateDaysLeft = (expirationDate: any) => {
    const today: any = new Date();
    const expDate: any = new Date(expirationDate);
    const difference = expDate - today;

    if (difference < 0) {
      return "Expired";
    }

    return Math.ceil(difference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Plan Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Start Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Expiration Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Days Left
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              License Price ($)
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {licenses.map((license) => (
            <tr key={license.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {license.planName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {license.startDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {license.expirationDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {calculateDaysLeft(license.expirationDate)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {license.price.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LicenseDetails;
