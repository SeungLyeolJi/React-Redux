import React, {useEffect, useState} from 'react';
import ReviewSingle from '../components/ReviewSingle'
import axios from 'axios';
import clientCofnig from "../assets/client-config";
import Loading from "../components/Loading";
import { useGetUserName, useGetToken,  useTokenVelidate} from "../hooks";

const ReviewSingleContainer = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [author, setAuthor] = useState(null);
    const [userName] = useGetUserName();
    const [isAuthor, setIsAuthor] = useState(null);
    const [token,] = useGetToken();

    useTokenVelidate(props);

    useEffect(() => {
        axios.get(`${clientCofnig.siteUrl}/wp-json/wp/v2/posts/${props.match.params.id}`).then(
            res => {
                // console.log(res);
                setData(res.data);
                axios.get(`${clientCofnig.siteUrl}/wp-json/wp/v2/users/${res.data.author}`).then(
                    res => {
                        // console.log("유저 데이터");
                        setAuthor(res.data.name);
                        setIsLoading(false);
                        // console.log(userName);
                        // console.log(res.data.slug);
                        if (userName === res.data.slug) {
                            setIsAuthor(true);
                        } else {
                            setIsAuthor(false);
                        }
                    }
                ).catch(
                    err => {
                        console.log(err);
                    }
                );

            }
        ).catch(err => {
            console.log(err);
            setIsLoading(false);
        });
    }, []);

    const onRemove = () => {
        axios.delete(`${clientCofnig.siteUrl}/wp-json/wp/v2/posts/${data.id}`,{
            headers : {
                Authorization: "Bearer "+token
            }
        }
        ).then(res => {
            // console.log(res);
            if(res.status){
                alert("해당 리뷰가 정상적으로 삭제되었습니다");
                props.history.push('/review');
            }else{
                alert("버그 발생");
            }
        }).catch(
            err => {
                console.log(err);
            }
        );
    };

    return (
        isLoading ? <Loading/> :
            <ReviewSingle isAuthor={isAuthor} title={data.title.rendered} content={data.content.rendered}
                          date={data.date} author={author} onRemove={onRemove} id={data.id}/>
    )
};
export default ReviewSingleContainer;