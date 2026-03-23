import React, { useState } from "react";

const Login = () => {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up to your auth logic
    console.log({ mode, name, email, password });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-white">
      <div className="w-full max-w-md border border-gray-300 p-10">
        {/* Brand */}
        <p className="text-center text-[18px] font-medium uppercase text-gray-800 mb-8">
          Welcome to Veloura
        </p>

        {/* Toggle */}
        <div className="flex border border-gray-300 mb-8">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2.5 text-[14px] font-medium tracking-wider uppercase transition-all duration-200 ${
              mode === "login"
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 py-2.5 text-[14px] font-medium tracking-wider uppercase transition-all duration-200 ${
              mode === "signup"
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Name — sign up only */}
          {mode === "signup" && (
            <div>
              <label className="block text-[14px] font-medium text-gray-800 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                className="w-full border border-gray-200 focus:border-gray-900 px-4 py-3 text-sm outline-none transition-colors duration-200 placeholder-gray-300"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-[14px] font-medium text-gray-800 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full border border-gray-300 focus:border-gray-900 px-4 py-3 text-sm outline-none transition-colors duration-200 placeholder-gray-300"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[14px] font-medium text-gray-800 mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full border border-gray-300 focus:border-gray-900 px-4 py-3 text-sm outline-none transition-colors duration-200 placeholder-gray-300"
            />
          </div>

          {/* Forgot password — login only */}
          {mode === "login" && (
            <p className="text-[12px] text-gray-600 underline underline-offset-4 cursor-pointer hover:text-gray-900 transition-colors -mt-2 text-right">
              Forgot password?
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gray-950 text-white hover:bg-black text-[12px] font-medium tracking-[0.14em] uppercase py-3.5 cursor-pointer transition-all ease-in-out duration-200 mt-1"
          >
            {mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-6">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <span
                onClick={() => setMode("signup")}
                className="text-gray-900 underline underline-offset-4 cursor-pointer hover:text-gray-500 transition-colors"
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setMode("login")}
                className="text-gray-900 underline underline-offset-4 cursor-pointer hover:text-gray-500 transition-colors"
              >
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
