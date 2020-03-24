import React, {useEffect,useState} from 'react';
import ReviewManagement from "../components/ReviewManagement"
import {useTokenVelidate, useGetUserName, useGetToken} from "../hooks";
import axios from "axios/index";
import clientCofnig from "../assets/client-config";
import Loading from "../components/Loading";

const ReviewModifyContainer = (props) => {
    const [userName] = useGetUserName();
    const [isWriter, setIsWirter] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [title, setTitle] = useState('');
    const [content,setContent] = useState();
    const [token,] = useGetToken();
    //포스트 아이디

    useTokenVelidate(props);

    const titleChange = e => {
        setTitle(e.target.value);
    };

    const contentChange = e => {
        setContent(e.target.value);
    };

    useEffect(() => {

    }, []);


    const onSubmit = (e)=>{

    };



return (
    isLoading ? <Loading/> :<ReviewManagement data = {data} onSubmit ={onSubmit} contentChange={contentChange} titleChange={titleChange} title={title} content={content} type="modify" />
)
};

export default ReviewModifyContainer;