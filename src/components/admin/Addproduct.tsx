import { addDoc, collection, } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";

const Addproduct = () => {
    const [productName, setProductName] = useState<string>("");
    const [productPrice, setProductPrice] = useState<number | null>(null);
    const [productDes, setProductDes] = useState<string>("");
    const [productImage, setProductImage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const productRef = collection(db, "ecommerceProducts");
    

    async function addProduct() {
        try {
            await addDoc(productRef, {
                name:productName,
                price:productPrice,
                description:productDes,
                image:productImage,
            });
            setProductName("");
            setProductPrice(0)
            setProductDes("")
            setProductImage("")
            toast.success('Product Added Sucessfully')
        } catch (error) {
            console.error('Something Unexpected Happned', error)
            toast.error('Check Your internet connection and try again')
        }finally{
            setLoading(false)
        }

    }
 async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ecommerce-project"); 

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/den1tzo9b/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  return data.secure_url; 
}

  return (
    <>
      <div className="bg-white p-6 rounded-2xl border border-gray-200 mb-8">
          <h3 className="font-semibold mb-4">Add New Product</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Product Name"
              className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-black outline-none"
              value={productName}
              onChange={(e)=>setProductName(e.target.value)}
            />

            <input
              type="number"
              placeholder="Price"
              className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-black outline-none"
              onChange={(e)=>setProductPrice(Number(e.target.value))}
            />

            <input
              type="text"
              placeholder="Descrition"
              className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-black outline-none"
              value={productDes}
              onChange={(e)=>setProductDes(e.target.value)}
            />

            <input
            type="file"
            accept="image/*"
            className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-black outline-none"
            onChange={async (e) => {
                if (e.target.files && e.target.files[0]) {
                setLoading(true);
                try {
                    const url = await uploadImage(e.target.files[0]);
                    setProductImage(url);
                    toast.success("Image uploaded successfully!");
                } catch (error) {
                    console.error("Something Occured", error);
                    toast.error("Image upload failed");
                } finally {
                    setLoading(false);
                }
                }
            }}
            />

          </div>

          <button className="mt-4 bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800 transition" 
          onClick={addProduct}
          disabled={loading || !productImage}
          >
            {loading ? "Uploading..." : "Add Product"}
          </button>
        </div>

        {/* Products Table Placeholder */}
        
    </>
  )
}

export default Addproduct
