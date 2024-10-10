import { IButtonProps, IconButton } from "@fluentui/react";
import { FC } from "react";
import { useThemes } from "../../../context/Context";

const PageIconButton: FC<IButtonProps> = (props) => {
  const { bgColor } = useThemes();

  return (
    <div>
      <IconButton
        {...props}
        styles={{
          root: {
            color: bgColor, // Icon color
            "& .ms-Button:hover": {
              color: bgColor,
            },
          },
        }}
        onClick={props.onClick}
      />
    </div>
  );
};

export default PageIconButton;
