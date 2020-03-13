import React from 'react';
import "../assets/scss/Review.scss";

const Review = ({reviewItems})=>{
    return(
        <div>
            <button>리뷰작성</button>
            {reviewItems}
        </div>
    )
};

export default Review;