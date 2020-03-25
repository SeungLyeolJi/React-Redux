import {useState, useEffect} from 'react';
import clientCofnig from "../assets/client-config";
import axios from "axios/index";

//모바일 체크 768보다 이하이면 true, 이상 false
export const useMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        isMobileChk();
        window.addEventListener("resize", isMobileChk);
        return () => window.removeEventListener("resize", isMobileChk);
    }, []);
    const isMobileChk = () => {
        setIsMobile(window.innerWidth <= 768);
    };
    return [isMobile];
};


export const useTokenVelidate = (props) => {
    const [token] = useState((sessionStorage.getItem('token') != null ? sessionStorage.getItem('token') : localStorage.getItem('token')));
    useEffect(() => {
        if (sessionStorage.getItem('token') != null || localStorage.getItem('token') != null) {

            const axiosHeader = {
                headers: {Authorization: "Bearer " + token}
            };

            axios.post(
                `${clientCofnig.siteUrl}/wp-json/jwt-auth/v1/token/validate`, {}, axiosHeader
            ).then(
                res => {
                    if (res.status !== 200) {
                        alert("반환값을 확인해보세요");
                    }
                }
            ).catch(err => {
                alert("토큰이 이상합니다, 로그아웃 후 재 로그인 해주십시오");
                console.log(err);
                props.history.push("/");
            })
        } else {
            alert("로그인을 해주시기 바랍니다.");
            props.history.push("/login");
        }

    }, [props.history, token]);
};

export const useGetToken = () => {
    const [token] = useState(sessionStorage.getItem('token') != null ? sessionStorage.getItem('token') : localStorage.getItem('token'));
    return [token];
};

export const useGetUserName = () =>{
    const [userName] = useState(sessionStorage.getItem('userName') != null ? sessionStorage.getItem('userName') : localStorage.getItem('userName'));
    return [userName];
}

export const useDateFormat = (date) =>{
    let result = new Date(date);
    return useState(result.getFullYear().toString()+"년 "+(result.getMonth()+1).toString()+"월 "+result.getDate().toString()+"일");
}