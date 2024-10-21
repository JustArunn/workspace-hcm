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

const Home = () => {
  const [view, setView] = useState("grid");
  const [users, setUsers] = useState<any>([]);
  const [loadgin, setLoading] = useState(false);
  const { getUsers, setAllUsers, hiddenProperties } = useAuth();

  useEffect(() => {
    setLoading(true);
    getUsers().then((users: any) => {
      console.log("users", users);
      setUsers(formatAllUsers(users));
      setAllUsers(formatAllUsers(users));
      const hUsers = hideUserProperties(
        formatAllUsers(users),
        hiddenProperties
      );
      console.log("hUsers.......", hUsers);
      setUsers(hUsers)
      setLoading(false);
    });
  }, []);

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
