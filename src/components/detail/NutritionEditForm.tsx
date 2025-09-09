import { useState } from "react";
import type { ProductDetail } from "../../types/productDetail";
import type { NutritionReportRequest } from "../../types/report";
import type { ChartDataItem } from "../../utils/chartUtils";
import { useNutritionReport } from "../../hooks/useReport";

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
  const [formData, setFormData] = useState<NutritionReportRequest>({
    calcium: product.calcium || 0,
    carbohydrate: product.carbohydrate || 0,
    cholesterol: product.cholesterol || 0,
    dietaryFiber: product.dietaryFiber || 0,
    energy: product.energy || 0,
    fat: product.fat || 0,
    protein: product.protein || 0,
    satFat: product.satFat || 0,
    sodium: product.sodium || 0,
    sugar: product.sugar || 0,
    transFat: product.transFat || 0,
  });

  const reportMutation = useNutritionReport();

  const handleInputChange = (key: keyof NutritionReportRequest, value: string) => {
    const numValue = value === "" ? 0 : Number(value);
    setFormData((prev) => ({ ...prev, [key]: numValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await reportMutation.mutateAsync({
        productId: product.productId,
        data: formData,
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
                        step="0.1"
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
            className="px-3 py-1 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={reportMutation.isPending}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-1"
          >
            {reportMutation.isPending && (
              <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
            )}
            <span>{reportMutation.isPending ? "전송 중..." : "신고 전송"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default NutritionEditForm;
