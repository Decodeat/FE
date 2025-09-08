import Skeleton from "../ui/Skeleton";

interface ProductGridSkeletonProps {
  count?: number;
}

const ProductGridSkeleton = ({ count = 8 }: ProductGridSkeletonProps) => {
  return (
    <div className="w-full">
      {/* 헤더 스켈레톤 */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>

      {/* 제품 그리드 스켈레톤 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={`skeleton-${index}`}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          >
            {/* 이미지 스켈레톤 */}
            <div className="aspect-square bg-gray-100">
              <Skeleton className="w-full h-full" />
            </div>

            {/* 제품 정보 스켈레톤 */}
            <div className="p-4">
              <div className="mb-2">
                {/* 제품명 스켈레톤 */}
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-1" />
                {/* 제조사 스켈레톤 */}
                <Skeleton className="h-3 w-1/2" />
              </div>

              {/* 상태 배지 스켈레톤 */}
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGridSkeleton;
