export const REQUEST_STATUS = {
    notRequested: 'notRequested',
    fetching: 'fetching',
    error: 'error',
    received: 'received'
};

export const CATEGORIES_ACTIONS = {
    setRequestStatus: 'categoriesSetRequestStatus',
    setData: 'categoriesSetData',
    setSelectedCategoryId: 'setSelectedCategoryId',
};

export const ITEMS_ACTIONS = {
    setRequestStatus: 'itemsSetRequestStatus',
    setData: 'itemsSetData',
};

export const RESET_STORE = 'resetStore';

export const USER_ACTIONS = {
    addUserAction: 'addUserAction',
};

export const EVENT_NAMES = {
    selectCategory: 'selectCategory',
    selectItem: 'selectItem',
    prevPage: 'prevPage',
    nextPage: 'nextPage',
    setSearchText: 'setSearchText',
};