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
    title: 'Portfolio',
    items: [
      { name: 'List View v.1', href: '/portfolio/list-v1' },
      { name: 'List View v.2', href: '/portfolio/list-v2' },
      { name: 'Grid View v.1', href: '/portfolio/grid-v1' },
      { name: 'Grid View v.2', href: '/portfolio/grid-v2' },
      { name: 'Slider View', href: '/portfolio/slider' },
      { name: 'Single Project v.1', href: '/portfolio/single-v1' },
      { name: 'Single Project v.2', href: '/portfolio/single-v2' },
    ],
  },
  {
    title: 'Shop',
    items: [
      { name: 'Catalog (Listing)', href: '/shop/catalog' },
      { name: 'Product Page', href: '/shop/single' },
      { name: 'Checkout', href: '/shop/checkout' },
    ],
  },
  {
    title: 'Blog',
    items: [
      { name: 'Grid View with Sidebar', href: '/blog/grid-sidebar' },
      { name: 'Grid View no Sidebar', href: '/blog/grid' },
      { name: 'List View with Sidebar', href: '/blog/list-sidebar' },
      { name: 'List View no Sidebar', href: '/blog/list' },
      { name: 'Single post v.1', href: '/blog/single-v1' },
      { name: 'Single post v.2', href: '/blog/single-v2' },
      { name: 'Single post v.3', href: '/blog/single-v3' },
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
