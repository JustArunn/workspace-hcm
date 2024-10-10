import { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import { TextField, Panel, PanelType, Label } from "@fluentui/react";
import ReactSelect from "react-select";
import Button from "../custom/buttons/Button";
import { useAuth, useThemes } from "../../context/Context";

const UpdateUserForm = ({ isOpen, onDismiss, user }: any) => {
  const { bgColor } = useThemes();
  const { allUsers } = useAuth();
  const [manager, setManager] = useState<any>("");
  const [managerOptions, setManagerOptions] = useState<any>([]);

  const [formData, setFormData] = useState<any>({
    name: "",
    jobTitle: "",
    department: "",
    phone: "",
    buildingId: "",
    floorName: "",
    floorSection: "",
    employeeId: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        jobTitle: user.jobTitle || "",
        department: user.department || "",
        phone: user.phone || "",
        buildingId: user.location.buildingId || "",
        floorName: user.location.floorName || "",
        floorSection: user.location.floorSection || "",
        employeeId: user.employeeId || "",
      });

      const userManager = allUsers.find((x: any) => x.email === user.manager);
      if (userManager !== undefined) {
        const managerValue = {
          value: userManager.email,
          label: userManager.name,
        };
        setManager(managerValue);
      } else {
        setManager({ value: "", label: "" });
      }

      const options = allUsers.map((x: any) => ({
        value: x.email,
        label: x.name,
      }));

      setManagerOptions(options);
    }
  }, [user]);

  const handleInputChange =
    (field: string): any =>
    (_: any, value: string) => {
      setFormData({ ...formData, [field]: value });
    };

  const handleUpdate = async () => {
    const updateData = {
      primaryEmail: user.email,
      name: {
        givenName: formData.name.split(" ")[0] || "",
        familyName: formData.name.split(" ")[1] || "",
        fullName: formData.name || "",
      },
      relations: [
        {
          value: manager.value,
          type: "manager",
        },
      ],
      organizations: [
        {
          title: formData.jobTitle,
          primary: true,
          customType: "",
          department: formData.department,
        },
      ],
      phones: [
        {
          type: "work",
          value: formData.phone,
        },
      ],
      locations: [
        {
          type: "desk",
          area: "desk",
          buildingId: formData.buildingId,
          floorName: formData.floorName,
          floorSection: formData.floorSection,
        },
      ],
      externalIds: [
        {
          value: formData.employeeId,
          type: "organization",
        },
      ],
      suspended: false,
      includeInGlobalAddressList: true,
    };

    try {
      await gapi.client.directory.users.patch({
        userKey: user.email,
        resource: updateData,
      });
    } catch (error) {
      console.log("Error updating user details:", error);
    }
  };

  return (
    <Panel
      isOpen={isOpen}
      onDismiss={onDismiss}
      headerText="Update User Details"
      type={PanelType.medium}
      styles={{
        root: {
          "& .ms-Panel-content": {
            paddingBottom: "0px",
          },
          "& .ms-Button-flexContainer i": {
            color: bgColor,
          },
        },
      }}
    >
      <div className="h-full">
        <TextField
          label="Full Name"
          value={formData.name}
          onChange={handleInputChange("name")}
        />
        <TextField
          label="Employee ID"
          value={formData.employeeId}
          onChange={handleInputChange("employeeId")}
        />
        <TextField
          label="Title"
          value={formData.jobTitle}
          onChange={handleInputChange("jobTitle")}
        />
        <TextField
          label="Department"
          value={formData.department}
          onChange={handleInputChange("department")}
        />
        <TextField
          label="Work Phone"
          value={formData.phone}
          onChange={handleInputChange("workPhone")}
        />
        <TextField
          label="Building ID"
          value={formData.buildingId}
          onChange={handleInputChange("buildingId")}
        />
        <TextField
          label="Floor Name"
          value={formData.floorName}
          onChange={handleInputChange("floorName")}
        />
        <TextField
          label="Floor Section"
          value={formData.floorSection}
          onChange={handleInputChange("floorSection")}
        />
        <div>
          <Label>Manager</Label>
          <ReactSelect
            options={managerOptions}
            value={manager}
            onChange={(option) => setManager(option)}
            menuShouldScrollIntoView
            menuPosition="fixed"
            isClearable
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <Button text="Update" onClick={handleUpdate} />
        </div>
      </div>
    </Panel>
  );
};

export default UpdateUserForm;
