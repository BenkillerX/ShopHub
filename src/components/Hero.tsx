import { FiShield, FiTruck } from "react-icons/fi"
import { MdVerified } from "react-icons/md"

const Hero = () => {
  return (
    <section className="relative min-h-[70vh] bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white ">
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center justify-between">
        
        {/* Left Content */}
        <div className="max-w-xl text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            DevBen Shop
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-300">
            Discover top-rated gadgets and accessories at prices you&#39;ll love. 
            Fast delivery, secure checkout, and unbeatable quality.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a href="#shop">
              <button className="rounded-xl bg-emerald-500 px-6 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-emerald-600 hover:scale-105">
              Shop Now
            </button>
            </a>
          </div>

          {/* Trust Badges */}
          <div className="mt-10 flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-gray-400">
              <span className="flex items-center gap-2">
              <FiTruck className="text-emerald-400" size={30}/>
                Free Delivery
          </span>
            <span className="flex items-center gap-2">
          <FiShield className="text-emerald-400" size={30}/>
              Secure Payments
          </span>
          <span className="flex items-center gap-2">
            <MdVerified className="text-emerald-400 text-lg" size={30}/>
            Quality Guaranteed
          </span>
          </div>
        </div>

        {/* Right Image */}
        <div className="mt-12 lg:mt-0 lg:ml-12">
          <img
            src="/Banner.jpg"
            alt="Shop gadgets"
            className="rounded-2xl shadow-2xl ring-1 ring-white/10 transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
