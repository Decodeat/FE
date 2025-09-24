// 영양소 백과사전 데이터
export interface NutrientInfo {
  id: string;
  name: string;
  category: string;
  description: string;
  benefits: string[];
  sources: string[];
  recommendedIntake?: string;
  tips?: string[];
  color: string;
  icon: string;
}

export const NUTRITION_ENCYCLOPEDIA: NutrientInfo[] = [
  // 탄수화물류
  {
    id: "complex-carbohydrate",
    name: "복합 탄수화물",
    category: "에너지원",
    description:
      "여러 개의 당분자가 결합된 형태로, 천천히 소화되어 혈당을 안정적으로 유지시켜주는 좋은 에너지원입니다.",
    benefits: ["지속적인 에너지 공급", "혈당 안정화", "포만감 증진", "소화기 건강 개선"],
    sources: [
      "현미, 귀리, 퀴노아",
      "고구마, 감자",
      "통곡물 빵",
      "콩류 (렌틸콩, 검은콩)",
      "브로콜리, 시금치",
    ],
    recommendedIntake: "총 칼로리의 45-65%",
    tips: [
      "정제된 탄수화물보다 통곡물을 선택하세요",
      "식사 시 단백질과 함께 섭취하면 혈당 상승을 완화할 수 있습니다",
      "운동 전후에 적절히 섭취하면 에너지 효율이 높아집니다",
    ],
    color: "bg-[#D2EDE4]",
    icon: "",
  },
  {
    id: "refined-carbohydrate",
    name: "정제 탄수화물",
    category: "에너지원",
    description:
      "가공 과정에서 섬유질과 영양소가 제거된 탄수화물로, 빠르게 흡수되어 혈당을 급격히 상승시킵니다.",
    benefits: ["즉각적인 에너지 공급", "운동 후 빠른 회복", "저혈당 시 응급 처치"],
    sources: ["백미, 백밀가루", "설탕, 시럽", "과자, 케이크", "청량음료", "사탕, 초콜릿"],
    recommendedIntake: "가능한 한 제한",
    tips: [
      "복합 탄수화물로 대체하는 것이 좋습니다",
      "섭취 시 단백질이나 지방과 함께 드시면 혈당 급상승을 완화할 수 있습니다",
      "운동 직후에만 제한적으로 섭취하세요",
    ],
    color: "bg-[#D2EDE4]",
    icon: "",
  },

  // 단백질류
  {
    id: "plant-protein",
    name: "식물성 단백질",
    category: "근육 구성",
    description:
      "식물에서 얻는 단백질로, 필수 아미노산을 제공하며 포화지방이 적고 섬유질이 풍부합니다.",
    benefits: [
      "근육량 유지 및 증가",
      "심혈관 건강 개선",
      "체중 관리 도움",
      "소화 건강 증진",
      "환경 친화적",
    ],
    sources: [
      "콩, 렌틸콩, 병아리콩",
      "두부, 템페",
      "견과류 (아몬드, 호두)",
      "씨앗류 (치아시드, 햄프시드)",
      "퀴노아, 현미",
    ],
    recommendedIntake: "체중 1kg당 0.8-1.2g",
    tips: [
      "다양한 식물성 단백질을 조합하여 완전한 아미노산을 섭취하세요",
      "비타민 C가 풍부한 음식과 함께 드시면 철분 흡수가 향상됩니다",
      "운동 후 30분 이내 섭취하면 근육 회복에 도움됩니다",
    ],
    color: "bg-[#D2EDE4]",
    icon: "",
  },
  {
    id: "animal-protein",
    name: "동물성 단백질",
    category: "근육 구성",
    description:
      "동물에서 얻는 단백질로, 완전한 아미노산 프로필을 가지고 있어 체내 이용률이 높습니다.",
    benefits: [
      "완전한 필수 아미노산 제공",
      "근육 합성 촉진",
      "면역력 강화",
      "철분, 비타민 B12 공급",
    ],
    sources: ["닭가슴살, 소고기", "생선 (연어, 참치)", "계란", "우유, 요거트", "치즈"],
    recommendedIntake: "체중 1kg당 0.8-1.2g",
    tips: [
      "지방이 적은 부위를 선택하세요",
      "가공육보다는 신선한 고기를 선택하세요",
      "주 2-3회 생선을 섭취하면 오메가-3도 함께 얻을 수 있습니다",
    ],
    color: "bg-[#D2EDE4]",
    icon: "",
  },

  // 식이섬유류
  {
    id: "soluble-dietary-fibers",
    name: "수용성 식이섬유",
    category: "소화 건강",
    description: "물에 녹는 식이섬유로, 겔 형태를 만들어 콜레스테롤과 혈당 조절에 도움을 줍니다.",
    benefits: [
      "콜레스테롤 수치 개선",
      "혈당 조절",
      "포만감 증진",
      "장내 유익균 증식",
      "심혈관 건강 개선",
    ],
    sources: ["오트밀, 보리", "사과, 오렌지", "당근, 양파", "콩류", "아보카도"],
    recommendedIntake: "하루 25-35g (총 식이섬유)",
    tips: [
      "충분한 물과 함께 섭취하세요",
      "점진적으로 섭취량을 늘려 소화 불편감을 방지하세요",
      "식사 30분 전 섭취하면 혈당 조절에 더 효과적입니다",
    ],
    color: "bg-[#D2EDE4]",
    icon: "",
  },
  {
    id: "insoluble-dietary-fibers",
    name: "불용성 식이섬유",
    category: "소화 건강",
    description:
      "물에 녹지 않는 식이섬유로, 대변의 부피를 늘리고 장 운동을 촉진하여 변비 예방에 도움을 줍니다.",
    benefits: [
      "변비 예방 및 개선",
      "장 건강 증진",
      "독소 배출 촉진",
      "대장암 위험 감소",
      "체중 관리 도움",
    ],
    sources: ["통곡물 (현미, 통밀)", "견과류", "녹색 잎채소", "브로콜리, 양배추", "콩의 껍질"],
    recommendedIntake: "하루 25-35g (총 식이섬유)",
    tips: [
      "수분 섭취를 충분히 하세요",
      "갑자기 많이 먹으면 복부 팽만감이 생길 수 있습니다",
      "규칙적인 운동과 함께 하면 더 효과적입니다",
    ],
    color: "bg-[#D2EDE4]",
    icon: "",
  },
];

// 카테고리별 분류
export const NUTRITION_CATEGORIES = [
  { id: "energy", name: "에너지원", color: "bg-[#D2EDE4]", textColor: "text-gray-700" },
  { id: "muscle", name: "근육 구성", color: "bg-[#D2EDE4]", textColor: "text-gray-700" },
  { id: "digestive", name: "소화 건강", color: "bg-[#D2EDE4]", textColor: "text-gray-700" },
];

// 검색 및 필터링을 위한 유틸리티 함수
export const getNutrientsByCategory = (category: string) => {
  return NUTRITION_ENCYCLOPEDIA.filter((nutrient) => nutrient.category === category);
};

export const searchNutrients = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return NUTRITION_ENCYCLOPEDIA.filter(
    (nutrient) =>
      nutrient.name.toLowerCase().includes(lowercaseQuery) ||
      nutrient.description.toLowerCase().includes(lowercaseQuery) ||
      nutrient.benefits.some((benefit) => benefit.toLowerCase().includes(lowercaseQuery)),
  );
};
