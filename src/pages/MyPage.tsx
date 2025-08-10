import type { FC } from 'react';
import { MyProductForm } from '../components/myPage/MyProductForm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  failReason?: string;
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
    failReason: '사진이 명확하지 않습니다.',
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
  photo = 'data:image/jpeg;base64,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',
  name = '바나',
  email = 'ryusangwan12@gmail.com',
}) => {
  const [filter, setFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('overview'); // 기본 탭을 오버뷰로 변경
  const navigate = useNavigate();
  const [openInProgressId, setOpenInProgressId] = useState<string | null>(null);
  const [openFailed, setOpenFailed] = useState<{
    id: string;
    reason: string;
  } | null>(null);

  // 프로필 상태 (오버뷰/설정 공유)
  const [profile, setProfile] = useState({
    name,
    nickname: '바나',
    gender: '남성',
    birthDate: '2002-11-21',
    phone: '010-4920-0409',
  });

  // Settings 폼 상태
  const [nicknameInput, setNicknameInput] = useState(profile.nickname);
  const [phoneInput, setPhoneInput] = useState(profile.phone);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordConfirmInput, setPasswordConfirmInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const formatPhone = (v: string) => {
    const d = v.replace(/\D/g, '');
    if (d.length <= 3) return d;
    if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`;
    return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7, 11)}`;
  };

  const phoneDigits = phoneInput.replace(/\D/g, '');
  const isPhoneValid = /^010\d{8}$/.test(phoneDigits);
  const isPasswordValid =
    (passwordInput === '' && passwordConfirmInput === '') ||
    (passwordInput.length >= 8 && passwordInput === passwordConfirmInput);
  const isFormValid =
    nicknameInput.trim().length > 0 && isPhoneValid && isPasswordValid;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setProfile((prev) => ({
      ...prev,
      nickname: nicknameInput.trim(),
      phone: phoneInput,
    }));
    // 비밀번호는 예시이므로 저장만 처리하고 초기화
    setPasswordInput('');
    setPasswordConfirmInput('');
    setActiveTab('overview');
  };

  // (필터 로직: 예시로 전체만 반환)
  const filtered = dummyAnalyses.filter(() => true);

  // 활성 탭에 따른 컨텐츠 렌더링
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6">개인정보 오버뷰</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-500 mb-1">이름</label>
                <div className="w-full h-12 px-4 rounded-lg border border-gray-200 flex items-center bg-gray-50 text-gray-700">
                  {profile.name}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  닉네임
                </label>
                <div className="w-full h-12 px-4 rounded-lg border border-gray-200 flex items-center bg-gray-50 text-gray-700">
                  {profile.nickname}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">성별</label>
                <div className="w-full h-12 px-4 rounded-lg border border-gray-200 flex items-center bg-gray-50 text-gray-700">
                  {profile.gender}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  생년월일
                </label>
                <div className="w-full h-12 px-4 rounded-lg border border-gray-200 flex items-center bg-gray-50 text-gray-700">
                  {profile.birthDate}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-500 mb-1">
                  전화번호
                </label>
                <div className="w-full h-12 px-4 rounded-lg border border-gray-200 flex items-center bg-gray-50 text-gray-700">
                  {profile.phone}
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
              >
                정보 수정
              </button>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6">정보 수정</h2>
            <form onSubmit={handleSave} className="space-y-5 max-w-2xl">
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  이름 (읽기 전용)
                </label>
                <input
                  type="text"
                  value={profile.name}
                  disabled
                  className="w-full h-12 px-4 rounded-lg border border-gray-200 bg-gray-50 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">닉네임</label>
                <input
                  type="text"
                  value={nicknameInput}
                  onChange={(e) => setNicknameInput(e.target.value)}
                  className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="닉네임을 입력하세요"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    성별 (읽기 전용)
                  </label>
                  <input
                    type="text"
                    value={profile.gender}
                    disabled
                    className="w-full h-12 px-4 rounded-lg border border-gray-200 bg-gray-50 text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    생년월일 (읽기 전용)
                  </label>
                  <input
                    type="text"
                    value={profile.birthDate}
                    disabled
                    className="w-full h-12 px-4 rounded-lg border border-gray-200 bg-gray-50 text-gray-700"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  전화번호
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(formatPhone(e.target.value))}
                  className={`w-full h-12 px-4 rounded-lg border focus:outline-none ${
                    isPhoneValid
                      ? 'border-gray-300 focus:ring-2 focus:ring-emerald-500'
                      : 'border-red-300 focus:ring-2 focus:ring-red-400'
                  }`}
                  placeholder="010-0000-0000"
                />
                {!isPhoneValid && (
                  <p className="mt-1 text-xs text-red-600">
                    010으로 시작하는 11자리 번호를 입력하세요.
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    비밀번호 (선택)
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className="w-full h-12 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="새 비밀번호"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                    >
                      {showPassword ? '숨김' : '보기'}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    비밀번호 확인
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswordConfirm ? 'text' : 'password'}
                      value={passwordConfirmInput}
                      onChange={(e) => setPasswordConfirmInput(e.target.value)}
                      className="w-full h-12 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="비밀번호 확인"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswordConfirm((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                    >
                      {showPasswordConfirm ? '숨김' : '보기'}
                    </button>
                  </div>
                  {!(passwordInput === '' && passwordConfirmInput === '') &&
                    passwordInput !== passwordConfirmInput && (
                      <p className="mt-1 text-xs text-red-600">
                        비밀번호가 일치하지 않습니다.
                      </p>
                    )}
                  {passwordInput !== '' && passwordInput.length < 8 && (
                    <p className="mt-1 text-xs text-red-600">
                      비밀번호는 8자 이상이어야 합니다.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    // 변경 취소: 입력값을 프로필로 되돌리고 오버뷰로 이동
                    setNicknameInput(profile.nickname);
                    setPhoneInput(profile.phone);
                    setPasswordInput('');
                    setPasswordConfirmInput('');
                    setActiveTab('overview');
                  }}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`px-4 py-2 rounded-lg text-white ${
                    isFormValid
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  정보 수정 완료
                </button>
              </div>
            </form>
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
              {filtered.map((a) => {
                const isInProgressOpen =
                  a.status === 'inProgress' && openInProgressId === a.id;
                return (
                  <div
                    key={a.id}
                    className="flex items-center justify-between border-b last:border-b-0 pb-4"
                  >
                    <div className="flex items-center gap-6">
                      <span className="text-sm text-gray-500 w-40 truncate">
                        {a.id}
                      </span>
                      <span
                        className={`
                          ${statusStyles[a.status]}
                          px-2 py-1 rounded text-xs font-medium w-24 text-center whitespace-nowrap
                        `}
                      >
                        {statusLabels[a.status]}
                      </span>
                      <div className="text-sm text-gray-500 w-40 whitespace-nowrap">
                        분석일: {a.date}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <img
                        src="https://m.eatthefit.com/web/product/extra/big/202507/e182b729685f4c8f52151ae9d5de5c68.png"
                        alt={`${a.id}-img`}
                        className="w-10 h-10 rounded-md object-cover"
                      />
                      <div className="relative ml-4">
                        <button
                          type="button"
                          aria-label={
                            a.status === 'completed'
                              ? '상세 보기'
                              : a.status === 'failed'
                                ? '실패 사유'
                                : '분석 중'
                          }
                          onClick={() => {
                            if (a.status === 'completed') {
                              navigate('/detail');
                            } else if (a.status === 'inProgress') {
                              setOpenInProgressId((prev) =>
                                prev === a.id ? null : a.id
                              );
                            } else if (a.status === 'failed') {
                              setOpenFailed({
                                id: a.id,
                                reason: a.failReason || '분석 실패',
                              });
                            }
                          }}
                          className={
                            `p-1 rounded ` +
                            (a.status === 'completed'
                              ? 'hover:bg-gray-100 cursor-pointer'
                              : a.status === 'failed'
                                ? 'cursor-pointer hover:bg-red-50'
                                : 'cursor-pointer')
                          }
                        >
                          {a.status === 'inProgress'
                            ? isInProgressOpen
                              ? 'v'
                              : '>'
                            : '>'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {openInProgressId && (
              <div className="fixed inset-0 z-40 flex items-center justify-center">
                <div
                  className="absolute inset-0 bg-black/40"
                  onClick={() => setOpenInProgressId(null)}
                />
                <div className="relative z-50 w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold">분석 중</h3>
                    <button
                      type="button"
                      className="p-1 rounded hover:bg-gray-100"
                      onClick={() => setOpenInProgressId(null)}
                      aria-label="닫기"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">
                    분석이 진행 중입니다. 잠시만 기다려 주세요.
                  </p>
                  <div className="mt-4 text-right">
                    <button
                      type="button"
                      className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700"
                      onClick={() => setOpenInProgressId(null)}
                    >
                      확인
                    </button>
                  </div>
                </div>
              </div>
            )}
            {openFailed && (
              <div className="fixed inset-0 z-40 flex items-center justify-center">
                <div
                  className="absolute inset-0 bg-black/40"
                  onClick={() => setOpenFailed(null)}
                />
                <div className="relative z-50 w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-red-600">
                      분석 실패
                    </h3>
                    <button
                      type="button"
                      className="p-1 rounded hover:bg-gray-100"
                      onClick={() => setOpenFailed(null)}
                      aria-label="닫기"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-sm text-gray-700">{openFailed.reason}</p>
                  <div className="mt-4 text-right">
                    <button
                      type="button"
                      className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                      onClick={() => setOpenFailed(null)}
                    >
                      확인
                    </button>
                  </div>
                </div>
              </div>
            )}
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
              개인 정보
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left flex items-center px-3 py-2 rounded hover:bg-gray-100 ${
                activeTab === 'settings'
                  ? 'bg-emerald-100 text-emerald-700 font-medium'
                  : ''
              }`}
            >
              설정
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
              로그아웃
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
