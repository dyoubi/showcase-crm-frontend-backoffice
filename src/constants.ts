export const DATA_TEST_IDS = {
  // auth
  SIGN_IN_BUTTON: 'sign-in-btn',

  // category
  ADD_NEW_CATEGORY_BUTTON: 'add-new-category-btn',
  SEARCH_CATEGORY_INPUT: 'search-category-input',
  REMOVE_CATEGORY_BUTTON: 'remove-category-btn',
  CATEGORIES_LIST: 'categories-list',
  EDIT_CATEGORY_BUTTON: 'edit-category-btn',
  GAMES_TO_ADD_TO_CATEGORY_SELECT: 'games-to-add-to-category-select',
  ADD_GAMES_TO_CATEGORY_BUTTON: 'add-games-to-category-btn',
  GAME_CATEGORY_ITEM: 'game-category-item',
  CHANGE_GAME_POSITION_BUTTON: 'change-game-position-button',
  CHANGE_GAME_POSITION_INPUT: 'change-game-position-input',

  // tag
  SEARCH_TAG_INPUT: 'search-tag-input',
  EDIT_TAG_BUTTON: 'edit-tag-btn',
  REMOVE_TAG_BUTTON: 'remove-tag-btn',
  TAGS_LIST: 'TAGS_LIST',
  LOADING_TAGS_OVERLAY: 'loading-tags-overlay',
  TAG_INPUT_PLAYER: 'tag-input-player',
  TAG_INPUT_MACHINE: 'tag-input-machine',

  // toaster
  ADD_TAG_TOAST: 'add-tag-toast',
  ADD_GAME_TOAST: 'add-game-toast',
  ADD_CATEGORY_TOAST: 'add-category-toast',

  // confirmation modal
  CONFIRM_CHOICE: 'confirm-choice',
  CANCEL_CHOICE: 'cancel-choice',

  // games
  ADD_NEW_GAME_BUTTON: 'add-new-game-btn',
  REMOVE_GAME_BUTTON: 'remove-game-btn',
  GAMES_LIST: 'games-list',
  SEARCH_GAME_INPUT: 'search-game-input',
} as const;

// List of emails that have restricted access (only dashboard, players list, edit player)
export const RESTRICTED_EMAILS = [
  'yann@webassist.pro',
  'floria@webassist.pro',
  'manon.t@webassist.pro',
  'louisa@webassist.pro',
  'ximena@webassist.pro',
  'lou@webassist.pro',
  'enzo@webassist.pro',
  'jordan@webassist.pro',
  'mathildel@webassist.pro',
  'sandy@webassist.pro',
  'esteban+cs@webassist.pro',
];
