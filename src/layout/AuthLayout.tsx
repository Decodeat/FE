import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

// 인증 전용 레이아웃: 상단바/푸터 없이 페이지만 렌더링
const AuthLayout: React.FC = () => {
  const location = useLocation();

  // 페이지 변경 시 스크롤 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return <Outlet />;
};

export default AuthLayout;
