import type { FC } from 'react';
import { Camera } from 'lucide-react';
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

  // (필터 로직: 예시로 전체만 반환)
  const filtered = dummyAnalyses.filter(() => true);

  return (
    <div className="pt-16 bg-secondary min-h-screen">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow z-30">
        <div className="container mx-auto h-full flex items-center px-4">
          <a href="/" className="flex items-center space-x-2">
            <Camera className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold">Around</span>
          </a>
          <div className="ml-auto flex items-center space-x-4">
            <button
              className="p-2 rounded hover:bg-gray-100"
              aria-label="Toggle dark mode"
            >
              🌓
            </button>
            <div className="relative group">
              <button className="flex items-center space-x-2 focus:outline-none">
                <img
                  src={photo}
                  alt={name}
                  className="w-10 h-10 rounded-full border"
                />
                <div className="text-left">
                  <div className="text-xs text-gray-500">Hello,</div>
                  <div className="text-sm font-medium">{name}</div>
                </div>
              </button>
              <ul className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md hidden group-hover:block">
                <li>
                  <a
                    href="/account-overview"
                    className="block px-4 py-2 hover:bg-gray-50"
                  >
                    Overview
                  </a>
                </li>
                <li>
                  <a
                    href="/account-settings"
                    className="block px-4 py-2 hover:bg-gray-50"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="/account-signout"
                    className="block px-4 py-2 hover:bg-gray-50"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

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
            <a
              href="/account-overview"
              className="flex items-center px-3 py-2 rounded hover:bg-gray-100"
            >
              Overview
            </a>
            <a
              href="/account-settings"
              className="flex items-center px-3 py-2 rounded hover:bg-gray-100"
            >
              Settings
            </a>
            <a
              href="/account-analysis"
              className="flex items-center px-3 py-2 rounded bg-emerald-100 text-emerald-700 font-medium"
            >
              내 제품 분석 결과
            </a>
            <a
              href="/account-signout"
              className="flex items-center px-3 py-2 rounded hover:bg-gray-100"
            >
              Sign out
            </a>
          </nav>
        </aside>

        {/* 대시보드 */}
        <main className="col-span-3 space-y-6">
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
                  <div className="text-sm text-gray-500">분석일: {a.date}</div>
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
        </main>
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
