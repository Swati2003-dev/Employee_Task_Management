

import { useState } from "react";
import cat from "../../assets/AuthImage/bg-02.png";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, password, confirmPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      setSuccess("Account activated successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-blue-100 to-cyan-100 px-4 sm:px-6 md:px-10 lg:px-20 py-6">
      
      {/* Card */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Form Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10">
          <h2 className="text-xl sm:text-2xl font-bold mb-1">
            Create account
          </h2>
          <p className="text-gray-500 mb-6 text-sm sm:text-base">
            Enter your assigned ID and choose a password
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-lg border border-red-200">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 text-sm rounded-lg border border-green-200">
              {success}
            </div>
          )}

          {/* Inputs */}
          <form onSubmit={handleSignUp} className="space-y-5 sm:space-y-6">
            <input
              type="text"
              placeholder="Assigned User ID*"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              className="w-full border rounded-lg px-4 sm:px-5 py-3 sm:py-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            <input
              type="password"
              placeholder="Choose Password*"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border rounded-lg px-4 sm:px-5 py-3 sm:py-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            <input
              type="password"
              placeholder="Confirm Password*"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full border rounded-lg px-4 sm:px-5 py-3 sm:py-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            {/* Create Account Button */}
            <button 
              type="submit"
              disabled={loading}
              className={`w-full mt-6 py-3 rounded-lg bg-linear-to-r from-stone-500 to-purple-400 text-white font-semibold ${loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90 active:scale-95"} transition`}
            >
              {loading ? "Activating..." : "Create account"}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm mt-4">
            Already have an account?
            <Link to="/signin" className="text-purple-600 ml-1 hover:underline">
              Login
            </Link>
          </p>

          {/* Social Icons */}
          <div className="flex justify-center gap-4 mt-6">
            <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border rounded-full cursor-pointer">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
                alt="Google"
                className="w-5 h-5"
              />
            </div>
            <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border rounded-full cursor-pointer">f</div>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="w-full md:w-1/2 bg-[#f6ede4] flex items-center justify-center p-6">
          <img
            src={cat}
            alt="cat illustration"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md object-contain"
          />
        </div>

      </div>
    </div>
  );
};

export default SignUp;


