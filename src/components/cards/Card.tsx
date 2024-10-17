import { PersonaSize } from "@fluentui/react/lib/Persona";
import { useState } from "react";
import Person from "../custom/Persona";
import SecondButton from "../custom/buttons/SecondButton";
import EmployeeInfo from "../modals/EmployeeInfo";
import { handleEmailClick } from "../utils/utils";

const Card = ({ user, manager }: any) => {
  const [isOpen, onDismiss] = useState(false);
  return (
    <div className="w-[210px] border border-gray-300 p-2  text-center shadow-md bg-white">
      <div className="flex justify-center w-full">
        <Person
          size={PersonaSize.size100}
          imageUrl={user.image}
          imageInitials={user.name[0]}
          block
        />
      </div>
      <h3 className="mt-4 text-[16px] font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
        {user.name}
      </h3>
      <p className="mt-2 text-[14px] text-gray-600 overflow-hidden whitespace-nowrap text-ellipsis">
        {user.jobTitle}
      </p>
      <p
        onClick={() => handleEmailClick(user.email)}
        className="mt-1 text-[14px] text-gray-600 overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer"
      >
        {user.email}
      </p>
      <p className="mt-1 text-[14px] text-gray-600 overflow-hidden whitespace-nowrap text-ellipsis">
        {user.location.floorName}
      </p>
      <p className="mt-1 text-[14px] text-gray-600 overflow-hidden whitespace-nowrap text-ellipsis">
        {user.phone}
      </p>
      <SecondButton
        onClick={() => onDismiss(true)}
        className="mt-4 rounded-full transition-all"
      >
        View Profile
      </SecondButton>
      <EmployeeInfo
        employee={user}
        manager={manager}
        isOpen={isOpen}
        onDismiss={() => onDismiss(false)}
      />
    </div>
  );
};

export default Card;
