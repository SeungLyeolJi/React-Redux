import {createAction, handleActions} from "redux-actions";

const GENRE_CHANGE = "list/MODE";//모드 값 변경

export const genreChange = createAction(GENRE_CHANGE, id => id);

//초기화
const initialState = {
    id : 0,
};

//리듀서 작성
export default handleActions({
    [GENRE_CHANGE] : (state, action) => ({
        ...state,
        id : action.payload,
    }),
}, initialState);