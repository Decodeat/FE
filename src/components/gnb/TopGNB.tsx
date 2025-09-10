import { useState, useEffect } from "react";
import { ChevronDown, Menu, ShoppingCart, User, LogOut } from "lucide-react";
import { pagesMenu, accountMenu, accountPages } from "../../config/menuConfig";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useUser, useLogout } from "../../hooks/useAuth";

import Logo from "../../assets/logo/decodeat.svg";

const TopGNB = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // 인증 상태 가져오기
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const userQuery = useUser(); // 사용자 정보 자동 로드
  const logoutMutation = useLogout();

  // 디버깅용 로그
  console.log("TopGNB 인증 상태:", { user, isAuthenticated, isLoading });

  // 로그아웃 핸들러
  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      setIsUserDropdownOpen(false);
      navigate("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      // 실패해도 클라이언트 상태는 초기화
      setIsUserDropdownOpen(false);
      navigate("/");
    }
  };

  // 현재 경로 기반 상위 메뉴 활성화 감지
  const nutritionHrefs = pagesMenu.flatMap((s) => s.items.map((i) => i.href));
  const accountHrefs = [
    ...accountMenu.flatMap((s) => s.items.map((i) => i.href)),
    ...accountPages.map((i) => i.href),
  ];
  const isNutritionActive = nutritionHrefs.some((h) => location.pathname.startsWith(h));
  const isAccountActive = accountHrefs.some((h) => location.pathname.startsWith(h));

  // 드롭다운 토글 핸들러
  const toggleDropdown = (dropdownName: string | null) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  // 바깥 클릭시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null);
      setIsUserDropdownOpen(false);
    };

    if (openDropdown || isUserDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [openDropdown, isUserDropdownOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-100 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-3">
          {/* Logo */}
          <a href="/" className="flex items-center text-2xl font-semibold">
            <img src={Logo} alt="Decodeat Logo" className="h-14 w-auto text-emerald-600" />
            <span className="text-gray-900">DecodeEat</span>
          </a>

          {/* 데탑 네비게이션 */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* 제품 등록 링크 */}
            <NavLink
              to="/enroll"
              className={({ isActive }) =>
                `px-4 py-2 transition-colors text-gray-700 hover:text-emerald-600 ${
                  isActive
                    ? "font-semibold text-[1.125rem] border-b-2 border-emerald-500"
                    : "text-[1rem]"
                }`
              }
            >
              제품 등록
            </NavLink>

            {/* 영양소 정보 드롭다운 */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown("pages");
                }}
                className={`flex items-center space-x-1 px-4 py-2 font-medium transition-colors text-gray-700 hover:text-emerald-600 ${
                  isNutritionActive
                    ? "text-[1.125rem] border-b-2 border-emerald-500 font-semibold"
                    : "text-[1rem]"
                }`}
              >
                <span>영양소 정보</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {openDropdown === "pages" && (
                <div className="absolute top-full left-0 mt-2 w-80 rounded-lg shadow-lg border bg-white border-gray-200 z-50">
                  <div className="p-4 space-y-4">
                    {pagesMenu.map((section, index) => (
                      <div key={index}>
                        <h4 className="font-medium text-sm mb-2 text-gray-900">{section.title}</h4>
                        <div className="space-y-1">
                          {section.items.map((item, itemIndex) => (
                            <a
                              key={itemIndex}
                              href={item.href}
                              className="block px-3 py-1 text-sm rounded transition-colors text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
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
                  toggleDropdown("account");
                }}
                className={`flex items-center space-x-1 px-4 py-2 font-medium transition-colors text-gray-700 hover:text-emerald-600 ${
                  isAccountActive
                    ? "text-[1.125rem] border-b-2 border-emerald-500 font-semibold"
                    : "text-[1rem]"
                }`}
              >
                <span>추천 제품</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {openDropdown === "account" && (
                <div className="absolute top-full left-0 mt-2 w-64 rounded-lg shadow-lg border bg-white border-gray-200 z-50">
                  <div className="p-4 space-y-4">
                    {accountMenu.map((section, index) => (
                      <div key={index}>
                        <h4 className="font-medium text-sm mb-2 text-gray-900">{section.title}</h4>
                        <div className="space-y-1">
                          {section.items.map((item, itemIndex) => (
                            <a
                              key={itemIndex}
                              href={item.href}
                              className="block px-3 py-1 text-sm rounded transition-colors text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                    <hr className="my-2 border-gray-200" />
                    <div className="space-y-1">
                      {accountPages.map((item, index) => (
                        <a
                          key={index}
                          href={item.href}
                          className="block px-3 py-1 text-sm rounded transition-colors text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <NavLink
              to="/support"
              className={({ isActive }) =>
                `px-4 py-2 transition-colors text-gray-700 hover:text-emerald-600 ${
                  isActive
                    ? "font-semibold text-[1.125rem] border-b-2 border-emerald-500"
                    : "text-[1rem]"
                }`
              }
            >
              문의
            </NavLink>

            <NavLink
              to="/myPage"
              className={({ isActive }) =>
                `px-4 py-2 transition-colors text-gray-700 hover:text-emerald-600 ${
                  isActive
                    ? "font-semibold text-[1.125rem] border-b-2 border-emerald-500"
                    : "text-[1rem]"
                }`
              }
            >
              마이페이지
            </NavLink>
          </div>

          {/* Right side controls */}
          <div className="flex items-center">
            {/* 인증 상태에 따른 버튼 분기 */}
            {isLoading ? (
              // 로딩 중
              <div className="hidden sm:flex items-center px-6 py-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-emerald-600"></div>
              </div>
            ) : isAuthenticated && user ? (
              // 로그인 상태: 사용자 드롭다운
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsUserDropdownOpen(!isUserDropdownOpen);
                  }}
                  className="hidden sm:flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg text-lg font-medium transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>{user.nickname}님</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* 사용자 드롭다운 메뉴 */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <button
                      onClick={() => {
                        navigate("/myPage");
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <User className="w-4 h-4" />
                      <span>마이페이지</span>
                    </button>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>로그아웃</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // 로그아웃 상태: 로그인 버튼
              <button
                onClick={() => navigate("/login")}
                className="hidden sm:flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg text-lg font-medium transition-colors"
              >
                <span>로그인</span>
              </button>
            )}

            {/* 모바일 햄버거 버튼 */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-100 ml-4"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-6 space-y-4">
              <NavLink
                to="/enroll"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block text-base font-medium text-gray-900 ${isActive ? "underline underline-offset-4" : ""}`
                }
              >
                제품 등록
              </NavLink>
              <a href="/pages" className="block text-base font-medium text-gray-900">
                영양소 정보
              </a>
              <a href="/account" className="block text-base font-medium text-gray-900">
                추천 제품
              </a>
              <NavLink
                to="/support"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block text-base font-medium text-gray-900 ${isActive ? "underline underline-offset-4" : ""}`
                }
              >
                문의
              </NavLink>
              <NavLink
                to="/myPage"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block text-base font-medium text-gray-900 ${isActive ? "underline underline-offset-4" : ""}`
                }
              >
                마이페이지
              </NavLink>

              {/* 모바일 인증 버튼 */}
              <div className="pt-4 border-t border-gray-200">
                {isAuthenticated && user ? (
                  // 로그인 상태: 사용자 정보와 로그아웃 버튼
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <User className="w-5 h-5 text-emerald-600" />
                      <span className="text-base font-medium text-gray-900">{user.nickname}님</span>
                    </div>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg text-base font-medium transition-colors w-full"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>로그아웃</span>
                    </button>
                  </div>
                ) : (
                  // 로그아웃 상태: 로그인 버튼
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/login");
                    }}
                    className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-lg text-base font-medium transition-colors w-full"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>로그인</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopGNB;
