import type { FC } from "react";
import { useState } from "react";
import { PersonalInfo } from "../components/myPage/PersonalInfo";
import { Settings } from "../components/myPage/Settings";
import { AnalysisResults } from "../components/myPage/AnalysisResults";
import { useAuthStore } from "../store/useAuthStore";

const MyPage: FC = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<"overview" | "settings" | "analysis" | "signout">(
    "analysis",
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <PersonalInfo name={user?.nickname || "사용자"} email={user?.email || ""} />;
      case "settings":
        return <Settings />;
      case "analysis":
        return <AnalysisResults />;
      case "signout":
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">로그아웃</h2>
            <p className="text-gray-600">로그아웃 하시겠습니까?</p>
            <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              로그아웃
            </button>
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
              onClick={() => setActiveTab("overview")}
              className={`w-full text-left flex items-center px-3 py-2 rounded hover:bg-gray-100 ${
                activeTab === "overview" ? "bg-emerald-100 text-emerald-700 font-medium" : ""
              }`}
            >
              개인 정보
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full text-left flex items-center px-3 py-2 rounded hover:bg-gray-100 ${
                activeTab === "settings" ? "bg-emerald-100 text-emerald-700 font-medium" : ""
              }`}
            >
              설정
            </button>
            <button
              onClick={() => setActiveTab("analysis")}
              className={`w-full text-left flex items-center px-3 py-2 rounded hover:bg-gray-100 ${
                activeTab === "analysis" ? "bg-emerald-100 text-emerald-700 font-medium" : ""
              }`}
            >
              내 제품 분석 결과
            </button>
            <button
              onClick={() => setActiveTab("signout")}
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
    </div>
  );
};

export default MyPage;
