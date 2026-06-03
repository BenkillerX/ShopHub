import { onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string | null;
  quantity: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(auth.currentUser);

useEffect(() => {
  const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);

    // Reset cart items when user logs out
    if (!currentUser) {
      setCartItems([]);
    }
  });
  return () => unsubscribeAuth();
}, []);

useEffect(() => {
  if (!user) return;

  const cartRef = collection(db, "ecommerceCart", user.uid, "items");
  const unsubscribe = onSnapshot(cartRef, (snapshot) => {
    const items: CartItem[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<CartItem, "id">),
    }));
    setCartItems(items);
  });

  return () => unsubscribe();
}, [user]);


  // 🔹 Update quantity
  const updateQuantity = async (item: CartItem, newQty: number) => {
    if (!user) return;
    const itemRef = doc(db, "ecommerceCart", user.uid, "items", item.id);

    if (newQty <= 0) {
      await deleteDoc(itemRef); // remove item if qty is 0
    } else {
      await updateDoc(itemRef, { quantity: newQty });
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left: Cart Items */}
      <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <ul className="space-y-6">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image ?? ""}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-600">
                      ₦{item.price} &times; {item.quantity}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item, item.quantity - 1)}
                        className="px-2 py-1 border rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item, item.quantity + 1)}
                        className="px-2 py-1 border rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <p className="font-bold">₦{item.price * item.quantity}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Right: Order Summary */}
      <div className="bg-white p-6 rounded-lg shadow h-fit">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-2 text-gray-700">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₦{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₦0</span>
          </div>
          <div className="flex justify-between font-bold text-black border-t pt-2">
            <span>Total</span>
            <span>₦{subtotal}</span>
          </div>
        </div>
        <button className="mt-6 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
