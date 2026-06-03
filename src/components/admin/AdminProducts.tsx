import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

interface ProductInfo {
  id: string;
  image: string | null;
  name: string | null;
  description: string;
  price: number;
}

const AdminProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<ProductInfo>>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const snapshot = await getDocs(collection(db, "ecommerceProducts"));
        const productData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ProductInfo[];
        setProducts(productData);
      } catch (error) {
        console.error("An Error Occured", error);
        toast.error("An error Occured");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  async function deleteProduct(productId: string) {
    try {
      setLoading(true);
      await deleteDoc(doc(db, "ecommerceProducts", productId));
      toast.success("Deleted successfully");
      setProducts(products.filter((p) => p.id !== productId));
    } catch (error) {
      console.error("Something Occured", error);
      toast.error("Failed to delete product");
    } finally {
      setLoading(false);
    }
  }

  async function saveEdit(productId: string) {
    try {
      setLoading(true);
      await updateDoc(doc(db, "ecommerceProducts", productId), editValues);
      toast.success("Updated successfully");
      setEditingId(null);
      // Refresh products
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, ...editValues } as ProductInfo : p
        )
      );
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  }
if (loading) {
    return   <div className="flex justify-center my-6">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-black transition ease-in-out duration-150 cursor-not-allowed"
            disabled
          >
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 
                5.373 0 12h4zm2 5.291A7.962 7.962 
                0 014 12H0c0 3.042 1.135 5.824 
                3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </button>
        </div>
}
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200">
      <h3 className="font-semibold mb-4">Products List</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-md p-4">
            {editingId === product.id ? (
              <>
                <input
                  type="text"
                  value={editValues.name ?? product.name ?? ""}
                  onChange={(e) =>
                    setEditValues({ ...editValues, name: e.target.value })
                  }
                  className="border p-2 w-full mb-2"
                />
                <textarea
                  value={editValues.description ?? product.description}
                  onChange={(e) =>
                    setEditValues({ ...editValues, description: e.target.value })
                  }
                  className="border p-2 w-full mb-2"
                />
                <input
                  type="number"
                  value={editValues.price ?? product.price}
                  onChange={(e) =>
                    setEditValues({ ...editValues, price: Number(e.target.value) })
                  }
                  className="border p-2 w-full mb-2"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => saveEdit(product.id)}
                    className="bg-black text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <img
                  src={product.image ?? ""}
                  alt="Product"
                  className="w-full h-56 object-cover"
                />
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-600">{product.description}</p>
                <h3 className="text-xl font-bold">₦{product.price}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingId(product.id);
                      setEditValues(product);
                    }}
                    className="bg-black text-white w-full px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="bg-black text-white px-4 py-2 w-full rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
