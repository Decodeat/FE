import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import EnrollPage from '../pages/EnrollPage';
import RootLayout from '../layout/RootLayout';
import Detail from '../pages/detail/Detail';
import HomePage from '../pages/homePage';

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
        element: <Detail />,
      },
    ],
  },
]);

export default router;
