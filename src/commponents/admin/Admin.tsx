const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-5 hidden md:block">
        <h1 className="text-xl font-bold mb-8">Admin Panel</h1>

        <nav className="flex flex-col gap-4 text-gray-700 text-sm">
          <a href="#" className="hover:text-black">Dashboard</a>
          <a href="#" className="hover:text-black">Products</a>
          <a href="#" className="hover:text-black">Orders</a>
          <a href="#" className="hover:text-black">Users</a>
          <a href="#" className="hover:text-black">Settings</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Product Management
          </h2>
          <p className="text-gray-500 text-sm">
            Upload, update, and manage your store products
          </p>
        </div>

        {/* Product Form */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 mb-8">
          <h3 className="font-semibold mb-4">Add New Product</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Product Name"
              className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-black outline-none"
            />

            <input
              type="number"
              placeholder="Price"
              className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-black outline-none"
            />

            <input
              type="text"
              placeholder="Category"
              className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-black outline-none"
            />

            <input
              type="text"
              placeholder="Image URL"
              className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          <button className="mt-4 bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800 transition">
            Add Product
          </button>
        </div>

        {/* Products Table Placeholder */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <h3 className="font-semibold mb-4">Products List</h3>

          <div className="text-gray-500 text-sm">
            No products yet. Add your first product above.
          </div>
        </div>

      </main>
    </div>
  );
};

export default Admin;