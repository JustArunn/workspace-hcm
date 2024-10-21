import { Link, useLocation } from "react-router-dom";
import { useThemes } from "../../context/Context";
import Button from "../custom/buttons/Button";

const NotFound = () => {
  const { pathname } = useLocation();
  const { bgColor } = useThemes();

  return (
    <div className="h-screen w-full flex justify-center items-center flex-col gap-y-4">
      <h1
        style={{ borderColor: bgColor, borderWidth:'2px' }}
        className="border p-4 rounded-full"
      >
        <span className="font-bold text-xl ">Oops ! path not found : </span>{" "}
        <span style={{color:bgColor}} className="font-bold  underline text-xl">{pathname}</span>
      </h1>
      <Link to={"/"}>
        <Button className="rounded-full">Back to Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
