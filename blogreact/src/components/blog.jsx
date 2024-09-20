import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./header"; // Assuming this is the Navbar component
import BlogList from "./blogcard"; // Import the BlogList component
import Footer from "./footer"; // Assuming this is the Footer component

function Blog() {
  return (
    <Router>
      <div>
        <Navbar />
        <h1 className="text-center text-5xl font-extrabold text-gray-900 mt-20 leading-tight">
          Welcome to the Blog
        </h1>
        <BlogList></BlogList>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default Blog;
