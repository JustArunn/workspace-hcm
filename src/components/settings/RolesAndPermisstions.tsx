import { useMemo, useState } from "react";
import ReactSelect from "react-select";
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
} from "@fluentui/react/lib/DetailsList";
import { useAuth, useThemes } from "../../context/Context";
import Button from "../custom/buttons/Button";
import { Icon } from "@fluentui/react";
import PageIcon from "../custom/icons/PageIcon";

interface User {
  email: string;
  name: string;
}

interface Admin {
  email: string;
  accessType: string;
}

const RolesAndPermissions: React.FC = () => {
  const [selectedEmployees, setSelectedEmployees] = useState<any[]>([]);
  const { allUsers, admins, setAdmins } = useAuth();
  const { bgColor } = useThemes();

  const options = useMemo(() => {
    const existingEmails = new Set(admins.map((admin: Admin) => admin.email));
    return allUsers
      .filter((user: User) => !existingEmails.has(user.email))
      .map((user: User) => ({ value: user.email, label: user.name }));
  }, [allUsers, admins]);

  const handleEmployeeChange = (selectedOptions: any[] | null) => {
    setSelectedEmployees(selectedOptions || []);
  };

  const stylesReactSelect: any = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderRadius: "0px",
      boxShadow: state.isFocused ? `0 0 0 .5px ${bgColor}` : provided.boxShadow,
      borderColor: state.isFocused ? `${bgColor}` : provided.borderColor,
      "&:hover": {
        borderColor: state.isFocused ? `${bgColor}` : provided.borderColor,
      },
    }),
  };

  const handleAdd = () => {
    if (selectedEmployees.length > 0) {
      const newEmployees: Admin[] = selectedEmployees.map((selected: any) => ({
        email: selected.value as string,
        accessType: "Admin",
      }));

      setAdmins((prev: Admin[]) => {
        const existingEmails = new Set(prev.map((admin) => admin.email));
        const updatedAdmins = [...prev];
        newEmployees.forEach((newEmployee) => {
          if (!existingEmails.has(newEmployee.email)) {
            updatedAdmins.push(newEmployee);
          } else {
            alert(`${newEmployee.email} is already in the list.`);
          }
        });

        return updatedAdmins;
      });
      setSelectedEmployees([]);
    }
  };

  const handleDelete = (index: number) => {
    setAdmins((prev: Admin[]) => {
      const updatedAdmins = prev.filter((_, i) => i !== index);
      return updatedAdmins;
    });
  };

  const columns: any = [
    {
      key: "column1",
      name: "Email",
      fieldName: "email",
      minWidth: 100,
      maxWidth: 200,
      isMultiline: true,
    },
    {
      key: "column2",
      name: "Access Type",
      fieldName: "accessType",
      minWidth: 100,
      maxWidth: 200,
    },
    {
      key: "column3",
      name: "Delete",
      fieldName: "delete",
      minWidth: 50,
      maxWidth: 50,
      onRender: (_: any, index: number) => (
        <PageIcon
          onClick={() => handleDelete(index)}
          iconName="Delete"
          fontSize="16px"
        />
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="block mb-2">Select Employees</label>
        <ReactSelect
          value={selectedEmployees}
          isMulti
          onChange={handleEmployeeChange as any}
          options={options}
          placeholder={options.length < 1 ? "All employees are admin":"Select employees"}
          styles={stylesReactSelect}
          isDisabled={options.length < 1 === true}
        />
      </div>

      <Button onClick={handleAdd} disabled={selectedEmployees.length === 0}>
        <div className="flex gap-2">
          <Icon iconName="Add" />
          <span>Add</span>
        </div>
      </Button>

      <h3 className="text-lg font-bold mt-6">Employee List</h3>
      <DetailsList
        items={admins}
        columns={columns}
        selectionMode={SelectionMode.none}
        layoutMode={DetailsListLayoutMode.fixedColumns}
      />
    </div>
  );
};

export default RolesAndPermissions;
