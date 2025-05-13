import React, { useState, useEffect } from "react";
import TemplateFrame from "./TemplateFrame";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  getAuth,
} from "firebase/auth";
import { auth } from "../services/firebase.js";

export default function SignUp() {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;

    try {
      // Check if email already exists
      const checkResponse = await fetch(
        "http://127.0.0.1:5000/api/check-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
          credentials: "include", // Include cookies in the request
        }
      );

      const checkData = await checkResponse.json();
      if (checkData.exists) {
        setEmailError(true);
        setEmailErrorMessage("An account with this email already exists.");
        return;
      }

      // Proceed with signup to basic details
      const response = await fetch("http://127.0.0.1:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
        credentials: "include", // Include cookies in the request
      });

      const data = await response.json();
      if (data.success) {
        setMessage(`Signup successful! User ID: ${data.user_id}`);
        navigate("/basic-details"); // Navigate to the basic-details page
      } else {
        setServerErrorMessage(`Signup failed: ${data.error}`);
      }
    } catch (error) {
      setServerErrorMessage(`Signup failed: ${error.message}`);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider).catch((error) => {
        // Handle specific Google Auth errors
        if (error.code === "auth/popup-closed-by-user") {
          throw new Error("Sign-up cancelled by user");
        }
        if (error.code === "auth/popup-blocked") {
          throw new Error("Popup was blocked by the browser");
        }
        throw error;
      });

      const { user } = result;

      // Send the Google ID token to the Flask API
      const response = await fetch("http://127.0.0.1:5000/api/google_signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_token: await user.getIdToken() }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.status === "success") {
        setMessage(`Google signup successful! User ID: ${data.user_id}`);
        navigate("/basic-details");
      } else {
        throw new Error(data.message || "Signup failed");
      }
    } catch (error) {
      // Log error for debugging
      console.error("Google signup error:", error);

      // Set user-friendly error message
      setServerErrorMessage(
        `Sign-up failed: ${
          error.message === "[object Object]"
            ? "Unknown error occurred"
            : error.message
        }`
      );
    }
  };

  // const handleTwitterSignup = async () => {
  //   try {
  //     const provider = new TwitterAuthProvider();
  //     const result = await signInWithPopup(auth, provider)
  //       .catch((error) => {
  //          Handle specific Twitter Auth errors
  //         if (error.code === 'auth/popup-closed-by-user') {
  //           throw new Error('Sign-up cancelled by user');
  //         }
  //         if (error.code === 'auth/popup-blocked') {
  //           throw new Error('Popup was blocked by the browser');
  //         }
  //         throw error;
  //       });

  //     const { user } = result;

  //      Send the Twitter ID token to the Flask API
  //     const response = await fetch("http://127.0.0.1:5000/api/twitter_signup", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ id_token: await user.getIdToken() }),
  //       credentials: "include",
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     if (data.status === "success") {
  //       setMessage(`Twitter signup successful! User ID: ${data.user_id}`);
  //       navigate("/basic-details");
  //     } else {
  //       throw new Error(data.message || 'Signup failed');
  //     }

  //   } catch (error) {

  //     console.error('Twitter signup error:', error);

  //     // Set user-friendly error message
  //     setServerErrorMessage(
  //       `Sign-up failed: ${
  //         error.message === '[object Object]'
  //           ? 'Unknown error occurred'
  //           : error.message
  //       }`
  //     );
  //   }
  // };

  const handleFacebookSignup = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider).catch((error) => {
        // Handle specific Facebook Auth errors
        if (error.code === "auth/popup-closed-by-user") {
          throw new Error("Sign-up cancelled by user");
        }
        if (error.code === "auth/popup-blocked") {
          throw new Error("Popup was blocked by the browser");
        }
        throw error;
      });

      const { user } = result;

      // Send the Facebook ID token to the Flask API
      const response = await fetch(
        "http://127.0.0.1:5000/api/facebook_signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_token: await user.getIdToken() }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.status === "success") {
        setMessage(`Facebook signup successful! User ID: ${data.user_id}`);
        navigate("/basic-details");
      } else {
        throw new Error(data.message || "Signup failed");
      }
    } catch (error) {
      // Log error for debugging
      console.error("Facebook signup error:", error);

      // Set user-friendly error message
      setServerErrorMessage(
        `Sign-up failed: ${
          error.message === "[object Object]"
            ? "Unknown error occurred"
            : error.message
        }`
      );
    }
  };

  return (
    <TemplateFrame>
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
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
              <a href="/login" className="text-indigo-600 hover:underline">
                Sign in
              </a>
            </p>
            <p className="text-center text-gray-600 mt-2">
              Interested in mentoring?{" "}
              <a
                href="/apply-mentor"
                className="text-indigo-600 hover:underline"
              >
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
              className="w-full p-2 text-black dark:text-white border rounded-md flex items-center justify-center gap-2 hover:bg-slate-100"
              onClick={handleGoogleSignup}
            >
              <FontAwesomeIcon
                icon={faGoogle}
                className="mr-1 text-black dark:text-white"
              />
              Sign up with Google
            </button>
            <button
              type="button"
              className="w-full p-2 text-black dark:text-white border rounded-md flex items-center justify-center gap-2 hover:bg-slate-100"
              onClick={handleFacebookSignup}
            >
              <FontAwesomeIcon
                icon={faFacebook}
                className="mr-1 text-black dark:text-white"
              />
              Sign up with Facebook
            </button>
          </div>
        </div>
      </div>
    </TemplateFrame>
  );
}
