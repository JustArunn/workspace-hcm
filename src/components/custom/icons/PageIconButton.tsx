import { IButtonProps, IconButton } from "@fluentui/react";
import { FC } from "react";
import { useThemes } from "../../../context/Context";

const PageIconButton: FC<IButtonProps> = (props) => {
  const { bgColor } = useThemes();

  return (
    <div>
      <IconButton
        styles={{ root: { color: bgColor } }}
        onClick={props.onClick}
        {...props}
      />
    </div>
  );
};

export default PageIconButton;
