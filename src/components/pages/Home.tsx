import { useEffect, useState } from "react";
import { useAuth } from "../../context/Context";
import CharactorFilter from "../filters/CharactorFilter";
import ViewsTabs from "../navigation/ViewTabs";
import GridView from "../views/GridView";
import ListView from "../views/ListView";
import SearchFilters from "../filters/SearchFilters";
import NoRecordsFound from "../utils/NoRecordsFound";
import Loader from "../custom/Loader";
import { formatAllUsers } from "../utils/utils";

const Home = () => {
  const [view, setView] = useState("grid");
  const [users, setUsers] = useState<any>([]);
  const [loadgin, setLoading] = useState(false);
  const { getUsers, setAllUsers } = useAuth();

  const formatUsers = (users: any) => {
    const formatedUser = formatAllUsers(users);
    console.log("users formatUsers", formatedUser);
    setUsers([
      ...formatedUser,
      ...formatedUser,
      ...formatedUser,
      ...formatedUser,
      ...formatedUser,
    ]);
    setAllUsers([
      ...formatedUser,
      ...formatedUser,
      ...formatedUser,
      ...formatedUser,
      ...formatedUser,
    ]);
  };

  useEffect(() => {
    setLoading(true);
    getUsers().then((users: any) => {
      console.log("users", users);
      formatUsers(users);
      setLoading(false);
    });
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center h-full">
      <CharactorFilter users={users} setUsers={setUsers} />
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
              {view == "grid" ? (
                <GridView users={users} />
              ) : (
                <ListView users={users} />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
