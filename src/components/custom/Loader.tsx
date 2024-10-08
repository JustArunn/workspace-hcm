import { Spinner, SpinnerSize, ISpinnerProps } from "@fluentui/react";
import { FC } from "react";
import { useThemes } from "../../context/Context";

const Loader: FC<ISpinnerProps> = (props) => {
  const { bgColor } = useThemes();
  return (
    <div>
      <Spinner
        {...props}
        styles={{
          root: {
            "& .ms-Spinner-circle": {
              borderColor: `${bgColor} ${bgColor}80 ${bgColor}80 `,
            },
            "& .ms-Spinner-label": {
              color: bgColor,
            },
          },
        }}
        label={props.label ? props.label : "Please wait..."}
        size={SpinnerSize.large}
      />
    </div>
  );
};

export default Loader;
