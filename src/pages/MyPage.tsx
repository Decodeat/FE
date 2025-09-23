import type { FC } from "react";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { PersonalInfo } from "../components/myPage/PersonalInfo";
import { Settings } from "../components/myPage/Settings";
import { AnalysisResults } from "../components/myPage/AnalysisResults";
import AdminReports from "../components/admin/AdminReports";
import { useAuthStore } from "../store/useAuthStore";
import { useLogout, useUser } from "../hooks/useAuth";
import MessageModal from "../components/ui/MessageModal";

const MyPage: FC = () => {
  const { user, isAuthenticated, isAdmin } = useAuthStore();
  const navigate = useNavigate();
  const logoutMutation = useLogout();
  useUser(); // 사용자 정보 쿼리 관리
  const [searchParams, setSearchParams] = useSearchParams();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "settings" | "analysis" | "admin" | "signout"
  >("analysis");

  // 로그인 상태 확인
  useEffect(() => {
    if (!isAuthenticated && !user) {
      setShowLoginModal(true);
    }
  }, [isAuthenticated, user]);

  // USER가 admin 탭에 접근하려 할 때 리디렉션
  useEffect(() => {
    if (activeTab === "admin" && !isAdmin()) {
      setActiveTab("analysis");
      setSearchParams({ tab: "analysis" });
    }
  }, [activeTab, isAdmin, setSearchParams]);

  // URL 파라미터에서 탭 상태 읽기
  useEffect(() => {
    const tab = searchParams.get("tab");
    const validTabs = ["overview", "settings", "analysis", "signout"];

    // ADMIN일 때만 admin 탭 허용
    if (isAdmin()) {
      validTabs.push("admin");
    }

    if (tab && validTabs.includes(tab)) {
      setActiveTab(tab as "overview" | "settings" | "analysis" | "admin" | "signout");
    }
  }, [searchParams, isAdmin]);

  // 탭 변경 시 URL 파라미터 업데이트
  const handleTabChange = (tab: "overview" | "settings" | "analysis" | "admin" | "signout") => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  // 로그아웃 핸들러
  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      navigate("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      // 실패해도 클라이언트 상태는 초기화
      navigate("/");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <PersonalInfo name={user?.nickname || "사용자"} email={user?.email || ""} />;
      case "settings":
        return <Settings />;
      case "analysis":
        return <AnalysisResults />;
      case "admin":
        return <AdminReports />;
      case "signout":
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">로그아웃</h2>
            <p className="text-gray-600 mb-6">로그아웃 하시겠습니까?</p>
            <div className="flex space-x-4">
              <button
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
              >
                {logoutMutation.isPending ? "로그아웃 중..." : "로그아웃"}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="pt-16 bg-secondary min-h-screen">
      {/* 컨텐츠 */}
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 사이드바 */}
        <aside className="col-span-1 space-y-6 sticky top-16 self-start">
          <div className="text-center bg-white rounded-xl p-6 shadow-sm">
            <div className="w-16 h-16 mx-auto bg-[#D2EDE4] rounded-full flex items-center justify-center mb-3">
              <span className="text-2xl font-bold text-[#2D5945]">
                {user?.nickname ? user.nickname.charAt(0).toUpperCase() : "U"}
              </span>
            </div>
            <h3 className="text-lg font-semibold">{user?.nickname || "사용자"}</h3>
            <p className="text-sm text-gray-500">{user?.email || ""}</p>
          </div>
          <nav className="space-y-1">
            <button
              onClick={() => handleTabChange("overview")}
              className={`w-full text-left flex items-center px-3 py-2 rounded hover:bg-gray-100 ${
                activeTab === "overview" ? "bg-emerald-100 text-emerald-700 font-medium" : ""
              }`}
            >
              개인 정보
            </button>
            <button
              onClick={() => handleTabChange("settings")}
              className={`w-full text-left flex items-center px-3 py-2 rounded hover:bg-gray-100 ${
                activeTab === "settings" ? "bg-emerald-100 text-emerald-700 font-medium" : ""
              }`}
            >
              설정
            </button>
            <button
              onClick={() => handleTabChange("analysis")}
              className={`w-full text-left flex items-center px-3 py-2 rounded hover:bg-gray-100 ${
                activeTab === "analysis" ? "bg-emerald-100 text-emerald-700 font-medium" : ""
              }`}
            >
              내 제품 분석 결과
            </button>
            {isAdmin() && (
              <button
                onClick={() => handleTabChange("admin")}
                className={`w-full text-left flex items-center px-3 py-2 rounded hover:bg-gray-100 ${
                  activeTab === "admin" ? "bg-emerald-100 text-emerald-700 font-medium" : ""
                }`}
              >
                신고 요청 관리
              </button>
            )}
            <button
              onClick={() => handleTabChange("signout")}
              className={`w-full text-left flex items-center px-3 py-2 rounded hover:bg-gray-100 ${
                activeTab === "signout" ? "bg-emerald-100 text-emerald-700 font-medium" : ""
              }`}
            >
              로그아웃
            </button>
          </nav>
        </aside>

        {/* 대시보드 */}
        <main className="col-span-3">{renderContent()}</main>
      </div>

      {/* 푸터 */}
      <footer className="mt-12 bg-dark text-white py-8">
        <div className="container mx-auto text-center text-sm">
          © 2025 Around. All rights reserved.
        </div>
      </footer>

      {/* 로그인 모달 */}
      <MessageModal
        isOpen={showLoginModal}
        type="warning"
        title="로그인이 필요합니다"
        message="마이페이지를 이용하시려면 로그인해 주세요."
        buttons={[
          {
            label: "홈으로 가기",
            variant: "secondary",
            onClick: () => {
              setShowLoginModal(false);
              navigate("/");
            },
          },
          {
            label: "로그인하기",
            variant: "primary",
            onClick: () => {
              setShowLoginModal(false);
              navigate("/login");
            },
          },
        ]}
        onClose={() => {
          setShowLoginModal(false);
          navigate("/");
        }}
      />
    </div>
  );
};

export default MyPage;
