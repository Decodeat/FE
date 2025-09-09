import { useState } from "react";
import type { ProductDetail } from "../../types/productDetail";
import { NUTRITION_LABELS } from "../../constants/product";
import { createNutritionValues } from "../../utils/nutritionUtils";
import type { ChartDataItem } from "../../utils/chartUtils";
import warnIcon from "../../assets/icon/warn.svg";
import SuccessModal from "../ui/SuccessModal";
import PieChart from "./PieChart";
import NutritionEditForm from "./NutritionEditForm";

interface NutritionChartProps {
  product: ProductDetail;
}

const NutritionChart = ({ product }: NutritionChartProps) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleReportClick = () => {
    setShowEditForm(!showEditForm);
  };

  const handleReportSuccess = () => {
    setShowEditForm(false);
    setIsSuccessModalOpen(true);
  };

  const handleReportCancel = () => {
    setShowEditForm(false);
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
  };

  // 원형차트용 영양성분 데이터
  const getNutritionChartData = (): ChartDataItem[] => {
    if (!product) return [];

    const nutritionValues = createNutritionValues(product);

    return nutritionValues
      .map(({ key, value, originalUnit, displayValue }) => {
        const label = NUTRITION_LABELS[key as keyof typeof NUTRITION_LABELS];
        return {
          name: label?.label || key,
          value: value || 0,
          displayValue: displayValue || value || 0,
          color: label?.color || "#808080",
          unit: label?.unit || originalUnit,
        };
      })
      .filter((item) => item.value > 0)
      .sort((a, b) => b.value - a.value);
  };

  const nutritionData = getNutritionChartData();

  if (nutritionData.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-gray-900">영양 성분 비율</h3>
        <button className="flex items-center space-x-1 cursor-pointer" onClick={handleReportClick}>
          <img src={warnIcon} alt="경고" className="w-4 h-4" />
          <p className="text-sm text-gray-500">{showEditForm ? "수정 취소" : "잘못된 정보 신고"}</p>
        </button>
      </div>

      <div className="flex gap-8">
        {/* 왼쪽: 원형 차트 */}
        <PieChart data={nutritionData} />

        {/* 오른쪽: 수정 폼 (조건부 렌더링) */}
        {showEditForm && (
          <div className="flex-1 max-w-md">
            <NutritionEditForm
              product={product}
              nutritionData={nutritionData}
              onSuccess={handleReportSuccess}
              onCancel={handleReportCancel}
            />
          </div>
        )}
      </div>

      {/* 성공 모달 */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModalClose}
        title="신고 완료"
        message="영양성분 수정 신고가 성공적으로 전송되었습니다."
      />
    </div>
  );
};

export default NutritionChart;
