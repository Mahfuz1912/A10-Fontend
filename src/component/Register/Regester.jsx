import React, { useContext, useState } from "react";
import { authContext } from "../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { auth } from "../fireBase/FireBaseConfig";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaImage,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaCheck,
  FaTimes,
  FaGoogle,
  FaGamepad,
} from "react-icons/fa";

const Register = () => {
  const { handleRegister, updateUserProfile, handleLoginWithGoogle } =
    useContext(authContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [agreeToTerms, setAgreeToTerms] = useState(false); // New state for checkbox
  const navigate = useNavigate();

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
    return strength;
  };

  const handlePasswordChange = (e) => {
    checkPasswordStrength(e.target.value);
  };

  const getStrengthColor = (strength) => {
    if (strength <= 2) return "bg-red-500";
    if (strength === 3) return "bg-yellow-500";
    if (strength === 4) return "bg-blue-500";
    return "bg-green-500";
  };

  const getStrengthText = (strength) => {
    if (strength <= 2) return "Weak";
    if (strength === 3) return "Fair";
    if (strength === 4) return "Good";
    return "Strong";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const retypePassword = e.target.retypePassword.value;
    const imgUrl = e.target.imgUrl.value;

    // Validation
    if (password.length < 6) {
      setIsLoading(false);
      return toast.warn("Password should be at least 6 characters");
    }
    if (password !== retypePassword) {
      setIsLoading(false);
      return toast.warn("Password did not match");
    }
    if (passwordStrength < 3) {
      setIsLoading(false);
      return toast.warn("Please use a stronger password");
    }
    if (!agreeToTerms) {
      setIsLoading(false);
      return toast.warn("You must agree to the terms and conditions");
    }

    try {
      const userCredential = await handleRegister(email, password);

      // Update user profile
      await updateUserProfile(name, imgUrl);

      // Sign out so they can log in
      await auth.signOut();

      toast.success("🎉 Account created successfully! Please login.");
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      let message = "Registration failed. Please try again.";

      switch (err.code) {
        case "auth/email-already-in-use":
          message = "This email is already registered. Please login instead.";
          break;
        case "auth/invalid-email":
          message = "Please enter a valid email address.";
          break;
        case "auth/weak-password":
          message = "Password is too weak. Please use a stronger password.";
          break;
        default:
          message = err.message || message;
      }

      toast.error(message);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setIsLoading(true);
    try {
      await handleLoginWithGoogle();
      toast.success("🎮 Welcome to GameReviews!");
      navigate("/");
    } catch (err) {
      console.error("Google registration error:", err);
      toast.error(err.message || "Failed to register with Google");
    } finally {
      setIsLoading(false);
    }
  };

  const passwordRequirements = [
    { text: "At least 6 characters", regex: /.{6,}/ },
    { text: "One uppercase letter", regex: /[A-Z]/ },
    { text: "One lowercase letter", regex: /[a-z]/ },
    { text: "One number", regex: /[0-9]/ },
  ];

  // Check if button should be disabled
  const isButtonDisabled = isLoading || !agreeToTerms;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Section - Info & Features */}
          <div className="px-6 lg:px-12 text-white">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-2 rounded-full mb-6">
                <FaGamepad className="text-amber-400" />
                <span className="text-sm font-medium text-amber-200">
                  Join the Gaming Community
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Create Your
                <span className="block bg-gradient-to-r from-amber-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Gaming Profile
                </span>
              </h1>

              <p className="text-lg text-slate-300 mb-8 max-w-xl">
                Join thousands of gamers sharing reviews, tracking their
                watchlists, and discovering new titles. Your gaming journey
                starts here.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-6">
              {[
                {
                  icon: "🎮",
                  title: "Share Game Reviews",
                  desc: "Rate and review your favorite games",
                },
                {
                  icon: "⭐",
                  title: "Track Your Watchlist",
                  desc: "Save games you want to play later",
                },
                {
                  icon: "👥",
                  title: "Join Community",
                  desc: "Connect with fellow gamers",
                },
                {
                  icon: "🏆",
                  title: "Earn Badges",
                  desc: "Unlock achievements as you participate",
                },
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="text-3xl">{feature.icon}</div>
                  <div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-slate-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-10 p-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl border border-purple-500/20">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">50K+</div>
                  <div className="text-sm text-slate-300">Gamers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">100K+</div>
                  <div className="text-sm text-slate-300">Reviews</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">10K+</div>
                  <div className="text-sm text-slate-300">Games</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Registration Form */}
          <div className="relative">
            {/* Floating Card Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-30 animate-pulse"></div>

            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 lg:p-10 shadow-2xl border border-purple-500/20">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex p-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl mb-4">
                  <FaShieldAlt className="text-2xl text-purple-400" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Create Account
                </h2>
                <p className="text-slate-400">Join our gaming community</p>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit}>
                <div className="space-y-5">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-4.5 text-slate-400">
                        <FaUser />
                      </div>
                      <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-4.5 text-slate-400">
                        <FaEnvelope />
                      </div>
                      <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-4.5 text-gray-400">
                        <FaLock />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Create a strong password"
                        className="w-full pl-10 pr-12 py-3.5 bg-slate-500/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                        required
                        onChange={handlePasswordChange}
                        disabled={isLoading}
                      />
                    </div>

                    {/* Password Strength Meter */}
                    {passwordStrength > 0 && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-slate-400">
                            Password strength
                          </span>
                          <span
                            className={`text-xs font-medium ${getStrengthColor(
                              passwordStrength
                            ).replace("bg-", "text-")}`}
                          >
                            {getStrengthText(passwordStrength)}
                          </span>
                        </div>
                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getStrengthColor(
                              passwordStrength
                            )} transition-all duration-300`}
                            style={{
                              width: `${(passwordStrength / 5) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Password Requirements */}
                    <div className="space-y-2 mt-3">
                      {passwordRequirements.map((req, idx) => {
                        const meetsRequirement = req.regex.test(
                          document?.getElementsByName("password")?.[0]?.value ||
                            ""
                        );
                        return (
                          <div key={idx} className="flex items-center gap-2">
                            {meetsRequirement ? (
                              <FaCheck className="text-green-500 text-xs" />
                            ) : (
                              <FaTimes className="text-red-500 text-xs" />
                            )}
                            <span
                              className={`text-xs ${
                                meetsRequirement
                                  ? "text-green-400"
                                  : "text-slate-400"
                              }`}
                            >
                              {req.text}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-4.5 text-gray-400">
                        <FaLock />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="retypePassword"
                        placeholder="Re-enter your password"
                        className="w-full pl-10 pr-12 py-3.5 bg-slate-500/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Profile Image URL */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                      Profile Image URL (Optional)
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-4.5 text-slate-400">
                        <FaImage />
                      </div>
                      <input
                        type="url"
                        name="imgUrl"
                        placeholder="https://example.com/avatar.jpg"
                        className="w-full pl-10 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                        disabled={isLoading}
                      />
                    </div>
                    <p className="text-xs text-slate-400">
                      Leave blank to use default avatar
                    </p>
                  </div>

                  {/* Error Display */}
                  {error && (
                    <div className="p-3 bg-red-900/30 border border-red-700/50 rounded-xl">
                      <p className="text-sm text-red-300">{error}</p>
                    </div>
                  )}

                  {/* Terms Agreement */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="terms"
                      name="terms"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="mt-1 w-4 h-4 text-purple-600 bg-slate-800 border-slate-600 rounded focus:ring-purple-500 focus:ring-offset-slate-900 cursor-pointer transition-all"
                      disabled={isLoading}
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm text-slate-300 cursor-pointer select-none"
                    >
                      I agree to the{" "}
                      <Link
                        to="/terms"
                        className="text-purple-400 hover:text-purple-300 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/privacy"
                        className="text-purple-400 hover:text-purple-300 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Privacy Policy
                      </Link>
                      <span className="text-red-400 ml-1">*</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isButtonDisabled}
                    className={`w-full py-3.5 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
                      isButtonDisabled
                        ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                        : "bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/25 hover:-translate-y-0.5 active:scale-95"
                    }`}
                    title={
                      !agreeToTerms
                        ? "You must agree to the terms and conditions"
                        : ""
                    }
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Creating Account...
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </button>

                  {/* Terms Required Message */}
                  {!agreeToTerms && (
                    <div className="text-xs text-amber-400 text-center mt-2 flex items-center justify-center gap-1">
                      <FaTimes className="text-xs" />
                      You must accept the terms and conditions to continue
                    </div>
                  )}
                </div>
              </form>

              {/* Login Link */}
              <div className="mt-8 pt-6 border-t border-slate-700 text-center">
                <p className="text-slate-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-purple-400 hover:text-purple-300 hover:underline transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
