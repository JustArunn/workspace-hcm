import { Persona, IPersonaProps } from "@fluentui/react";
import { FC } from "react";
import { useThemes } from "../../context/Context";

interface IPerson extends IPersonaProps {
  block?: boolean;
}

const Person: FC<IPerson> = (props) => {
  const { bgColor, fontColor } = useThemes();

  return (
    <div>
      <Persona
        {...props}
        styles={{
          root: {
            display: props.block ? "block" : undefined,
            "& .ms-Persona-initials": {
              backgroundColor: bgColor,
              color: fontColor,
            },
            "& .ms-Persona-primaryText": {
              fontSize: "16px",
            },
            "& .ms-Persona-secondaryText": {
              fontSize: "12px",
            },
          },
        }}
        imageInitials={props.imageInitials?.toUpperCase()}
      />
    </div>
  );
};

export default Person;
