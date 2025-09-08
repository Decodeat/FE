import type { ProductDetail } from "../../types/productDetail";
import { createNutrientCategories } from "../../utils/nutritionUtils";

interface DetailedNutrientsProps {
  product: ProductDetail;
}

const DetailedNutrients = ({ product }: DetailedNutrientsProps) => {
  const detailedNutrients = createNutrientCategories(product);

  if (detailedNutrients.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 ml-8">
      <h3 className="text-2xl font-semibold mb-6 text-gray-900">세부 영양소</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {detailedNutrients.map((category, categoryIndex) => (
          <div key={categoryIndex} className={`p-4 rounded-lg ${category.bgColor}`}>
            <div className="flex items-center space-x-3 mb-3">
              <span className={`w-4 h-4 rounded-full ${category.color}`}></span>
              <h4 className={`text-lg font-semibold ${category.textColor}`}>{category.title}</h4>
            </div>
            <div className="space-y-2">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="text-gray-700 ml-7">
                  • {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailedNutrients;
