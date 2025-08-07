// TopGNB 메뉴 설정 파일
export interface MenuItem {
  name: string;
  href: string;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

export const megaMenuLandings: MenuItem[] = [
  { name: 'Template Intro Page', href: '/index' },
  { name: 'Mobile App Showcase', href: '/mobile-app' },
  { name: 'Product Landing', href: '/product' },
  { name: 'SaaS v.1', href: '/saas-v1' },
  { name: 'SaaS v.2', href: '/saas-v2' },
  { name: 'Marketing Agency', href: '/marketing' },
  { name: 'Shop Homepage', href: '/shop' },
  { name: 'Creative Agency', href: '/creative' },
  { name: 'Web Studio', href: '/web-studio' },
  { name: 'Corporate', href: '/corporate' },
  { name: 'Business Consulting', href: '/consulting' },
  { name: 'Coworking Space', href: '/coworking' },
  { name: 'Yoga Studio', href: '/yoga' },
  { name: 'Blog Homepage', href: '/blog' },
];

export const pagesMenu: MenuSection[] = [
  {
    title: '탄수화물',
    items: [
      { name: '정제 탄수화물', href: '/nutrition/refined-carbohydrate' },
      { name: '복합 탄수화물', href: '/nutrition/complex-carbohydrate' },
    ],
  },
  {
    title: '단백질',
    items: [
      { name: '분리유청 단백질', href: '/nutrition/whey-protein-isolate' },
      { name: '농축유청 단백질', href: '/nutrition/whey-protein-concentrate' },
      { name: '식물성 단백질', href: '/nutrition/plant-protein' },
      { name: '동물성 단백질', href: '/nutrition/animal-protein' },
    ],
  },
  {
    title: '식이섬유',
    items: [
      { name: '수용성 식이섬유', href: '/nutrition/soluble-fiber' },
      { name: '불용성 식이섬유', href: '/nutrition/insoluble-fiber' },
    ],
  },
];

export const accountMenu: MenuSection[] = [
  {
    title: 'Auth pages',
    items: [
      { name: 'Sign In', href: '/auth/signin' },
      { name: 'Sign Up', href: '/auth/signup' },
      { name: 'Sign In / Up', href: '/auth/signinup' },
      { name: 'Password Recovery', href: '/auth/recovery' },
    ],
  },
];

export const accountPages: MenuItem[] = [
  { name: 'Overview', href: '/account/overview' },
  { name: 'Settings', href: '/account/settings' },
  { name: 'Billing', href: '/account/billing' },
  { name: 'Orders', href: '/account/orders' },
  { name: 'Earnings', href: '/account/earnings' },
  { name: 'Chat (Messages)', href: '/account/chat' },
  { name: 'Favorites (Wishlist)', href: '/account/favorites' },
];
