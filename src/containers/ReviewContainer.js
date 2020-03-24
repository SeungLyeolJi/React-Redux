import Review from "../components/Review";
import React, {useState, useEffect} from "react";
import axios from 'axios';
import clientConfig from "../assets/client-config";
import ReviewItem from "../components/ReviewItem";
import Loading from "../components/Loading";

const ReviewContainer = () => {
    const [reviewItems, setReviewItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if(page === 1){
            window.scrollTo(0,0);
        }

        const handleScroll = () => {
            const {innerHeight} = window; //화면 높이
            const {scrollHeight} = document.body; //전체 스크롤 가능 길이
            // IE에서는 document.documentElement 를 사용.
            const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
            //스크롤 위치
            if (scrollHeight - innerHeight - scrollTop < 1) {
                console.log("페이지 증가");
                setPage(1 + page);
            }
        };
        window.addEventListener("scroll", handleScroll);
        reviewSetting();

        return () => {
            window.addEventListener("scroll", handleScroll);
        }
    }, []);

    useEffect(() => {
        reviewSetting();
        // console.log("스크롤 발생", page);
    }, [page]);

    const reviewSetting = () => {
        //데이터를 담는 객체명은 axios에 정의 되있음
        setIsLoading(true);
        axios.get(`${clientConfig.siteUrl}/wp-json/wp/v2/posts`, {
                params: {page: page}
            },
        ).then(
            res => {
                setReviewItems(reviewItems.concat(res.data.map((item) => {
                        return (
                            <ReviewItem id={item.id} expceprt={item.excerpt.rendered} title={item.title.rendered}
                                        date={item.date} key={item.id}/>
                        )
                    })
                    )
                );
                setIsLoading(false);
            }
        ).catch(err => {
            console.log(err);
            alert("리뷰 주소 혹은 뷰 랜더링 중 에러");
        });
    };

    return (
        isLoading ? <Loading/> : <Review reviewItems={reviewItems}/>
    )
};

export default ReviewContainer;