// 쿠키에서 토큰을 가져오는 유틸리티 함수
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

// 토큰 관리 유틸리티
export const tokenManager = {
  getToken: (): string | null => {
    return getCookie("accessToken");
  },

  getRefreshToken: (): string | null => {
    return getCookie("refreshToken");
  },

  // 쿠키는 서버에서 설정하므로 클라이언트에서는 삭제만 가능
  removeToken: (): void => {
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  },

  hasToken: (): boolean => {
    const accessToken = getCookie("accessToken");
    return accessToken !== null && accessToken !== "";
  },
};
