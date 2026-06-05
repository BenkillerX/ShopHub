import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import type { User } from "firebase/auth";
import { FaBox, FaChevronRight, FaHeart, FaQuestionCircle, FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";

const Accounts = () => {
  const [user, setUser] = useState<User | null>(null);
const navigate = useNavigate()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/")
  };

  function upcomingUpdate() {
    toast.info("Upcoming Update")
  }
  return (
    <div className="min-h-screen bg-gray-100 p-4 pb-20">

      {/* HEADER CARD */}
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
        {!user ? (
          <>
            <h1 className="text-xl font-bold">Welcome to DevBen Shop</h1>
            <p className="text-gray-500 text-sm mt-1">
              Premium shopping experience made simple
            </p>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold">
                {user.email?.charAt(0).toUpperCase()}
              </div>

              <div>
                <h1 className="text-lg font-bold">My Account</h1>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* NOT LOGGED IN */}
      {!user ? (
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-3">
          <Link
            to="/login"
            className="block bg-black text-white text-center py-3 rounded-xl font-medium"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="block border border-black text-center py-3 rounded-xl font-medium"
          >
            Create Account
          </Link>

          <div className="text-xs text-gray-500 text-center mt-2">
            Secure login powered by Firebase
          </div>
        </div>
      ) : (
        <>
          {/* ACCOUNT ACTIONS */}
          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">

            <h2 className="font-semibold text-gray-700">Account Settings</h2>

            <Link
              to="#"
              className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-100"
              onClick={upcomingUpdate}
            >
        <div className="flex items-center gap-3">
            <FaBox />
            My Orders
        </div>
               
            </Link>

            <Link
              to="/cart"
              className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-100"
            >
        <div className="flex items-center gap-3">
           <FaShoppingCart />
            My Cart
        </div>
                
                
            </Link>

            <Link
              to="#"
              className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-100"
              onClick={upcomingUpdate}
            >
            <div className="flex items-center gap-3">
            <FaHeart />
            Wishlist
            </div>
                
            </Link>
          </div>

          {/* SUPPORT SECTION */}
          <div className="bg-white rounded-2xl p-4 shadow-sm mt-4 space-y-2">

            <h2 className="font-semibold text-gray-700">Support</h2>

            <Link
                to="#"
                onClick={upcomingUpdate}
                className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-gray-100"
                >
                <div className="flex items-center gap-3">
                    <FaQuestionCircle />
                    <span>Help Center</span>
                </div>

                <FaChevronRight className="text-gray-400 text-xs" />
            </Link>

            <Link
            to="/cart"
            className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-gray-100"
            >
            <div className="flex items-center gap-3">
                <FaShoppingCart />
                <span>My Cart</span>
            </div>

            <FaChevronRight className="text-gray-400 text-xs" />
            </Link>
          </div>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="w-full mt-5 bg-black text-white py-3 rounded-xl font-medium"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Accounts;