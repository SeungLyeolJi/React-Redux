import React from 'react';
import "../assets/scss/Login.scss"

const Login = ({onSubmit, userId, idOnChange, userPw, pwOnChange}) => {
    return (
        <div className="loginBox">
            <form onSubmit={onSubmit}>
                <div className="inputBox">
                    ID : <input type="text" value={userId} onChange={idOnChange}/><br/>
                    PW : <input type="password" value={userPw} onChange={pwOnChange}/><br/>
                </div>
                <input type="submit" value="Login"/>
            </form>
        </div>
    )
};

export default Login;