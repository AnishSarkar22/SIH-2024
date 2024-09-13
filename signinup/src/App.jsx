// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/Signup";
import SignIn from "./components/signin";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Default route for the home page */}
        <Route path="/signin" element={<SignIn />} />
        {/* Define the routes for SignIn and SignUp pages */}
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}
