import { IButtonProps, DefaultButton } from "@fluentui/react";
import { useThemes } from "../../../context/Context";
import { FC } from "react";

const SecondButton: FC<IButtonProps> = (props: any) => {
  const { bgColor, fontColor } = useThemes();

  return (
    <DefaultButton
      {...props}
      styles={{
        root: {
          "&:hover": {
            backgroundColor: bgColor,
            color: fontColor,
          },
        },
        rootHovered: {
          backgroundColor: bgColor,
          color: fontColor,
          outline: "none",
          border: "none",
        },
      }}
    >
      {props.children}
    </DefaultButton>
  );
};

export default SecondButton;
