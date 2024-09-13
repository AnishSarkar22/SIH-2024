import * as React from "react";
import PropTypes from "prop-types";

import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

function ToggleColorMode({ mode, toggleColorMode, ...props }) {
  return (
    <button
      onClick={toggleColorMode}
      className="p-2 text-gray-800 dark:text-gray-200"
      aria-label="Theme toggle button"
      {...props}
    >
      {mode === "dark" ? (
        <SunIcon className="h-6 w-6" />
      ) : (
        <MoonIcon className="h-6 w-6" />
      )}
    </button>
  );
}

ToggleColorMode.propTypes = {
  mode: PropTypes.oneOf(["dark", "light"]).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default ToggleColorMode;
