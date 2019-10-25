import {createAction, handleActions} from "redux-actions";

const MODE_CHANGE = "list/MODE";//모드 값 변경

export const modeChange = createAction(MODE_CHANGE, mode => mode);

//초기화
const initialState = {
    mode : "nowPlaying",
};

//리듀서 작성
export default handleActions({
    [MODE_CHANGE] : (state, action) => ({
        ...state,
        mode : action.payload,
    }),
}, initialState);