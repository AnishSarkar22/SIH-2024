import * as React from "react";
import PropTypes from "prop-types";

function ForgotPassword({ open, handleClose }) {
  const handleSubmit = () => {
    handleClose();
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity duration-300 ${
        open ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Reset password
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Enter your account&apos;s email address, and we&apos;ll send you a
            link to reset your password.
          </p>
          <div className="mt-4">
            <input
              autoFocus
              required
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <div className="flex justify-end px-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-b-lg">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

ForgotPassword.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ForgotPassword;