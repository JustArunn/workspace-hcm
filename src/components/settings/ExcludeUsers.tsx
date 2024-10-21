import { useState } from "react";
import Select from "react-select";
import {
  Checkbox,
  Pivot,
  PivotItem,
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
} from "@fluentui/react";
import { useThemes } from "../../context/Context";
import Button from "../custom/buttons/Button";

interface DepartmentOption {
  value: string;
  label: string;
}

interface User {
  id: number;
  name: string;
  department: string;
  jobTitle: string;
  email: string;
}

const departments: DepartmentOption[] = [
  { value: "hr", label: "HR" },
  { value: "engineering", label: "Engineering" },
  { value: "marketing", label: "Marketing" },
];

const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    department: "HR",
    jobTitle: "Manager",
    email: "john@example.com",
  },
  {
    id: 2,
    name: "Jane Smith",
    department: "Engineering",
    jobTitle: "Developer",
    email: "jane@example.com",
  },
  {
    id: 3,
    name: "Alice Johnson",
    department: "Marketing",
    jobTitle: "Analyst",
    email: "alice@example.com",
  },
];

const ExcludeUsers: React.FC = () => {
  const [selectedDepartments, setSelectedDepartments] = useState<
    DepartmentOption[]
  >([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState<DepartmentOption[]>(
    []
  );
  const [excludedUsersByDepartment, setExcludedUsersByDepartment] = useState<
    User[]
  >([]);
  const [excludedUsersByJobTitle, setExcludedUsersByJobTitle] = useState<
    User[]
  >([]);
  const [selectedIncludeUsers, setSelectedIncludeUsers] = useState<Set<number>>(
    new Set()
  );
  const [activeTab, setActiveTab] = useState<string>("department");
  const { bgColor } = useThemes();

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

  const handleDepartmentChange = (options: DepartmentOption[]) => {
    setSelectedDepartments(options || []);
  };

  const handleJobTitleChange = (options: DepartmentOption[]) => {
    setSelectedJobTitle(options || []);
  };

  const handleExcludeUser = () => {
    if (activeTab === "department") {
      const usersToExclude = users.filter((user) =>
        selectedDepartments.some(
          (department) => department.value === user.department.toLowerCase()
        )
      );
      setExcludedUsersByDepartment((prev) => [
        ...prev,
        ...usersToExclude.filter(
          (user) => !prev.some((excluded) => excluded.id === user.id)
        ),
      ]);
      setSelectedDepartments([]);
    } else if (activeTab === "jobTitle") {
      const usersToExclude = users.filter((user) =>
        selectedJobTitle.some(
          (job) => job.value === user.jobTitle.toLowerCase()
        )
      );
      setExcludedUsersByJobTitle((prev) => [
        ...prev,
        ...usersToExclude.filter(
          (user) => !prev.some((excluded) => excluded.id === user.id)
        ),
      ]);
      setSelectedJobTitle([]);
    }
  };

  const handleIncludeUser = () => {
    const usersToInclude =
      activeTab === "department"
        ? excludedUsersByDepartment.filter((user) =>
            selectedIncludeUsers.has(user.id)
          )
        : excludedUsersByJobTitle.filter((user) =>
            selectedIncludeUsers.has(user.id)
          );

    if (activeTab === "department") {
      setExcludedUsersByDepartment((prev) =>
        prev.filter((user) => !usersToInclude.includes(user))
      );
    } else if (activeTab === "jobTitle") {
      setExcludedUsersByJobTitle((prev) =>
        prev.filter((user) => !usersToInclude.includes(user))
      );
    }
    setSelectedIncludeUsers(new Set()); // Clear selections after including
  };

  const handleCheckboxChange = (userId: number) => {
    setSelectedIncludeUsers((prev) => {
      const updatedSelection = new Set(prev);
      if (updatedSelection.has(userId)) {
        updatedSelection.delete(userId);
      } else {
        updatedSelection.add(userId);
      }
      return updatedSelection;
    });
  };

  const columns = [
    {
      key: "column1",
      name: "Include",
      fieldName: "Include",
      minWidth: 100,
      maxWidth: 200,
      isMultiline: true,
      onRender: (item: User) => (
        <div className="flex items-center">
          <Checkbox
            label={item.name}
            onChange={() => handleCheckboxChange(item.id)}
            className="mr-2"
            checked={selectedIncludeUsers.has(item.id)}
          />
        </div>
      ),
    },
    {
      key: "column2",
      name: "Department",
      fieldName: "department",
      minWidth: 100,
      maxWidth: 200,
      onRender: (item: User) => (
        <div className="flex items-center">{item.department}</div>
      ),
    },
  ];

  const jobTitleColumns = [
    {
      key: "column1",
      name: "Include",
      fieldName: "Include",
      minWidth: 100,
      maxWidth: 200,
      isMultiline: true,
      onRender: (item: User) => (
        <div className="flex items-center">
          <Checkbox
            label={item.name}
            onChange={() => handleCheckboxChange(item.id)}
            className="mr-2"
            checked={selectedIncludeUsers.has(item.id)}
          />
        </div>
      ),
    },
    {
      key: "column2",
      name: "Job Title",
      fieldName: "jobTitle",
      minWidth: 100,
      maxWidth: 200,
      onRender: (item: User) => (
        <div className="flex items-center">{item.jobTitle}</div>
      ),
    },
  ];

  return (
    <div className="p-6 w-full rounded-lg shadow-md gap-5 flex flex-col">
      <Pivot
        selectedKey={activeTab}
        onLinkClick={(item: any) => setActiveTab(item.props.itemKey)}
        className="flex flex-col gap-y-5"
      >
        <PivotItem headerText="By Department" itemKey="department">
          <div className="flex flex-col gap-y-5">
            <Select
              options={departments}
              onChange={handleDepartmentChange as any}
              isMulti
              value={selectedDepartments}
              styles={stylesReactSelect}
            />
            <Button
              onClick={handleExcludeUser}
              disabled={selectedDepartments.length === 0}
              className="w-fit"
            >
              Exclude
            </Button>
            <DetailsList
              items={excludedUsersByDepartment}
              columns={columns}
              setKey="set"
              layoutMode={DetailsListLayoutMode.fixedColumns}
              selectionMode={SelectionMode.none}
            />
          </div>
        </PivotItem>
        <PivotItem headerText="By Job Title" itemKey="jobTitle">
          <div className="flex flex-col gap-y-5">
            <Select
              options={[
                { value: "manager", label: "Manager" },
                { value: "developer", label: "Developer" },
                { value: "analyst", label: "Analyst" },
              ]}
              onChange={handleJobTitleChange as any}
              isMulti
              value={selectedJobTitle}
              styles={stylesReactSelect}
            />
            <Button
              onClick={handleExcludeUser}
              disabled={selectedJobTitle.length === 0}
              className="w-fit"
            >
              Exclude
            </Button>
            <DetailsList
              items={excludedUsersByJobTitle}
              columns={jobTitleColumns}
              setKey="set"
              layoutMode={DetailsListLayoutMode.fixedColumns}
              selectionMode={SelectionMode.none}
            />
          </div>
        </PivotItem>
      </Pivot>
      <Button
        onClick={handleIncludeUser}
        className="w-fit"
        disabled={
          !excludedUsersByDepartment.length && !excludedUsersByJobTitle.length
        }
      >
        Include
      </Button>
    </div>
  );
};

export default ExcludeUsers;
