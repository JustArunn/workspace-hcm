import { Icon, PersonaSize } from "@fluentui/react";
import { useAuth, useThemes } from "../../context/Context";
import { useEffect, useState } from "react";
import Person from "../custom/Persona";
import Heading from "../utils/Heading";

const ProfileCard = () => {
  const [user, setUser] = useState<any>(null);
  const [manager, setManager] = useState<any>(null);

  const { getCurrentUser, getUsers } = useAuth();

  const [activeTab, setActiveTab] = useState("office");
  const { bgColor } = useThemes();

  const renderTabContent = () => {
    switch (activeTab) {
      case "office":
        return (
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Info Type</th>
                <th className="px-4 py-2 text-left">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Work Email</td>
                <td className="border px-4 py-2">{user.email}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Work Phone</td>
                <td className="border px-4 py-2">{user.phone}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Office Location</td>
                <td className="border px-4 py-2">{user.location}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Date of Joining</td>
                <td className="border px-4 py-2">{user.DOJ}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Admin</td>
                <td className="border px-4 py-2">{user.isAdmin ? "Yes":"No"}</td>
              </tr>
            </tbody>
          </table>
        );
      case "personal":
        return (
          <div>
            <p className="py-2">Email : {user.email}</p>
            <p className="py-2">Phone : {user.phone}</p>
            <p className="py-2">Date of Birth : </p>
            <p className="py-2">Address : </p>
          </div>
        );
      case "hr":
        return (
          <div>
            <p className="py-2">HR settings go here.</p>
            <p className="py-2">Leave balance : </p>
            <p className="py-2">Performance reviews :</p>
          </div>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    getCurrentUser().then(async (email: string) => {
      const users = await getUsers();

      const user = users.find((x: any) => x.primaryEmail === email);

      console.log("user and manager", { user, manager });

      const userData = {
        id: user.id,
        name: user.name.fullName,
        email: user.primaryEmail,
        image: user.thumbnailPhotoUrl,
        jobTitle: user.organizations[0].title,
        department: user.organizations[0].department,
        location: user.locations[0].floorName,
        manager: user.isAdmin === false ? user.relations[0].value : "",
        phone: user.phones[0].value,
        isAdmin: user.isAdmin,
      };

      if (user.isAdmin === true) {
        setManager(null);
        setUser(userData);
        return;
      }
      const userManager = users.find(
        (x: any) => user.manager === x.primaryEmail
      );
      const managerData = {
        id: userManager.id,
        name: userManager.name.fullName,
        email: userManager.primaryEmail,
        image: userManager.thumbnailPhotoUrl,
        jobTitle: userManager.organizations[0].title,
        department: userManager.organizations[0].department,
        location: userManager.locations[0].floorName,
        manager:
          userManager.isAdmin === false ? userManager.relations[0].value : "",
      };
      setUser(userData);
      setManager(managerData);
    });
  }, []);

  return (
    <div className="w-full h-full ">
      <div className="mt-4"><Heading>Profile</Heading></div>
      {user !== null && (
        <div className="flex flex-col p-6">
          <div className="flex mb-4">
            <div className="w-1/8">
              <Person
                imageUrl={user?.image}
                imageInitials={user?.name[0]}
                size={PersonaSize.size100}
                block
              />
            </div>
            <div className="w-2/3 pl-4">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-gray-700">
                {user.department} | {user.jobTitle}
              </p>

              <p className="text-gray-700">{user.location}</p>
              <div className="flex mt-4">
                <Icon
                  styles={{ root: { fontSize: "16px" } }}
                  iconName="Phone"
                  className="mr-4 cursor-pointer"
                />
                <Icon
                  styles={{ root: { fontSize: "16px" } }}
                  iconName="Mail"
                  className="mr-4 cursor-pointer"
                />
                <Icon
                  styles={{ root: { fontSize: "16px" } }}
                  iconName="Org"
                  className="mr-4 cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-around border-b pb-2">
              <button
                onClick={() => setActiveTab("office")}
                className={`py-2 px-4 focus:outline-none ${
                  activeTab === "office"
                    ? "font-bold border-b-2 border-blue-500"
                    : ""
                }`}
                style={{
                  borderColor: activeTab === "office" ? bgColor : "",
                }}
              >
                Office Info
              </button>
              <button
                onClick={() => setActiveTab("personal")}
                className={`py-2 px-4 focus:outline-none ${
                  activeTab === "personal"
                    ? "font-bold border-b-2 border-blue-500"
                    : ""
                }`}
                style={{
                  borderColor: activeTab === "personal" ? bgColor : "",
                }}
              >
                Personal Info
              </button>
              <button
                onClick={() => setActiveTab("hr")}
                className={`py-2 px-4 focus:outline-none ${
                  activeTab === "hr"
                    ? "font-bold border-b-2 border-blue-500"
                    : ""
                }`}
                style={{
                  borderColor: activeTab === "hr" ? bgColor : "",
                }}
              >
                HR Settings
              </button>
            </div>
            <div className="p-4 mt-2">{renderTabContent()}</div>
          </div>
          {manager !== null && <div className="border border-[#ddd]"></div>}
          {manager !== null && (
            <div className="w-1/8 mt-2">
              <Person
                imageUrl={manager.image}
                text={manager.name}
                secondaryText={`${manager.jobTitle} | ${manager.department}`}
                imageInitials={user.name[0]}
                size={PersonaSize.size56}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
