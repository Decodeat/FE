import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import EnrollPage from "../pages/EnrollPage";
import RootLayout from "../layout/RootLayout";
import DetailPage from "../pages/DetailPage";
import HomePage from "../pages/HomePage";
import MyPage from "../pages/MyPage";
import OnBoardingPage from "../pages/OnboardingPage";
import LoginPage from "../pages/LoginPage";
import SupportPage from "../pages/SupportPage";
import SearchPage from "../pages/SearchPage";
import AuthLayout from "../layout/AuthLayout";
import AdminReportDetail from "../components/admin/AdminReportDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "enroll",
        element: <EnrollPage />,
      },
      {
        path: "detail/:id",
        element: <DetailPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "myPage",
        element: <MyPage />,
      },
      {
        path: "onboarding",
        element: <OnBoardingPage />,
      },
      {
        path: "support",
        element: <SupportPage />,
      },
      {
        path: "admin/reports/:reportId",
        element: <AdminReportDetail />,
      },
    ],
  },
  // 인증 전용 레이아웃: 상단바 없이 렌더링
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [{ path: "/login", element: <LoginPage /> }],
  },
]);

export default router;
