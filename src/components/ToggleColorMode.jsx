import * as React from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faChevronLeft,
  faChevronRight,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";

function ToggleColorMode({ toggleColorMode, ...props }) {
  return (
    <button
      onClick={toggleColorMode}
      className="p-2 text-gray-800"
      aria-label="Theme toggle button"
      {...props}
    >
      <FontAwesomeIcon icon={faMoon} className="h-6 w-6" />
    </button>
  );
}

ToggleColorMode.propTypes = {
  toggleColorMode: PropTypes.func.isRequired,
};

export default ToggleColorMode;