import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import type { User } from "firebase/auth";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [firstLetter, setFirstLetter] = useState<string>('U')
  const [user, setUser] = useState<User | null>(null)

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
      setUser(currentUser)
      if (currentUser && currentUser.displayName) {
        const firstLetter = currentUser.displayName.trim().charAt(0).toUpperCase();
        setFirstLetter(firstLetter)
      }else if (currentUser?.email) {
        setFirstLetter(currentUser.email.trim().charAt(0).toUpperCase())
      }
      else{
        setFirstLetter('U')
      }
    });
    return () => unsubscribe();
  },[])
  const handleLogout = async ()=>{
    await signOut(auth)
    setUser(null)
    setFirstLetter('U')
  }
  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-black">
          ShopHub
        </Link>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-xl">
          <div className="flex w-full">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full border border-gray-300 rounded-l-xl px-4 py-2 outline-none focus:ring-2 focus:ring-black transition"
            />
            <button className="bg-black text-white px-5 rounded-r-xl hover:bg-gray-800 transition">
              Search
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">

          {/* Auth */}
          <div className="flex items-center gap-3">
            {user ? (
              <button
                onClick={handleLogout}
                className="text-sm text-gray-700 hover:text-black transition border border-[1px] border-black px-4 py-2 rounded-xl"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm text-gray-700 hover:text-black transition border border-[1px] border-black px-4 py-2 rounded-xl"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-sm bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Cart */}
          <button className="relative">
            <span className="text-xl">🛒</span>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              0
            </span>
          </button>

          {/* User Avatar */}
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold">
            {firstLetter}
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <div className="flex w-full">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border border-gray-300 rounded-l-xl px-4 py-2 outline-none"
          />
          <button className="bg-black text-white px-4 rounded-r-xl">
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;