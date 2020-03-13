import React from 'react';
import "../assets/scss/List.scss";

const List = ({listItems}) =>{
    return(
       <>
           <div className="movieListBox">
                        <ul className="movieListUl">
                            {listItems}
                        </ul>
            </div>
            <div className="notice" id="notice">
                    Next List!!
            </div>
       </>
    )
};

export default List;