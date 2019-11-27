import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {useMobile} from "../hooks";
import Genres from "../components/Genres";
import "../assets/scss/header.scss";
import searchIcon from "../assets/img/search.png";
import xIcon from  "../assets/img/x.png";
import menuIcon from "../assets/img/menu.png";

const Header = ({genreList }) => {
    const [gernesOpen, setGernesOpen] = useState(false);
    const [mobileMenuOpen ,setMobileMenuOpen] = useState(false);
    const [isMobile] = useMobile(useMobile());

    const searchStyle = {
        backgroundImage : `url(${searchIcon})`
    };
    const xIconStyle = {
        backgroundImage : `url(${xIcon})`
    };
    const menuStyle = {
        backgroundImage : `url(${menuIcon})`
    };

    useEffect(()=>{
        if(!isMobile){
            setMobileMenuOpen(false);
            if(mobileMenuOpen && gernesOpen) {
                setGernesOpen(false);
            }
        }
        if(isMobile){
            if(!mobileMenuOpen && gernesOpen) {
                setGernesOpen(false);
            }
        }
    },[useMobile()]);

    const genresClickHandler = () =>{
        if(gernesOpen){
            setGernesOpen(false);
        }else{
            setGernesOpen(true);
        }
    };

    const menuClickHandler = () =>{
        if(mobileMenuOpen){
            setMobileMenuOpen(false);
        }else{
            setMobileMenuOpen(true);
        }
    };

    const menuClose = () => {
        if(mobileMenuOpen){
            setMobileMenuOpen(false);
        }
        if(gernesOpen){
            setGernesOpen(false);
        }
    };

    return (
        <>
            <div className="headerWrapper">
                <div className="headerBox">
                    <button className="menuBtn" onClick={isMobile ? menuClickHandler: ()=>{}} style={menuStyle}/>
                    <ul className={`LinkList ${mobileMenuOpen ? "open" : ""}`}>
                        <button className="xIcon" onClick={isMobile ? menuClickHandler: ()=>{}} style={xIconStyle}/>
                        <li><Link to="/home" onClick={menuClose}>홈</Link></li>
                        <li><Link to="/upcoming" onClick={menuClose}>개봉예정작</Link></li>
                        <li><Link to="/popular" onClick={menuClose}>명작</Link></li>
                        <li className={gernesOpen ? "genres on" :"genres"} >
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