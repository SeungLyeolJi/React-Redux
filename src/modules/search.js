import {createAction, handleActions} from "redux-actions";

//키워드랑 페이지
const KEYWORD_CHANGE = "search/KEYWORD";
const PAGE_CHANGE = "search/PAGE";

export const keywordChange = createAction(KEYWORD_CHANGE, keyword => keyword);
export const pageChange = createAction(PAGE_CHANGE, page => page);

const initialState = {
    keyword : "",
    page : 1,
};

export default handleActions({
    [KEYWORD_CHANGE] : (state, action) => ({
        ...state,
        keyword : action.payload
    }),
    [PAGE_CHANGE] : (state, action) => ({
        ...state,
        page : action.payload
    }),
}, initialState);