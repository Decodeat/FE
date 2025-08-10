import React from 'react';
import { Outlet } from 'react-router-dom';

// 인증 전용 레이아웃: 상단바/푸터 없이 페이지만 렌더링
const AuthLayout: React.FC = () => {
  return <Outlet />;
};

export default AuthLayout;
