import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/homePage';
import ErrorPage from '../pages/errorPage';
import EnrollPage from '../pages/enrollPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'child',
        element: <EnrollPage />,
      },
    ],
  },
]);

export default router;
