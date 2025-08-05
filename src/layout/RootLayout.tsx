import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftGNB from '../components/gnb/LeftGNB';
import TopGNB from '../components/gnb/TopGNB';

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
        <main className="flex-1 ml-64 pt-12">
          {' '}
          {/* ml-64 for sidebar width, pt-16 for top nav height */}
          <div className="container mx-auto px-4 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
