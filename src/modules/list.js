import {createAction, handleActions} from "redux-actions";

const MODE_CHANGE = "list/MODE";//모드 값 변경
const PAGE_CHANGE = "list/PAGE";//페이지 변경
const SCROLLY_CHANGE = "list/SCROLLY";//스크롤Y 변경
const IS_SCROLL_CHANGE = "list/ISSCROLL";
const GENRE_CHANGE = "list/GENRE";

export const modeChange = createAction(MODE_CHANGE, mode => mode);
export const pageChange = createAction(PAGE_CHANGE, page => page);
export const scrollyChange = createAction(SCROLLY_CHANGE, scrolly => scrolly);
export const isScrollChange = createAction(IS_SCROLL_CHANGE, isScroll => isScroll);
export const genreChange = createAction(GENRE_CHANGE, genre => genre);

//초기화
const initialState = {
    mode : "nowPlaying",
    page : 1,
    genre : 0,
    scrolly : 0,
    isScroll : false,
};

//리듀서 작성
export default handleActions({
    [MODE_CHANGE] : (state, action) => ({
        ...state,
        mode : action.payload,
    }),
    [PAGE_CHANGE] : (state, action) => ({
        ...state,
        page  : action.payload,
    }),
    [SCROLLY_CHANGE] : (state, action) => ({
        ...state,
        scrolly : action.payload,
    }),
    [IS_SCROLL_CHANGE] : (state, action) => ({
        ...state,
        isScroll : action.payload,
    })
    ,[GENRE_CHANGE] : (state, action) => ({
        ...state,
        genre : action.payload
    })
}, initialState);