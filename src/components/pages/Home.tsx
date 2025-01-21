import { useEffect, useState } from "react";
import {
  formatAllUsers,
  hideUserProperties,
} from "../utils/utils";
import { useAuth } from "../../context/Context";
import CharactorFilter from "../filters/CharactorFilter";
import ViewsTabs from "../navigation/ViewTabs";
import GridView from "../views/GridView";
import ListView from "../views/ListView";
import SearchFilters from "../filters/SearchFilters";
import NoRecordsFound from "../utils/NoRecordsFound";
import Loader from "../custom/Loader";
import Contact from "../views/Contacts";
import { Icon, Modal, TooltipHost } from "@fluentui/react";
import { gapi } from "gapi-script";
import Button from "../custom/buttons/Button";

const Home = () => {
  const [view, setView] = useState("grid");
  const [users, setUsers] = useState<any>([]);
  const [loadgin, setLoading] = useState(false);
  const { getUsers, setAllUsers, hiddenProperties, isWorkspaceAccount, setLoggedIn } = useAuth();

  useEffect(() => {
    if (isWorkspaceAccount) {
      setLoading(true);
      getUsers().then((users: any) => {
        console.log("users", users);
        setUsers(formatAllUsers(users));
        setAllUsers(formatAllUsers(users));
        const userWitHiddenProperties = hideUserProperties(
          formatAllUsers(users),
          hiddenProperties
        );
        console.log("hUsers.......", userWitHiddenProperties);
        setUsers(userWitHiddenProperties);
        setLoading(false);
      });
    }
  }, []);

  const signOut = () => {
    gapi.auth2
      .getAuthInstance()
      .signOut()
      .then(() => {
        setLoggedIn(false);
      });
  }

  if (!isWorkspaceAccount) {
    return (
      <div>
        <Modal
          isOpen={!isWorkspaceAccount}
        >
          <div className="p-4 flex justify-center items-center gap-[1.5rem] flex-col max-w-[600px]">
            <div className="flex gap-2 justify-center items-center">
              <h1 className="text-2xl text-center">Oops !</h1>
              <TooltipHost
                content="This application can only be accessed via Google Workspace Account"
                id="error-tooltip"
              >
                <Icon aria-describedby="error-tooltip" className="text-[1.2rem] mt-[3px] cursor-pointer" iconName="Info" />
              </TooltipHost>
            </div>
            <div className="flex justify-center items-center">
              <p>It appears that your account is either not a <span style={{ color: "rgb(0, 120, 212)" }}>Google Workspace</span> user or is not associated with any organization that uses <span style={{ color: "rgb(0, 120, 212)" }}>Google Workspace</span>. Please contact your administrator or sign in with a valid <span style={{ color: "rgb(0, 120, 212)" }}>Google Workspace</span> account to continue.</p>
            </div>
            <div><Button onClick={signOut}>Back to Home</Button></div>
          </div>
        </Modal>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col justify-center items-center h-full">
      <div className="h-full w-full hidden lg:block">
        <CharactorFilter users={users} setUsers={setUsers} />
      </div>
      <div className="w-full flex justify-between bg-[rgb(240, 240, 240)]">
        <SearchFilters users={users} setUsers={setUsers} />
        <ViewsTabs setView={setView} />
      </div>
      {loadgin ? (
        <div className="w-full h-[80vh] flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          {users.length < 1 ? (
            <NoRecordsFound className="w-[20%] flex justify-center items-center" />
          ) : (
            <>
              {view === "grid" && <GridView users={users} />}
              {view === "list" && <ListView users={users} />}
              {view === "contacts" && <Contact users={users} />}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
