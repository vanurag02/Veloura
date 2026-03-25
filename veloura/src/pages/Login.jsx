import React, { useState, useEffect } from "react";

const Login = () => {
  /* =============== 1. STATE MANAGEMENT
     - mode → LOGIN / SIGNUP TOGGLE
     - formData → STORES ALL INPUT VALUES
     - error → STORES ERROR MESSAGE
     - loading → HANDLES SUBMIT STATE
  =============== */
  const [mode, setMode] = useState("login");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* =============== 2. HANDLE INPUT CHANGE - UPDATES FORM STATE DYNAMICALLY =============== */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =============== 3. RESET FORM ON MODE CHANGE - CLEARS INPUTS WHEN SWITCHING LOGIN / SIGNUP =============== */
  useEffect(() => {
    setFormData({
      name: "",
      email: "",
      password: "",
    });
    setError("");
  }, [mode]);

  /* =============== 4. BASIC VALIDATION
     - CHECKS EMAIL FORMAT
     - CHECKS PASSWORD LENGTH
     - CHECKS NAME (FOR SIGNUP)
  =============== */
  const validateForm = () => {
    const { name, email, password } = formData;

    if (!email.includes("@")) {
      return "Enter a valid email";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }

    if (mode === "signup" && name.trim() === "") {
      return "Name is required";
    }

    return "";
  };

  /* =============== 5. HANDLE SUBMIT
     - PREVENT DEFAULT FORM SUBMIT
     - VALIDATE INPUTS
     - SIMULATE AUTH (FAKE DELAY)
  =============== */
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);

    // FAKE API DELAY
    setTimeout(() => {
      // SIMPLE FAKE LOGIN LOGIC
      if (formData.email.includes("test")) {
        alert(`${mode === "login" ? "Login" : "Signup"} successful`);
      } else {
        setError("Invalid credentials");
      }

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-white">
      <div className="w-full max-w-md border border-gray-300 p-10">
        {/* =============== 6. BRAND TITLE =============== */}
        <p className="text-center text-[18px] font-medium uppercase text-gray-800 mb-8">
          Welcome to Veloura
        </p>

        {/* =============== 7. MODE TOGGLE (LOGIN / SIGNUP) =============== */}
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

        {/* =============== 8. FORM =============== */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* -------- NAME (SIGNUP ONLY) -------- */}
          {mode === "signup" && (
            <div>
              <label className="block text-[14px] font-medium text-gray-800 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full border border-gray-300 focus:border-gray-900 px-4 py-3 text-sm outline-none transition-colors duration-200"
              />
            </div>
          )}

          {/* -------- EMAIL -------- */}
          <div>
            <label className="block text-[14px] font-medium text-gray-800 mb-1.5">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full border border-gray-300 focus:border-gray-900 px-4 py-3 text-sm outline-none transition-colors duration-200"
            />
          </div>

          {/* -------- PASSWORD -------- */}
          <div>
            <label className="block text-[14px] font-medium text-gray-800 mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-gray-300 focus:border-gray-900 px-4 py-3 text-sm outline-none transition-colors duration-200"
            />
          </div>

          {/* -------- ERROR MESSAGE -------- */}
          {error && <p className="text-red-500 text-sm -mt-2">{error}</p>}

          {/* -------- FORGOT PASSWORD (LOGIN ONLY) -------- */}
          {mode === "login" && (
            <p className="text-[12px] text-gray-600 underline cursor-pointer text-right">
              Forgot password?
            </p>
          )}

          {/* -------- SUBMIT BUTTON -------- */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-950 text-white hover:bg-black text-[12px] font-medium tracking-[0.14em] uppercase py-3.5 transition-all duration-200 mt-1 disabled:opacity-50"
          >
            {loading
              ? "Processing..."
              : mode === "login"
                ? "Login"
                : "Create Account"}
          </button>
        </form>

        {/* =============== 9. FOOTER TOGGLE TEXT =============== */}
        <p className="text-center text-sm text-gray-400 mt-6">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <span
                onClick={() => setMode("signup")}
                className="text-gray-900 underline cursor-pointer"
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setMode("login")}
                className="text-gray-900 underline cursor-pointer"
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

/* =========================================================
   COMPONENT SUMMARY

   1. THIS COMPONENT HANDLES LOGIN + SIGNUP UI.

   2. STATE USED:
      - mode → SWITCH BETWEEN LOGIN / SIGNUP
      - formData → STORES INPUT VALUES
      - error → SHOWS VALIDATION / AUTH ERRORS
      - loading → DISABLES BUTTON DURING SUBMIT

   3. LOGIC IMPLEMENTED:
      - CONTROLLED INPUTS USING SINGLE STATE OBJECT
      - FORM RESET ON MODE CHANGE
      - BASIC INPUT VALIDATION
      - FAKE AUTHENTICATION USING setTimeout
      - CONDITIONAL RENDERING (NAME FIELD, FORGOT PASSWORD)

   4. USER EXPERIENCE:
      - ERROR MESSAGE DISPLAY
      - LOADING STATE FEEDBACK
      - DISABLED BUTTON DURING PROCESS

========================================================= */
