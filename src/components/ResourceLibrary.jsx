import React from 'react';
import { Search, BookOpen, Download, Heart, Settings, HelpCircle, LogOut } from 'lucide-react';

const ResourceLibrary = () => {
  const recommendedBooks = [
    { title: "The Psychology of Money", author: "Morgan Housel", cover: "/api/placeholder/150/200" },
    { title: "Company of One", author: "Paul Jarvis", cover: "/api/placeholder/150/200" },
    { title: "How Innovation Works", author: "Matt Ridley", cover: "/api/placeholder/150/200" },
    { title: "The Picture of Dorian Gray", author: "Oscar Wilde", cover: "/api/placeholder/150/200" },
  ];

  const categories = [
    { name: "Money/Investing", cover: "/api/placeholder/100/150" },
    { name: "Design", cover: "/api/placeholder/100/150" },
    { name: "Business", cover: "/api/placeholder/100/150" },
    { name: "Self Improvement", cover: "/api/placeholder/100/150" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white p-6 space-y-6">
        <div className="flex items-center space-x-2 text-orange-500">
          <BookOpen size={24} />
          <span className="text-xl font-semibold">Discover</span>
        </div>
        <nav className="space-y-4">
          {[
            { icon: <BookOpen size={20} />, label: "Category" },
            { icon: <BookOpen size={20} />, label: "My Library" },
            { icon: <Download size={20} />, label: "Download" },
            { icon: <Heart size={20} />, label: "Favorite" },
            { icon: <Settings size={20} />, label: "Setting" },
            { icon: <HelpCircle size={20} />, label: "Help" },
            { icon: <LogOut size={20} />, label: "Log out" },
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Search bar */}
        <div className="mb-8">
          <div className="flex">
            <select className="px-4 py-2 border border-gray-300 rounded-l-md bg-white">
              <option>All Categories</option>
            </select>
            <input
              type="text"
              placeholder="find the book you like..."
              className="flex-1 px-4 py-2 border-t border-b border-gray-300"
            />
            <button className="px-4 py-2 bg-green-700 text-white rounded-r-md">
              Search
            </button>
          </div>
        </div>

        {/* Book Recommendation */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Book Recemendation</h2>
            <a href="#" className="text-blue-500">View all &gt;</a>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {recommendedBooks.map((book, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <img src={book.cover} alt={book.title} className="w-full h-48 object-cover mb-2" />
                <h3 className="font-semibold">{book.title}</h3>
                <p className="text-sm text-gray-600">{book.author}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Book Category */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Book Category</h2>
          <div className="grid grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <img src={category.cover} alt={category.name} className="w-full h-32 object-cover mb-2" />
                <p className="text-center font-semibold">{category.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceLibrary;