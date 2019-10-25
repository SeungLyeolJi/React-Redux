import React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";

const GenreBox = styled.ul`
    margin-left: -50px;
    display: inline-block;
    transition: 0.2s;
    top: 70px;
    width: 600px;
    position: absolute;
    height: 0px;
    overflow: hidden;
    background: rgb(20,20,20);
    .genreList {
        float: left;
        width: 80px;
        margin-top: 10px;
        color: white;
        text-align: center;
        line-height: 30px;
        font-size: 15px;
        border-bottom: 1px solid white;
        display: inline-block;
        margin: 5px 10px;
        box-sizing:border-box;
    }
    .genreList:hover{
        transition : 0.2s;
        border-bottom: 1px solid #d91c0b;
    }
`;

const Genres = ({list}) =>{
    return(
        <GenreBox className="genreUl">
            {   
                list.map((item)=>{
                    return (
                        <Link to={`/genreList/${item.id}`} key={item.id}>
                            <li className="genreList">
                                {item.name}
                            </li>
                        </Link>
                    );
                })
            }
        </GenreBox>
    )
}

export default Genres;