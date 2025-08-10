import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/errorPage';
import EnrollPage from '../pages/enrollPage';
import RootLayout from '../layout/RootLayout';
import DetailPage from '../pages/DetailPage';
import HomePage from '../pages/homePage';
import MyPage from '../pages/MyPage';
import SearchPage from '../pages/searchPage';
import OnBoardingPage from '../pages/OnboardingPage';
import AuthPage from '../pages/AuthPage';
import LoginPage from '../pages/LoginPage';
import SupportPage from '../pages/SupportPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true, // 홈페이지를 기본 경로로 설정
        element: <HomePage />,
      },
      {
        path: 'enroll',
        element: <EnrollPage />,
      },
      {
        path: 'detail',
        element: <DetailPage />,
      },
      {
        path: 'myPage',
        element: <MyPage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'onboarding',
        element: <OnBoardingPage />
      },
      {
        path: 'auth',
        element: <AuthPage />
      },
      {
        path: 'login',
        element: <LoginPage />
        element: <OnBoardingPage />,
      },
      {
        path: 'support',
        element: <SupportPage />,
      },
    ],
  },
]);

export default router;
