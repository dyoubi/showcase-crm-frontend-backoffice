const CASINO_SETTINGS_ROOT = '/casino/settings';

export const routes = {
  DASHBOARD: '/',

  /* PLAYERS ROUTES */
  PLAYERS_LIST: '/players/',
  EDIT_PLAYER: '/players/:playerId',

  /* SEGMENTS ROUTES */
  NEW_SEGMENT: '/segment/new',
  SEGMENTS: '/segments',
  SEGMENT_EDIT: '/segments/:segmentId',

  /* GAMES ROUTES */
  GAMES_LIST: '/games/list',
  GAMES_CATEGORIES: '/games/categories',
  GAME_EDIT_CATEGORY: '/games/categories/:categoryId',
  GAMES_TAGS: '/games/tags',
  LOGIN_SESSION: '/login-session/:id',

  /* BONUS ROUTES */
  BONUSES: '/bonuses',
  BONUS: '/bonus/:bonusId',
  CREATE_BONUS: '/bonus/new',

  /* PROMOTIONS ROUTES */
  PROMOTIONS: '/promotions',
  PROMOTION: '/promotions/:promotionId',
  CREATE_PROMOTION: '/promotions/new',

  /* CAROUSELS ROUTES */
  CAROUSELS: '/carousels',
  CAROUSEL: '/carousels/:carouselId',
  CREATE_CAROUSEL: '/carousels/new',

  /* CASINO SETTINGS ROUTES */
  CASINO_SETTINGS_ROOT,
  CASINO_SETTINGS: `${CASINO_SETTINGS_ROOT}/:sectionName`,
  CASINO_SETTINGS_FOOTER: `${CASINO_SETTINGS_ROOT}/footer`,

  /* ARTICLES ROUTES */
  ARTICLES: '/articles',
  ARTICLE: '/articles/:articleId',
  CREATE_ARTICLE: '/articles/new',

  /* PROVIDERS ROUTES */
  PROVIDERS: '/providers',

  /* FINANCE ROUTES */
  FINANCE: '/finance',
  PAYMENTS: '/finance/payments',
  PAYMENT_DETAIL: '/finance/payments/:mandateId',
  REPORT: '/finance/reports/:reportId',
  WITHDRAWALS: '/finance/withdrawals',
  WITHDRAWAL_DETAIL: '/finance/withdrawals/:demandId',

  /* MEDIA MANAGEMENT ROUTES */
  MEDIAMANAGER: '/media-manager',
} as const;
