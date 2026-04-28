
import { useState } from "react";
import flower from "../../assets/AuthImage/bg-01.png";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token and role in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // Redirect based on role
      navigate(data.redirect);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-blue-100 to-cyan-100 px-4 sm:px-6 md:px-10 lg:px-20 py-6">
      
      {/* Card */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl flex overflow-hidden flex-col md:flex-row">
        
        {/* Left Form Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10">
          <h2 className="text-xl sm:text-2xl font-bold mb-1">
            Sign in
          </h2>
          <p className="text-gray-500 mb-6 text-sm sm:text-base">
            Enter your credentials to log in
          </p>

          {/* Development Info (Optional: remove in production) */}
          <div className="mb-4 p-2 bg-blue-50 text-blue-700 text-xs rounded border border-blue-100">
            <strong>Note:</strong> Real authentication is now active. Use your registered credentials.
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-lg border border-red-200">
              {error}
            </div>
          )}

          {/* Inputs */}
          <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
            <input
              type="text"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              className="w-full border rounded-lg px-4 sm:px-5 py-3 sm:py-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border rounded-lg px-4 sm:px-5 py-3 sm:py-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Remember / Forgot */}
            <div className="flex flex-wrap justify-between items-center mt-4 text-sm gap-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#" className="text-gray-700 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button 
              type="submit"
              disabled={loading}
              className={`w-full mt-4 sm:mt-6 py-3 rounded-lg bg-linear-to-r from-yellow-700 to-purple-800 text-white font-semibold ${loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90 active:scale-[0.98]"} transition`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Signup */}
          <p className="text-center text-sm mt-4">
            Don’t have an account?
            <Link to="/signup" className="text-purple-600 ml-1 hover:underline">
              Sign up
            </Link>
          </p>

          {/* Social Icons (Visual only) */}
          <div className="flex justify-center gap-4 mt-6">
            <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border rounded-full cursor-pointer">G</div>
            <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border rounded-full cursor-pointer">f</div>
            <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border rounded-full cursor-pointer"></div>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-6">
          <img
            src={flower}
            alt="Flower picture"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
