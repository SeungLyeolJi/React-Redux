import React from 'react';
import "../assets/scss/ReviewWrite.scss"

const ReviewManagement = (props) => {
    return (
        <>
            <form onSubmit={props.onSubmit}>
                <div className="reviewWriteBox">

                    <h3>{props.type === "modify" ? "리뷰 업데이트" : "리뷰 작성"}</h3>

                    <div className="header">
                        <label htmlFor="title">제목 : </label>
                        <input id="title" name="title" type="text" value={props.title} onChange={props.titleChange}/>
                    </div>

                    <div className="body">
                        <label htmlFor="content">내용 : </label>
                        <br/>
                        <textarea id="content" name="content" value={props.content} onChange={props.contentChange}/>
                    </div>


                </div>
                <div className="moveSelectBox">
                    <div>
                        <input type="text" name="movieName"/> 
                        <input type="button" value="검색"/>
                    </div>
                    <div>
                        <ul>
                            <li>

                            </li>
                        </ul>
                    </div>
                    <div>
                        <input type="text" name="selectMovie" />
                    </div>
                </div>
                <button type="submit" className="reviewWritButton">{props.type === "modify" ? "업데이트" : "작성"}</button>
            </form>
        </>
    )
};

export default ReviewManagement;