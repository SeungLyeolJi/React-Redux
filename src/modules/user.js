import {createAction, handleActions} from "redux-actions";

//액션타입
const IS_LOGIN_CHANGE = "user/IS_LOGIN";
const TOKEN_CHANGE = "user/TOKEN";

//액션함수
export const isLoginChange = createAction(IS_LOGIN_CHANGE, isLogin => isLogin);
export const tokenChange = createAction(TOKEN_CHANGE, TOKEN=>TOKEN );

//초기화
const initialState = {
    isLogin : false,
    token : ""
};

//리듀서 작성
export default handleActions({
    [IS_LOGIN_CHANGE] : (state, action) => ({
        ...state,
       isLogin : action.payload
    }),
    [TOKEN_CHANGE] : (state, action) => ({
        ...state,
        token: action.payload
    }),
}, initialState);