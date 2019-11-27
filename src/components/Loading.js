import React from 'react';
import styled from "styled-components";
import loadingImg from "../assets/img/loading.gif";

const LoadingBox = styled.div`
    position: absolute;
    width: 100%;
    z-index: 300;
    .loadingImg {
          margin: 80px auto;
        display: block;
        width: 130px;
        height: 130px;
    }
`;

const Loading = () =>{
    return(
        <LoadingBox>
            <img className="loadingImg"src={loadingImg} alt="Loading 중"/>
        </LoadingBox>
    )
};

export default Loading;