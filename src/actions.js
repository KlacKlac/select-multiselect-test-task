import {
    REQUEST_STATUS,
    CATEGORIES_ACTIONS,
    ITEMS_ACTIONS,
    RESET_STORE,
    USER_ACTIONS,
} from './constants';

const setCategoriesRequestStatus = (status) => ({
    type: CATEGORIES_ACTIONS.setRequestStatus,
    data: status
});

const setItemsRequestStatus = (status) => ({
    type: ITEMS_ACTIONS.setRequestStatus,
    data: status
});

export const setCategoriesData = (categories) => ({
    type: CATEGORIES_ACTIONS.setData,
    data: categories
});

const setItemsData = (items) => ({
    type: ITEMS_ACTIONS.setData,
    data: items
});

export const resetStore = () => ({type: RESET_STORE});

export const getCategories = (dispatch) => {
    dispatch(setCategoriesRequestStatus(REQUEST_STATUS.fetching));
    fetch('mock-data/categories.json')
        .then((rawData) => rawData.json())
        .then(({data}) => {
            if (data) {
                dispatch(setCategoriesData(data));
                dispatch(setCategoriesRequestStatus(REQUEST_STATUS.received));
            }
        })
        .catch(() => {
            dispatch(setCategoriesRequestStatus(REQUEST_STATUS.error));
        });
};

export const getItems = (dispatch) => {
    dispatch(setItemsRequestStatus(REQUEST_STATUS.fetching));
    fetch('mock-data/items.json')
        .then((rawData) => rawData.json())
        .then(({data}) => {
            if (data) {
                dispatch(setItemsData(data));
                dispatch(setItemsRequestStatus(REQUEST_STATUS.received));
            }
        })
        .catch(() => {
            dispatch(setItemsRequestStatus(REQUEST_STATUS.error));
        });
};

export const setSelectedCategoryId = (categoryId) => ({
    type: CATEGORIES_ACTIONS.setSelectedCategoryId,
    data: categoryId,
});

export const addUserAction = (userAction) => ({
    type: USER_ACTIONS.addUserAction,
    data: userAction,
});