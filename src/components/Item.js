import React from 'react';
import empty from "../assets/img/empty.png";
import { Link } from "react-router-dom";
import "../assets/scss/Item.scss";

const Item = ({list, clickHandler}) =>{
    return(
        <>
            {   
                list !== null ?
                list.map((item)=>{    
                    return (
                        <li className="movieList" key={item.id} onClick={clickHandler}>
                            <Link to={`/detail/${item.id}`}>
                                <div className="movieBox">
                                    { item.poster_path !== null ? <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title}
                                    /> : <img src={empty} alt="empty"/>}
                                    <div className="movieContent">
                                        <span className="title">
                                            {item.title}
                                        </span>
                                        <span className="originalTitle">
                                            {item.original_title}
                                        </span>                         
                                        <span className="overView">
                                            {item.overview}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    );
                }) : <></>
            }
        </>
    )
};

export default Item;