import React from 'react';
import "../assets/scss/ReviewSingle.scss";
import {useDateFormat} from "../hooks";
import {Link} from "react-router-dom";

const ReviewSingle = (props) => {
    const [date] = useDateFormat(props.date)
    // console.log(props);
    return (
        <div className="reviewSingleBox">
            {
                props.isAuthor ?
                    <div className="reviewSingleAdminBox">
                        <Link to={"/modify/"+props.id}><button className="modify">수정</button></Link>
                        <button className="remove" onClick={props.onRemove}>삭제</button>
                    </div>
                    : ""
            }
            <div className="reviewSingleHeader">
                <div className="title">
                    {props.title}
                </div>
                <div className="subBox">
                    <div className="date">
                        {date}
                    </div>
                    <div className="author">
                        Author : {props.author}
                    </div>
                    <hr/>
                </div>

            </div>
            <div className="reviewSingleContent" >
                {props.content}
            </div>

            <div className="reviewSingleFooter">
            </div>
        </div>
    )
};

export default ReviewSingle;
