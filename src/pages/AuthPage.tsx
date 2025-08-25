import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Logo from "../assets/logo/decodeat.svg";
import AuthImg from "../assets/img/authpage.jpg";

// --- Types ---
interface Member {
  username: string;
  password: string;
  password2: string;
  birth: string; // ISO date string (YYYY-MM-DD)
  renew_time?: string;
}

// authApi가 프로젝트에 이미 있다면 아래 선언은 제거하셔도 됩니다.
// 존재하지 않는 경우, 최소 타입 보장을 위해 선언합니다.
declare const authApi: {
  checkUsername: (username: string) => Promise<boolean>; // true면 사용 불가(중복), false면 사용 가능
  create: (member: Member) => Promise<void>;
};

const AuthPage: React.FC = () => {
  const [member, setMember] = useState<Member>({
    username: "",
    password: "",
    password2: "",
    birth: "",
    renew_time: "",
  });

  const [checkError, setCheckError] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [loading, setLoading] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setMember((prev) => ({ ...prev, [id]: value }));
  };

  // 아이디 입력 시 중복체크 요구 안내
  const changeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setDisableSubmit(true);
    setCheckError(e.target.value ? "ID 중복 체크를 하셔야 합니다." : "");
  };

  const checkUsername = async () => {
    if (!member.username) {
      alert("사용자 ID를 입력하세요.");
      return;
    }
    try {
      setLoading(true);
      const isDuplicated = await authApi.checkUsername(member.username);
      setDisableSubmit(isDuplicated);
      setCheckError(isDuplicated ? "이미 사용중인 ID입니다." : "사용가능한 ID입니다.");
    } catch (err) {
      console.error(err);
      setCheckError("중복 확인 중 오류가 발생했습니다.");
      setDisableSubmit(true);
    } finally {
      setLoading(false);
    }
  };

  const join = async (e: FormEvent) => {
    e.preventDefault();

    if (!member.username || !member.password || !member.password2 || !member.birth) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    if (member.password !== member.password2) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // try {
    //   setLoading(true);
    //   await authApi.create(member);
    //   navigate("/login");
    // } catch (err) {
    //   console.error(err);
    //   alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className='flex h-screen'>
      {/* Left Section: Image/Branding */}
      <div className='hidden md:flex flex-1 bg-white items-center justify-center text-black'>
        <div className='text-center'>
          <div className='flex items-center justify-center gap-2 mt-4 mb-6'>
            <img src={Logo} alt='logo' className='h-16 md:h-20 w-auto' />
            <span className='text-3xl md:text-4xl font-bold'>Decodeat</span>
          </div>
          <img src={AuthImg} alt='Illustration' className='w-[600px] max-w-[80vw] h-auto mx-auto' />
        </div>
      </div>

      {/* Right Section: Join Form */}
      <div className='flex-1 bg-[#C3DCD4] flex items-center justify-center text-white'>
        <div className='bg-[#C3DCD4] w-full max-w-[500px] p-10 rounded-lg'>
          <h1 className='text-center text-[35px] font-semibold mb-2'>회원 가입</h1>
          <p className='text-center text-[18px] mb-7'>계정 생성을 위해 회원가입을 해주세요.</p>

          <form onSubmit={join}>
            {/* Username */}
            <div className='mb-3 mt-3'>
              <label htmlFor='username' className='block font-bold text-[18px] text-white mb-1'>
                아이디 *
                <button
                  type='button'
                  onClick={checkUsername}
                  className='ml-2 align-middle inline-flex items-center rounded-md bg-emerald-600 px-2 py-1 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50'
                  disabled={loading}
                >
                  {loading ? "확인 중..." : "중복 확인"}
                </button>
              </label>

              <input
                type='text'
                id='username'
                placeholder='아이디를 입력하세요.'
                className='w-full h-[50px] rounded-[13px] border border-white bg-transparent px-3 text-sm placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white'
                value={member.username}
                onChange={changeUsername}
                autoComplete='username'
              />
              {checkError && (
                <span className='mt-1 block text-[12px] text-red-500'>{checkError}</span>
              )}
            </div>

            {/* Password */}
            <div className='mb-3'>
              <label htmlFor='password' className='block font-bold text-[18px] text-white mb-1'>
                비밀번호 *
              </label>
              <input
                type='password'
                id='password'
                placeholder='비밀번호를 입력하세요.'
                className='w-full h-[50px] rounded-[13px] border border-white bg-transparent px-3 text-sm placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white'
                value={member.password}
                onChange={onChange}
                autoComplete='new-password'
              />
            </div>

            {/* Password Confirm */}
            <div className='mb-3'>
              <label htmlFor='password2' className='block font-bold text-[18px] text-white mb-1'>
                비밀번호 확인 *
              </label>
              <input
                type='password'
                id='password2'
                placeholder='비밀번호를 다시 입력하세요.'
                className='w-full h-[50px] rounded-[13px] border border-white bg-transparent px-3 text-sm placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white'
                value={member.password2}
                onChange={onChange}
                autoComplete='new-password'
              />
            </div>

            {/* Birth */}
            <div className='mb-3'>
              <label htmlFor='birth' className='block font-bold text-[18px] text-white mb-1'>
                생년월일 *
              </label>
              <input
                type='date'
                id='birth'
                placeholder='생년월일을 입력하세요...'
                className='w-full h-[50px] rounded-[13px] border border-white bg-transparent px-3 text-sm placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white'
                value={member.birth}
                onChange={onChange}
              />
            </div>

            <button
              type='submit'
              disabled={disableSubmit || loading}
              className='mt-4 w-full h-[50px] rounded-[13px] bg-[#44BB44] text-white font-semibold text-[17px] hover:bg-[#1a99e1] disabled:opacity-50'
            >
              회원가입
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
