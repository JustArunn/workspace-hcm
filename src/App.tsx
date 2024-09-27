import "./App.css";
import ListView from "./components/views/ListView";

function App() {
    const items = [
    {
      fullName: "John Doe",
      email: "john.doe@example.com",
      mobile: "+1234567890",
      jobTitle: "Software Engineer",
      location: "New York",
      role: "Developer",
    },
    {
      fullName: "Jane Smith",
      email: "jane.smith@example.com",
      mobile: "+0987654321",
      jobTitle: "Project Manager",
      location: "San Francisco",
      role: "Manager",
    },
  ];
  return (
    <div className="w-screen flex justify-center">
      <ListView users={items}/>
    </div>
  );
}

export default App;
