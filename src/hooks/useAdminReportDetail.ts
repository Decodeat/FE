import { useQuery } from "@tanstack/react-query";
import { getAdminReportDetail } from "../apis/adminReports";
import type { ReportItem } from "../types/report";

interface UseAdminReportDetailProps {
  reportId: number;
}

export const useAdminReportDetail = ({ reportId }: UseAdminReportDetailProps) => {
  return useQuery<ReportItem>({
    queryKey: ["adminReportDetail", reportId],
    queryFn: async () => {
      const response = await getAdminReportDetail(reportId);
      return response.result;
    },
    staleTime: 5 * 60 * 1000, // 5분
    enabled: !!reportId,
  });
};
