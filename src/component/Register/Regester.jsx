import React, { useContext, useState } from "react";
import { authContext } from "../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { auth } from "../fireBase/FireBaseConfig";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { handleRegister, updateUserProfile } = useContext(authContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const passwords = e.target.password.value;
    const retypePassword = e.target.retypePassword.value;
    const imgUrl = e.target.imgUrl.value;

    setError(null);

    if (passwords.length < 6) {
      return toast.warn("Password should be at least 6 characters");
    }
    if (passwords !== retypePassword) {
      return toast.warn("Password did not match");
    }
    if (
      !/[A-Z]/.test(passwords) ||
      !/[a-z]/.test(passwords) ||
      !/[0-9]/.test(passwords)
    ) {
      return setError("Password must contain uppercase, lowercase and number.");
    }

    try {
      const userCredential = await handleRegister(email, passwords);
      // Ensure profile update happens for the newly created user
      await updateUserProfile(name, imgUrl);
      // Sign out the user after profile update so they can log in
      await auth.signOut();
      toast.success("Account Created! Please Login");
      navigate("/login");
    } catch (err) {
      // Show a clear toast and set local error state for UI
      console.error("Registration error:", err);
      const message = err?.message || "Registration failed";
      toast.error(message);
      setError(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Create your account
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Welcome — join us and get started
          </p>
        </div>

        <form onSubmit={handelSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 p-2"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 p-2"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 p-2"
              placeholder="Create a strong password"
            />
            <p className="text-xs text-gray-500 mt-1">
              Use at least 6 characters, including uppercase, lowercase and a
              number.
            </p>
          </div>

          <div>
            <label
              htmlFor="retypePassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm password
            </label>
            <input
              id="retypePassword"
              name="retypePassword"
              type="password"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 p-2"
              placeholder="Re-type your password"
            />
          </div>

          <div>
            <label
              htmlFor="imgUrl"
              className="block text-sm font-medium text-gray-700"
            >
              Profile image URL
            </label>
            <input
              id="imgUrl"
              name="imgUrl"
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 p-2"
              placeholder="https://example.com/avatar.jpg"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div>
            <button type="submit" className="btn btn-primary w-full">
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
