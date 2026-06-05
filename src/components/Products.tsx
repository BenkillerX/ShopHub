import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { auth, db } from "../config/firebase"
import { toast } from "react-toastify"
import Hero from "./Hero";
interface ProductInfo {
  id: string;
  image: string | null;
  name: string | null;
  description: string;
  price: number;
}
const Products = () => {
  const [productList, setProductList] = useState<ProductInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [addedProductId, setAddedProductId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  

 useEffect(()=>{
  const getProducts = async ()=>{
    try {
  const productsRef = collection(db, "ecommerceProducts")
    const data =  await getDocs(productsRef)
      if (data.metadata.fromCache && !navigator.onLine) {
      setError("No internet connection. Unable to load products.");
      toast.error("No internet connection.");
      return;
    }
    const filteredData:ProductInfo[] = data.docs.map((doc)=>({...doc.data(), id:doc.id})) as ProductInfo[]
    setProductList(filteredData)
    } catch (error) {
      console.error("Firebase Error", error)
      setError("Unale To get prodduct Something Occured")
      toast.error("Unale To get products Something Occured")
    }finally{
      setLoading(false)
    }
  
  }
  getProducts()
 }, []) 
 async function addToCart(product: ProductInfo) {
  setAddedProductId(product.id);

  const user = auth.currentUser;
  if (!user) {
    toast.error("Login or create an account first");
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
  <>
  
    <Hero/>
    {error && <p className="text-red-500">{error}</p>}
    <section className="max-w-7xl mx-auto px-4 mt-10" id="shop">
      <div className="text-center mb-10">
    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
      Trending Products
    </h2>
    <p className="mt-2 text-gray-600 text-sm sm:text-base">
      Explore our most popular picks loved by customers
    </p>
    <div className="mt-4 h-1 w-20 bg-emerald-500 mx-auto rounded"></div>
  </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4  gap-4">
    {loading ? (
    Array.from({ length: 6 }).map((_, i) => (
      <div
        key={i}
        className="animate-pulse rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
      >
        <div className="h-40 w-full rounded-md bg-gray-200"></div>
        <div className="mt-4 h-4 w-3/4 rounded bg-gray-200"></div>
        <div className="mt-2 h-3 w-1/2 rounded bg-gray-200"></div>
        <div className="mt-4 h-6 w-1/3 rounded bg-gray-200"></div>
        <div className="mt-4 h-10 w-full rounded bg-gray-200"></div>
      </div>
    ))
  ) : (
    productList.map((product) => (
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

          <button
            onClick={() => addToCart(product)}
            className="mt-4 w-full rounded-md bg-yellow-400 px-4 py-2 text-sm font-medium text-black shadow hover:bg-yellow-500 active:scale-[0.98]"
          >
            Add to Cart
          </button>
        </div>
      </div>
    ))
  )}
      </div>
    </section>
  </>
);

}

export default Products