import type { FC } from "react";

export const Settings: FC = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-6">설정</h2>

      <div className="space-y-6">
        {/* 알림 설정 */}
        <div>
          <h3 className="font-semibold text-lg mb-3">알림 설정</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="text-sm">이메일 알림</span>
              <input type="checkbox" className="toggle" defaultChecked />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm">푸시 알림</span>
              <input type="checkbox" className="toggle" defaultChecked />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm">분석 완료 알림</span>
              <input type="checkbox" className="toggle" defaultChecked />
            </label>
          </div>
        </div>

        {/* 개인정보 설정 */}
        <div>
          <h3 className="font-semibold text-lg mb-3">개인정보 설정</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="text-sm">프로필 공개</span>
              <input type="checkbox" className="toggle" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm">분석 기록 공개</span>
              <input type="checkbox" className="toggle" />
            </label>
          </div>
        </div>

        {/* 언어 설정 */}
        <div>
          <h3 className="font-semibold text-lg mb-3">언어 설정</h3>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <option value="ko">한국어</option>
            <option value="en">English</option>
            <option value="ja">日本語</option>
          </select>
        </div>

        {/* 계정 관리 */}
        <div>
          <h3 className="font-semibold text-lg mb-3">계정 관리</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
              비밀번호 변경
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded">
              계정 삭제
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors"
        >
          설정 저장
        </button>
      </div>
    </div>
  );
};
