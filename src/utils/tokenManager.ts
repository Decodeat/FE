// 임시 하드코딩된 토큰 (테스트용)
const HARDCODED_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJpc3MiOiJkZWNvZEVhdEBnbWFpbC5jb20iLCJpYXQiOjE3NTczMTUxNjksImV4cCI6MTc1NzMxODc2OSwic3ViIjoicnl1c2FuZ3dhbjEyQG5hdmVyLmNvbSIsImlkIjozLCJyb2xlIjoiUk9MRV9VU0VSIn0.t_vF7L0med-o7P16bOh4pSJ0hPplqOvTK_LQV1-ooxE8aU8JsvArVn-4c2kEUS5L";

// 토큰 관리 유틸리티
export const tokenManager = {
  getToken: (): string | null => {
    return HARDCODED_TOKEN; // 임시로 하드코딩된 토큰 반환
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setToken: (_token: string): void => {
    // 임시로 아무것도 하지 않음 (테스트용)
  },

  removeToken: (): void => {
    // 임시로 아무것도 하지 않음
  },

  hasToken: (): boolean => {
    return true; // 항상 로그인 상태로 간주
  },
};
