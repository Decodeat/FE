import { useQuery } from "@tanstack/react-query";
import { getAdminReports } from "../apis/adminReports";
import type { ReportListResult } from "../types/report";

interface UseAdminReportsProps {
  page: number;
  size?: number;
}

export const useAdminReports = ({ page, size = 10 }: UseAdminReportsProps) => {
  return useQuery<ReportListResult>({
    queryKey: ["adminReports", page, size],
    queryFn: async () => {
      const response = await getAdminReports(page, size);
      return response.result;
    },
    staleTime: 5 * 60 * 1000, // 5분
  });
};
