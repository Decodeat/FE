import { Outlet } from 'react-router-dom';
import LeftGNB from '../components/gnb/LeftGNB';
import TopGNB from '../components/gnb/TopGNB';

const RootLayout = () => {
  return (
    <div>
      <LeftGNB />
      <TopGNB />
      <Outlet />
    </div>
  );
};

export default RootLayout;
