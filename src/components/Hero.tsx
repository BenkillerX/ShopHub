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
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 3h18v18H3V3z" />
              </svg>
              Free Delivery
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 1l9 4-9 4-9-4 9-4zm0 8l9 4-9 4-9-4 9-4zm0 8l9 4-9 4-9-4 9-4z" />
              </svg>
              Secure Payments
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" />
              </svg>
              Quality Guaranteed
            </span>
          </div>
        </div>

        {/* Right Image */}
        <div className="mt-12 lg:mt-0 lg:ml-12">
          <img
            src="/Hero-Banner2.jpg"
            alt="Shop gadgets"
            className="rounded-2xl shadow-2xl ring-1 ring-white/10 transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
