import { useState, useEffect } from "react";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import UploadSlot from "../components/enroll/UploadSlot";

const EnrollPage: FC = () => {
  const navigate = useNavigate();

  // 원재료/영양정보 표(2칸), 제품 사진(1칸)
  const [ingNutri, setIngNutri] = useState<Array<string | null>>([null, null]);
  const [productPhoto, setProductPhoto] = useState<string | null>(null);

  // 텍스트 필드
  const [companyName, setCompanyName] = useState("");
  const [productName, setProductName] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // blob url 해제
  useEffect(() => {
    return () => {
      ingNutri.forEach((url) => url && URL.revokeObjectURL(url));
      if (productPhoto) URL.revokeObjectURL(productPhoto);
    };
  }, [ingNutri, productPhoto]);

  const handleSlotChange = (
    group: "ing" | "prod",
    indexOrFile: number | File | null,
    f?: File | null,
  ) => {
    if (group === "ing") {
      const index = indexOrFile as number;
      const file = f ?? null;
      setIngNutri((prev) => {
        if (prev[index]) URL.revokeObjectURL(prev[index]!);
        return prev.map((v, i) => (i === index ? (file ? URL.createObjectURL(file) : null) : v));
      });
    } else {
      const file = indexOrFile as File | null;
      if (productPhoto) URL.revokeObjectURL(productPhoto);
      setProductPhoto(file ? URL.createObjectURL(file) : null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 검증: 원재료/영양정보 표는 최소 1장 이상
    const ingCount = ingNutri.filter(Boolean).length;
    if (ingCount < 1) {
      alert("원재료명 및 영양정보 표 사진을 최소 1장 이상 업로드해 주세요.");
      return;
    }
    setIsSubmitting(true);

    // 실제 업로드 로직 위치 (FormData 구성 등)
    alert("제품 등록 요청이 정상적으로 완료되었습니다.");
    navigate("/");
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* 배너 */}
      <section className="w-full bg-[#D2EDE4] py-16 text-center relative overflow-hidden">
        <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2D5945] mb-2">제품 등록하기</h1>
          <p className="text-gray-700">Tip. 영양정보 라벨이 잘 보이게 찍어주세요!</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* ===== ① 원재료/영양정보 표 (필수, 2칸) ===== */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-gray-800">
              원재료명 및 영양정보 표 사진 등록 <span className="text-red-500">*</span>
            </label>

            <div className="flex items-center gap-4">
              <UploadSlot
                preview={ingNutri[0]}
                onChange={(file) => handleSlotChange("ing", 0, file)}
                onClear={() => handleSlotChange("ing", 0, null)}
                ariaLabel="원재료/영양정보 첫 번째 사진"
                disabled={isSubmitting}
              />
              <UploadSlot
                preview={ingNutri[1]}
                onChange={(file) => handleSlotChange("ing", 1, file)}
                onClear={() => handleSlotChange("ing", 1, null)}
                ariaLabel="원재료/영양정보 두 번째 사진"
                disabled={isSubmitting}
              />
            </div>

            <p className="text-xs text-gray-500">
              원재료와 영양정보 표가 한 장에 다 보이지 않을 때만 사진을 두 장 등록해 주세요.
            </p>
          </div>

          {/* ===== ② 제품 사진 (선택, 1칸) ===== */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-gray-800">제품 사진 등록 (선택)</label>
            <UploadSlot
              preview={productPhoto}
              onChange={(file) => handleSlotChange("prod", file)}
              onClear={() => handleSlotChange("prod", null)}
              ariaLabel="제품 사진"
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* ===== 텍스트 필드들 ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              제품명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              disabled={isSubmitting}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#79CCB1] focus:border-[#79CCB1] outline-none"
              placeholder="제품명을 입력하세요"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              회사명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              disabled={isSubmitting}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#79CCB1] focus:border-[#79CCB1] outline-none"
              placeholder="회사명을 입력하세요"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-16 w-full bg-[#D2EDE4] text-[#2D5945] py-4 rounded-lg font-medium hover:bg-[#79CCB1] transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "등록 중…" : "제품 분석 요청하기"}
        </button>
      </section>
    </form>
  );
};

export default EnrollPage;
