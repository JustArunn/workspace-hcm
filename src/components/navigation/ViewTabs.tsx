import PageIcon from "../custom/icons/PageIcon";

const ViewsTabs = ({ setView }: any) => {
  return (
    <div className="flex mx-2 my-2 justify-end gap-2">
      <div className="flex gap-5">
        <PageIcon
          fontSize="24px"
          className="viewIcons"
          iconName="ContactCard"
          onClick={() => setView("grid")}
        />
        <PageIcon
          fontSize="24px"
          className="viewIcons"
          iconName="BulletedList2"
          onClick={() => setView("list")}
        />
        <PageIcon
          fontSize="24px"
          className="viewIcons"
          iconName="ContactInfo"
          onClick={() => setView("contacts")}
        />
      </div>
    </div>
  );
};

export default ViewsTabs;
