import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaXTwitter, FaGoogle } from "react-icons/fa6";
import RoleToggle from "./RoleToggle";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("mentee");
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
        const response = await fetch('http://127.0.0.1:5000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            role: selectedRole
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // localStorage.setItem('idToken', data.id_token);
          // localStorage.setItem('role', data.role);

          const destination = location.state?.from || 
            (data.role === 'mentee' ? '/dashboard' : '/mentor-dashboard');
          navigate(destination, { replace: true });
        } else {
          alert('Log in failed: ' + data.error);
        }
      } catch (error) {
        console.error('Sign in error:', error);
        alert('Log in failed. Please check your credentials and try again.');
      }
    }
  };

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
              onClick={() => alert("Log in with Google")}
              className="w-full p-2 text-black border rounded-md dark:bg-gray-700 dark:border-gray-600 flex items-center justify-center gap-2 hover:bg-slate-100"
            >
              <FaGoogle className="mr-1"/>
              Log in with Google
            </button>
            <button
              onClick={() => alert("Log in with Twitter")}
              className="w-full p-2 text-black border rounded-md dark:bg-gray-700 dark:border-gray-600 flex items-center justify-center gap-2 hover:bg-slate-100"
            >
              <FaXTwitter className="mr-1"/>
              Log in with X
            </button>
          </div>
        )}
      </div>
    </div>
  );
}