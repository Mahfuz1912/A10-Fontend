import { useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { authContext } from "../AuthProvider/AuthProvider";

const Login = () => {
  const { handelLoginWithGoogle, handelLogin } = useContext(authContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handelLoginF = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    handelLogin(email, password)
      .then((res) => {
        navigate(location.state?.from || "/");
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handelLoginWithGoogleTo = () => {
    handelLoginWithGoogle()
      .then((res) => {
        navigate(location.state?.from || "/");
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-gray-100 flex items-center p-6">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left promotional text */}
        <div className="px-6 lg:px-12">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Secure, Simple Authentication
          </h1>
          <p className="text-gray-600 mb-6 max-w-xl">
            Sign in to access your dashboard, manage your profile, and use
            exclusive features. We keep your account safe with best-practice
            security and seamless social sign-in options.
          </p>

          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="inline-block mt-1 w-3 h-3 rounded-full bg-blue-600"></span>
              <span>Fast login with email and Google</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-block mt-1 w-3 h-3 rounded-full bg-blue-600"></span>
              <span>Keep your profile secure</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-block mt-1 w-3 h-3 rounded-full bg-blue-600"></span>
              <span>Simple account management</span>
            </li>
          </ul>
        </div>

        {/* Right login card (kept original content & logic) */}
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md mx-auto border border-gray-200">
          {/* Title */}
          <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
            Welcome Back
          </h2>
          {/* Login Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handelLoginWithGoogleTo}
              className="btn w-full bg-white border-gray-300 hover:bg-gray-100 text-black flex items-center gap-2"
            >
              <svg
                aria-label="Google logo"
                width="18"
                height="18"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
          </div>
          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          {/* Login Form */}
          <form onSubmit={handelLoginF}>
            <fieldset className="space-y-3">
              <label className="label-text font-medium">Email</label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
                name="email"
              />

              <label className="label-text font-medium">Password</label>
              <input
                type="password"
                className="input input-bordered w-full"
                placeholder="Enter your password"
                name="password"
              />

              <button className="btn btn-primary w-full mt-4">Login</button>
            </fieldset>
          </form>

          {/* Bottom Link */}
          <p className="text-center text-gray-500 text-sm mt-4">
            Don’t have an account?{" "}
            <NavLink
              to="/register"
              className="text-blue-600 font-semibold underline"
            >
              <span className="text-blue-600 font-medium cursor-pointer hover:underline">
                Register Now
              </span>
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
