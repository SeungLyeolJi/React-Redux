import React from 'react';
import {Link} from "react-router-dom";

import Genres from "../components/Genres";
import "../assets/scss/header.scss";

const Header = ({genreList, genresClickHandler, menuClickHandler, menuClose, logoutHandler, gernesOpen, mobileMenuOpen, isMobile, xIconStyle, menuStyle, searchStyle}) => {
    return (
        <>
            <div className="headerWrapper">
                <div className="headerBox">
                    <button className="menuBtn" onClick={isMobile ? menuClickHandler : () => {
                    }} style={menuStyle}/>
                    <ul className={`LinkList ${mobileMenuOpen ? "open" : ""}`}>
                        <button className="xIcon" onClick={isMobile ? menuClickHandler : () => {
                        }} style={xIconStyle}/>
                        <li><Link to="/home" onClick={menuClose}>홈</Link></li>
                        {/*로그인 버튼 클릭시 팝업을 띄워서 로그인 하고 싶음*/}
                        {sessionStorage.getItem('token') != null || localStorage.getItem('token') != null  ?
                            <li><a href="/logout" onClick={logoutHandler}>로그아웃</a></li> :
                            <li><Link to="/login"onClick={menuClose}>로그인</Link></li>}
                        {/*회원가입은 정보 찾아보기*/}
                        <li><Link to={"/"} onClick={menuClose}>회원가입</Link></li>
                        {/*워드프레스 연결하여서 하기*/}
                        <li><Link to="/review" onClick={menuClose}>리뷰</Link></li>
                        <li><Link to="/upcoming" onClick={menuClose}>개봉예정작</Link></li>
                        <li><Link to="/popular" onClick={menuClose}>명작</Link></li>
                        <li className={gernesOpen ? "genres on" : "genres"}>
                            <button onClick={genresClickHandler}>장르</button>
                            <Genres list={genreList} menuClose={menuClose}/>
                        </li>
                    </ul>
                    <Link to="/search" onClick={menuClose}>
                        <span className="searchBox" style={searchStyle}/>
                    </Link>
                </div>
            </div>
            <div className="padding"/>
        </>
    )
};

export default Header;
