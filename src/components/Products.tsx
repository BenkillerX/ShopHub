import { collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../config/firebase"
import { toast } from "react-toastify"


interface ProductInfo {
  id: string;
  image: string | null;
  name: string | null;
  Description: string;
  Price: number;
}

const Products = () => {
  const [productList, setProductList] = useState<ProductInfo[]>([])
  const [loading, setLoading] = useState(false)
  const productsRef = collection(db, "ecommerceProducts")
 useEffect(()=>{
  const getProducts = async ()=>{
    try {
      setLoading(true)
    const data =  await getDocs(productsRef)
    const filteredData:ProductInfo[] = data.docs.map((doc)=>({...doc.data(), id:doc.id})) as ProductInfo[]
    setProductList(filteredData)
    } catch (error) {
      console.error("Something Went Wrong", error)
      toast.error("Unale To get products check internt connection")
    }finally{
      setLoading(false)
    }
  
  }
  getProducts()
 }, []) 
  return (
  <>
    <h1 className="text-3xl font-bold text-center my-8">DevBen Shop</h1>

    <section className="max-w-7xl mx-auto px-4">
      {loading && (
        <div className="flex justify-center my-6">
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
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {productList.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col"
          >
            <img
              src={product.image ?? ""}
              alt="Product Image"
              className="w-full h-56 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold text-gray-900">
                {product.name}
              </h2>
              <p className="text-sm text-gray-600 mt-2 flex-grow">
                {product.Description}
              </p>
              <h3 className="text-xl font-bold text-black mt-3">
                ${product.Price}
              </h3>
              <button className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  </>
);

}

export default Products
