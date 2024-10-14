import "../../css/global.css";
import { useState } from "react";
import { Icon } from "@fluentui/react";
import { Link } from "react-router-dom";
import { gapi } from "gapi-script";
import { useAuth, useThemes } from "../../context/Context";

const SideNav = () => {
  const [activeTab, setActiveTab] = useState("home");
  const { setLoggedIn } = useAuth();
  const { isNavExpended, setIsNavExpended } = useAuth();
  const { bgColor, fontColor } = useThemes();

  const signOut = () => {
    gapi.auth2
      .getAuthInstance()
      .signOut()
      .then(() => {
        setLoggedIn(false);
      });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        backgroundColor: bgColor,
        color: fontColor,
      }}
      className={`sidenav ${isNavExpended ? "expanded" : ""}`}
    >
      <div
        className="sidenav-header fixed top-0 text-inherit"
        onClick={() => setIsNavExpended(!isNavExpended)}
      >
        <Icon
          iconName={isNavExpended ? "Cancel" : "CollapseMenu"}
          styles={{ root: { color: fontColor } }}
        />
      </div>
      <ul className="sidenav-list fixed top-10 flex flex-col h-full text-inherit">
        <li className="w-full" title="Home">
          <Link
            onClick={() => setActiveTab("home")}
            className={
              activeTab === "home"
                ? `activeTab flex gap-2 text-inherit`
                : `flex gap-2 text-inherit`
            }
            to={"/"}
          >
            <Icon styles={{ root: { color: fontColor } }} iconName="Home" />
            {isNavExpended && <span>Home</span>}
          </Link>
        </li>
        <li title="Dashboard">
          <Link
            onClick={() => setActiveTab("dashboard")}
            className={
              activeTab === "dashboard" ? `activeTab flex gap-2` : `flex gap-2`
            }
            to={"/dashboard"}
          >
            <Icon
              styles={{ root: { color: fontColor } }}
              iconName="BIDashboard"
            />
            {isNavExpended && <span>Dashboard</span>}
          </Link>
        </li>
        <li title="Organizational Chart">
          <Link
            onClick={() => setActiveTab("orgchart")}
            className={
              activeTab === "orgchart" ? `activeTab flex gap-2` : `flex gap-2`
            }
            to={"/org-chart"}
          >
            <Icon styles={{ root: { color: fontColor } }} iconName="Org" />
            {isNavExpended && <span>Org Chart</span>}
          </Link>
        </li>
        <li title="Calendar">
          <Link
            onClick={() => setActiveTab("calendar")}
            className={
              activeTab === "calendar" ? `activeTab flex gap-2` : `flex gap-2`
            }
            to={"/calendar"}
          >
            <Icon styles={{ root: { color: fontColor } }} iconName="Calendar" />
            {isNavExpended && <span>Calendar</span>}
          </Link>
        </li>
        <li title="Meetings">
          <Link
            onClick={() => setActiveTab("meetings")}
            className={
              activeTab === "meetings" ? `activeTab flex gap-2` : `flex gap-2`
            }
            to={"/meetings"}
          >
            <Icon styles={{ root: { color: fontColor } }} iconName="Phone" />
            {isNavExpended && <span>Meetings</span>}
          </Link>
        </li>
        <li title="Profile">
          <Link
            onClick={() => setActiveTab("profile")}
            className={
              activeTab === "profile" ? `activeTab flex gap-2` : `flex gap-2`
            }
            to={"/profile"}
          >
            <Icon styles={{ root: { color: fontColor } }} iconName="Contact" />
            {isNavExpended && <span>Profile</span>}
          </Link>
        </li>
        <li title="Settings">
          <Link
            onClick={() => setActiveTab("settings")}
            className={
              activeTab === "settings" ? `activeTab flex gap-2` : `flex gap-2`
            }
            to={"/settings"}
          >
            <Icon styles={{ root: { color: fontColor } }} iconName="Settings" />
            {isNavExpended && <span>Settings</span>}
          </Link>
        </li>
        <li title="SignOut">
          <Link className="flex gap-2" onClick={signOut} to={"/#"}>
            <Icon styles={{ root: { color: fontColor } }} iconName="SignOut" />
            {isNavExpended && <span>Sign Out</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
