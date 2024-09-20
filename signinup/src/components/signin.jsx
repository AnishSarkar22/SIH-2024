import React, { useState } from "react";
import { Link } from "react-router-dom";

import { GoogleIcon, TwitterIcon } from "./CustomItems";
import ForgotPassword from "./Forgetpassword";
import RoleToggle from "./RoleToggle";

export default function SignIn() {
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
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Sign in</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={`w-full p-2 mt-1 border rounded-md ${
                emailError ? "border-red-500" : ""
              }`}
              placeholder="your@email.com"
            />
            {emailError && (
              <p className="text-red-500 text-sm">{emailErrorMessage}</p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <button
                type="button"
                onClick={handleClickOpen}
                className="text-sm text-indigo-600"
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
              className={`w-full p-2 mt-1 border rounded-md ${
                passwordError ? "border-red-500" : ""
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
              className="h-4 w-4 border rounded"
            />
            <label htmlFor="remember-me" className="ml-2 text-sm">
              Remember me
            </label>
          </div>

          <ForgotPassword open={open} handleClose={handleClose} />

          <button
            type="submit"
            onClick={validateInputs}
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
          >
            Sign in
          </button>

          {/* Add Mentee and Mentor Buttons */}
          <RoleToggle onRoleChange={setSelectedRole} />
        </form>

        <p className="text-center text-sm mt-4">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-indigo-600">
            Sign up
          </Link>
        </p>

        {/* Conditionally render social sign-in buttons */}
        {selectedRole !== "mentor" && (
          <div className="flex flex-col gap-2 mt-6">
            <button
              onClick={() => alert("Sign in with Google")}
              className="w-full p-2 text-white border rounded-md flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition duration-200"
            >
              <GoogleIcon className="mr-4" /> {/* Increased space */}
              Sign in with Google
            </button>
            <button
              onClick={() => alert("Sign in with Twitter")}
              className="w-full p-2 text-white border rounded-md flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition duration-200"
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
