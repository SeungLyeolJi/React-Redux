import React from 'react';
import "../assets/scss/List.scss";

const List = ({content}) =>{
    return(
       <>
           <div className="movieListBox">
                        <ul className="movieListUl">
                            {content}
                        </ul>
            </div>
            <div className="notice" id="notice">
                    Next List!!
            </div>
       </>
    )
};

export default List;