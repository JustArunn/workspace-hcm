import { useMemo, useState, useCallback } from "react";
import Select from "react-select";
import { DetailsList, DetailsListLayoutMode, IColumn } from "@fluentui/react";
import { Modal } from "@fluentui/react";
import { useAuth } from "../../context/Context";

interface Employee {
  email: string;
  name: string;
}

interface HiddenProperties {
  [key: string]: { [key: string]: boolean };
}

const HideProperties: React.FC = () => {
  const [hiddenProperties, setHiddenProperties] = useState<HiddenProperties>(
    {}
  );
  const [selectedUsers, setSelectedUsers] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedProperties, setSelectedProperties] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const { allUsers } = useAuth();

  // Map all users to a format suitable for react-select
  const employees = useMemo(() => {
    return allUsers.map((user: Employee) => ({
      value: user.email,
      label: user.name,
    }));
  }, [allUsers]);

  // Generate user properties based on the first user
  const userProperties = useMemo(() => {
    return Object.keys(allUsers[0] || {}).map((key) => ({
      value: key,
      label: key,
    }));
  }, [allUsers]);

  // Handle user selection
  const handleUserSelection = useCallback((selectedOptions: any) => {
    setSelectedUsers(selectedOptions as { value: string; label: string }[]);
  }, []);

  // Handle property selection
  const handlePropertySelection = useCallback((selectedOptions: any) => {
    setSelectedProperties(
      selectedOptions as { value: string; label: string }[]
    );
  }, []);

  // Handle select all users
  const handleSelectAll = useCallback(
    (isChecked: boolean) => {
      setSelectAll(isChecked);
      if (isChecked) {
        setSelectedUsers(employees);
      } else {
        setSelectedUsers([]);
      }
    },
    [employees]
  );

  // Apply hiding properties for selected users
  const applyHiding = useCallback(() => {
    const propertiesToHide = selectedProperties.map((prop) => prop.value);

    setHiddenProperties((prev) => {
      const updatedProperties = { ...prev };
      selectedUsers.forEach((user) => {
        updatedProperties[user.value] = {
          ...(updatedProperties[user.value] || {}),
          ...propertiesToHide.reduce((acc, prop) => {
            acc[prop] = true;
            return acc;
          }, {} as Record<string, boolean>),
        };
      });
      return updatedProperties;
    });
  }, [selectedProperties, selectedUsers]);

  // Include properties for the current user
  const includeProperties = (userId: string) => {
    setCurrentUserId(userId);
    setIsModalOpen(true);
    setSelectedProperties([]); // Reset selected properties when opening modal
  };

  // Handle include action
  const handleInclude = () => {
    if (currentUserId) {
      setHiddenProperties((prev) => ({
        ...prev,
        [currentUserId]: {},
      }));
    }
    setIsModalOpen(false);
  };

  // Define columns for the details list
  const columns: IColumn[] = [
    { key: "column1", name: "User Name", fieldName: "name", minWidth: 100 },
    {
      key: "column2",
      name: "Hidden Properties",
      fieldName: "hiddenProps",
      minWidth: 100,
    },
    { key: "column3", name: "Actions", fieldName: "actions", minWidth: 100 },
  ];

  // Generate list items to display
  const items = useMemo(() => {
    return employees
      .map((user: any) => ({
        key: user.value,
        name: user.label,
        hiddenProps: hiddenProperties[user.value]
          ? Object.keys(hiddenProperties[user.value]).join(", ")
          : "None",
        actions: (
          <button onClick={() => includeProperties(user.value)}>
            Include Properties
          </button>
        ),
      }))
      .filter(
        (item: any) =>
          hiddenProperties[item.key] &&
          Object.keys(hiddenProperties[item.key]).length > 0
      );
  }, [employees, hiddenProperties]);

  const currentUserHiddenProperties =
    hiddenProperties[currentUserId || ""] || {};
  const availablePropertiesToInclude = userProperties.filter(
    (prop) => currentUserHiddenProperties[prop.value]
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Employee Directory</h1>

      <div className="mb-4">
        <label className="block mb-2">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={(e) => handleSelectAll(e.target.checked)}
            className="mr-2"
          />
          Select All Users
        </label>

        <Select
          isMulti
          options={employees}
          onChange={handleUserSelection}
          className="mt-2"
          placeholder="Select users..."
          value={selectAll ? employees : selectedUsers}
        />
      </div>

      <div className="mb-4">
        <Select
          isMulti
          options={userProperties}
          onChange={handlePropertySelection}
          className="mt-2"
          placeholder="Select properties to hide..."
        />
      </div>

      <button
        onClick={applyHiding}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Apply Hiding
      </button>

      <div className="mt-4">
        <h3 className="font-medium">Hidden Properties:</h3>
        <DetailsList
          items={items}
          columns={columns}
          setKey="set"
          layoutMode={DetailsListLayoutMode.fixedColumns}
        />
      </div>

      {/* Modal for including properties */}
      <Modal
        isOpen={isModalOpen}
        onDismiss={() => setIsModalOpen(false)}
        isBlocking={false}
      >
        <div className="p-4">
          <h2 className="text-xl mb-2">
            Include Properties for{" "}
            {employees.find((emp: any) => emp.value === currentUserId)?.label}
          </h2>
          <Select
            isMulti
            options={availablePropertiesToInclude}
            onChange={handlePropertySelection}
            className="mt-2"
            menuShouldBlockScroll
            menuPosition="fixed"
            placeholder="Select properties to include..."
          />
          <button
            onClick={handleInclude}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          >
            Include Properties
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default HideProperties;
