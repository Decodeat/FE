import type { FC } from 'react';
import { MyProductForm } from '../components/myPage/MyProductForm';
import { useState } from 'react';

interface MyPageProps {
  photo?: string;
  name?: string;
  email?: string;
}

type Status = 'completed' | 'failed' | 'inProgress';

interface Analysis {
  id: string;
  status: Status;
  date: string;
  total: string;
  images: string[];
}

const dummyAnalyses: Analysis[] = [
  {
    id: '#78A6431D409',
    status: 'completed',
    date: 'Jan 27, 2022',
    total: '$16.00',
    images: ['/assets/img/account/orders/01.png'],
  },
  {
    id: '#47H76G09F33',
    status: 'failed',
    date: 'Sep 14, 2022',
    total: '$59.00',
    images: [
      '/assets/img/account/orders/02.png',
      '/assets/img/account/orders/03.png',
      '/assets/img/account/orders/04.png',
    ],
  },
  {
    id: '#34VB5540K83',
    status: 'inProgress',
    date: 'Jul 10, 2022',
    total: '$38.00',
    images: [
      '/assets/img/account/orders/01.png',
      '/assets/img/account/orders/05.png',
    ],
  },
  {
    id: '#502TR872W2',
    status: 'inProgress',
    date: 'May 11, 2022',
    total: '$17.00',
    images: ['/assets/img/account/orders/06.png'],
  },
];

// 상태별 badge 스타일
const statusStyles: Record<Status, string> = {
  completed: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
  inProgress: 'bg-yellow-100 text-yellow-700',
};
const statusLabels: Record<Status, string> = {
  completed: '분석 완료',
  failed: '분석 실패',
  inProgress: '분석 중',
};

export const MyPage: FC<MyPageProps> = ({
  photo = '/default-avatar.png',
  name = 'Guest',
  email = '—',
}) => {
  const [filter, setFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('analysis'); // 현재 활성 탭

  // (필터 로직: 예시로 전체만 반환)
  const filtered = dummyAnalyses.filter(() => true);

  // 활성 탭에 따른 컨텐츠 렌더링
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Overview</h2>
            <p className="text-gray-600">계정 개요 정보가 여기에 표시됩니다.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Settings</h2>
            <p className="text-gray-600">계정 설정이 여기에 표시됩니다.</p>
          </div>
        );
      case 'analysis':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">내가 등록한 제품 분석 결과</h1>
              <MyProductForm filter={filter} onFilterChange={setFilter} />
            </div>
            <div className="bg-white rounded-xl p-6 space-y-4 shadow-sm">
              {filtered.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between border-b last:border-b-0 pb-4"
                >
                  <div className="flex items-center space-x-6">
                    <span className="text-sm text-gray-500">{a.id}</span>
                    <span
                      className={`
                        ${statusStyles[a.status]}
                        px-2 py-1 rounded text-xs font-medium
                      `}
                    >
                      {statusLabels[a.status]}
                    </span>
                    <div className="text-sm text-gray-500">
                      분석일: {a.date}
                    </div>
                    <div className="text-sm text-gray-500">총: {a.total}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {a.images.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={`${a.id}-img${i}`}
                        className="w-10 h-10 rounded-md object-cover"
                      />
                    ))}
                    <button
                      type="button"
                      aria-label="Expand"
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 10a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'signout':
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Sign out</h2>
            <p className="text-gray-600">로그아웃 하시겠습니까?</p>
            <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              로그아웃
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="pt-16 bg-secondary min-h-screen">
      {/* 헤더 */}

      {/* 컨텐츠 */}
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 사이드바 */}
        <aside className="col-span-1 space-y-6 sticky top-16 self-start">
          <div className="text-center">
            <img
              src={photo}
              alt={name}
              className="mx-auto w-20 h-20 rounded-full"
            />
            <h3 className="mt-2 text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-500">{email}</p>
          </div>
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left flex items-center px-3 py-2 rounded hover:bg-gray-100 ${
                activeTab === 'overview'
                  ? 'bg-emerald-100 text-emerald-700 font-medium'
                  : ''
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left flex items-center px-3 py-2 rounded hover:bg-gray-100 ${
                activeTab === 'settings'
                  ? 'bg-emerald-100 text-emerald-700 font-medium'
                  : ''
              }`}
            >
              Settings
            </button>
            <button
              onClick={() => setActiveTab('analysis')}
              className={`w-full text-left flex items-center px-3 py-2 rounded hover:bg-gray-100 ${
                activeTab === 'analysis'
                  ? 'bg-emerald-100 text-emerald-700 font-medium'
                  : ''
              }`}
            >
              내 제품 분석 결과
            </button>
            <button
              onClick={() => setActiveTab('signout')}
              className={`w-full text-left flex items-center px-3 py-2 rounded hover:bg-gray-100 ${
                activeTab === 'signout'
                  ? 'bg-emerald-100 text-emerald-700 font-medium'
                  : ''
              }`}
            >
              Sign out
            </button>
          </nav>
        </aside>

        {/* 대시보드 */}
        <main className="col-span-3">{renderContent()}</main>
      </div>

      {/* 푸터 */}
      <footer className="mt-12 bg-dark text-white py-8">
        <div className="container mx-auto text-center text-sm">
          © 2025 Around. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default MyPage;
