import React from 'react';
import '../assets/scss/ReviewItem.scss';

const ReviewItem = ({data}) =>{
    return (
        <div className="reviewItem">

            <div className="reviewHeader">
               {data.title.rendered}
            </div>
            <div className="reviewContent">
                {data.excerpt.rendered}
            </div>
            <div className="reviewFooter">
                {data.date}
            </div>
        </div>
    )
}
export default ReviewItem;