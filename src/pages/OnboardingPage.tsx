import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMessageModal } from "../hooks/useMessageModal";
import MessageModal from "../components/ui/MessageModal";

type Option = {
  id: string;
  label: string;
};

type Question = {
  id: string;
  title: string;
  description: string;
  options: Option[];
  multiple?: boolean;
};

const questions: Question[] = [
  {
    id: "healthGoals",
    title: "🎯 관심 있는 건강 목표는?",
    description: "당신의 건강 목표를 알려주세요. 더 정확한 제품을 추천해드릴게요.",
    options: [
      { id: "diet", label: "다이어트" },
      { id: "muscle", label: "근육 증가" },
      { id: "bloodSugar", label: "혈당 관리" },
      { id: "digestion", label: "소화 건강" },
      { id: "overall", label: "전반적인 건강 유지" },
    ],
    multiple: true,
  },
  {
    id: "healthConditions",
    title: "🧬 건강 상태에 대해 알려주세요",
    description: "현재 건강과 관련된 상태가 있나요? (선택 시 추천에 반영됩니다.)",
    options: [
      { id: "hypertension", label: "고혈압" },
      { id: "diabetes", label: "당뇨" },
      { id: "hyperlipidemia", label: "고지혈증" },
      { id: "stomach", label: "위장 질환" },
      { id: "none", label: "없음" },
    ],
    multiple: true,
  },
  {
    id: "dietaryRestrictions",
    title: "❌ 식이 제한이 있나요?",
    description: "피해야 할 성분이나 알러지가 있다면 선택해주세요.",
    options: [
      { id: "lactose", label: "유당불내증" },
      { id: "gluten", label: "글루텐 민감" },
      { id: "soy", label: "대두 알러지" },
      { id: "nuts", label: "견과류 알러지" },
      { id: "vegan", label: "채식주의(비건/페스코 등)" },
      { id: "none", label: "없음" },
    ],
    multiple: true,
  },
  {
    id: "lifestyle",
    title: "🕒 평소 생활 습관은 어떤가요?",
    description: "섭취 시간대나 형태의 선호를 알려주세요.",
    options: [
      { id: "morning", label: "아침" },
      { id: "noon", label: "점심" },
      { id: "prePostWorkout", label: "운동 전후" },
      { id: "night", label: "자기 전" },
      { id: "drink", label: "음료" },
      { id: "powder", label: "파우더" },
      { id: "bar", label: "바" },
      { id: "capsule", label: "캡슐" },
      { id: "any", label: "상관없음" },
    ],
    multiple: true,
  },
];

const OnboardingPage = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const { modalState, showSuccess, hideModal } = useMessageModal();

  const currentQuestion = questions[step];

  const toggleOption = (questionId: string, optionId: string, multiple?: boolean) => {
    setAnswers((prev) => {
      const prevAnswers = prev[questionId] || [];
      if (multiple) {
        return prevAnswers.includes(optionId)
          ? { ...prev, [questionId]: prevAnswers.filter((id) => id !== optionId) }
          : { ...prev, [questionId]: [...prevAnswers, optionId] };
      } else {
        return { ...prev, [questionId]: [optionId] };
      }
    });
  };

  const navigate = useNavigate();
  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      console.log("제출 데이터:", answers);
      showSuccess("설문이 제출되었습니다!", "완료", [
        {
          label: "홈으로 이동",
          onClick: () => {
            hideModal();
            navigate("/");
          },
          variant: "primary",
        },
      ]);
    }
  };

  const isSelected = (questionId: string, optionId: string) =>
    (answers[questionId] ?? []).includes(optionId);

  const hasSelection = answers[currentQuestion.id]?.length > 0;

  return (
    <div className="w-full">
      {/* 상단 배너 */}
      <section className="w-full bg-[#D2EDE4] py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#2D5945] mb-2">
          몇 가지 질문으로 맞춤 건강 추천 받기
        </h2>
        <p className="text-gray-700 mb-4">
          당신의 라이프스타일과 건강 목표에 맞춰 제품을 찾아드릴게요.
        </p>
        <p className="text-gray-500">
          Step {step + 1} / {questions.length}
        </p>
      </section>

      {/* 질문 영역 */}
      <div className=" w-full max-w-3xl mx-auto px-4 py-10">
        <h3 className="text-2xl font-semibold mb-2">{currentQuestion.title}</h3>
        <p className="text-gray-600 mb-6">{currentQuestion.description}</p>

        <div className="space-y-3">
          {currentQuestion.options.map((opt) => (
            <label
              key={opt.id}
              className={`block border rounded-xl px-4 py-3 cursor-pointer transition ${
                isSelected(currentQuestion.id, opt.id)
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 hover:border-green-300"
              }`}
            >
              <input
                type={currentQuestion.multiple ? "checkbox" : "radio"}
                name={currentQuestion.id}
                value={opt.id}
                checked={isSelected(currentQuestion.id, opt.id)}
                onChange={() => toggleOption(currentQuestion.id, opt.id, currentQuestion.multiple)}
                className="hidden"
              />
              {opt.label}
            </label>
          ))}
        </div>

        {/* 카드 3 도움말 */}
        {currentQuestion.id === "dietaryRestrictions" &&
          answers.dietaryRestrictions &&
          answers.dietaryRestrictions.length > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              예: "유당불내증을 선택하면 유청 단백질 제품은 제외돼요."
            </p>
          )}

        <div className="flex justify-end mt-6">
          <button
            onClick={handleNext}
            disabled={!hasSelection}
            className={`px-6 py-3 rounded-full text-white font-semibold transition ${
              hasSelection ? "bg-[#2D5945] hover:bg-[#244838]" : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {step < questions.length - 1 ? "다음" : "제출하기"}
          </button>
        </div>
      </div>

      <MessageModal
        isOpen={modalState.isOpen}
        onClose={hideModal}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
        icon={modalState.icon}
        buttons={modalState.buttons}
      />
    </div>
  );
};

export default OnboardingPage;
