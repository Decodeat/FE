// src/pages/LoginPage.tsx
import React, { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import authImgUrl from "../assets/img/authpage.jpg";
import logoUrl from "../assets/logo/decodeat.svg";

// 필요 시 실제 auth 모듈로 교체하세요.
declare const authApi: {
  login: (cred: { username: string; password: string }) => Promise<boolean>;
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("decodeat1234");
  const [password, setPassword] = useState<string>("1234");
  const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const disableSubmit = !(username && password);

  useEffect(() => {
    // 원본 코드에 localStorage.clear()가 있어 유지
    localStorage.clear();
  }, []);

  const onChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const togglePasswordVisibility = () => setPasswordHidden((v) => !v);

  const login = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const ok = await authApi.login({ username, password });
      if (ok) {
        await navigate("/");
      } else {
        setError("로그인에 실패하였습니다. 다시 시도해주세요.");
      }
    } catch (err: any) {
      setError(err?.response?.data || "로그인 처리 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section: Image/Branding */}
      <div className="hidden md:flex flex-1 bg-white items-center justify-center text-black">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mt-4 mb-6">
            <img src={logoUrl} alt="logo" className="h-16 md:h-20 w-auto" />
            <span className="text-3xl md:text-4xl font-bold">Decodeat</span>
          </div>
          <img
            src={authImgUrl}
            alt="Illustration"
            className="w-[600px] max-w-[80vw] h-auto mx-auto"
          />
        </div>
      </div>

      {/* Right Section: Login Form */}
      <div className="flex-1 bg-[#C3DCD4] flex items-center justify-center text-white">
        <div className="w-full max-w-[500px] p-10 rounded-lg">
          <h2 className="text-white text-4xl font-semibold mb-2">환영합니다!</h2>
          <p className="text-xl font-semibold mb-7">Decodeat 를 계속 이용하시려면 로그인을 해주세요</p>

          <form onSubmit={login}>
            {/* Username */}
            <div className="mb-3 mt-3 text-left">
              <label htmlFor="username" className="block font-bold text-[18px] text-white mb-1">
                아이디
              </label>
              <input
                id="username"
                type="text"
                placeholder="아이디를 입력하세요."
                className="w-full h-[50px] rounded-[13px] border border-white bg-transparent px-3 text-sm placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
                value={username}
                onChange={onChange(setUsername)}
                autoComplete="username"
              />
            </div>

            {/* Password */}
            <div className="mb-3 text-left mt-8">
              <label htmlFor="password" className="block font-bold text-[18px] text-white mb-1">
                비밀번호
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={passwordHidden ? "password" : "text"}
                  placeholder="비밀번호를 입력하세요."
                  className="w-full h-[50px] rounded-[13px] border border-white bg-transparent px-3 pr-10 text-sm placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
                  value={password}
                  onChange={onChange(setPassword)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  aria-label={passwordHidden ? "비밀번호 보기" : "비밀번호 숨기기"}
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center"
                >
                  {/* 간단한 아이콘(SVG) */}
                  {passwordHidden ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black/80" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeWidth="2" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                      <circle cx="12" cy="12" r="3" strokeWidth="2" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black/80" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeWidth="2" d="M3 3l18 18" />
                      <path strokeWidth="2" d="M10.58 10.58A3 3 0 0113.42 13.42" />
                      <path strokeWidth="2" d="M2 12s3.5-7 10-7a9.74 9.74 0 016.37 2.37M22 12s-3.5 7-10 7a9.74 9.74 0 01-6.37-2.37" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {/* {error && <div className="text-red-500 mt-2 text-center">{error}</div>} */}

            {/* Submit */}
            <Link
                to="/"
                className="mt-4 inline-flex w-full h-[50px] items-center justify-center rounded-[13px] bg-[#44BB44] text-white font-semibold text-[17px] hover:bg-[#3aa33a]"
                >
                로그인
                </Link>

            {/* Link to Join */}
            <div className="text-center pt-6">
              <Link to="/auth" className="text-white text-[15px] hover:font-bold">
                회원이 아니신가요? 가입하기
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
