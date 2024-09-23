import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Greetings from "../src/components/greetings";

function App() {
  return (
    <Router>
      <Greetings />
    </Router>
  );
}

export default App;
