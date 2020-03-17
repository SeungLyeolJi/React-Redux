import React from 'react';
import "../assets/scss/Login.scss"

const Login = ({onSubmit, userId, idOnChange, userPw, pwOnChange, autoLoginChange, autoLogin}) => {
    //스토어는 새로고침시 안에 내용이 초기화됨
    //=> 로그인 여부를 스토어에 저장하지 말아야됨
    //=> 로컬 storage 하고 session storage 가 있던 걸로 기억나는데
    //이 둘의 차이점 알기
    return (
        <div className="loginBox">
            <form onSubmit={onSubmit}>
                <div className="inputBox">
                    <label htmlFor="userId">ID  : </label>
                    <input id="useId" type="text" value={userId} onChange={idOnChange}/>
                    <br/>
                    <label htmlFor="userPw">PW  : </label>
                    <input id="userPw" type="password" value={userPw} onChange={pwOnChange}/>
                    <br/>
                </div>
                <input type="submit" value="Login"/>
                <div className="autoLoginBox">
                    자동 로그인 : <input type="checkbox" onClick={autoLoginChange} value={autoLogin} />
                </div>
            </form>
        </div>
    )
};

export default Login;