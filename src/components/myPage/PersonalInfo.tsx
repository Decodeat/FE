import type { FC } from "react";

interface PersonalInfoProps {
  name?: string;
  email?: string;
}

export const PersonalInfo: FC<PersonalInfoProps> = ({
  name = "홍길동",
  email = "hong@example.com",
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-6">개인 정보</h2>

      <div className="space-y-6">
        {/* 프로필 정보 */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-[#D2EDE4] rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-[#2D5945]">
              {name ? name.charAt(0).toUpperCase() : "U"}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-gray-600">{email}</p>
          </div>
        </div>

        {/* 개인정보 폼 */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
            <input
              type="text"
              defaultValue={name}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
            <input
              type="email"
              defaultValue={email}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
            <input
              type="tel"
              placeholder="010-0000-0000"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors"
          >
            저장
          </button>
        </form>
      </div>
    </div>
  );
};
