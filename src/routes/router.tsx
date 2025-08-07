import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import EnrollPage from '../pages/EnrollPage';
import RootLayout from '../layout/RootLayout';
import DetailPage from '../pages/DetailPage';
import HomePage from '../pages/homePage';
import MyPage from '../pages/MyPage';
import SearchPage from '../pages/searchPage';

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
    ],
  },
]);

export default router;
