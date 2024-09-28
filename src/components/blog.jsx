import React from "react";
import Navbar from "./HNavbar"; // Assuming this is the Navbar component
import BlogList from "./blogcard"; // Import the BlogList component
import Footer from "./Footer"; // Assuming this is the Footer component

function Blog() {
  return (
    <div>
      <Navbar />
      <h1 className="text-center text-5xl font-extrabold text-gray-900 mt-40 leading-tight mb-40 py-4">
        Welcome to the Blog
      </h1>
      <BlogList />
      <Footer />
    </div>
  );
}

export default Blog;