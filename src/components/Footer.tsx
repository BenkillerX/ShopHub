import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16 hidden md:block">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Column 1 */}
        <div>
          <h3 className="text-white font-semibold mb-4">Get to Know Us</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white">About DevBen Shop</Link></li>
            <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
            <li><Link to="/press" className="hover:text-white">Press Releases</Link></li>
            <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-white font-semibold mb-4">Make Money with Us</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/sell" className="hover:text-white">Sell on DevBen</Link></li>
            <li><Link to="/affiliate" className="hover:text-white">Affiliate Program</Link></li>
            <li><Link to="/advertise" className="hover:text-white">Advertise Your Products</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-white font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
            <li><Link to="/returns" className="hover:text-white">Returns & Refunds</Link></li>
            <li><Link to="/shipping" className="hover:text-white">Shipping Info</Link></li>
            <li><Link to="/faq" className="hover:text-white">FAQs</Link></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="text-white font-semibold mb-4">Connect with Us</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white">Twitter</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white">Instagram</a></li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700"></div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-400">
        <p>© {new Date().getFullYear()} DevBen Shop. All rights reserved.</p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white">Terms of Service</Link>
          <Link to="/cookies" className="hover:text-white">Cookies</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
