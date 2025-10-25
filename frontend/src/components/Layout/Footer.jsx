import { Link } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';

function Footer() {
  const companyLinks = [
    'Contact Us',
    'FAQs',
    'Warranty Coverage',
    'Returns & Refunds',
    'Shipping Policy',
    'Track Your Order',
    'Privacy Policy',
    'Search',
    'Terms of Service',
    'Refund policy',
  ];

  return (
    <footer className="bg-black text-white py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 uppercase">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm hover:text-gray-300 transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Language Selector */}
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2 mb-8">
              <span className="text-sm">ENGLISH</span>
              <FiChevronDown size={16} />
            </div>
            <p className="text-sm text-gray-400">© 2023 - RUSSET</p>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4 uppercase">Join The Team</h3>
            <p className="text-sm text-gray-300 mb-6">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="E-mail"
                className="w-full px-4 py-3 bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white"
              />
              <button
                type="submit"
                className="w-full bg-white text-black px-6 py-3 font-medium hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-wrap items-center justify-end space-x-4">
            <span className="text-sm text-gray-400">Payment Methods:</span>
            <div className="flex space-x-2">
              <div className="w-8 h-6 bg-gray-700 rounded flex items-center justify-center text-xs">
                V
              </div>
              <div className="w-8 h-6 bg-gray-700 rounded flex items-center justify-center text-xs">
                M
              </div>
              <div className="w-8 h-6 bg-gray-700 rounded flex items-center justify-center text-xs">
                A
              </div>
              <div className="w-8 h-6 bg-gray-700 rounded flex items-center justify-center text-xs">
                P
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
