import React from 'react';
import loadingImg from "../assets/img/loading.gif";
import "../assets/scss/Loading.scss";

const Loading = () =>{
    return(
        <div className="loadingBox">
            <img className="loadingImg" src={loadingImg} alt="Loading 중"/>
        </div>
    )
};

export default Loading;