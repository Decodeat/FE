import { useState, useEffect, useRef } from 'react';
import type { FC, ChangeEvent, FormEvent } from 'react';
import { Camera, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EnrollPage: FC = () => {
  const navigate = useNavigate();
  // --- State 정의 ---
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 파일 input ref (값 초기화용)
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- 파일 선택 핸들러 & 미리보기 생성 ---
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
    if (selected) {
      const url = URL.createObjectURL(selected);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  // --- 이미지 지우기 버튼 핸들러 ---
  const handleClearImage = (): void => {
    setFile(null);
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
    // 같은 파일 재선택을 위해 input 값을 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 언마운트 시 URL 해제
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // --- 폼 제출 핸들러 ---
  // const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
  //   e.preventDefault();
  //   if (!file || !companyName.trim() || !productName.trim()) {
  //     alert('사진, 회사명, 제품명은 필수 입력 항목입니다.');
  //     return;
  //   }

  //   setIsSubmitting(true);
  //   try {
  //     const formData = new FormData();
  //     formData.append('image', file);
  //     formData.append('company', companyName);
  //     formData.append('product', productName);
  //     formData.append('description', description);

  //     // TODO: 실제 API 엔드포인트로 수정하세요
  //     const res = await fetch('/api/products', {
  //       method: 'POST',
  //       body: formData,
  //     });
  //     if (!res.ok) throw new Error('서버 오류');
  //     alert('제품 등록 요청이 정상적으로 완료되었습니다.');

  //     // 초기화
  //     handleClearImage();
  //     setCompanyName('');
  //     setProductName('');
  //     setDescription('');
  //   } catch (err) {
  //     console.error(err);
  //     alert('등록 중 오류가 발생했습니다. 다시 시도해주세요.');
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmit = () => {
    alert('제품 등록 요청이 정상적으로 완료되었습니다.');
    navigate('/');
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 메인 배너 */}
      <section className="w-full bg-[#D2EDE4] py-20 text-center relative overflow-hidden">
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2D5945] mb-2">
            제품 등록하기
          </h1>
          <p className="text-gray-700 mb-4">
            Tip. 영양정보 라벨이 잘 보이게 찍어주세요!
          </p>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <div className="w-full h-full bg-gradient-to-l from-white/20 to-transparent" />
        </div>
      </section>

      {/* 제품 등록 폼 */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* 사진 등록 */}
          <div className="space-y-3 h-full flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              사진 등록 <span className="text-red-500">*</span>
            </label>
            <div
              className={`
                relative aspect-square border-2 border-dashed border-gray-300 rounded-lg bg-white
                flex items-center justify-center transition-colors
                ${preview ? 'cursor-default border-gray-300' : 'cursor-pointer hover:border-gray-400'}
              `}
            >
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt="업로드 미리보기"
                    className="object-cover w-full h-full rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleClearImage}
                    className="
                      absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white
                      focus:outline-none"
                    aria-label="사진 지우기"
                  >
                    <X className="w-4 h-4 text-gray-700" />
                  </button>
                </>
              ) : (
                <div className="space-y-4 text-center text-gray-500">
                  <Camera className="mx-auto w-16 h-16 text-gray-400" />
                  <p>클릭하여 사진을 업로드하세요</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={`
                  absolute inset-0 w-full h-full opacity-0
                  ${preview ? 'pointer-events-none' : 'cursor-pointer'}
                `}
              />
            </div>
          </div>

          {/* 제품 정보 입력 */}
          <div className="space-y-5 h-full flex flex-col">
            {/* 회사명 */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-700">
                회사명 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#79CCB1] focus:border-[#79CCB1] outline-none transition-colors"
                placeholder="회사명을 입력하세요"
              />
            </div>

            {/* 제품명 */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-700">
                제품명 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#79CCB1] focus:border-[#79CCB1] outline-none transition-colors"
                placeholder="제품명을 입력하세요"
              />
            </div>

            {/* 추가 설명 */}
            <div className="space-y-4 flex-1">
              <label className="text-sm font-medium text-gray-700">
                추가 설명
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isSubmitting}
                className="w-full h-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#79CCB1] focus:border-[#79CCB1] outline-none transition-colors resize-none"
                placeholder="제품에 대한 추가 정보를 입력하세요 (선택사항)"
              />
            </div>

            {/* 제품 등록 버튼 */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#D2EDE4] text-[#2D6451] py-4 rounded-lg font-medium hover:bg-[#6BB89F] transition-colors text-lg mt-4 disabled:opacity-50"
            >
              {isSubmitting ? '등록 중…' : '제품 등록 요청하기'}
            </button>
          </div>
        </div>
      </section>
    </form>
  );
};

export default EnrollPage;
