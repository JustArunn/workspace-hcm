import './App.css'
import { Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

function App() {
  return (
    <div style={{ display: "flex" }}>
      <Button
        variant="contained"
        style={{ width: "100px", background: "#e84949" }}
      >
        Helo
      </Button>
      <HomeIcon fontSize="large" />
    </div>
  );
}

export default App
