import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FiSearch } from "react-icons/fi";

interface Product {
  id: string;
  name: string;
  description?: string;
  price?: number;
  image?: string | null;
}

const Search = () => {
  const [searchParams] = useSearchParams();
    const query = searchParams.get("query") || "";

    const navigate = useNavigate()
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [addedProductId, setAddedProductId] = useState<string | null>(null)
  useEffect(() => {
    const fetchProducts = async () => {
    const snap = await getDocs(collection(db, "ecommerceProducts"));
    const data: Product[] = snap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Product, "id">),
    }));
      setAllProducts(data);
    };

    fetchProducts();
  }, []);

  const filtered = allProducts.filter((product) =>
    product.name?.toLowerCase().includes(query.toLowerCase())
  );
 async function addToCart(product: Product) {
  setAddedProductId(product.id);

  const user = auth.currentUser;
  if (!user) {
    toast.error("Login or create an account first");
   setAddedProductId(null)
    throw new Error("Users must login first");
  }

  
  try {
    const cartItemRef = doc(db, "ecommerceCart", user.uid, "items", product.id);
    const existingItem = await getDoc(cartItemRef);
    if (existingItem.exists()) {
      await updateDoc(cartItemRef, {
        quantity: existingItem.data().quantity + 1,
      });
    } else {
      // Add new item
      await setDoc(cartItemRef, {
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }
  } catch (error) {
    toast.error("Failed to add item");
    console.error(error);
  } finally {
    // Reset highlight after 2s
    setTimeout(() => {
      setAddedProductId(null);
    }, 2000);
  }
}
 return (
  <div className="max-w-7xl mx-auto px-4 mt-10">
    <h1 className="text-2xl font-bold mb-5">
      Search Results for "{query}"
    </h1>

    {filtered.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-20 text-center">
  <div className="bg-gray-100 rounded-full p-6 mb-4">
    <FiSearch />
  </div>

  <h2 className="text-xl font-semibold text-gray-800">
    No products found
  </h2>

  <p className="text-gray-500 mt-2">
    We couldn't find anything matching your search.
  </p>

  <button
    onClick={() => navigate("/")}
    className="mt-5 px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 cursor-pointer"
  >
    Go Back
  </button>
</div>
    ) : (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
          >
        <div className="relative">
            <img
                src={product.image ?? ""}
                alt={product.name ?? "Product"}
                className="h-48 w-full object-contain p-4"
            />
            {addedProductId === product.id && (
                <span className="absolute right-3 top-3 rounded-full bg-emerald-500 px-2 py-1 text-xs font-medium text-white shadow">
                ✓ Added
                </span>
            )}
        </div>

            <div className="flex flex-col flex-grow px-4 pb-4">
              <h2 className="text-base font-semibold text-gray-900 line-clamp-1">
                {product.name}
              </h2>

              <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                {product.description}
              </p>

              <div className="mt-3 text-lg font-bold text-gray-900">
                ₦{Number(product.price).toLocaleString()}
              </div>

              <button className="mt-4 w-full rounded-md bg-yellow-400 px-4 py-2 text-sm font-medium text-black shadow hover:bg-yellow-500 active:scale-[0.98]"
              onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
};

export default Search;