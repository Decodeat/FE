import {
  createDonutChartPath,
  calculateTotal,
  CHART_CONFIG,
  type ChartDataItem,
} from '../../utils/chartUtils';

const ProductDetail = () => {
  // 영양 성분 데이터 (임의값)
  const nutritionData: ChartDataItem[] = [
    { name: '단백질', value: 35, color: '#3B82F6' },
    { name: '탄수화물', value: 30, color: '#10B981' },
    { name: '지방', value: 15, color: '#F59E0B' },
    { name: '섬유질', value: 10, color: '#EF4444' },
    { name: '기타', value: 10, color: '#8B5CF6' },
  ];

  // 원형 그래프 SVG 컴포넌트
  const DonutChart = ({ data }: { data: ChartDataItem[] }) => {
    const total = calculateTotal(data);
    let cumulativePercentage = 0;

    return (
      <div className="flex items-center space-x-6">
        <div className="relative">
          <svg
            width={CHART_CONFIG.DEFAULT_WIDTH}
            height={CHART_CONFIG.DEFAULT_HEIGHT}
            viewBox={CHART_CONFIG.DEFAULT_VIEWBOX}
          >
            {data.map((item, index) => {
              const percentage = item.value / total;
              const path = createDonutChartPath(
                percentage,
                cumulativePercentage
              );
              cumulativePercentage += percentage;

              return (
                <path
                  key={index}
                  d={path}
                  fill={item.color}
                  stroke="white"
                  strokeWidth={CHART_CONFIG.STROKE_WIDTH}
                />
              );
            })}
            {/* 중앙 원 */}
            <circle
              cx={CHART_CONFIG.DEFAULT_CENTER_X}
              cy={CHART_CONFIG.DEFAULT_CENTER_Y}
              r={CHART_CONFIG.DEFAULT_INNER_RADIUS}
              fill="white"
            />
            <text
              x="50"
              y="48"
              textAnchor="middle"
              fontSize="8"
              fill="#374151"
              fontWeight="bold"
            >
              영양성분
            </text>
            <text x="50" y="56" textAnchor="middle" fontSize="6" fill="#6B7280">
              비율
            </text>
          </svg>
        </div>

        {/* 범례 */}
        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-gray-600">{item.name}</span>
              <span className="text-sm font-medium text-gray-900">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const relatedProducts = [
    {
      id: 1,
      name: 'Loft style lamp',
      price: 21,
      originalPrice: 35,
      image: '/* lamp image */',
      sale: true,
    },
    {
      id: 2,
      name: 'Dispenser for soap',
      price: 16,
      image: '/* dispenser image */',
    },
    {
      id: 3,
      name: 'Glossy round vase',
      price: 11,
      originalPrice: 15,
      image: '/* vase image */',
      sale: true,
    },
    {
      id: 4,
      name: 'Scented candle',
      price: 13,
      image: '/* candle image */',
      isNew: true,
    },
    { id: 5, name: 'Living room table', price: 46, image: '/* table image */' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="container mx-auto py-5 mt-20 px-4">
        {/* Breadcrumb */}
        <nav className="flex mb-4 text-sm">
          <a href="#" className="text-gray-500 hover:text-gray-700">
            Home
          </a>
          <span className="mx-2 text-gray-400">/</span>
          <a href="#" className="text-gray-500 hover:text-gray-700">
            Shop catalog
          </a>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">잇더핏</span>
        </nav>

        {/* Mobile Title and Price */}
        <div className="md:hidden mb-6">
          <h1 className="text-3xl font-bold mb-3">프로틴 쉐이크</h1>
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-900 mr-3">
              $14.00
            </span>
            <span className="text-lg line-through text-gray-500 mr-3">
              $19.00
            </span>
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
              Sale
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
              <div className="text-gray-400 text-center">
                {/* Main product image placeholder */}
                <div className="w-full h-64 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Badge and SKU */}
            <div className="flex items-center">
              <span className="text-sm text-gray-500">V00273124</span>
            </div>
            {/* Title and Price (Desktop) */}
            <div className="hidden md:block">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                단백질 쉐이크
              </h1>
              <div className="flex items-center mb-6"></div>
            </div>
            {/* Nutrition Chart */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                영양 성분 비율
              </h3>
              <DonutChart data={nutritionData} />
            </div>

            {/* Ingredients */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                주요 성분
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  정제 탄수화물
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  복합 탄수화물
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  분리유청 단백질
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-700 rounded-full mr-3"></span>
                  농축유청 단백질
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  식물성 단백질
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Description Sections */}
      <div className="bg-gray-100 py-16 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="lg:order-2">
              <div className="bg-white rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-4">Scented candle</h2>
                <p className="text-gray-600">
                  Ut sit at orci cursus gravida pretium proin nulla id purus,
                  placerat eget mauris eu ac volutpat facilisi eget morbi
                  ullamcorper turpis nisi aconsequat cursus malesuada leo
                  ultrices nisl dictumst turpis tortor sem amet, euismod
                  aliquam, lacus laoreet dui facilisi morbi ullamcorper turpis
                  nisi aconsequat cursus volutpat facilisi eget.
                </p>
              </div>
            </div>
            <div className="lg:order-1">
              <div className="w-full h-80 bg-gray-300 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="w-full h-80 bg-gray-200 rounded-lg"></div>
          <div>
            <h2 className="text-2xl font-bold mb-6">Description</h2>
            <p className="text-gray-600 mb-8">
              Ut sit at orci cursus gravida pretium proin nulla id purus,
              placerat eget mauris eu ac volutpat facilisi eget morbi
              ullamcorper turpis nisi aconsequat cursus malesuada leo ultrices
              nisl dictumst turpis tortor sem eu ac volutpat facilisi eget morbi
            </p>
            <ul className="space-y-3">
              <li className="flex">
                <span className="text-gray-600 min-w-[100px]">Weight:</span>
                <span className="font-semibold">140 - 440 gramms</span>
              </li>
              <li className="flex">
                <span className="text-gray-600 min-w-[100px]">Material:</span>
                <span className="font-semibold">Concrete bowl</span>
              </li>
              <li className="flex">
                <span className="text-gray-600 min-w-[100px]">Duration:</span>
                <span className="font-semibold">
                  60 hours of comfort and combustion
                </span>
              </li>
              <li className="flex">
                <span className="text-gray-600 min-w-[100px]">
                  Composition:
                </span>
                <span className="font-semibold">100% soy wax, cotton wick</span>
              </li>
              <li className="flex">
                <span className="text-gray-600 min-w-[100px]">Country:</span>
                <span className="font-semibold">Frances</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">You may also like</h2>
          <div className="flex space-x-2">
            <button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50">
              ←
            </button>
            <button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50">
              →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {relatedProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="relative bg-gray-100 rounded-lg p-4 mb-4 aspect-square">
                {product.sale && (
                  <span className="absolute top-3 left-3 bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-medium">
                    Sale
                  </span>
                )}
                {product.isNew && (
                  <span className="absolute top-3 left-3 bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">
                    New
                  </span>
                )}
                <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  ❤️
                </button>
                <div className="w-full h-full bg-gray-200 rounded"></div>
              </div>
              <h3 className="font-medium mb-2">{product.name}</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-bold">${product.price}.00</span>
                  {product.originalPrice && (
                    <span className="text-sm line-through text-gray-500">
                      ${product.originalPrice}.00
                    </span>
                  )}
                </div>
                <button className="p-2 hover:bg-gray-100 rounded">🛒</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="border-t border-gray-200 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center lg:text-left">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto lg:mx-0 mb-4">
                📦
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Fast and free delivery
              </h3>
              <p className="text-gray-600 text-sm">
                Free delivery for all orders over $200 honcus egestas lorem
                honcus egestas
              </p>
            </div>
            <div className="text-center lg:text-left">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto lg:mx-0 mb-4">
                💰
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Money back guarantee
              </h3>
              <p className="text-gray-600 text-sm">
                We return money within 30 days honcus egestas lorem honcus
                egestas
              </p>
            </div>
            <div className="text-center lg:text-left">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto lg:mx-0 mb-4">
                🎧
              </div>
              <h3 className="text-lg font-semibold mb-2">
                24/7 customer support
              </h3>
              <p className="text-gray-600 text-sm">
                Friendly 24/7 customer support honcus egestas lorem honcus
                egestas
              </p>
            </div>
            <div className="text-center lg:text-left">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto lg:mx-0 mb-4">
                🔒
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Secure online payment
              </h3>
              <p className="text-gray-600 text-sm">
                We possess SSL / Secure сertificate honcus egestas lorem honcus
                egestas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
