import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import TopGNB from "../components/gnb/TopGNB";
import MessageModal from "../components/ui/MessageModal";
import { useAuthStore } from "../store/useAuthStore";
import { AlertCircle } from "lucide-react";

// Layout constants - 사이드바 제거로 더 이상 사용하지 않음
const LAYOUT_CONSTANTS = {
  TOP_NAV_HEIGHT: "pt-12", // 48px
} as const;

const RootLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showLoginModal, setShowLoginModal } = useAuthStore();

  // 페이지 변경 시 스크롤 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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

      {/* 메인 컨텐츠 영역 - 사이드바 제거로 전체 너비 활용 */}
      <main className={`flex-1 ${LAYOUT_CONSTANTS.TOP_NAV_HEIGHT}`}>
        {/* 전체 너비 페이지는 container 제한 없이, 일반 페이지는 container 적용 */}
        <div className={isFullWidthPage ? "py-6" : "container mx-auto py-6 px-4"}>
          <Outlet />
        </div>
      </main>

      {/* 로그인 모달 - 등록 페이지에서는 표시하지 않음 */}
      <MessageModal
        isOpen={showLoginModal && !isEnrollPage}
        onClose={handleLoginModalClose}
        title="로그인이 필요합니다"
        message="로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?"
        type="warning"
        icon={<AlertCircle className="w-12 h-12 text-yellow-500" />}
        buttons={[
          {
            label: "취소",
            onClick: handleLoginModalClose,
            variant: "secondary",
          },
          {
            label: "로그인하기",
            onClick: handleGoToLogin,
            variant: "primary",
          },
        ]}
      />
    </div>
  );
};

export default RootLayout;
