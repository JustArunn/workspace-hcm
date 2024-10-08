import { useEffect, useState } from "react";
import { useAuth } from "../../context/Context";
import CharactorFilter from "../filters/CharactorFilter";
import ViewsTabs from "../navigation/ViewTabs";
import GridView from "../views/GridView";
import ListView from "../views/ListView";
import SearchFilters from "../filters/SearchFilters";
import NoRecordsFound from "../utils/NoRecordsFound";
import Loader from "../custom/Loader";

const Home = () => {
  const [view, setView] = useState("grid");
  const [users, setUsers] = useState<any>([]);
  const [allUsers, setAllUsers] = useState<any>([]);
  const [loadgin, setLoading] = useState(false);
  const { getUsers } = useAuth();

  const formatUsers = (users: any) => {
    const formatedUser = users.map((x: any) => ({
      id: x.id,
      name: x.name.fullName ?? "",
      email: x.primaryEmail ?? "",
      image: x.thumbnailPhotoUrl ?? "",
      jobTitle: x.organizations !== undefined ? x.organizations[0].title : "",
      department:
        x.organizations !== undefined ? x.organizations[0].department : "",
      location: x.locations !== undefined ? x.locations[0].floorName : "",
      manager:
        x.isAdmin === false
          ? x.relations !== undefined
            ? x.relations[0].value
            : ""
          : "",
      phone: x.phones !== undefined ? x.phones[0].value : "",
      isAdmin: x.isAdmin,
    }));
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
      formatUsers(users);
      setLoading(false);
    });
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center h-full">
      <CharactorFilter allUsers={allUsers} users={users} setUsers={setUsers} />
      <div className="w-full flex justify-between bg-[rgb(240, 240, 240)]">
        <SearchFilters allUsers={allUsers} users={users} setUsers={setUsers} />
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
