import { useEffect, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import UploadSlot from "../components/enroll/UploadSlot";
import { useEnroll } from "../hooks/useEnroll";
import { useMessageModal } from "../hooks/useMessageModal";
import MessageModal from "../components/ui/MessageModal";
import type { EnrollFormData } from "../types/enroll";

const EnrollPage: FC = () => {
  const navigate = useNavigate();
  const { modalState, showSuccess, showError, hideModal } = useMessageModal();

  // 미리보기 URL
  const [ingNutriPreviews, setIngNutriPreviews] = useState<(string | null)[]>([null, null]);
  const [productPhotoPreview, setProductPhotoPreview] = useState<string | null>(null);

  // 업로드 파일 상태
  const [ingNutriFiles, setIngNutriFiles] = useState<(File | null)[]>([null, null]);
  const [productPhotoFile, setProductPhotoFile] = useState<File | null>(null);

  // 텍스트 필드
  const [companyName, setCompanyName] = useState("");
  const [productName, setProductName] = useState("");

  const { mutate: enrollProduct, isPending } = useEnroll();

  // ✅ 전역 드래그 상태
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleDragEnter = (e: DragEvent) => {
      if (e.dataTransfer?.types.includes("Files")) {
        setIsDragging(true);
      }
    };
    const handleDragLeave = (e: DragEvent) => {
      if (e.clientX === 0 && e.clientY === 0) {
        setIsDragging(false);
      }
    };
    const handleDrop = () => setIsDragging(false);

    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("drop", handleDrop);
    };
  }, []);

  // blob url 정리
  useEffect(() => {
    return () => {
      ingNutriPreviews.forEach((url) => url && URL.revokeObjectURL(url));
      if (productPhotoPreview) URL.revokeObjectURL(productPhotoPreview);
    };
  }, [ingNutriPreviews, productPhotoPreview]);

  const handleIngSlotChange = (index: number, file: File | null) => {
    setIngNutriFiles((prev) => prev.map((f, i) => (i === index ? file : f)));
    setIngNutriPreviews((prev) => {
      if (prev[index]) URL.revokeObjectURL(prev[index]!);
      const next = [...prev];
      next[index] = file ? URL.createObjectURL(file) : null;
      return next;
    });
  };

  const handleProdSlotChange = (file: File | null) => {
    setProductPhotoFile(file);
    setProductPhotoPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return file ? URL.createObjectURL(file) : null;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim()) {
      showError("제품명을 입력해 주세요.");
      return;
    }
    if (!companyName.trim()) {
      showError("회사명을 입력해 주세요.");
      return;
    }
    const validIngNutriFiles = ingNutriFiles.filter(Boolean) as File[];
    if (validIngNutriFiles.length < 1) {
      showError("원재료명 및 영양정보 표 사진을 최소 1장 이상 업로드해 주세요.");
      return;
    }

    const formData: EnrollFormData = {
      name: productName.trim(),
      manufacturer: companyName.trim(),
      productImage: productPhotoFile,
      productInfoImages: validIngNutriFiles,
    };

    enrollProduct(formData, {
      onSuccess: () => {
        showSuccess("제품 등록 요청이 정상적으로 완료되었습니다.", "등록 완료", [
          {
            label: "홈으로 이동",
            onClick: () => {
              hideModal();
              navigate("/");
            },
            variant: "primary",
          },
        ]);
      },
      onError: (err: unknown) => {
        console.error(err);
        let errorMessage = "제품 등록 중 오류가 발생했습니다.";
        if (err && typeof err === "object" && "response" in err) {
          const response = (err as { response?: { data?: { message?: string } } }).response;
          if (response?.data?.message) {
            errorMessage = response.data.message;
          }
        }
        showError(errorMessage, "등록 실패");
      },
    });
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
          {/* 원재료/영양정보 표 */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-gray-800">
              원재료명 및 영양정보 표 사진 등록 <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-4">
              <UploadSlot
                preview={ingNutriPreviews[0]}
                onChange={(file) => handleIngSlotChange(0, file)}
                onClear={() => handleIngSlotChange(0, null)}
                ariaLabel="원재료/영양정보 첫 번째 사진"
                disabled={isPending}
                isDragging={isDragging}
              />
              <UploadSlot
                preview={ingNutriPreviews[1]}
                onChange={(file) => handleIngSlotChange(1, file)}
                onClear={() => handleIngSlotChange(1, null)}
                ariaLabel="원재료/영양정보 두 번째 사진"
                disabled={isPending}
                isDragging={isDragging}
              />
            </div>
            <p className="text-xs text-gray-500">
              원재료와 영양정보 표가 한 장에 다 보이지 않을 때만 사진을 두 장 등록해 주세요.
            </p>
          </div>

          {/* 제품 사진 */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-gray-800">제품 사진 등록 (선택)</label>
            <UploadSlot
              preview={productPhotoPreview}
              onChange={handleProdSlotChange}
              onClear={() => handleProdSlotChange(null)}
              ariaLabel="제품 사진"
              disabled={isPending}
              isDragging={isDragging} // ✅ 전달
            />
          </div>
        </div>

        {/* 텍스트 필드들 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              제품명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              disabled={isPending}
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
              disabled={isPending}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#79CCB1] focus:border-[#79CCB1] outline-none"
              placeholder="회사명을 입력하세요"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="mt-16 w-full bg-[#D2EDE4] text-[#2D5945] py-4 rounded-lg font-medium hover:bg-[#79CCB1] transition-colors disabled:opacity-50"
        >
          {isPending ? "등록 중…" : "제품 분석 요청하기"}
        </button>
      </section>

      <MessageModal
        isOpen={modalState.isOpen}
        onClose={hideModal}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
        buttons={modalState.buttons}
        icon={modalState.icon}
      />
    </form>
  );
};

export default EnrollPage;
