import React, {useState, useEffect} from 'react';
import Login from "../components/Login";
import clientConfig from "../assets/client-config"
import axios from 'axios';
import Loading from '../components/Loading';

const LoginContainer = (props) => {
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [autoLogin, setAutoLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const idOnChange = e => {
        setUserId(e.target.value);
    };

    const pwOnChange = e => {
        setUserPw(e.target.value);
    };

    const autoLoginChange = e => {
        setAutoLogin(e.target.checked);
    };

    useEffect(() => {
        //로그인 했을 떄 메인으로
        if (localStorage.getItem('token') != null || sessionStorage.getItem('token')) {
            props.history.push('/');
        }
    }, []);
    //Line 30:8:  React Hook useEffect has a missing dependency: 'props.history'. Either include it or remove the dependency array

    //처음 로그인시 로딩창을 보여줌 => 로딩 true
    //axios 데이터를 다 가져왔으면 => false
    const onSubmit = e => {
        setIsLoading(true);
        e.preventDefault();
        const loginData = {'username': userId, 'password': userPw};
        axios.post(`${clientConfig.siteUrl}/wp-json/jwt-auth/v1/token`, loginData).then(
            res => {
                if (res.status === 200) {
                    console.log(res);
                    console.log(res.data);
                    //스토레지 값 변경
                    if (autoLogin) {
                        //자동 로그인
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('userName', res.data.user_nicename);
                    } else {
                        //일반 로그인
                        sessionStorage.setItem('token', res.data.token);
                        sessionStorage.setItem('userName', res.data.user_nicename);
                    }

                    setIsLoading(false);
                    alert("로그인 되었습니다.");
                    window.location.reload();

                } else {
                    //정상 반환 값이 아님
                    //스토레지 값 변경
                    alert("정상적인 반환 값이 아닙니다.");
                }
            }
        ).catch(err => {
            setIsLoading(false);
            console.log('err : ' + err);
            alert("입력사항을 확인해주세요");
            return;
        })
    };

    return (
        <>
            <Login userId={userId} userPw={userPw} idOnChange={idOnChange} pwOnChange={pwOnChange} onSubmit={onSubmit}
                   autoLoginChange={autoLoginChange} autoLogin={autoLogin}/>
            {isLoading ? <Loading/> : <></>}
        </>
    )
};
export default LoginContainer;

