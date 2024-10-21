import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  TextField,
  Dropdown,
  DetailsList,
  Pivot,
  PivotItem,
  Panel,
  PanelType,
  Icon,
} from "@fluentui/react";
import ReactSelect from "react-select";
import { useAuth, useThemes } from "../../context/Context";
import { gapi } from "gapi-script";
import Button from "../custom/buttons/Button";

interface Ticket {
  id: number;
  title: string;
  assignedTo: { value: string; label: string }[];
  status: string;
  createdBy: {
    name: string;
    email: string;
  };
  priority: string;
  createdAt: Date;
}

const ticketStatuses = [
  { key: "Open", text: "Open" },
  { key: "Pending", text: "Pending" },
  { key: "Resolved", text: "Resolved" },
];

const priorityOptions = [
  { key: "Low", text: "Low" },
  { key: "Medium", text: "Medium" },
  { key: "High", text: "High" },
  { key: "Urgent", text: "Urgent" },
];

const HelpDesk: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [title, setTitle] = useState<string>("");
  const [assignedTo, setAssignedTo] = useState<any>([]);
  const [status, setStatus] = useState<string>("Open");
  const [priority, setPriority] = useState<string>("Low");
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>({ name: "", email: "" });
  const { allUsers } = useAuth();
  const { bgColor } = useThemes();

  const [isOpenTicketDes, setIsOpenTicketDes] = useState(false);
  const [ticket, setTicket] = useState<any>(null);

  const userOptions = useMemo(
    () => allUsers.map((x: any) => ({ value: x.email, label: x.name })),
    [allUsers]
  );

  const myTickets = useMemo(() => {
    return tickets.filter((ticket) =>
      ticket.assignedTo.some((user) => user.value === currentUser.email)
    );
  }, [tickets, currentUser.email]);

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

  const addTicket = () => {
    if (!title || assignedTo.length === 0) {
      return;
    }
    const newTicket: Ticket = {
      id: tickets.length + 1,
      title,
      assignedTo,
      status,
      createdBy: currentUser,
      priority,
      createdAt: new Date(),
    };
    setTickets([...tickets, newTicket]);
    setTitle("");
    setAssignedTo([]);
    setStatus("Open");
    setPriority("Low");
    // setIsPanelOpen(false);
  };

  const updateTicketStatus = (id: number, newStatus: string) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === id ? { ...ticket, status: newStatus } : ticket
    );
    setTickets(updatedTickets);
  };

  const columns = [
    {
      key: "column1",
      name: "Ticket ID",
      fieldName: "id",
      minWidth: 100,
      maxWidth: 100,
      isMultiline: true,
      onRender: (item: Ticket) => (
        <div className="w-full h-full flex items-center">#{item.id}</div>
      ),
    },
    {
      key: "column2",
      name: "Title",
      fieldName: "title",
      minWidth: 100,
      maxWidth: 200,
      isMultiline: true,
      onRender: (item: Ticket) => (
        <div
          onClick={() => {
            setTicket(item);
            setIsOpenTicketDes(true);
          }}
          className="w-full h-full flex items-center cursor-pointer"
        >
          {item.title}
        </div>
      ),
    },
    {
      key: "column3",
      name: "Assigned To",
      fieldName: "assignedTo",
      minWidth: 100,
      maxWidth: 200,
      onRender: (item: Ticket) => (
        <div className="w-full h-full flex items-center">
          <Dropdown
            options={item.assignedTo.map((x) => ({
              text: x.label,
              key: x.value,
            }))}
            selectedKey={item.assignedTo[0].value || ""}
            styles={{ root: { width: "100%" } }}
          />
        </div>
      ),
    },
    {
      key: "column4",
      name: "Created By",
      fieldName: "createdBy",
      minWidth: 100,
      maxWidth: 200,
      onRender: (item: Ticket) => (
        <div className="w-full h-full flex items-center">
          {item.createdBy.name}
        </div>
      ),
    },
    {
      key: "column5",
      name: "Priority",
      fieldName: "priority",
      minWidth: 100,
      maxWidth: 100,
      onRender: (item: Ticket) => (
        <div className="w-full h-full flex items-center">{item.priority}</div>
      ),
    },
    {
      key: "column6",
      name: "Created At",
      fieldName: "createdAt",
      minWidth: 100,
      maxWidth: 200,
      onRender: (item: Ticket) => (
        <div className="w-full h-full flex items-center">
          {item.createdAt.toLocaleString()}
        </div>
      ),
    },
    {
      key: "column7",
      name: "Status",
      fieldName: "status",
      minWidth: 100,
      maxWidth: 200,
      onRender: (item: Ticket) => (
        <div className="w-full h-full flex items-center">
          <Dropdown
            selectedKey={item.status}
            options={ticketStatuses}
            onChange={(_, option) =>
              updateTicketStatus(item.id, option!.key as string)
            }
            styles={{ root: { width: "100%" } }}
          />
        </div>
      ),
    },
  ];

  const handleUserSelection = useCallback((selectedOptions: any) => {
    setAssignedTo(selectedOptions as { value: string; label: string }[]);
  }, []);

  useEffect(() => {
    const getCurrentUser = async () => {
      const cu = await gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .getBasicProfile();
      setCurrentUser({ name: cu.getName(), email: cu.getEmail() });
    };
    getCurrentUser();
  }, []);

  return (
    <div>
      <Pivot>
        <PivotItem headerText="Team Tickets">
          <Button className="mt-2" onClick={() => setIsPanelOpen(true)}>
            <div className="flex gap-1">
              <Icon iconName="Add" title="Create Ticket" /> <p>New Ticket</p>
            </div>
          </Button>
          <DetailsList items={tickets} columns={columns} selectionMode={0} />
        </PivotItem>
        <PivotItem headerText="Assigned to Me">
          <DetailsList items={myTickets} columns={columns} selectionMode={0} />
        </PivotItem>
      </Pivot>

      <Panel
        isOpen={isPanelOpen}
        onDismiss={() => setIsPanelOpen(false)}
        headerText="Create New Ticket"
        type={PanelType.medium}
      >
        <div className="flex flex-col gap-y-3">
          <TextField
            label="Ticket Title"
            value={title}
            onChange={(_, newValue) => setTitle(newValue || "")}
          />
          <ReactSelect
            options={userOptions}
            isMulti
            onChange={handleUserSelection}
            className="mt-2"
            placeholder="Select users..."
            value={assignedTo}
            styles={stylesReactSelect}
          />
          <Dropdown
            label="Status"
            selectedKey={status}
            options={ticketStatuses}
            onChange={(_, option) => setStatus(option!.key as string)}
          />
          <Dropdown
            label="Priority"
            selectedKey={priority}
            options={priorityOptions}
            onChange={(_, option) => setPriority(option!.key as string)}
          />
          <Button onClick={addTicket}>Add Ticket</Button>
        </div>
      </Panel>
      <TicketDescription
        ticket={ticket}
        isOpen={isOpenTicketDes}
        onDismiss={() => setIsOpenTicketDes(false)}
      />
    </div>
  );
};

const TicketDescription = ({ ticket, isOpen, onDismiss }: any) => {
  if (ticket === null) {
    return;
  }
  return (
    <div>
      <Panel
        headerText={`Ticket - #${ticket.id}`}
        isOpen={isOpen}
        onDismiss={onDismiss}
        type={PanelType.smallFluid}
      >
        <div>TicketDescription :{JSON.stringify(ticket)}</div>
      </Panel>
    </div>
  );
};

export default HelpDesk;
