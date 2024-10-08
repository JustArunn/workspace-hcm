import { FC, ReactNode } from "react";

interface IGoogleButton {
  children?: ReactNode;
  onClick: () => void;
  width: string;
}

const GoogleButton: FC<IGoogleButton> = ({ children, onClick, width }: any) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-[7px] rounded-full border shadow-xl w-[${width}] flex gap-2 justify-center  dark:border-slate-700 hover:border-slate-400 hover:text-slate-950 hover:scale-105 transition duration-150`}
    >
      <img
        className="w-6 h-6"
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        loading="lazy"
        alt="google logo"
      />
      <span className="whitespace-nowrap">
        {children ?? "Sign in with Google"}
      </span>
    </button>
  );
};

export default GoogleButton;
