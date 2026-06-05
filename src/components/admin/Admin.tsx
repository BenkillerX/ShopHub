import { signOut } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../config/firebase";
import Addproduct from "./Addproduct";
import AdminProducts from "./AdminProducts";

const Admin = () => {
  const [activeTab, setActiveTab] = useState<"dashboard" | "products" | "orders">("dashboard");

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href= '/'
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-5 hidden md:block">
        <h1 className="text-xl font-bold mb-8">Admin Panel</h1>

        <nav className="flex flex-col gap-4 text-gray-700 text-sm">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`text-left hover:text-black ${activeTab === "dashboard" ? "font-bold text-black" : ""}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`text-left hover:text-black ${activeTab === "products" ? "font-bold text-black" : ""}`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`text-left hover:text-black ${activeTab === "orders" ? "font-bold text-black" : ""}`}
          >
            Orders
          </button>
          <button
            onClick={handleLogout}
            className="bg-black text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Log Out
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab === "dashboard" && (
         <Addproduct/>
        )}

        {activeTab === "products" && (
          <AdminProducts/>
        )}

        {activeTab === "orders" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
            <p className="text-gray-500 text-sm">View and manage customer orders</p>
            {/* Orders component goes here */}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
