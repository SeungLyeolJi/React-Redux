import React, {useState, useEffect} from 'react';
import ReviewWrite from "../components/ReviewWrite"
import clientCofnig from "../assets/client-config";
import Loading from "../components/Loading";
import axios from "axios";

const ReviewWriteContainer = (props) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [token, ] = useState((sessionStorage.getItem('token') != null ? sessionStorage.getItem('token') : localStorage.getItem('token')));
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem('token') != null || localStorage.getItem('token') != null) {
            //jwt-auth에서의 vaildate로 스토어의 토큰이 유효한지 확인
            //Bearer 에서 대문자 소문자를 봄

            const axiosHeader = {
                headers: {Authorization: "Bearer " + token}
            };

            axios.post(
                `${clientCofnig.siteUrl}/wp-json/jwt-auth/v1/token/validate`, {}, axiosHeader
            ).then(
                res => {
                    if(res.status !== 200){
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

    },[]);

    const titleChange = e => {
        setTitle(e.target.value);
    };

    const contentChange = e => {
        setContent(e.target.value);
    };

    const onSubmit = e => {
        e.preventDefault();
        setIsLoading(true);

        //author, meta는 어떻게 들어가는지.
        const formData = {
            title,
            content,
            status : 'publish',
            meta : 'meta'
        };
        //meta에 <> 태그를 넣으니 400에러로 걸러짐
        //meta : '1232132Aㅌㅁㅊㅁㄴ/막 이상한 값'
        //메타는 어떤 값이 들어가는지 알기

        axios.post(`${clientCofnig.siteUrl}/wp-json/wp/v2/posts`, formData,{
            headers : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res=>{
            console.log(res);
            setIsLoading(false);
            if(res.status === 201){
                alert("리뷰가 작성되었습니다.");
                props.history.push('/review');
            }else{
                alert("서버 응답을 확인해주십시오.");
            }
        }).catch(err =>{
            console.log(err);
            alert("콘솔 확인");
            setIsLoading(false);
        })
    };

    return (
        isLoading ? <Loading/> : <ReviewWrite onSubmit={onSubmit} contentChange={contentChange} titleChange={titleChange} title={title} content={content}/>
    )
};


export default ReviewWriteContainer;