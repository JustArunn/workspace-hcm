import { Icon, IIconProps } from "@fluentui/react";
import { FC } from "react";
import { useThemes } from "../../../context/Context";

interface IPageIconProps extends IIconProps {
  fontSize?: string;
}

const PageIcon: FC<IPageIconProps> = (props) => {
  const { bgColor } = useThemes();

  return (
    <div>
      <Icon
        {...props}
        onClick={props.onClick}
        styles={{
          root: { color: bgColor, fontSize: props.fontSize, cursor: "pointer" },
        }}
      />
    </div>
  );
};

export default PageIcon;
