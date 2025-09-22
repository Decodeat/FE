import React, { useState } from "react";
import { AlertTriangle, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAdminReports } from "../../hooks/useAdminReports";
import type { ReportItem } from "../../types/report";
import { getReportTypeText, getReportStatusText, getReportStatusColor } from "../../types/report";
import Pagination from "../ui/Pagination";

const AdminReports: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const { data, isLoading, error } = useAdminReports({
    page: currentPage - 1, // API는 0부터 시작
    size: 10,
  });

  // 검색 필터링
  const filteredReports =
    data?.reportList?.filter(
      (report: ReportItem) =>
        report.productInfo.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.productInfo.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#79CCB1]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">데이터를 불러올 수 없습니다</h3>
        <p className="text-gray-500">잠시 후 다시 시도해 주세요.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">신고 요청 관리</h2>
          <p className="text-gray-600 mt-1">총 {data?.totalElements || 0}건의 신고 요청</p>
        </div>

        {/* 검색 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="제품명 또는 회사명으로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#79CCB1] focus:border-transparent w-full sm:w-80"
          />
        </div>
      </div>

      {/* 신고 목록 */}
      {filteredReports.length === 0 ? (
        <div className="text-center py-12">
          <AlertTriangle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mㄱb-2">
            {searchTerm ? "검색 결과가 없습니다" : "신고 요청이 없습니다"}
          </h3>
          <p className="text-gray-500">
            {searchTerm ? "다른 검색어를 시도해 보세요." : "아직 접수된 신고가 없습니다."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    제품 정보
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    신고 타입
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    신고자
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    등록일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReports.map((report: ReportItem) => (
                  <tr key={report.reportId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0">
                          <img
                            className="h-12 w-12 rounded-lg object-cover"
                            src={
                              report.reportType === "INAPPROPRIATE_IMAGE" && report.imageUrl
                                ? report.imageUrl
                                : report.productInfo.productImage || "/decodeatLogo.ico"
                            }
                            alt={report.productInfo.productName}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/decodeatLogo.ico";
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {report.productInfo.productName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {report.productInfo.manufacturer}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700">
                        {getReportTypeText(report.reportType)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {report.nickname || "알 수 없음"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getReportStatusColor(report.reportStatus)}`}
                      >
                        {getReportStatusText(report.reportStatus)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(report.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => navigate(`/admin/reports/${report.reportId}`)}
                        className="text-[#79CCB1] hover:text-[#2D5945] transition-colors duration-200"
                      >
                        자세히 보기
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 페이지네이션 */}
      {data && data.totalPage > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={data.totalPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default AdminReports;
