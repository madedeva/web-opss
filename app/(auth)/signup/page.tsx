"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ArrowRightCircleIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    roleId: "",
  });

  type Role = {
    id: number;
    name: string;
  };

  const [roles, setRoles] = useState<Role[]>([]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null); // To store error messages

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("/api/roles");
        setRoles(response.data);
      } catch (error) {
        console.error("Failed to fetch roles", error);
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation
  const validatePassword = (password: string): string => {
    let errorMsg = "";
    if (password.length < 8) {
      errorMsg = "Password must be at least 8 characters long.";
    } else if (!/[0-9]/.test(password)) {
      errorMsg = "Password must contain at least 1 number.";
    } else if (!/[A-Z]/.test(password)) {
      errorMsg = "Password must contain at least 1 uppercase letter.";
    } else if (!/[a-z]/.test(password)) {
      errorMsg = "Password must contain at least 1 lowercase letter.";
    } else if (!/[!@#$%^&*]/.test(password)) {
      errorMsg = "Password must contain at least 1 special character.";
    }
    return errorMsg;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state

    // Validate email
    if (!validateEmail(form.email)) {
      setError("Invalid email format.");
      return;
    }

    // Validate password
    const passwordError = validatePassword(form.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      const response = await axios.post("/api/register", form);
      if (response.status === 201) {
        console.log("Registration successful", response.data);
        toast.success("Sign up successful!");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        // Email already in use
        setError("Email is already in use. Please use a different email.");
      } else {
        // General error handling
        console.error("Registration failed", error);
        setError("Sign up failed: " + error.message);
      }
    }
  };

  const filteredRoles = roles.filter((role) => [1, 2, 3].includes(role.id));

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-blue-950">
      <ToastContainer />
      <div className="lg:w-1/2 flex flex-col items-center justify-center bg-blue-950 text-white p-8">
        <h2 className="text-4xl font-bold mb-4 text-center">
          Simplify Your Conference Management with OPSS
        </h2>
        <p className="mb-8 text-center">
          Streamline submissions and enhance efficiency with the Online Paper
          Submission System (OPSS)
        </p>
      </div>
      <div className="lg:w-1/2 bg-blue-950 text-gray-900 flex items-center justify-center">
        <div className="m-auto w-full max-w-md p-8 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-semibold text-center text-orange-500">
            Create New Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            {error && (
                <div className="flex items-center justify-center py-2 px-4 bg-red-50 border border-red-300 text-red-600 rounded-md shadow-md hover:bg-red-100 hover:border-red-400 transition-colors duration-300 ease-in-out">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.257 3.099c.765-1.36 2.677-1.36 3.442 0l7.156 12.73c.747 1.329-.193 2.993-1.721 2.993H2.822c-1.528 0-2.468-1.664-1.721-2.993L8.257 3.1zM11 10v4m0 4h.01"
                    />
                  </svg>
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}
            <div className="relative">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name <span className="text-red-600">*</span>
              </label>
              <div className="mt-1 flex items-center border border-orange-400 rounded-md shadow-sm">
                <UserIcon className="w-5 h-5 text-gray-400 ml-3" aria-hidden="true" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-none text-sm bg-white rounded-md focus:outline-none focus:ring-0"
                  placeholder="Full name"
                  required
                />
              </div>
            </div>
            <div className="relative">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email <span className="text-red-600">*</span>
              </label>
              <div className="mt-1 flex items-center border border-orange-400 rounded-md shadow-sm">
                <EnvelopeIcon className="w-5 h-5 text-gray-400 ml-3" aria-hidden="true" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full text-sm px-3 py-2 border-none bg-white rounded-md focus:outline-none focus:ring-0"
                  placeholder="Email"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password <span className="text-red-600">*</span>
              </label>
              <div className="mt-1 relative">
                <LockClosedIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  className="block w-full text-sm pl-10 py-2 border border-orange-400 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  <EyeIcon
                    className={`h-5 w-5 text-gray-400 ${
                      passwordVisible ? "text-gray-600" : "text-gray-400"
                    }`}
                  />
                </button>
              </div>
            </div>
            <div>
              <label
                htmlFor="roleId"
                className="block text-sm font-medium text-gray-700"
              >
                Select Role <span className="text-red-600">*</span>
              </label>
              <select
                id="roleId"
                name="roleId"
                value={form.roleId}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-orange-400 rounded-md bg-white shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                required
              >
                <option value="" className="disable">
                  select role..
                </option>
                {filteredRoles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 flex items-center justify-center"
              >
                <ArrowRightCircleIcon
                  className="w-5 h-5 text-white mr-2"
                  aria-hidden="true"
                />
                Create Account
              </button>
            </div>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/signin" className="text-orange-500 hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
