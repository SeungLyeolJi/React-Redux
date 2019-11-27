import React from 'react';
import List from "../components/Item";
import Loading from "../components/Loading";
import "../assets/scss/search.scss"

import nextArrow from "../assets/img/right-arrow.png";
import prevArrow from "../assets/img/left-arrow.png";
import firstArrow from "../assets/img/first-arrow.png";
import lastArrow from "../assets/img/last-arrow.png";

const Search = ({keyword, result, error, isLoading, onSubmit, onChange, nextPage, prevPage, clickPage, currPage, maxPage, firstPage, lastPage, prevKeyword}) => {
    const getPagiNation = () => {
        let pagiNation = [];
        let limit = 1;
        for (let re = currPage <= 5 ? 1 : currPage - 4; re <= maxPage; re++) {
            if (limit > 9)
                return pagiNation;
            if (re === currPage) {
                pagiNation.push(<li onClick={clickPage} className="circle currCircle" key={`circle${re}`}>{re}</li>)
            } else {
                pagiNation.push(<li onClick={clickPage} className="circle" key={`circle${re}`}>{re}</li>)
            }
            limit++;
        }
        return pagiNation;
    };

    return (
        <div className="searchWrapper">
            <div className="searchBox">
                <form>
                    <div className="searchInputBox">
                        <input type="text" className="searchInput" value={keyword} onChange={onChange}/>
                    </div>
                    <input className="searchSubmit" placeholder="Search Text Input" value="검색" onClick={onSubmit}
                           type="submit"/>
                </form>
            </div>
            {isLoading === true ?
                <Loading/>
                : result !== null && result.length !== 0
                    ?
                    <>
                        <div className="searchLogo">
                            search : {prevKeyword}
                        </div>
                        <div className="listBox">
                            <ul>
                                <List list={result}/>
                            </ul>
                        </div>
                        <div className="pagiNation">
                            <ul className="pagiNationUl">
                                <li className="arrow" onClick={firstPage}>
                                    <img src={firstArrow} alt="frist arrow"/>
                                </li>
                                <li className="arrow" onClick={prevPage}>
                                    <img src={prevArrow} alt="prev arrow"/>
                                </li>
                                {getPagiNation()}
                                <li className="arrow" onClick={nextPage}>
                                    <img src={nextArrow} alt="next arrow"/>
                                </li>
                                <li className="arrow" onClick={lastPage}>
                                    <img src={lastArrow} alt="last arrow"/>
                                </li>
                            </ul>
                        </div>
                    </>
                    :
                    result !== null && result.length === 0 ?
                        <div className="notFound">
                            {prevKeyword === "" ? "값을 입력하세요" : "'" + prevKeyword + "'을 찾을 수 없습니다"}
                        </div>
                        :
                        <div className="errorLogo">
                            {error}
                        </div>
            }
        </div>
    )
};

export default Search;