import type { FC } from "react";
import { useState } from "react";
import { useAnalysisHistory } from "../../hooks/useAnalysis";
import type { AnalysisRecord } from "../../types/analysis";
import { getStatusText, getStatusColor } from "../../types/analysis";
import Pagination from "../ui/Pagination";
import { useNavigate } from "react-router-dom";

interface AnalysisResultItemProps {
  record: AnalysisRecord;
}

const AnalysisResultItem: FC<AnalysisResultItemProps> = ({ record }) => {
  const statusText = getStatusText(record.decodeStatus);
  const statusColor = getStatusColor(record.decodeStatus);
  const registerDate = new Date(record.registerDate).toLocaleDateString("ko-KR");
  const navigate = useNavigate();

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start gap-4">
        {/* 상품 이미지 */}
        <img
          src={record.productImage || "/decodeatLogo.ico"}
          alt={`Product ${record.productId}`}
          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/decodeatLogo.ico";
          }}
        />

        {/* 상품 정보 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">제품명: {record.name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
              {statusText}
            </span>
          </div>

          <p className="text-sm text-gray-500 mb-2">등록일: {registerDate}</p>

          {/* 상태별 추가 정보 */}
          {record.decodeStatus === "COMPLETED" && (
            <button
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer"
              onClick={() => {
                navigate(`/detail/${record.productId}`);
              }}
            >
              분석 결과 보기 →
            </button>
          )}

          {(record.decodeStatus === "CANCELLED" || record.decodeStatus === "FAILED") && (
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium cursor-pointer">
              다시 분석하기 →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const AnalysisResults: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, error } = useAnalysisHistory({
    page: currentPage,
    size: pageSize,
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-6">내 제품 분석 결과</h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-6">내 제품 분석 결과</h2>
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">데이터를 불러오는데 실패했습니다.</p>
          <button
            onClick={() => window.location.reload()}
            className="text-blue-600 hover:text-blue-700 cursor-pointer"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  const result = data?.result;
  const hasData = result && result.content.length > 0;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">내 제품 분석 결과</h2>
        {result && <p className="text-sm text-gray-600">총 {result.totalElements}개의 분석 기록</p>}
      </div>

      {hasData ? (
        <>
          {/* 분석 결과 목록 */}
          <div className="space-y-4 mb-6">
            {result.content.map((record) => (
              <AnalysisResultItem key={record.productId} record={record} />
            ))}
          </div>

          {/* 페이지네이션 */}
          {result.totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={result.totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📊</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">아직 분석한 제품이 없습니다</h3>
          <p className="text-gray-500 mb-4">첫 번째 제품을 분석해보세요!</p>
          <button
            onClick={() => (window.location.href = "/enroll")}
            className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors cursor-pointer"
          >
            제품 분석하기
          </button>
        </div>
      )}
    </div>
  );
};
