import React from "react";
import PropTypes from "prop-types";
import { ArrowBackRounded as ArrowBackRoundedIcon } from "@mui/icons-material";
import ToggleColorMode from "./ToggleColorMode";
import { Button, Card, TextField, Checkbox, Link } from "./getSignUpTheme";

function TemplateFrame({
  showCustomTheme,
  toggleCustomTheme,
  mode,
  toggleColorMode,
  children,
}) {
  const handleChange = (event) => {
    toggleCustomTheme(event.target.value === "custom");
  };

  return (
    <div
      className={`flex flex-col h-screen ${
        mode === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-white dark:bg-gray-800">
        <a
          href="/material-ui/getting-started/templates/"
          className="flex items-center text-sm text-gray-700 dark:text-gray-300"
        >
          <ArrowBackRoundedIcon className="w-6 h-6" />
          <span className="ml-2 hidden sm:inline">Back to templates</span>
        </a>
        <div className="flex items-center gap-2">
          <select
            id="theme-select"
            value={showCustomTheme ? "custom" : "material"}
            onChange={handleChange}
            className="border rounded-md p-2 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="custom">Custom Theme</option>
            <option value="material">Material Design 2</option>
          </select>
          <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
        </div>
      </header> */}
      <main className="flex-1 overflow-auto p-4">{children}</main>
    </div>
  );
}

TemplateFrame.propTypes = {
  children: PropTypes.node,
  mode: PropTypes.oneOf(["dark", "light"]).isRequired,
  showCustomTheme: PropTypes.bool.isRequired,
  toggleColorMode: PropTypes.func.isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

export default TemplateFrame;