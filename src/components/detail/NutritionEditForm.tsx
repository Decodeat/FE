import { useState } from "react";
import type { ProductDetail } from "../../types/productDetail";
import type { NutritionReportRequest } from "../../types/report";
import type { ChartDataItem } from "../../utils/chartUtils";
import { useNutritionReport } from "../../hooks/useReport";
import { useMessageModal } from "../../hooks/useMessageModal";
import MessageModal from "../ui/MessageModal";

interface NutritionEditFormProps {
  product: ProductDetail;
  nutritionData: ChartDataItem[];
  onSuccess: () => void;
  onCancel: () => void;
}

const NutritionEditForm = ({
  product,
  nutritionData,
  onSuccess,
  onCancel,
}: NutritionEditFormProps) => {
  // 초기값 설정 - null인 경우 "0"으로, 아닌 경우 문자열로 변환
  const [formData, setFormData] = useState<Record<keyof NutritionReportRequest, string>>({
    calcium: product.calcium !== null ? product.calcium.toString() : "0",
    carbohydrate: product.carbohydrate !== null ? product.carbohydrate.toString() : "0",
    cholesterol: product.cholesterol !== null ? product.cholesterol.toString() : "0",
    dietaryFiber: product.dietaryFiber !== null ? product.dietaryFiber.toString() : "0",
    energy: product.energy !== null ? product.energy.toString() : "0",
    fat: product.fat !== null ? product.fat.toString() : "0",
    protein: product.protein !== null ? product.protein.toString() : "0",
    satFat: product.satFat !== null ? product.satFat.toString() : "0",
    sodium: product.sodium !== null ? product.sodium.toString() : "0",
    sugar: product.sugar !== null ? product.sugar.toString() : "0",
    transFat: product.transFat !== null ? product.transFat.toString() : "0",
  });

  const reportMutation = useNutritionReport();
  const { modalState, showError, hideModal } = useMessageModal();

  const handleInputChange = (key: keyof NutritionReportRequest, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 빈 칸 검증 - 실제로 빈 문자열이거나 공백만 있는 경우
    const emptyFields = Object.entries(formData).filter(
      ([, value]) => value.trim() === "" || value === "",
    );

    if (emptyFields.length > 0) {
      showError(`빈 칸으로 둘 수 없습니다.\n없으면 0을 입력해주세요.`, "입력 오류");
      return;
    }

    // 문자열을 숫자로 변환
    const numericData: NutritionReportRequest = Object.entries(formData).reduce(
      (acc, [key, value]) => {
        acc[key as keyof NutritionReportRequest] = Number(value) || 0;
        return acc;
      },
      {} as NutritionReportRequest,
    );

    try {
      await reportMutation.mutateAsync({
        productId: product.productId,
        data: numericData,
      });
      onSuccess();
    } catch (error) {
      console.error("신고 전송 실패:", error);
    }
  };

  return (
    <div className="flex-1 max-w-md">
      <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">영양성분 수정</h4>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {/* 현재 데이터 기준으로 내림차순 정렬된 필드들 */}
          {nutritionData
            .map((item) => {
              // 차트 데이터의 name을 기반으로 해당하는 필드 찾기
              const fieldMapping: Record<
                string,
                { key: keyof NutritionReportRequest; unit: string }
              > = {
                칼로리: { key: "energy", unit: "kcal" },
                탄수화물: { key: "carbohydrate", unit: "g" },
                당류: { key: "sugar", unit: "g" },
                단백질: { key: "protein", unit: "g" },
                지방: { key: "fat", unit: "g" },
                포화지방: { key: "satFat", unit: "g" },
                트랜스지방: { key: "transFat", unit: "g" },
                콜레스테롤: { key: "cholesterol", unit: "mg" },
                나트륨: { key: "sodium", unit: "mg" },
                식이섬유: { key: "dietaryFiber", unit: "g" },
                칼슘: { key: "calcium", unit: "mg" },
              };

              const field = fieldMapping[item.name];
              return field ? { ...field, label: item.name } : null;
            })
            .filter(Boolean)
            .map(
              (field) =>
                field && (
                  <div key={field.key} className="flex items-center space-x-3">
                    <label className="w-20 text-sm font-medium text-gray-700 text-right">
                      {field.label}
                    </label>
                    <div className="flex-1 relative">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData[field.key]}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        className="w-full px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0"
                      />
                      <span className="absolute right-2 top-1 text-xs text-gray-500">
                        {field.unit}
                      </span>
                    </div>
                  </div>
                ),
            )}
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t mt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={reportMutation.isPending}
            className="px-3 py-1 text-sm text-gray-700 bg-gray-200 font-bold rounded hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={reportMutation.isPending}
            className="px-3 py-1 text-sm bg-[#D2EDE4] rounded text-[#2D5945] font-bold hover:bg-[#A9DBC9] disabled:opacity-50 flex items-center space-x-1 cursor-pointer"
          >
            {reportMutation.isPending && (
              <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
            )}
            <span>{reportMutation.isPending ? "전송 중..." : "신고 전송"}</span>
          </button>
        </div>
      </form>

      {/* 메시지 모달 */}
      <MessageModal
        isOpen={modalState.isOpen}
        onClose={hideModal}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
        buttons={modalState.buttons}
        icon={modalState.icon}
      />
    </div>
  );
};

export default NutritionEditForm;
