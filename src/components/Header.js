import React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import searchIcon from "../assets/img/search.png";
import Genres from "../components/Genres";
import menu from "../assets/img/menu.png";

const HeaderWrapper = styled.div`
    top: 0px;
    z-index: 100;
    width: 100%;
    background: rgb(20, 20, 20);
    color: white;
    z-index: 200;
    position: fixed;
`;

const HeaderBox = styled.div`
    width: 80%;
    margin: 0 auto;
    height: 70px;
    line-height: 70px;
    .LinkList>li{
        cursor: pointer;
        padding: 0px 20px;
        float: left;
        text-align: center;
        line-height: inherit;
        height: 50px;
        @media (max-width : 599px){
            display : none;
        }
    }
    .LinkList>li : hover {
        color : red;
    }
    .genres:hover {
        color :red;
    }
    .searchBox{
        float: right;
    }
    .genres:hover .genreUl{
        height : 170px;
    }
    .menuBtn{
        display : none;
        @media (max-width : 599px){
            display : block;
            cursor: pointer;
        }
        .LinkList>li : hover {
            color : red;
        }
        .genres:hover {
            color :red;
        }
        width: 50px;
        height: 50px;
        position: absolute;
        top: 10px;
        background : url(${menu}) no-repeat center;
        background-size: 50px 50px
        .LinkList{
            position: absolute;
            top: 50px;
            li{ 
                background : rgb(20,20,20);
                padding: 5px;
                height: 35px;
                width: 120px;
                line-height: 35px;
                font-size: 16px;
                color: white;
                .genreUl{
                    left: 50px;
                    height : 0px;
                    width: 300px;
                    top: 180px;
                }
            }
            .genres:hover .genreUl{
                height: 460px;
            }
        }
    }
    .menuBtn: hover .LinkList>li {
        display : block;
    }
    .LinkList>li:hover{
        display : block;
    }
`;

const Padding = styled.div`
    padding-bottom :70px;
`;

const SearchBtn = styled(Link)`
    position: relative;
    width:50px;height:50px;
    background : url(${searchIcon}) no-repeat center;
    background-size:100% auto;
    display: block;
    top : 10px;
`;

const Header = ({genreList}) =>{
    return(
        <>
            <HeaderWrapper>
                <HeaderBox>
                    <div className="menuBtn">
                        <ul className="LinkList">    
                            <li><Link to = "/home">홈</Link></li>
                            <li><Link to = "/upcoming">개봉예정작</Link></li>
                            <li><Link to = "/popular">명작</Link></li>
                            <li className="genres">
                                장르
                                <Genres list={genreList}/>
                            </li>
                        </ul>
                    </ div>
                    <ul className="LinkList">    
                        <li><Link to = "/home">홈</Link></li>
                        <li><Link to = "/upcoming">개봉예정작</Link></li>
                        <li><Link to = "/popular">명작</Link></li>
                        <li className="genres">
                            장르
                            <Genres list={genreList}/>
                        </li>
                    </ul>
                    <span className="searchBox">
                        <SearchBtn to="/search"></SearchBtn>
                    </span>
                </HeaderBox>
            </HeaderWrapper>
            <Padding/>
        </>
    )
}

export default Header;