import React from 'react';
import "../assets/scss/Review.scss";
import {Link} from "react-router-dom";

const Review = ({reviewItems})=>{
    return(
        <div>
            <button><Link to="/review/write">리뷰작성</Link></button>
            {reviewItems}
        </div>
    )
};

export default Review;