import React from 'react';
import "../assets/scss/ReviewWrite.scss"

const ReviewWrite = (props) => {

    return (
        <div className="reviewWriteBox">
            <form onSubmit={props.onSubmit}>
                <h3>리뷰 작성</h3>
                <div className="header">
                    <label htmlFor="title">제목 : </label>
                    <input id="title" name="title" type="text" value={props.title} onChange={props.titleChange}/>
                </div>

                <div className="body">
                    <label htmlFor="content">내용 : </label>
                    <br/>
                    <textarea id="content" name="content"value={props.content} onChange={props.contentChange}/>
                </div>
                <button type="submit">작성</button>
            </form>
        </div>
    )
};

export default ReviewWrite;