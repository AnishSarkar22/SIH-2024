import React, { useState, useEffect } from "react";
import { GoogleIcon, FacebookIcon, TwitterIcon } from "./CustomItems";
import TemplateFrame from "./TemplateFrame";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";

export default function SignUp() {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const name = document.getElementById("name");

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

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateInputs()) {
      const data = new FormData(event.currentTarget);
      const userData = {
        name: data.get("name"),
        email: data.get("email"),
        password: data.get("password"),
      };

      try {
        const response = await axios.post(
          "http://localhost:5000/api/signup",
          userData
        );
        if (response.data.success) {
          console.log("Signup successful", response.data);
          // Handle successful signup (e.g., redirect to login page or show success message)
          return <Link to="/basic-details" />;
        }
      } catch (error) {
        console.error("Signup failed", error.response?.data || error.message);
        if (error.response && error.response.status === 500) {
          setServerErrorMessage("An internal server error occurred. Please try again later.");
        } else {
          setServerErrorMessage("Signup failed. Please check your inputs and try again.");
        }
      }
    }
  };

  return (
    <TemplateFrame>
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Sign up
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="text-gray-700">
                Full name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Jon Snow"
                className={`w-full p-2 mt-1 border text-black rounded-md focus:ring-2 focus:ring-indigo-500 ${
                  nameError ? "border-red-500" : ""
                }`}
              />
              {nameError && (
                <p className="text-red-500 text-sm">{nameErrorMessage}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="your@email.com"
                className={`w-full p-2 mt-1 border text-black rounded-md focus:ring-2 focus:ring-indigo-500 ${
                  emailError ? "border-red-500" : ""
                }`}
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailErrorMessage}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="••••••"
                className={`w-full p-2 mt-1 border rounded-md text-black focus:ring-2 focus:ring-indigo-500 ${
                  passwordError ? "border-red-500" : ""
                }`}
              />
              {passwordError && (
                <p className="text-red-500 text-sm">{passwordErrorMessage}</p>
              )}
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="allowExtraEmails"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
              />
              <label htmlFor="allowExtraEmails" className="ml-2 text-gray-700">
                I want to receive updates via email.
              </label>
            </div>
            {serverErrorMessage && (
              <p className="text-red-500 text-sm">{serverErrorMessage}</p>
            )}
            <button
              type="submit"
              className="w-full p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Sign up
            </button>
            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <a href="./signin" className="text-indigo-600 hover:underline">
                Sign in
              </a>
            </p>
            <p className="text-center text-gray-600 mt-2">
              Interested in mentoring?{" "}
              <a href="#" className="text-indigo-600 hover:underline">
                Apply as a Mentor
              </a>
            </p>
          </form>
          <div className="flex items-center justify-between mt-4">
            <hr className="w-full border-gray-300" />
            <span className="p-2 text-gray-600">or</span>
            <hr className="w-full border-gray-300" />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <button
              type="button"
              className="w-full p-2 text-black border rounded-md flex items-center justify-center gap-2 hover:bg-slate-400"
              onClick={() => alert("Sign up with Google")}
            >
              <GoogleIcon />
              Sign up with Google
            </button>
            <button
              onClick={() => alert("Sign in with Twitter")}
              className="w-full p-2 text-black border rounded-md flex items-center justify-center gap-2 hover:bg-slate-400"
            >
              <TwitterIcon className="mr-4" />
              Sign in with Twitter
            </button>
          </div>
        </div>
      </div>
    </TemplateFrame>
  );
}