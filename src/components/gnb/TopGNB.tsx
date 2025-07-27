import { useState, useEffect } from 'react';
import { ChevronDown, Sun, Moon, Menu, ShoppingCart } from 'lucide-react';

const TopGNB = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Dark mode toggle handler
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, you'd also update localStorage and body class
  };

  // Dropdown toggle handler
  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null);
    };

    if (openDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openDropdown]);

  const megaMenuLandings = [
    { name: 'Template Intro Page', href: '/index' },
    { name: 'Mobile App Showcase', href: '/mobile-app' },
    { name: 'Product Landing', href: '/product' },
    { name: 'SaaS v.1', href: '/saas-v1' },
    { name: 'SaaS v.2', href: '/saas-v2' },
    { name: 'Marketing Agency', href: '/marketing' },
    { name: 'Shop Homepage', href: '/shop' },
    { name: 'Creative Agency', href: '/creative' },
    { name: 'Web Studio', href: '/web-studio' },
    { name: 'Corporate', href: '/corporate' },
    { name: 'Business Consulting', href: '/consulting' },
    { name: 'Coworking Space', href: '/coworking' },
    { name: 'Yoga Studio', href: '/yoga' },
    { name: 'Blog Homepage', href: '/blog' },
  ];

  const pagesMenu = [
    {
      title: 'Portfolio',
      items: [
        { name: 'List View v.1', href: '/portfolio/list-v1' },
        { name: 'List View v.2', href: '/portfolio/list-v2' },
        { name: 'Grid View v.1', href: '/portfolio/grid-v1' },
        { name: 'Grid View v.2', href: '/portfolio/grid-v2' },
        { name: 'Slider View', href: '/portfolio/slider' },
        { name: 'Single Project v.1', href: '/portfolio/single-v1' },
        { name: 'Single Project v.2', href: '/portfolio/single-v2' },
      ],
    },
    {
      title: 'Shop',
      items: [
        { name: 'Catalog (Listing)', href: '/shop/catalog' },
        { name: 'Product Page', href: '/shop/single' },
        { name: 'Checkout', href: '/shop/checkout' },
      ],
    },
    {
      title: 'Blog',
      items: [
        { name: 'Grid View with Sidebar', href: '/blog/grid-sidebar' },
        { name: 'Grid View no Sidebar', href: '/blog/grid' },
        { name: 'List View with Sidebar', href: '/blog/list-sidebar' },
        { name: 'List View no Sidebar', href: '/blog/list' },
        { name: 'Single post v.1', href: '/blog/single-v1' },
        { name: 'Single post v.2', href: '/blog/single-v2' },
        { name: 'Single post v.3', href: '/blog/single-v3' },
      ],
    },
  ];

  const accountMenu = [
    {
      title: 'Auth pages',
      items: [
        { name: 'Sign In', href: '/auth/signin' },
        { name: 'Sign Up', href: '/auth/signup' },
        { name: 'Sign In / Up', href: '/auth/signinup' },
        { name: 'Password Recovery', href: '/auth/recovery' },
      ],
    },
  ];

  const accountPages = [
    { name: 'Overview', href: '/account/overview' },
    { name: 'Settings', href: '/account/settings' },
    { name: 'Billing', href: '/account/billing' },
    { name: 'Orders', href: '/account/orders' },
    { name: 'Earnings', href: '/account/earnings' },
    { name: 'Chat (Messages)', href: '/account/chat' },
    { name: 'Favorites (Wishlist)', href: '/account/favorites' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-100 ${
        isDarkMode ? 'dark bg-gray-900' : 'bg-white'
      } border-b border-gray-200 dark:border-gray-700`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-3">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center space-x-2 text-xl font-semibold"
          >
            <div className="text-emerald-600">
              <svg
                width="35"
                height="32"
                viewBox="0 0 36 33"
                className="fill-current"
              >
                <path d="M35.6,29c-1.1,3.4-5.4,4.4-7.9,1.9c-2.3-2.2-6.1-3.7-9.4-3.7c-3.1,0-7.5,1.8-10,4.1c-2.2,2-5.8,1.5-7.3-1.1c-1-1.8-1.2-4.1,0-6.2l0.6-1.1l0,0c0.6-0.7,4.4-5.2,12.5-5.7c0.5,1.8,2,3.1,3.9,3.1c2.2,0,4.1-1.9,4.1-4.2s-1.8-4.2-4.1-4.2c-2,0-3.6,1.4-4,3.3H7.7c-0.8,0-1.3-0.9-0.9-1.6l5.6-9.8c2.5-4.5,8.8-4.5,11.3,0L35.1,24C36,25.7,36.1,27.5,35.6,29z" />
              </svg>
            </div>
            <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
              Decodeat
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Landings Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown('landings');
                }}
                className={`flex items-center space-x-1 px-4 py-2 text-sm font-medium transition-colors ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-700 hover:text-emerald-600'
                }`}
              >
                <span>제품 등록</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {openDropdown === 'landings' && (
                <div
                  className={`absolute top-full left-0 mt-2 w-96 rounded-lg shadow-lg border ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-white border-gray-200'
                  } z-50`}
                >
                  <div className="grid grid-cols-2 gap-1 p-4">
                    {megaMenuLandings.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className={`block px-3 py-2 text-sm rounded transition-colors ${
                          isDarkMode
                            ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                            : 'text-gray-700 hover:text-emerald-600 hover:bg-gray-50'
                        }`}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Pages Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown('pages');
                }}
                className={`flex items-center space-x-1 px-4 py-2 text-sm font-medium transition-colors ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-700 hover:text-emerald-600'
                }`}
              >
                <span>영양소 정보</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {openDropdown === 'pages' && (
                <div
                  className={`absolute top-full left-0 mt-2 w-80 rounded-lg shadow-lg border ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-white border-gray-200'
                  } z-50`}
                >
                  <div className="p-4 space-y-4">
                    {pagesMenu.map((section, index) => (
                      <div key={index}>
                        <h4
                          className={`font-medium text-sm mb-2 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {section.title}
                        </h4>
                        <div className="space-y-1">
                          {section.items.map((item, itemIndex) => (
                            <a
                              key={itemIndex}
                              href={item.href}
                              className={`block px-3 py-1 text-sm rounded transition-colors ${
                                isDarkMode
                                  ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                                  : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                              }`}
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Account Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown('account');
                }}
                className={`flex items-center space-x-1 px-4 py-2 text-sm font-medium transition-colors ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-700 hover:text-emerald-600'
                }`}
              >
                <span>추천 제품</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {openDropdown === 'account' && (
                <div
                  className={`absolute top-full left-0 mt-2 w-64 rounded-lg shadow-lg border ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-white border-gray-200'
                  } z-50`}
                >
                  <div className="p-4 space-y-4">
                    {accountMenu.map((section, index) => (
                      <div key={index}>
                        <h4
                          className={`font-medium text-sm mb-2 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {section.title}
                        </h4>
                        <div className="space-y-1">
                          {section.items.map((item, itemIndex) => (
                            <a
                              key={itemIndex}
                              href={item.href}
                              className={`block px-3 py-1 text-sm rounded transition-colors ${
                                isDarkMode
                                  ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                                  : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                              }`}
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                    <hr
                      className={`my-2 ${
                        isDarkMode ? 'border-gray-700' : 'border-gray-200'
                      }`}
                    />
                    <div className="space-y-1">
                      {accountPages.map((item, index) => (
                        <a
                          key={index}
                          href={item.href}
                          className={`block px-3 py-1 text-sm rounded transition-colors ${
                            isDarkMode
                              ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                              : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                          }`}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a
              href="/ui-kit"
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                isDarkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-700 hover:text-emerald-600'
              }`}
            >
              문의
            </a>

            <a
              href="/docs"
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                isDarkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-700 hover:text-emerald-600'
              }`}
            >
              마이페이지
            </a>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Buy Now Button - Desktop */}
            <a
              href="https://themes.getbootstrap.com/product/around-multipurpose-template-ui-kit/"
              target="_blank"
              rel="noopener"
              className="hidden sm:flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>로그인</span>
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div
            className={`lg:hidden border-t ${
              isDarkMode
                ? 'border-gray-700 bg-gray-800'
                : 'border-gray-200 bg-white'
            }`}
          >
            <div className="px-4 py-6 space-y-4">
              <a
                href="/landings"
                className={`block text-base font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-900'
                }`}
              >
                Landings
              </a>
              <a
                href="/pages"
                className={`block text-base font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-900'
                }`}
              >
                Pages
              </a>
              <a
                href="/account"
                className={`block text-base font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-900'
                }`}
              >
                Account
              </a>
              <a
                href="/ui-kit"
                className={`block text-base font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-900'
                }`}
              >
                UI Kit
              </a>
              <a
                href="/docs"
                className={`block text-base font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-900'
                }`}
              >
                Docs
              </a>

              {/* Mobile Buy Now Button */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <a
                  href="https://themes.getbootstrap.com/product/around-multipurpose-template-ui-kit/"
                  target="_blank"
                  rel="noopener"
                  className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-lg text-base font-medium transition-colors w-full"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>로그인</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopGNB;
