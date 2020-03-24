import React from 'react';
import "../assets/scss/ReviewSingle.scss";
import {Link} from "react-router-dom";

const Review = ({reviewItems})=>{
    return(
        <div className="reviewItemBox">
            <button><Link to="/review/write">리뷰작성</Link></button>
            {reviewItems}
        </div>
    )
};

export default Review;