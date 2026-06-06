import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
    onClick={scrollToTop}
    className="
    fixed bottom-4 right-4 
    sm:bottom-6 sm:right-6
    bg-black text-white 
    p-2 sm:p-3 
    rounded-full shadow-lg 
    hover:bg-gray-800 hover:scale-110 
    transition cursor-pointer
  "
>
  <FaArrowUp className="text-sm sm:text-base" />
</button>
  );
};

export default BackToTop;