import { FC } from "react";
import NoRecordFoundIMage from "../../assets/no-data-found.png";

interface INoRecordsFound {
  className?: string;
}

const NoRecordsFound: FC<INoRecordsFound> = ({ className }) => {
  return (
    <div className={className}>
      <img
        style={{ userSelect: "none" }}
        className="select-none select "
        src={NoRecordFoundIMage}
        alt=""
        draggable={false}
      />
    </div>
  );
};

export default NoRecordsFound;
