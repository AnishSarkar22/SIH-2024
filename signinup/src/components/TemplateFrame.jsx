import React from "react";
import PropTypes from "prop-types";

function TemplateFrame({ children }) {
  return (
    <div className="flex flex-col h-screen bg-gray-100 text-gray-900">
      <main className="flex-1 overflow-auto p-4">{children}</main>
    </div>
  );
}

TemplateFrame.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TemplateFrame;
