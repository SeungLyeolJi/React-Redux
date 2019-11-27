import React from 'react';
import {Link} from "react-router-dom";
import "../assets/scss/Genres.scss"

const Genres = ({list, menuClose}) => {
    return (
        <div className="genreUl">
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
        </div>
    )
};

export default Genres;