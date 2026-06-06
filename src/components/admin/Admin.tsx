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
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
<aside className="w-full md:w-64 bg-white border-b md:border-r border-gray-200 p-4 md:p-5">
  
  {/* Mobile header */}
  <div className="flex justify-between items-center md:block">
    <h1 className="text-lg md:text-xl font-bold">Admin Panel</h1>
  </div>

  {/* Nav */}
  <nav className="flex md:flex-col gap-2 md:gap-4 mt-4 text-sm overflow-x-auto">
    
    <button
      onClick={() => setActiveTab("dashboard")}
      className={`px-3 py-2 whitespace-nowrap ${
        activeTab === "dashboard" ? "font-bold text-black" : "text-gray-600"
      }`}
    >
      Dashboard
    </button>

    <button
      onClick={() => setActiveTab("products")}
      className={`px-3 py-2 whitespace-nowrap ${
        activeTab === "products" ? "font-bold text-black" : "text-gray-600"
      }`}
    >
      Products
    </button>

    <button
      onClick={() => setActiveTab("orders")}
      className={`px-3 py-2 whitespace-nowrap ${
        activeTab === "orders" ? "font-bold text-black" : "text-gray-600"
      }`}
    >
      Orders
    </button>

    <button
      onClick={handleLogout}
      className="ml-auto md:ml-0 bg-black text-white px-4 py-2 rounded-lg"
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
