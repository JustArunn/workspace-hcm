import { useMemo, useState, useCallback } from "react";
import Select from "react-select";
import {
  Checkbox,
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
} from "@fluentui/react";
import { Modal } from "@fluentui/react";
import { useAuth, useThemes } from "../../context/Context";
import Button from "../custom/buttons/Button";
import PageIcon from "../custom/icons/PageIcon";

interface Employee {
  email: string;
  name: string;
}

const HideProperties: React.FC = () => {
  const { hiddenProperties, setHiddenProperties, allUsers } = useAuth();
  const { bgColor, fontColor } = useThemes();

  const [selectedUsers, setSelectedUsers] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedProperties, setSelectedProperties] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const employees = useMemo(() => {
    return allUsers.map((user: Employee) => ({
      value: user.email,
      label: user.name,
    }));
  }, [allUsers]);

  const userProperties = useMemo(() => {
    return Object.keys(allUsers[0] || {}).map((key) => ({
      value: key,
      label: key,
    }));
  }, [allUsers]);

  const handleUserSelection = useCallback((selectedOptions: any) => {
    setSelectedUsers(selectedOptions as { value: string; label: string }[]);
  }, []);

  const handlePropertySelection = useCallback((selectedOptions: any) => {
    setSelectedProperties(
      selectedOptions as { value: string; label: string }[]
    );
  }, []);

  const handleSelectAll = useCallback(
    (isChecked: boolean) => {
      setSelectAll(isChecked);
      setSelectedUsers(isChecked ? employees : []);
    },
    [employees]
  );

  const applyHiding = useCallback(() => {
    const propertiesToHide = selectedProperties.map((prop) => prop.value);
    const updatedProperties = [...hiddenProperties];

    selectedUsers.forEach((user) => {
      const existingEntry = updatedProperties.find(
        (entry) => entry.email === user.value
      );
      if (existingEntry) {
        existingEntry.properties = [
          ...new Set([...existingEntry.properties, ...propertiesToHide]),
        ];
      } else {
        updatedProperties.push({
          email: user.value,
          properties: propertiesToHide,
        });
      }
      console.log({
        email: user.value,
        properties: propertiesToHide,
      });
    });

    setHiddenProperties(updatedProperties);
  }, [selectedProperties, selectedUsers, hiddenProperties]);

  const includeProperties = (userId: string) => {
    setCurrentUserId(userId);
    setIsModalOpen(true);
    setSelectedProperties([]);
  };

  const handleInclude = () => {
    if (currentUserId) {
      setHiddenProperties((prev: any) => {
        return prev.map((entry: any) => {
          if (entry.email === currentUserId) {
            // Remove only the properties that are included
            const newProperties = entry.properties.filter(
              (prop: string) =>
                !selectedProperties.some(
                  (selected: any) => selected.value === prop
                )
            );
            return { ...entry, properties: newProperties };
          }

          return entry;
        });
      });
    }
    setIsModalOpen(false);
  };

  console.log("hiddenProperties", hiddenProperties);

  const columns = useMemo(
    () => [
      { key: "column1", name: "User Name", fieldName: "name", minWidth: 200 },
      {
        key: "column2",
        name: "Hidden Properties",
        fieldName: "hiddenProps",
        minWidth: 250,
      },
      { key: "column3", name: "Actions", fieldName: "actions", minWidth: 200 },
    ],
    []
  );

  const items = useMemo(() => {
    return employees
      .map((user: any) => {
        const hiddenEntry = hiddenProperties.find(
          (entry: any) => entry.email === user.value
        );
        return {
          key: user.value,
          name: user.label,
          hiddenProps: hiddenEntry ? hiddenEntry.properties.join(", ") : "None",
          actions: (
            <PageIcon
              fontSize="16px"
              iconName="Edit"
              onClick={() => includeProperties(user.value)}
            />
          ),
        };
      })
      .filter((item: any) => item.hiddenProps !== "None");
  }, [employees, hiddenProperties]);

  const currentUserHiddenProperties =
    hiddenProperties.find((entry: any) => entry.email === currentUserId)
      ?.properties || [];
  const availablePropertiesToInclude = userProperties.filter((prop) =>
    currentUserHiddenProperties.includes(prop.value)
  );

  return (
    <div className="p-4">
      <div className="mb-4">
        <Checkbox
          checked={selectAll}
          onChange={(e: any) => handleSelectAll(e.target.checked)}
          label="Select All Users"
        />
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

      <Button onClick={applyHiding}>Apply</Button>

      <div className="mt-4">
        <h3 className="font-medium">Hidden Properties:</h3>
        <DetailsList
          items={items}
          columns={columns}
          setKey="set"
          layoutMode={DetailsListLayoutMode.fixedColumns}
          selectionMode={SelectionMode.none}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onDismiss={() => setIsModalOpen(false)}
        isBlocking={false}
        styles={{ main: { minWidth: "35%", maxWidth: "35%" } }}
      >
        <div className="h-full w-full flex flex-col">
          <h2
            style={{ backgroundColor: bgColor, color: fontColor }}
            className="h-full w-full text-xl mb-2 flex justify-center gap-2 items-center p-2"
          >
            <p className="text-lg">Include Properties for</p>
            <p className="text-lg underline">
              {employees.find((emp: any) => emp.value === currentUserId)?.label}
            </p>
          </h2>
          <div className="p-5 justify-center flex flex-col gap-y-5">
            <Select
              isMulti
              options={availablePropertiesToInclude}
              onChange={handlePropertySelection}
              className="mt-2"
              menuShouldBlockScroll
              menuPosition="fixed"
              placeholder="Select properties to include..."
            />
            <Button onClick={handleInclude}>Include Properties</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HideProperties;
