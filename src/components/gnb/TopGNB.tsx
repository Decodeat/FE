import { useState, useEffect } from 'react';
import { ChevronDown, Sun, Moon, Menu, ShoppingCart } from 'lucide-react';
import { pagesMenu, accountMenu, accountPages } from '../../config/menuConfig';

import Logo from '../../assets/logo/decodeat.svg';

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
          <a href="/" className="flex items-center text-2xl font-semibold">
            <img
              src={Logo}
              alt="Decodeat Logo"
              className="h-14 w-auto text-emerald-600"
            />
            <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
              DecodeEat
            </span>
          </a>

          {/* 데탑 네비게이션 */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* 제품 등록 링크 */}
            <a
              href="/enroll"
              className={`px-4 py-2 text-lg font-medium transition-colors ${
                isDarkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-700 hover:text-emerald-600'
              }`}
            >
              제품 등록
            </a>

            {/* 영양소 정보 드롭다운 */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown('pages');
                }}
                className={`flex items-center space-x-1 px-4 py-2 text-lg font-medium transition-colors ${
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
                className={`flex items-center space-x-1 px-4 py-2 text-lg font-medium transition-colors ${
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
              className={`px-4 py-2 text-lg font-medium transition-colors ${
                isDarkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-700 hover:text-emerald-600'
              }`}
            >
              문의
            </a>

            <a
              href="/myPage"
              className={`px-4 py-2 text-lg font-medium transition-colors ${
                isDarkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-700 hover:text-emerald-600'
              }`}
            >
              마이페이지
            </a>
          </div>

          {/* Right side controls */}
          <div className="flex items-center">
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
                <Sun className="w-7 h-7" />
              ) : (
                <Moon className="w-7 h-7" />
              )}
            </button>

            {/* 데탑 로그인 버튼: sm 이상에서만 flex, 그리고 좌측에 ml-4 추가 */}
            <button
              onClick={() => {}}
              className="hidden sm:flex sm:ml-4 items-center bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg text-lg font-medium transition-colors"
            >
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
                href="/enroll"
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
                href="/myPage"
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
