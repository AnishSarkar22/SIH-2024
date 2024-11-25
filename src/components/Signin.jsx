import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import RoleToggle from "./RoleToggle";
import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  getAuth,
} from "firebase/auth";
import { auth } from "./services/firebase";

export default function Signin() {
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("mentee");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validateInputs = () => {
    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateInputs()) {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            role: selectedRole,
          }),
          credentials: "include",
        });

        const data = await response.json();

        if (response.ok && data.success) {
          localStorage.setItem(
            "userData",
            JSON.stringify({
              name: data.name,
              email: data.email,
              role: data.role,
              userId: data.firebase_user_id,
            })
          );

          localStorage.setItem("userId", data.firebase_user_id); // Add these specific items
          localStorage.setItem("userType", data.role); // Add these specific items

          const destination =
            location.state?.from ||
            (data.role === "mentee" ? "/dashboard" : "/mentor-dashboard");
          navigate(destination, { replace: true });
        } else {
          setServerErrorMessage(data.error || "Login failed");
        }
      } catch (error) {
        console.error("Sign in error:", error);
        setServerErrorMessage("Login failed. Please try again.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider).catch((error) => {
        // Handle specific Google Auth errors
        if (error.code === "auth/popup-closed-by-user") {
          throw new Error("Login cancelled by user");
        }
        if (error.code === "auth/popup-blocked") {
          throw new Error("Popup was blocked by the browser");
        }
        throw error;
      });

      const { user } = result;

      // Send the Google ID token to the Flask API
      const response = await fetch("http://127.0.0.1:5000/api/google_login", {
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
        localStorage.setItem("userId", data.firebase_user_id);
        localStorage.setItem("userType", data.role);
        setMessage(`Google login successful! Welcome back!`);
        navigate("/dashboard"); // Or your desired redirect path
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      // Log error for debugging
      console.error("Google login error:", error);

      // Set user-friendly error message
      setServerErrorMessage(
        `Login failed: ${
          error.message === "[object Object]"
            ? "Unknown error occurred"
            : error.message
        }`
      );
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider).catch((error) => {
        // Handle specific Facebook Auth errors
        if (error.code === "auth/popup-closed-by-user") {
          throw new Error("Login cancelled by user");
        }
        if (error.code === "auth/popup-blocked") {
          throw new Error("Popup was blocked by the browser");
        }
        throw error;
      });

      const { user } = result;

      // Send the Facebook ID token to the Flask API
      const response = await fetch("http://127.0.0.1:5000/api/facebook_login", {
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
        localStorage.setItem("userId", data.firebase_user_id);
        localStorage.setItem("userType", data.role);
        setMessage(`Facebook login successful! Welcome back!`);
        navigate("/dashboard"); // Or your desired redirect path
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      // Log error for debugging
      console.error("Facebook login error:", error);

      // Set user-friendly error message
      setServerErrorMessage(
        `Login failed: ${
          error.message === "[object Object]"
            ? "Unknown error occurred"
            : error.message
        }`
      );
    }
  };

  // const checkAuthentication = async () => {
  //   try {
  //     const response = await fetch('http://127.0.0.1:5000/api/protected', {
  //       method: 'GET',
  //       credentials: 'include',  // Include cookies in the request
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       const destination = location.state?.from ||
  //         (data.role === 'mentee' ? '/dashboard' : '/mentor-dashboard');
  //       navigate(destination, { replace: true });
  //     }
  //   } catch (error) {
  //     console.error('Authentication check error:', error);
  //   }
  // };

  // useEffect(() => {
  //   checkAuthentication();
  // }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
          Log in
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
              className={`w-full p-2 mt-1 border text-black rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 ${
                emailError ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          <RoleToggle onRoleChange={setSelectedRole} />

          {/* Add error message here */}
          {serverErrorMessage && (
            <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {serverErrorMessage}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Log in
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </p>

        {selectedRole === "mentee" && (
          <div className="flex flex-col gap-2 mt-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full p-2 text-black border rounded-md dark:bg-gray-700 dark:border-gray-600 flex items-center justify-center gap-2 hover:bg-slate-100"
            >
              <FontAwesomeIcon icon={faGoogle} className="mr-1" />
              Log in with Google
            </button>
            <button
              onClick={handleFacebookLogin}
              className="w-full p-2 text-black border rounded-md dark:bg-gray-700 dark:border-gray-600 flex items-center justify-center gap-2 hover:bg-slate-100"
            >
              <FontAwesomeIcon icon={faFacebook} className="mr-1"/>
              Log in with Facebook
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
