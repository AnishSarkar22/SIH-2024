import React from "react";
import Navbar from "./HNavbar"; // Assuming this is the Navbar component
import BlogList from "./blogcard"; // Import the BlogList component
import Footer from "./Footer"; // Assuming this is the Footer component

function Blog() {
  return (
    <div>
      <Navbar />
      <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mt-20 sm:mt-32 lg:mt-40 mb-20 sm:mb-32 lg:mb-40 leading-tight py-2 sm:py-3 lg:py-4">
        Welcome to the Blog
      </h1>
      <BlogList />
      <Footer />
    </div>
  );
}

export default Blog;