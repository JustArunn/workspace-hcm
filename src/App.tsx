import { Route, Routes } from "react-router-dom";
import { useAuth } from "./context/Context";
import Calendar from "./components/pages/Calendar";
import SideNav from "./components/navigation/SideNav";
import Settings from "./components/pages/Settings";
import Dashboard from "./components/pages/Dashboard";
import Profile from "./components/pages/Profile";
import Landing from "./components/pages/Landing";
import Home from "./components/pages/Home";
import Meetings from "./components/pages/Meetings";
import OrganizationalChart from "./components/pages/OrgChart";
import Loader from "./components/custom/Loader";

function App() {
  const { loggedin, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Loader/>
      </div>
    );
  }

  if (!loggedin && !loading) {
    return <Landing />;
  }

  return (
    <div className="h-screen">
      <div>
        <div className="flex">
          <SideNav/>
          <div className="w-[90vw] mx-auto h-full">
            <Routes>
              <Route index element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/meetings" element={<Meetings />} />
              <Route path="/org-chart" element={<OrganizationalChart />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
