import authImgUrl from "../assets/img/authpage1.png";
import logoUrl from "../assets/logo/decodeat.svg";
import React from "react";
import { Home } from "lucide-react";
import kakaoLogo from "../assets/logo/signInKakaoLogo.svg";
import { useNavigate } from "react-router-dom";

const DecodEatLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const handleKakaoLogin = () => {
    console.log("카카오 로그인 시작");
  };

  const handleGoHome = () => {
    console.log("홈으로 이동");
    navigate("/");
  };

  return (
    <div className='flex flex-col lg:flex-row h-screen bg-gradient-to-r from-white from-30% to-[#CEE1CB]'>
      {/* 홈 버튼 */}
      <button
        onClick={handleGoHome}
        className='cursor-pointer fixed top-4 right-4 z-10 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200'
        title='홈으로 돌아가기'
      >
        <Home className='w-4 h-4 text-gray-600' />
      </button>

      {/* 이미지/브랜딩 */}
      <div className='w-full lg:w-1/2 h-full flex flex-col items-center justify-center text-black py-8'>
        <div className='flex items-center gap-2 mb-6'>
          <img src={logoUrl} alt='logo' className='h-16 w-auto' />
          <button
            onClick={handleGoHome}
            className='text-3xl font-bold text-[#2D5945] cursor-pointer'
          >
            DecodEat
          </button>
        </div>
        <img
          src={authImgUrl}
          alt='영양정보 분석 일러스트'
          className='w-[500px] max-w-[80vw] h-auto mx-auto'
        />
      </div>

      {/* 로그인 폼 */}
      <div className='w-full lg:w-1/2 h-full flex items-center justify-center px-8'>
        <div className='w-full max-w-lg'>
          <div className='bg-white rounded-2xl shadow-lg p-10 text-center'>
            <h1 className='text-3xl font-bold text-[#2D5945] mb-4'>로그인</h1>
            <p className='text-gray-600 mb-10 text-lg'>카카오 계정으로 간편하게 시작하세요</p>

            <button
              onClick={handleKakaoLogin}
              className='w-full bg-[#FEE500] hover:bg-[#FEE500]/90 text-black font-medium py-5 px-8 rounded-xl flex items-center justify-center space-x-3 transition-colors duration-200 shadow-sm hover:shadow-md'
              style={{
                backgroundColor: "#FEE500",
                borderRadius: "12px",
                fontSize: "18px",
                fontWeight: "500",
              }}
            >
              <img src={kakaoLogo} alt='kakao logo' className='w-6 h-6 mr-3' />
              <span style={{ color: "rgba(0, 0, 0, 0.85)" }}>카카오 로그인</span>
            </button>

            <div className='text-center pt-8 mt-8 border-t border-gray-100'>
              <p className='text-sm text-gray-500'>
                로그인하면 서비스 이용약관 및 개인정보처리방침에 동의하게 됩니다
              </p>
            </div>
          </div>

          <footer className='text-center mt-8'>
            <p className='text-base text-gray-500'>
              © All rights reserved. Made by{" "}
              <a
                href='https://github.com/wantkdd'
                target='_blank'
                rel='noopener noreferrer'
                className='text-[#2D5945] hover:text-[#2D5945]/80 transition-colors duration-200'
              >
                바나
              </a>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default DecodEatLoginPage;
