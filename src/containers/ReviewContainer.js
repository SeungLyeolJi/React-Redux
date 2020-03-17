import Review from "../components/Review";
import React, {useState, useEffect} from "react";
import axios from 'axios';
import clientConfig from "../assets/client-config";
import ReviewItem from "../components/ReviewItem";
import Loading from "../components/Loading";

const ReviewContainer = () => {
    const [reviewItems, setReviewItems] = useState([]);
    const [isLoading , setIsLoading] = useState(true);

    useEffect(() => {
        // axios, 요청한다
        axios.get(`${clientConfig.siteUrl}/wp-json/wp/v2/posts`).then(
            res => {
                setReviewItems(res.data.map((item) => {
                        return (
                            <ReviewItem data={item} key={item.id}/>
                        )
                    })
                );
                setIsLoading(false);
            }
        ).catch(err => {
            console.log(err);
            alert("리뷰 주소 혹은 뷰 랜더링 중 에러");
        });
    }, []);

    return (
        isLoading ? <Loading/> :<Review reviewItems={reviewItems}/>
    )
};

export default ReviewContainer;