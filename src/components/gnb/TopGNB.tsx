import { useState, useEffect } from 'react';
import { ChevronDown, Sun, Moon, Menu, ShoppingCart } from 'lucide-react';
import {
  megaMenuLandings,
  pagesMenu,
  accountMenu,
  accountPages,
} from '../../config/menuConfig';

const TopGNB = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // 다크모드 핸들러
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // 실제 앱에서 localStorage와 body 클래스를 업데이트해야 함
  };

  // 드롭다운 토글 핸들러
  const toggleDropdown = (dropdownName: string | null) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  // 바깥 클릭시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null);
    };

    if (openDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openDropdown]);

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

          {/* 데탑 네비게이션 */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* 제품 등록 드롭다운 */}
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

            {/* 영양소 정보 드롭다운 */}
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

            {/* 추천제품 드롭다운 */}
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

            {/* 데탑 로그인 버튼 */}
            <button
              onClick={() => {}}
              className="hidden sm:flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>로그인</span>
            </button>

            {/* 모바일 햄버거 버튼 */}
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

        {/* 모바일 메뉴 */}
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
                제품 등록
              </a>
              <a
                href="/pages"
                className={`block text-base font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-900'
                }`}
              >
                영양소 정보
              </a>
              <a
                href="/account"
                className={`block text-base font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-900'
                }`}
              >
                추천 제품
              </a>
              <a
                href="/ui-kit"
                className={`block text-base font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-900'
                }`}
              >
                문의
              </a>
              <a
                href="/docs"
                className={`block text-base font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-900'
                }`}
              >
                마이페이지
              </a>

              {/* 모바일 로그인 버튼  */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {}}
                  className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-lg text-base font-medium transition-colors w-full"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>로그인</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopGNB;
