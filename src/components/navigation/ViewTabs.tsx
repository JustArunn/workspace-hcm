import { useAuth } from "../../context/Context";
import PageIcon from "../custom/icons/PageIcon";

const ViewsTabs = ({ setView }: any) => {
  const { views } = useAuth();
  return (
    <div className="flex mx-2 my-2 justify-end gap-2">
      <div className="flex gap-5">
        {views.grid && (
          <PageIcon
            fontSize="24px"
            className="viewIcons"
            iconName="ContactCard"
            onClick={() => setView("grid")}
          />
        )}
        {views.list && (
          <PageIcon
            fontSize="24px"
            className="viewIcons"
            iconName="BulletedList2"
            onClick={() => setView("list")}
          />
        )}
        {views.contact && (
          <PageIcon
            fontSize="24px"
            className="viewIcons"
            iconName="ContactInfo"
            onClick={() => setView("contacts")}
          />
        )}
      </div>
    </div>
  );
};

export default ViewsTabs;
