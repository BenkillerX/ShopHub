import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, googleProvider } from "../config/firebase";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  async function signUp(email: string, password:string) {
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    try {
      setLoading(true)
   const userInfo = await createUserWithEmailAndPassword(auth, email, password);

      const {user} = userInfo;
      await setDoc(doc(db, "ecommerceUsers", user.uid), {
        email:user.email,
        role:"user",
        createdAt:serverTimestamp()
      })
      toast.success("Account Created Sucessfully")
      navigate("/")
      setEmail("")
      setPassword("")
    }  catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("This email is already registered. Please log in instead.");
          break;
        case "auth/invalid-email":
          toast.error("Invalid email format.");
          break;
        case "auth/weak-password":
          toast.error("Password is too weak. Try a stronger one.");
          break;
        default:
          toast.error("Something went wrong: " + error.message);
      }
    } else {
      toast.error("Unexpected error occurred.");
    }
  } finally {
    setLoading(false);
  }
  }

 async function GoogleSignUp() {
  try {
    setLoading(true);

    const result = await signInWithPopup(auth, googleProvider);
    const { user } = result;

    await setDoc(doc(db, "ecommerceUsers", user.uid), {
      email: user.email,
      fullName: user.displayName,
      photoURL: user.photoURL,
      role: "user",
      createdAt: serverTimestamp(),
    });

    toast.success("Signed up with Google");
    navigate("/");
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("This email is already registered. Please log in instead.");
          break;
        case "auth/invalid-email":
          toast.error("Invalid email format.");
          break;
        case "auth/weak-password":
          toast.error("Password is too weak. Try a stronger one.");
          break;
        default:
          toast.error("Something went wrong: " + error.message);
      }
    } else {
      toast.error("Unexpected error occurred.");
    }
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Account
          </h1>
          <p className="text-gray-500 mt-2">
            Sign up to start shopping
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" 
        onSubmit={(e) => {
            e.preventDefault();
            signUp(email, password);
          }}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className={`w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition  ${
  loading ? "opacity-50 cursor-not-allowed" : ""
}`}
            disabled={loading}
          >
            {loading ? "Creating..." :"Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-4 text-sm text-gray-500">or</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        {/* Google Button */}
        <button
          type="button"
          className={`w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition font-medium text-gray-700  ${
  loading ? "opacity-50 cursor-not-allowed" : ""
}`}
          onClick={GoogleSignUp}
          disabled={loading}
        >
          <FaGoogle />
          {loading? "Creating" : "Continue with Google"}
        </button>

        {/* Footer */}

        <Link to="/login">
          <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <span className="font-medium text-black cursor-pointer hover:underline">
            Login
          </span>
        </p>
        </Link>
      </div>
    </div>
  );
};

export default Signup;