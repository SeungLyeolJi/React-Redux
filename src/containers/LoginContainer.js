import React, {useState, useEffect} from 'react';
import Login from "../components/Login";
import clientConfig from "../assets/client-config"
import axios from 'axios';
import {connect} from 'react-redux';
import {isLoginChange, tokenChange} from "../modules/user";
import {bindActionCreators} from "redux";

const LoginContainer = (props) => {
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');

    const idOnChange = e => {
        setUserId(e.target.value);
    };

    const pwOnChange = e => {
        setUserPw(e.target.value);
    };

    useEffect(() => {
        //로그인 했을 떄 메인으로
        if (props.isLogin === true) {
            props.history.push('/');
        }
    }, []);

    //처음 로그인시 로딩창을 보여줌 => 로딩 true
    //axios 데이터를 다 가져왔으면 => false
    const onSubmit = e => {
        e.preventDefault();
        const loginData = {'username': userId, 'password': userPw};
        axios.post(`${clientConfig.siteUrl}/wp-json/jwt-auth/v1/token`, loginData).then(
            res => {
                console.log("res : " + res);
                console.log(res);
                if(res.status === 200){
                    props.isLoginChange(true);
                    tokenChange(res.data.token);
                    alert("로그인 되었습니다.");
                    props.history.push('/');

                }else {
                    //정상 반환 값이 아님
                    props.isLoginChange(false);
                    alert("정상적인 반환 값이 아닙니다.");
                }
            }
        ).catch(err => {
            // console.log('err : ' + err);
            if (err.response.status === 403) {
                alert("존재하지 않는 계정을 입력했습니다.");
                return;
            }
            //다른 에러
            props.isLoginChange(false);
            alert("알수 없는 에러가 발생했습니다.");
            return;
        })
    };

    return (
        <Login userId={userId} userPw={userPw} idOnChange={idOnChange} pwOnChange={pwOnChange} onSubmit={onSubmit}/>
    )
};

const mapStateToProps = ({user}) => ({
    isLogin: user.isLogin
});
const mapDispatchToProps = dispatch => bindActionCreators(
    {isLoginChange, tokenChange}, dispatch
);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginContainer);

