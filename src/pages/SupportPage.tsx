import React, { useState } from 'react';
import { Mail, MessageSquare, FileText } from 'lucide-react';

const SupportPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('general');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isEmailValid = /.+@.+\..+/.test(email);
  const isValid = name.trim() && isEmailValid && message.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    // TODO: 실제 전송 API 연동
    setSubmitted(true);
    setName('');
    setEmail('');
    setType('general');
    setMessage('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <section className="w-full bg-[#D2EDE4] py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#2D5945] mb-2">
          문의하기
        </h2>
        <p className="text-gray-700 mb-4">
          서비스 이용 중 궁금한 점을 남겨 주세요. 최대한 빠르게 도와드릴게요.
        </p>
      </section>
     
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
      {/* 연락 카드 */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-emerald-600" />
            <h3 className="font-semibold">이메일 문의</h3>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            답변은 영업일 기준 24시간 내에 발송됩니다.
          </p>
          <a
            href="mailto:support@decodeat.com"
            className="mt-3 inline-block text-emerald-600 hover:underline"
          >
            support@decodeat.com
          </a>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-emerald-600" />
            <h3 className="font-semibold">FAQ</h3>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            자주 묻는 질문에서 빠르게 해결하세요.
          </p>
          <a
            href="#faq"
            className="mt-3 inline-block text-emerald-600 hover:underline"
          >
            FAQ 바로가기
          </a>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-emerald-600" />
            <h3 className="font-semibold">가이드</h3>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            제품 등록과 분석 과정 가이드를 확인하세요.
          </p>
          <a
            href="/onboarding"
            className="mt-3 inline-block text-emerald-600 hover:underline"
          >
            시작 가이드
          </a>
        </div>
      </section>

      {/* 문의 폼 */}
      <section className="bg-white rounded-xl p-6 border border-gray-200 mt-5">
        <h2 className="text-xl font-semibold mb-4">문의 남기기</h2>
        {submitted && (
          <div className="mb-4 rounded-lg bg-emerald-50 text-emerald-800 px-4 py-2 text-sm">
            문의가 전송되었습니다. 빠르게 답변 드릴게요.
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm text-gray-600 mb-1">이름</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="홍길동"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full h-11 px-3 rounded-lg border focus:outline-none ${
                isEmailValid
                  ? 'border-gray-300 focus:ring-2 focus:ring-emerald-500'
                  : 'border-red-300 focus:ring-2 focus:ring-red-400'
              }`}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              문의 유형
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="general">일반 문의</option>
              <option value="billing">결제/환불</option>
              <option value="bug">버그/오류 신고</option>
              <option value="feature">기능 제안</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">내용</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="문의 내용을 자세히 작성해 주세요."
            />
          </div>
          <div className="md:col-span-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setName('');
                setEmail('');
                setType('general');
                setMessage('');
              }}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              초기화
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className={`px-4 py-2 rounded-lg text-white ${isValid ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-gray-300 cursor-not-allowed'}`}
            >
              문의 보내기
            </button>
          </div>
        </form>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="bg-white rounded-xl p-6 border border-gray-200 mt-5"
      >
        <h2 className="text-xl font-semibold mb-4">자주 묻는 질문</h2>
        <div className="divide-y divide-gray-200">
          <details className="py-3 group">
            <summary className="cursor-pointer font-medium flex items-center justify-between">
              제품 사진은 어떻게 올리나요?
              <span className="text-gray-400 group-open:rotate-180 transition-transform">
                ⌄
              </span>
            </summary>
            <p className="mt-2 text-sm text-gray-600">
              제품 등록 페이지에서 사진을 첨부하신 뒤 안내에 따라 업로드하면
              됩니다.
            </p>
          </details>
          <details className="py-3 group">
            <summary className="cursor-pointer font-medium flex items-center justify-between">
              분석에는 얼마나 걸리나요?
              <span className="text-gray-400 group-open:rotate-180 transition-transform">
                ⌄
              </span>
            </summary>
            <p className="mt-2 text-sm text-gray-600">
              일반적으로 수 분 내에 완료되며, 마이페이지에서 진행 상황을 확인할
              수 있습니다.
            </p>
          </details>
          <details className="py-3 group">
            <summary className="cursor-pointer font-medium flex items-center justify-between">
              환불은 어떻게 요청하나요?
              <span className="text-gray-400 group-open:rotate-180 transition-transform">
                ⌄
              </span>
            </summary>
            <p className="mt-2 text-sm text-gray-600">
              결제/환불 문의 유형을 선택하여 문의를 남겨주시면 안내드립니다.
            </p>
          </details>
        </div>
      </section>
      </div>
    </div>
  );
};

export default SupportPage;
