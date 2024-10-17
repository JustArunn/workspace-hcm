import { PersonaSize } from "@fluentui/react";
import { useAuth, useThemes } from "../../context/Context";
import { useEffect, useState } from "react";
import { formatUser, handleEmailClick } from "../utils/utils";
import Person from "../custom/Persona";
import Heading from "../utils/Heading";
import Loader from "../custom/Loader";
import UpdateUserForm from "../common/UpdateUserForm";
import PageIcon from "../custom/icons/PageIcon";

const ProfileCard = () => {
  const [user, setUser] = useState<any>(null);
  const [manager, setManager] = useState<any>(null);
  const [loadgin, setLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

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
                <td className="border px-4 py-2">
                  {user.location.buildingId} {user.location.floorName}
                  {", "}
                  {user.location.floorSection}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Employee ID</td>
                <td className="border px-4 py-2">{user.employeeId}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Admin</td>
                <td className="border px-4 py-2">
                  {user.isAdmin ? "Yes" : "No"}
                </td>
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
      setLoading(true);
      const users = await getUsers();
      const user: any = formatUser(
        users.find((x: any) => x.primaryEmail === email)
      );
      const manager = formatUser(
        users.find((x: any) => user.manager === x.primaryEmail)
      );
      setUser(user);
      setManager(manager);
      setLoading(false);
    });
  }, []);

  return (
    <div className="w-full h-full ">
      <div className="mt-4">
        <Heading>Profile</Heading>
      </div>

      {loadgin ? (
        <div className="w-full h-[90vh] flex  items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
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

                  <p className="text-gray-700">
                    {user.location.buildingId} {user.location.floorName}
                    {", "}
                    {user.location.floorSection}
                  </p>
                  <div className="flex mt-4">
                    <PageIcon
                      fontSize="18px"
                      iconName="Phone"
                      className="mr-4 cursor-pointer"
                    />
                    <PageIcon
                      fontSize="18px"
                      iconName="Mail"
                      className="mr-4 cursor-pointer"
                      onClick={()=>handleEmailClick(user.email)}
                    />
                    <PageIcon
                      fontSize="18px"
                      iconName="Org"
                      className="mr-4 cursor-pointer"
                    />
                    <PageIcon
                      fontSize="18px"
                      iconName="Edit"
                      className="mr-4 cursor-pointer"
                      onClick={() => setOpenEdit(true)}
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
              <UpdateUserForm
                isOpen={openEdit}
                onDismiss={() => setOpenEdit(false)}
                user={user}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileCard;
