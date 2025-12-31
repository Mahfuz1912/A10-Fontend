import { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { authContext } from "../AuthProvider/AuthProvider";
import {
  FaEnvelope,
  FaLock,
  FaShieldAlt,
  FaRocket,
  FaUserCheck,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

const Login = () => {
  const { handelLoginWithGoogle, handelLogin } = useContext(authContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginMethod("email");

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await handelLogin(email, password);
      await Swal.fire({
        title: "Success!",
        text: "Logged in successfully!",
        icon: "success",
        confirmButtonColor: "#8b5cf6",
        timer: 1500,
        timerProgressBar: true,
      });
      navigate(location.state?.from || "/");
    } catch (err) {
      console.error("Login error:", err);

      let errorMessage = "Failed to login. Please try again.";
      switch (err.code) {
        case "auth/user-not-found":
          errorMessage = "No account found with this email.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password. Please try again.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email format.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many failed attempts. Please try again later.";
          break;
        default:
          errorMessage = err.message || errorMessage;
      }

      Swal.fire({
        title: "Login Failed",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setLoginMethod("google");

    try {
      await handelLoginWithGoogle();
      await Swal.fire({
        title: "Welcome!",
        text: "Logged in with Google successfully!",
        icon: "success",
        confirmButtonColor: "#8b5cf6",
        timer: 1500,
        timerProgressBar: true,
      });
      navigate(location.state?.from || "/");
    } catch (err) {
      console.error("Google login error:", err);

      let errorMessage = "Failed to login with Google.";
      if (err.code === "auth/popup-closed-by-user") {
        errorMessage = "Login popup was closed. Please try again.";
      }

      Swal.fire({
        title: "Google Login Failed",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: <FaShieldAlt className="text-2xl" />,
      title: "Secure Login",
      description: "Enterprise-grade security with encryption",
    },
    {
      icon: <FaRocket className="text-2xl" />,
      title: "Fast Access",
      description: "One-click social login options",
    },
    {
      icon: <FaUserCheck className="text-2xl" />,
      title: "Personalized",
      description: "Custom dashboard and preferences",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Section - Features & Info */}
          <div className="px-6 lg:px-12">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-linear-to-r from-purple-600/10 to-blue-600/10 px-4 py-2 rounded-full mb-6">
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-purple-700">
                  Game Reviews Community
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Welcome Back to{" "}
                <span className="bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  GameReviews
                </span>
              </h1>

              <p className="text-lg text-gray-600 mb-8 max-w-xl">
                Sign in to access your personalized dashboard, manage your game
                reviews, track your watchlist, and connect with fellow gamers in
                our community.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-gray-200/50 hover:border-purple-300 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="inline-flex p-3 bg-linear-to-r from-purple-500/10 to-blue-500/10 rounded-xl mb-3">
                    <div className="text-purple-600">{feature.icon}</div>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="bg-linear-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100">
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-600">Active Gamers</div>
                </div>
                <div className="h-12 w-px bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">50K+</div>
                  <div className="text-sm text-gray-600">Game Reviews</div>
                </div>
                <div className="h-12 w-px bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">100+</div>
                  <div className="text-sm text-gray-600">Games Rated</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Login Form */}
          <div className="relative">
            {/* Floating Card Effect */}
            <div className="absolute -inset-1 bg-linear-to-r from-purple-600 to-blue-600 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>

            <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-8 lg:p-10 shadow-2xl border border-gray-100">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Sign In
                </h2>
                <p className="text-gray-600">Access your account to continue</p>
              </div>

              {/* Google Login Button */}
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 mb-6 shadow-sm hover:shadow"
              >
                {isLoading && loginMethod === "google" ? (
                  <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <FcGoogle />
                )}
                {isLoading && loginMethod === "google"
                  ? "Connecting..."
                  : "Continue with Google"}
              </button>

              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="px-4 text-gray-500 text-sm font-medium">
                  Or continue with email
                </span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit}>
                <div className="space-y-5">
                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-4.5 text-gray-400">
                        <FaEnvelope />
                      </div>
                      <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <NavLink
                        to="/forgot-password"
                        className="text-sm text-purple-600 hover:text-purple-800 hover:underline transition-colors"
                      >
                        Forgot password?
                      </NavLink>
                    </div>
                    <div className="relative">
                      <div className="absolute left-3 top-4.5 text-gray-400">
                        <FaLock />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        className="w-full pl-10 pr-12 py-3.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Remember Me Checkbox */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      name="remember"
                      className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                      disabled={isLoading}
                    />
                    <label
                      htmlFor="remember"
                      className="ml-2 text-sm text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3.5 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
                      isLoading
                        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                        : "bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {isLoading && loginMethod === "email" ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Signing In...
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </div>
              </form>

              {/* Sign Up Link */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <NavLink
                    to="/register"
                    className="font-semibold text-purple-600 hover:text-purple-800 hover:underline transition-colors"
                  >
                    Create an account
                  </NavLink>
                </p>
              </div>

              {/* Security Note */}
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-xs text-gray-600 text-center">
                  🔒 Your login is secured with end-to-end encryption. We never
                  share your data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
