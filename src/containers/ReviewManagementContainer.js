import React, {useEffect,useState} from 'react';
import ReviewManagement from "../components/ReviewManagement"
import {useTokenVelidate, useGetUserName, useGetToken} from "../hooks";
import axios from "axios/index";
import clientCofnig from "../assets/client-config";
import Loading from "../components/Loading";

const ReviewManagementContainer = (props) => {
    const [userName] = useGetUserName();
    const [isLoading, setIsLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [content,setContent] = useState();
    const [token,] = useGetToken();
    const [isWrite] = useState(props.match.path === "/review/write" );
    const [isModify] = useState(props.match.path === "/modify/:id" );

    //포스트 아이디

    useTokenVelidate(props);

    const titleChange = e => {
        setTitle(e.target.value);
    };

    const contentChange = e => {
        setContent(e.target.value);
    };

    useEffect(() => {
        if(isWrite){
            setIsLoading(false);
        }else if(isModify){
            axios.get(`${clientCofnig.siteUrl}/wp-json/wp/v2/posts/${props.match.params.id}`).then(
                res => {
                    setTitle(res.data.title.rendered);
                    setContent(res.data.content.rendered);
                    axios.get(`${clientCofnig.siteUrl}/wp-json/wp/v2/users/${res.data.author}`).then(
                        res => {
                            if(res.data.slug === userName){
                                setIsLoading(false);
                            }else{
                                alert("글쓴이가 아닙니다.");
                                props.history.push("/review"+props.match.params.id);
                            }
                        }
                    ).catch(
                        err => {
                            console.log(err);
                            alert("버그 발생");
                            props.history.push("/review"+props.match.params.id);
                        }
                    );
                }
            ).catch(err => {
                console.log(err);
                alert("버그 발생");
                props.history.push("/review"+props.match.params.id);
            });
        }else{
            alert("잘못된 접근입니다");
            props.history.push("/review"+props.match.params.id);
        }
        setIsLoading(false);
    }, [isModify,isWrite,props.match.params.id,userName, props.history]);

    const  onSubmit = e => {
        if(isWrite){
            e.preventDefault();
            setIsLoading(true);
            let  formData = new FormData();
            formData.append('title', title.replace(/<([^>]+)>/ig, ''));
            formData.append('content',content.replace(/<([^>]+)>/ig, ''));
            formData.append('status', 'publish');

            axios.post(`${clientCofnig.siteUrl}/wp-json/wp/v2/posts`,
                formData
                , {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }).then(res => {
                // console.log(res);
                setIsLoading(false);
                if (res.status === 201) {
                    alert("리뷰가 작성되었습니다.");
                    props.history.push('/review');
                } else {
                    alert("서버 응답을 확인해주십시오.");
                }
            }).catch(err => {
                console.log(err);
                if(err.status === 403){
                    alert("작성 권한이 없는 아이디입니다.");
                }else{
                    alert("콘솔 확인");
                }
                setIsLoading(false);
            });
        }else if(isModify){
            e.preventDefault();
            setIsLoading(true);
            let  formData = new FormData();
            formData.append('title', title.replace(/<([^>]+)>/ig, ''));
            formData.append('content',content.replace(/<([^>]+)>/ig, ''));
            formData.append('status', 'publish');

            axios.post(`${clientCofnig.siteUrl}/wp-json/wp/v2/posts`,
                formData
                , {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }).then(res => {
                // console.log(res);
                setIsLoading(false);
                if (res.status === 201) {
                    alert("업데이트가 완료 되었습니다.");
                    props.history.push('/review');
                } else {
                    alert("서버 응답을 확인해주십시오.");
                }
            }).catch(err => {
                console.log(err);
                if(err.status === 403){
                    alert("작성 권한이 없는 아이디입니다.");
                }else{
                    alert("콘솔 확인");
                }
                setIsLoading(false);
            })
        }else{
            alert("잘못된 접근입니다");
        }

    };

    return (
        isLoading ? <Loading/> : isWrite ? <ReviewManagement onSubmit={onSubmit} contentChange={contentChange} titleChange={titleChange} title={title} content={content} type="write" /> :  isModify ?  <ReviewManagement onSubmit ={onSubmit} contentChange={contentChange} titleChange={titleChange} title={title} content={content} type="modify" /> : <></>
    )
};

export default ReviewManagementContainer;