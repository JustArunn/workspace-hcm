import {
  DetailsList,
  IColumn,
  IconButton,
  Persona,
  SelectionMode,
} from "@fluentui/react";
import { FC } from "react";

interface IListView {
  users: any[];
}

const ListStyles = {
  root: { width: "100vw" },

  contentWrapper: {
    ".ms-DetailsRow-fields": {
      alignItems: "center",
    },
  },
};

const ListView: FC<IListView> = ({ users }) => {
  const handleEdit = (user: any) => {
    console.log("edit user", user);
  };

  const handleDelete = (user: any) => {
    console.log("delete user", user);
  };

  const columns: IColumn[] = [
    {
      key: "column1",
      name: "Full Name",
      fieldName: "fullName",
      minWidth: 120,
      maxWidth: 200,
      isMultiline: false,
      onRender: (x) => {
        return (
          <Persona
            text={x.fullName}
            secondaryText={x.jobTitle}
            imageUrl={x.imageUrl}
            imageInitials={x.fullName[0]}
          />
        );
      },
    },
    {
      key: "column2",
      name: "Email",
      fieldName: "email",
      minWidth: 120,
      maxWidth: 200,
      isMultiline: false,
    },
    {
      key: "column3",
      name: "Mobile",
      fieldName: "mobile",
      minWidth: 120,
      maxWidth: 150,
      isMultiline: false,
    },
    {
      key: "column4",
      name: "Job Title",
      fieldName: "jobTitle",
      minWidth: 120,
      maxWidth: 200,
      isMultiline: false,
    },
    {
      key: "column5",
      name: "Location",
      fieldName: "location",
      minWidth: 120,
      maxWidth: 150,
      isMultiline: false,
    },
    {
      key: "column6",
      name: "Role",
      fieldName: "role",
      minWidth: 120,
      maxWidth: 150,
      isMultiline: false,
    },
    {
      key: "column7",
      name: "Action",
      fieldName: "action",
      minWidth: 120,
      maxWidth: 150,
      isMultiline: false,
      onRender: (x: any) => {
        return (
          <div>
            <IconButton
              onClick={() => handleEdit(x)}
              iconProps={{ iconName: "Edit" }}
            />
            <IconButton
              onClick={() => handleDelete(x)}
              iconProps={{ iconName: "Delete" }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <DetailsList
      items={users}
      columns={columns}
      selectionMode={SelectionMode.none}
      styles={ListStyles}
    />
  );
};

export default ListView;
