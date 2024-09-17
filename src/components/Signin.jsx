import React, { useState } from "react";
import { Link } from "react-router-dom";

import { GoogleIcon, TwitterIcon } from "./CustomItems";
import ForgotPassword from "./Forgetpassword";
import RoleToggle from "./RoleToggle";

export default function Signin() {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(""); // Track which button is clicked

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
          Sign in
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={`w-full p-2 mt-1 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 ${
                emailError ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="your@email.com"
            />
            {emailError && (
              <p className="text-red-500 text-sm">{emailErrorMessage}</p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Password
              </label>
              <button
                type="button"
                onClick={handleClickOpen}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </button>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className={`w-full p-2 mt-1 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 ${
                passwordError ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="••••••"
            />
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordErrorMessage}</p>
            )}
          </div>

          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 text-sm text-gray-700 dark:text-gray-200"
            >
              Remember me
            </label>
          </div>

          <ForgotPassword open={open} handleClose={handleClose} />

          <button
            type="submit"
            onClick={validateInputs}
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>

          {/* Add Mentee and Mentor Buttons */}
          <RoleToggle onRoleChange={setSelectedRole} />
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </p>

        {/* Conditionally render social sign-in buttons */}
        {selectedRole !== "mentor" && (
          <div className="flex flex-col gap-2 mt-6">
            <button
              onClick={() => alert("Sign in with Google")}
              className="w-full p-2 text-white border rounded-md dark:bg-gray-700 dark:border-gray-600 flex items-center justify-center gap-2 hover:bg-black"
            >
              <GoogleIcon className="mr-4" /> {/* Increased space */}
              Sign in with Google
            </button>
            <button
              onClick={() => alert("Sign in with Twitter")}
              className="w-full p-2 text-white border rounded-md dark:bg-gray-700 dark:border-gray-600 flex items-center justify-center gap-2 hover:bg-black"
            >
              <TwitterIcon className="mr-4" /> {/* Increased space */}
              Sign in with Twitter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}