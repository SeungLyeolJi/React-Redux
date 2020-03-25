import Review from "../components/Review";
import React from "react";
import axios from 'axios';
import clientConfig from "../assets/client-config";
import ReviewItem from "../components/ReviewItem";
import Loading from "../components/Loading";

//무한 스크롤링 할 떄 클래스형이 편함
//페이기 최대개수 넘어갈시 에러 + 페이지가 넘어갔음을 알림 추가
class ReviewContainer extends React.Component {
    state = {
        reviewItems: [],
        isLoading: true,
        page: 1
    };

    handleScroll = () => {
        const {innerHeight} = window; //화면 높이
        const {scrollHeight} = document.body; //전체 스크롤 가능 길이
        // IE에서는 document.documentElement 를 사용.
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        //스크롤 위치
        if (scrollHeight - innerHeight - scrollTop < 1) {
            this.setState({
                page: this.state.page + 1
            });
        }
    };
    reviewSetting = () => {
        //데이터를 담는 객체명은 axios에 정의 되있음
        this.setState({
            isLoading: false
        });
        axios.get(`${clientConfig.siteUrl}/wp-json/wp/v2/posts`, {
                params: {page: this.state.page}
            },
        ).then(
            res => {
                this.setState({
                    reviewItems: (this.state.reviewItems.concat(res.data.map((item) => {
                                // console.log(item);
                                return (
                                    <ReviewItem id={item.id} expceprt={item.excerpt.rendered} title={item.title.rendered}
                                                date={item.date} key={this.state.page+""+item.id}/>
                                )
                            })
                        )
                    )
                });
                this.setState({
                    isLoading : false
                });
            }
        ).catch(err => {
            console.log(err);
            alert("리뷰 주소 혹은 뷰 랜더링 중 에러");
        });
    };

    componentDidMount() {
        if (this.state.page === 1) {
            window.scrollTo(0, 0);
        }
        this.reviewSetting();
        window.addEventListener("scroll", this.handleScroll);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.page !== nextState.page){
            this.reviewSetting();
            return false;
        }else if(this.state.isLoading !== nextState.isLoading){
            return true;
        }else if(this.state.reviewItems !== nextState.reviewItems){
            return true;
        }else{
            return false;
        }
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    render() {
        return (
            this.state.isLoading ? <Loading/> : <Review reviewItems={this.state.reviewItems}/>
        )
    }
}
export default ReviewContainer;