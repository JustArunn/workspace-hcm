import { Checkbox, Text } from "@fluentui/react";
import { useAuth } from "../../context/Context";

const ManageViews = () => {
  const { views, setViews } = useAuth();

  const handleCheckboxChange = (event: any, checked: any) => {
    const { name } = event.target;
    setViews((prevViews: any) => ({
      ...prevViews,
      [name]: checked,
    }));
  };

  return (
    <div className="h-full w-full">
      <Text variant="large">Select Views:</Text>
      <div className="flex justify-around mt-10">
        <Checkbox
          name="grid"
          label="Grid View"
          checked={views.grid}
          onChange={handleCheckboxChange}
        />
        <Checkbox
          name="list"
          label="List View"
          checked={views.list}
          onChange={handleCheckboxChange}
        />
        <Checkbox
          name="contact"
          label="Contact View"
          checked={views.contact}
          onChange={handleCheckboxChange}
        />
      </div>
    </div>
  );
};

export default ManageViews;
