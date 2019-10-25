import React from 'react';
import styled from "styled-components";
import loadingImg from "../assets/img/loading.gif";

const LoadingBox = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 300;
    .loadingImg {
        margin: 40px auto;
        display: block;
    }
`;

const Loading = () =>{
    return(
        <LoadingBox>
            <img className="loadingImg"src={loadingImg} alt="Loading 중"></img>
        </LoadingBox>
    )
}

export default Loading;