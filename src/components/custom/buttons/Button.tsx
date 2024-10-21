import { PrimaryButton, IButtonProps } from "@fluentui/react";
import { useThemes } from "../../../context/Context";
import { FC } from "react";

const Button: FC<IButtonProps> = (props: any) => {
  const { bgColor, fontColor } = useThemes();

  return (
    <PrimaryButton
      {...props}
      styles={{
        root: {
          backgroundColor: bgColor,
          color: fontColor,
          outline: "none",
          border: "none",
          "&:hover": {
            backgroundColor: props.disabled === false ? bgColor : "",
            color: props.disabled === false ? fontColor:"",
          },
        },
        rootHovered: {
          backgroundColor: props.disabled === false ? bgColor : "",
          color: fontColor,
          outline: "none",
          border: "none",
        },
        rootPressed: {
          backgroundColor: bgColor,
          color: fontColor,
          outline: "none",
          border: "none",
        },
        rootFocused: {
          backgroundColor: bgColor,
          color: fontColor,
          outline: "none",
        },
      }}
    >
      {props.children}
    </PrimaryButton>
  );
};

export default Button;
