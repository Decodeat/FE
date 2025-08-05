import { Outlet } from 'react-router-dom';
import LeftGNB from '../components/gnb/LeftGNB';
import TopGNB from '../components/gnb/TopGNB';

// Layout constants
const LAYOUT_CONSTANTS = {
  SIDEBAR_WIDTH: 'w-64', // 256px
  SIDEBAR_MARGIN: 'ml-64', // 256px
  TOP_NAV_HEIGHT: 'pt-12', // 48px
} as const;

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <TopGNB />

      {/* Main Layout Container */}
      <div className="flex">
        {/* Left Sidebar */}
        <LeftGNB />

        {/* Main Content Area */}
        <main
          className={`flex-1 ${LAYOUT_CONSTANTS.SIDEBAR_MARGIN} ${LAYOUT_CONSTANTS.TOP_NAV_HEIGHT}`}
        >
          {/* Margin left for sidebar width, padding top for nav height */}
          <div className="container mx-auto px-4 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
