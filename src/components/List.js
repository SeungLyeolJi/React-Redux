import React from 'react';
import styled from "styled-components";

const MovieListBox = styled.div`
    background: #222;
    .movieListUl{
        margin : 0 auto;
        width: 1310px;
        
        @media ( max-width: 1309px ) {
            width: 1048px;
        }
        @media ( max-width: 1047px ) {
            width: 786px;
        }
        @media ( max-width: 785px ) {
            width: 524px;
        }
        @media ( max-width: 523px ) {
            width: 90%;
        }
    }
`;

const Notice = styled.div`
    z-index: 500;
    color: white;
    bottom: 0px;
    font-size: 25px;
    width: 300px;
    line-height: 40px;
    height: 40px;
    text-align: center;
    background: rgba( 255 , 20 , 50 ,0.8);
    position: fixed;
    left: 50%;
    transform: translate(-50%,0);
    margin-bottom: 30px;
    letter-spacing: 1px;
    display : none;
    @media ( max-width: 400px ) {
        width: 150px;
        font-size: 20px;
    }
`;

const List = ({content}) =>{
    return(
       <>
           <MovieListBox>
                        <ul className="movieListUl">
                            {content}
                        </ul>
            </MovieListBox>
            <Notice id="notice">
                    Next List!!
            </Notice>
       </>
    )
};

export default List;