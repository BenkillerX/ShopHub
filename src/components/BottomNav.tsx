import { Link } from "react-router-dom";
import { FaHome, FaShoppingCart, FaUser } from "react-icons/fa";

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 bg-white border-t flex justify-around items-center md:hidden">

      <Link to="/" className="flex flex-col items-center text-xs text-gray-700">
        <FaHome size={20} />
        Home
      </Link>

      <Link to="/cart" className="flex flex-col items-center text-xs text-gray-700">
        <FaShoppingCart size={20} />
        Cart
      </Link>

      <Link to="/account" className="flex flex-col items-center text-xs text-gray-700">
        <FaUser size={20} />
        Account
      </Link>

    </div>
  );
};

export default BottomNav;