import {
  DetailsList,
  IColumn,
  SelectionMode,
} from "@fluentui/react";
import { FC, useEffect, useState } from "react";
import { useAuth } from "../../context/Context";
import PageIconButton from "../custom/icons/PageIconButton";
import Person from "../custom/Persona";

interface IListView {
  users: any[];
}

const ListStyles: any = {
  root: {
    overflow: "auto",
    minHeight: "300px",
    flexGrow: 1, // Allow the list to grow
  },
  cellContent: {
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    transition: "width 0.3s ease, opacity 0.3s ease", // Transition for width and opacity
  },
  detailsList: {
    flexGrow: 1, // Make the DetailsList take up remaining space
    width: "100%",
  },
};

const ListView: FC<IListView> = ({ users }: IListView) => {
  const { isNavExpended } = useAuth();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleEdit = (user: any) => {
    console.log("edit user", user);
  };

  const columns: IColumn[] = [
    {
      key: "column1",
      name: "Full Name",
      fieldName: "name",
      minWidth: 200,
      isMultiline: false,
      onRender: (x: any) => (
        <div style={ListStyles.cellContent}>
          <Person
            text={x.name}
            secondaryText={x.jobTitle}
            imageUrl={x.image}
            imageInitials={x.name[0]}
          />
        </div>
      ),
    },
    {
      key: "column2",
      name: "Email",
      fieldName: "email",
      minWidth: 150,
      isMultiline: false,
      onRender: (x: any) => (
        <div style={ListStyles.cellContent}>{x.email}</div>
      ),
    },
    {
      key: "column3",
      name: "Mobile",
      fieldName: "phone",
      minWidth: 150,
      isMultiline: false,
      onRender: (x: any) => (
        <div style={ListStyles.cellContent}>{x.phone}</div>
      ),
    },
    {
      key: "column4",
      name: "Job Title",
      fieldName: "jobTitle",
      minWidth: 150,
      isMultiline: false,
      onRender: (x: any) => (
        <div style={ListStyles.cellContent}>{x.jobTitle}</div>
      ),
    },
    {
      key: "column5",
      name: "Location",
      fieldName: "location",
      minWidth: 150,
      isMultiline: false,
      onRender: (x: any) => (
        <div style={ListStyles.cellContent}>{x.location}</div>
      ),
    },
    {
      key: "column6",
      name: "Department",
      fieldName: "department",
      minWidth: 150,
      isMultiline: false,
      onRender: (x: any) => (
        <div style={ListStyles.cellContent}>{x.department}</div>
      ),
    },
    {
      key: "column7",
      name: "Action",
      fieldName: "action",
      minWidth: 50,
      isMultiline: false,
      onRender: (x: any) => (
        <div style={ListStyles.cellContent}>
          <PageIconButton
            onClick={() => handleEdit(x)}
            iconProps={{ iconName: "Edit" }}
          />
        </div>
      ),
    },
  ];

  // Conditionally filter out the Department column
  const filteredColumns = isNavExpended
    ? columns.filter(col => col.key !== "column6")
    : columns;

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 300); // Match with transition duration
    return () => clearTimeout(timer);
  }, [isNavExpended]);

  return (
    <div
      style={{
        ...ListStyles.container,
        width: isNavExpended ? "95%" : "100%",
        opacity: isTransitioning ? 0.5 : 1, // Adjust opacity during transition
      }}
    >
      <DetailsList
        items={users}
        columns={filteredColumns}
        selectionMode={SelectionMode.none}
        styles={ListStyles}
      />
    </div>
  );
};

export default ListView;
