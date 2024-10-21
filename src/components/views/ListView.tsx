import {
  DetailsList,
  IColumn,
  SelectionMode,
} from "@fluentui/react";
import { FC, useEffect, useState } from "react";
import { useAuth } from "../../context/Context";
import Person from "../custom/Persona";
import PageIcon from "../custom/icons/PageIcon";
import EmployeeInfo from "../modals/EmployeeInfo";
import UpdateUserForm from "../common/UpdateUserForm";

interface IListView {
  users: any[];
}

const ListStyles: any = {
  root: {
    overflow: "auto",
    minHeight: "300px",
    flexGrow: 1,
  },
  cellContent: {
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    transition: "width 0.3s ease, opacity 0.3s ease",
  },
  detailsList: {
    flexGrow: 1,
    width: "100%",
  },
};

const ListView: FC<IListView> = ({ users }) => {
  const { isNavExpended, allUsers } = useAuth();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [user, setUser] = useState(null);
  const [manager, setManager] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openProfileCard, setOpenProfilCard] = useState(false);


  const handleEdit = (user: any) => {
    console.log("edit user", user);
    const manager = allUsers.find((y: any) => y.email === user.manager);
    setManager(manager);
    setUser(user);
    setOpenEdit(true);
  };

  const columns: IColumn[] = [
    {
      key: "column1",
      name: "Full Name",
      fieldName: "name",
      minWidth: 200,
      isMultiline: false,
      onRender: (x: any) => (
        <div
          onClick={() => {
            const manager = allUsers.find((y: any) => y.email === x.manager);
            setManager(manager);
            setUser(x);
            setOpenProfilCard(true);
          }}
          style={{ ...ListStyles.cellContent, cursor: "pointer" }}
        >
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
      onRender: (x: any) => <div style={ListStyles.cellContent}>{x.email}</div>,
    },
    {
      key: "column3",
      name: "Mobile",
      fieldName: "phone",
      minWidth: 150,
      isMultiline: false,
      onRender: (x: any) => <div style={ListStyles.cellContent}>{x.phone}</div>,
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
        <div style={{...ListStyles.cellContent, gap:'5px'}}>
          <p>{x.location.buildingId}</p>
          <p>{x.location.floorName}</p>
          <p>{x.location.floorSection}</p>
        </div>
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
          <PageIcon
            onClick={() => handleEdit(x)}
            iconName="Edit"
            fontSize="16px"
          />
        </div>
      ),
    },
  ];

  const filteredColumns = isNavExpended
    ? columns.filter((col) => col.key !== "column6")
    : columns;

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(timer);
  }, [isNavExpended]);

  return (
    <div
      style={{
        ...ListStyles.container,
        width: isNavExpended ? "95%" : "100%",
        opacity: isTransitioning ? 0.5 : 1,
      }}
    >
      <DetailsList
        items={users}
        columns={filteredColumns}
        selectionMode={SelectionMode.none}
        styles={ListStyles}
      />
      {user !== null && (
        <EmployeeInfo
          employee={user}
          manager={manager}
          isOpen={openProfileCard}
          onDismiss={() => setOpenProfilCard(false)}
        />
      )}
      {user !== null && (
        <UpdateUserForm
          isOpen={openEdit}
          onDismiss={() => setOpenEdit(false)}
          user={user}
        />
      )}
    </div>
  );
};

export default ListView;
