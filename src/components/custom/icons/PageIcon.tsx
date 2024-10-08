import { Icon, IIconProps } from "@fluentui/react";
import { FC } from "react";
import { useThemes } from "../../../context/Context";

const PageIcon: FC<IIconProps> = (props) => {
  const { bgColor } = useThemes();

  return (
    <div>
      <Icon
        onClick={props.onClick}
        styles={{
          root: { color: bgColor, fontSize: "24px", cursor: "pointer" },
        }}
        {...props}
      />
    </div>
  );
};

export default PageIcon;
