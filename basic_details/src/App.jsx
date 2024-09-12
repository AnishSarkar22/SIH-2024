// App.jsx
import React from "react";
import Navbar from "./components/Navbar";
import FormPage from "./components/FormPage";


const App = () => {
  return (
    <>
      <Navbar></Navbar>
      <h1 className="text-3xl font-bold text-gray-900 ml-40 mr-10 mt-7">
        Basic Details
      </h1>
      <FormPage></FormPage>
    </>
  );
};

export default App;
