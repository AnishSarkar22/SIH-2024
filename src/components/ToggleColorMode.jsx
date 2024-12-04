import * as React from "react";
import PropTypes from "prop-types";
import { MoonIcon } from "@heroicons/react/24/solid";

function ToggleColorMode({ toggleColorMode, ...props }) {
  return (
    <button
      onClick={toggleColorMode}
      className="p-2 text-gray-800"
      aria-label="Theme toggle button"
      {...props}
    >
      <MoonIcon className="h-6 w-6" />
    </button>
  );
}

ToggleColorMode.propTypes = {
  toggleColorMode: PropTypes.func.isRequired,
};

export default ToggleColorMode;