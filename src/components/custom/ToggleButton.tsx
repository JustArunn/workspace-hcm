import { Toggle, IToggleProps } from "@fluentui/react";
import { FC } from "react";
import { useThemes } from "../../context/Context";

const ToggleButton: FC<IToggleProps> = (props) => {
  const { bgColor } = useThemes();

  return (
    <div>
      <Toggle
        {...props}
        styles={{
          root: {
            "& .ms-Toggle-background": {
              backgroundColor: props.checked ? bgColor : "transparent",
            },
          },
        }}
      />
    </div>
  );
};

export default ToggleButton;
