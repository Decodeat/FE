import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LeftGNB from "../components/gnb/LeftGNB";
import TopGNB from "../components/gnb/TopGNB";
import LoginModal from "../components/ui/LoginModal";
import { useAuthStore } from "../store/useAuthStore";

// Layout constants
const LAYOUT_CONSTANTS = {
  SIDEBAR_MARGIN: "ml-64", // 256px
  TOP_NAV_HEIGHT: "pt-12", // 48px
} as const;

const RootLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showLoginModal, setShowLoginModal } = useAuthStore();

  const isHomePage = location.pathname === "/";
  const isEnrollPage = location.pathname === "/enroll";
  const isOnboardingPage = location.pathname === "/onboarding";
  const isLoginPage = location.pathname === "/login";
  const isSupportPage = location.pathname === "/support";

  // 전체 너비가 필요한 페이지들
  const isFullWidthPage = isEnrollPage || isOnboardingPage || isLoginPage || isSupportPage;

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  const handleGoToLogin = () => {
    setShowLoginModal(false);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      <TopGNB />

      {/* 메인 레이아웃 컨테이너 */}
      <div className="flex">
        {isHomePage && <LeftGNB />}

        {/* 메인 컨텐츠 영역 */}
        <main
          className={`flex-1 ${
            isHomePage ? LAYOUT_CONSTANTS.SIDEBAR_MARGIN : ""
          } ${LAYOUT_CONSTANTS.TOP_NAV_HEIGHT}`}
        >
          {/* 전체 너비 페이지는 container 제한 없이, 일반 페이지는 container 적용 */}
          <div className={isFullWidthPage ? "py-6" : "container mx-auto py-6 px-4"}>
            <Outlet />
          </div>
        </main>
      </div>

      {/* 로그인 모달 */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={handleLoginModalClose}
        onLogin={handleGoToLogin}
      />
    </div>
  );
};

export default RootLayout;
