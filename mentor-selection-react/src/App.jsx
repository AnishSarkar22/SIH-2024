import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Mentor from "./Components/Mentor";
import Setting from "./Components/Mentor"; // Corrected import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mentor />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
