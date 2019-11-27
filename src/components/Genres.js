import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";

const GenreBox = styled.ul`
    top: 59px;
    display: none;
    height: 0px;
    padding: 10px;
    border: 3px solid white;
    position: absolute;
    background: rgb(20,20,20);
    width: 550px;
    transform: translate(-50%);
    box-shadow: 0px 2px 1px 3px #333; 
    left: 50%;
    .genreList {
        width: 90px; 
        float: left;
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

const Genres = ({list, menuClose}) => {
    return (
        <GenreBox className="genreUl">
            {
                list.map((item, idx) => {
                    return (
                        <li className="genreList" key={idx}>
                            <Link to={`/genreList/${item.id}`} key={item.id} onClick={menuClose}>
                                {item.name}
                            </Link>
                        </li>

                    );
                })
            }
        </GenreBox>
    )
};

export default Genres;