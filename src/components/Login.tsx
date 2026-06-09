import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, googleProvider } from "../config/firebase";
import { toast } from "react-toastify";
import { FirebaseError } from "firebase/app";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ======================
  // EMAIL LOGIN
  // ======================
  async function login(email: string, password: string) {
    try {
      setLoading(true);

      const userInfo = await signInWithEmailAndPassword(auth, email, password);
      const { user } = userInfo;

      const ref = doc(db, "ecommerceUsers", user.uid);
      const snap = await getDoc(ref);

      const role = snap.exists() ? snap.data()?.role : null;

      toast.success(`Welcome Back ${user.email}`);

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/user-not-found":
            toast.error("No account found with this email.");
            break;
          case "auth/wrong-password":
            toast.error("Incorrect password. Please try again.");
            break;
          case "auth/invalid-email":
            toast.error("Invalid email format.");
            break;
          default:
            toast.error("Login with google instead");
        }
      } else {
        toast.error("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }

  // ======================
  // GOOGLE LOGIN
  // ======================
  async function loginWithGoogle() {
    try {
      setLoading(true);

      const result = await signInWithPopup(auth, googleProvider);
      const { user } = result;

      const userRef = doc(db, "ecommerceUsers", user.uid);
      const snap = await getDoc(userRef);

      // create user doc if not exists
      if (!snap.exists()) {
        await setDoc(userRef, {
          email: user.email,
          fullName: user.displayName,
          photoURL: user.photoURL,
          role: "user",
          createdAt: serverTimestamp(),
        });
      }

      const role = snap.exists() ? snap.data()?.role : "user";

      toast.success(`Welcome ${user.email}`);

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Google login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>
          <p className="text-gray-500 mt-2">
            Login to continue shopping
          </p>
        </div>

        {/* FORM */}
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            login(email, password);
          }}
        >

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-black"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* FORGOT PASSWORD */}
          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-sm text-gray-600">
              Forgot Password?
            </Link>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        {/* DIVIDER */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-4 text-sm text-gray-500">or</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        {/* GOOGLE LOGIN */}
        <button
          type="button"
          onClick={loginWithGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 border border-gray-200 py-3 rounded-xl bg-white text-gray-800 font-medium hover:bg-gray-50 transition"
        >
          <FaGoogle className="text-black" />
          Continue with Google
        </button>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-black hover:underline">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;