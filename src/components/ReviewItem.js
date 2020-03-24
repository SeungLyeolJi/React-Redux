import React from 'react';
import '../assets/scss/ReviewItem.scss';
import {Link} from "react-router-dom";
import {useDateFormat}  from "../hooks";

const ReviewItem = (props) => {
    //아래 과정을 거치는 이유는 혹시 모를 html 엔티티 떄문과, 스크립트, html 을 막기 위해
    let span = document.createElement('span');
    span.innerHTML = props.expceprt.replace(/<([^>]+)>/ig, '');
    //span 안에 내용이 태그만 있을 경우 ""를 반환 => js 에서 ||, &&는 피연산자를 반환
    span = span.textContent || span.innerHTML || "";

    // console.log(data);
    const [date] = useDateFormat(props.date);
    
    return (
        <Link to={"/review/"+ props.id}>
        <div className="reviewItem">
            <div className="reviewHeader">
                <span>
                    제목 : {props.title}
                </span>
            </div>
            <div className="reviewContent">
                <span>
                    미리보기 : {span}
                </span>
            </div>
            <div className="reviewFooter">
                날짜 : {date}
            </div>
        </div>
        </Link>
    )
};
export default ReviewItem;