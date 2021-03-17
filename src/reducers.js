import {
    REQUEST_STATUS,
    CATEGORIES_ACTIONS,
    ITEMS_ACTIONS,
    RESET_STORE,
    USER_ACTIONS,
} from './constants';

const initialState = {
    categories: {
        status: REQUEST_STATUS.notRequested,
        data: [],
    },
    items: {
        status: REQUEST_STATUS.notRequested,
        data: [],
    },
    user_actions: [],
    selectedCategoryId: '',
  }
  
export default (state = initialState, action) => {
    switch (action.type) {
        case CATEGORIES_ACTIONS.setRequestStatus:
            return {
                ...state,
                categories: {...state.categories, status: action.data}
            };
        case ITEMS_ACTIONS.setRequestStatus:
            return {
                ...state,
                items: {...state.items, status: action.data}
            };
        case CATEGORIES_ACTIONS.setData:
            return {
                ...state,
                categories: {...state.categories, data: action.data}
            };
        case ITEMS_ACTIONS.setData:
            return {
                ...state,
                items: {...state.items, data: action.data}
            };
        case CATEGORIES_ACTIONS.setSelectedCategoryId:
            return {
                ...state,
                selectedCategoryId: action.data,
            };
        case USER_ACTIONS.addUserAction:
            return {
                ...state,
                user_actions: [...state.user_actions, {...action.data, id: Date.now()}],
            };
        case RESET_STORE:
            return initialState;
        default:
            return state;
    }
}