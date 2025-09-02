import { Outlet, useLocation } from "react-router-dom";
import LeftGNB from "../components/gnb/LeftGNB";
import TopGNB from "../components/gnb/TopGNB";

// Layout constants
const LAYOUT_CONSTANTS = {
  SIDEBAR_WIDTH: "w-64", // 256px
  SIDEBAR_MARGIN: "ml-64", // 256px
  TOP_NAV_HEIGHT: "pt-12", // 48px
} as const;

const RootLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isEnrollPage = location.pathname === "/enroll"; // 제품 등록 페이지 또는 다른 전체너비 페이지들
  const isOnboardingPage = location.pathname === "/onboarding";
  const isLoginPage = location.pathname === "/login";
  const isSupportPage = location.pathname === "/support";

  // 전체 너비가 필요한 페이지들
  const isFullWidthPage = isEnrollPage || isOnboardingPage || isLoginPage || isSupportPage;

  return (
    <div className='min-h-screen bg-gray-50 '>
      {/* Top Navigation */}
      <TopGNB />

      {/* Main Layout Container */}
      <div className='flex'>
        {/* Left Sidebar - 홈페이지에서만 표시 */}
        {isHomePage && <LeftGNB />}

        {/* Main Content Area */}
        <main
          className={`flex-1 ${
            isHomePage ? LAYOUT_CONSTANTS.SIDEBAR_MARGIN : ""
          } ${LAYOUT_CONSTANTS.TOP_NAV_HEIGHT}`}
        >
          {/* 전체 너비 페이지는 container 제한 없이, 일반 페이지는 container 적용 */}
          <div className={isFullWidthPage ? "py-6" : "container mx-auto px-4 py-6"}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
