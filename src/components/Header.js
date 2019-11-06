import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";
import searchIcon from "../assets/img/search.png";
import Genres from "../components/Genres";
import menu from "../assets/img/menu.png";
import {useMobile} from "../hooks";

const HeaderWrapper = styled.div`
    top: 0px;z-index: 100;width: 100%;background: rgb(20, 20, 20);color: white;z-index: 200;position: fixed;
`;

const HeaderBox = styled.div`
    width: 87%;margin: 0 auto;height: 70px;line-height: 70px;
    .searchBox{
        float: right;
    }
    .menuBtn{
        background-image: none;
        .LinkList>li :hover {
            color : red;
        }
        .genres:hover {
          color: red;
        }
        @media (max-width : 768px){
            position: absolute;background-image : url(${menu});background-size: 100% auto;display : block;cursor: pointer;width: 36px;height: 36px;top: 17px;
             .LinkList{
                position: absolute;top: 40px;display: none;
             }
        }
        .LinkList{
            >li{ 
                cursor: pointer;background : rgb(20,20,20);padding: 5px;height: 36px;width: 120px;line-height: 35px;font-size: 17px;color: white;text-align: center;float: left;top: 12px;position: relative;
            }
            .on{
              .genreUl{ 
              display: inline-table;
            }
          }
        }
    }
    .open>.LinkList{
      display: block;
      position: fixed;
      width: 100%;
      left: 0;
      top: 55px;
      padding-bottom: 25px;
      background: rgb(20,20,20);
      li{
         width: 100%;
      }
    }
`;

const Padding = styled.div`
    padding-bottom :70px;
`;

const SearchBox = styled.span`
    float: right;position: relative;width:50px;height:50px;background-size:100% auto;display: block;top : 10px;background-image:url(${searchIcon});right: 20px;
    a{
      width:50px;height:50px;display: inherit;
    }
    @media (max-width : 768px){
        width: 36px;height: 36px;top: 17px;
        a{
           width:42px;height:42px;margin-top: -3px;margin-left:-3px;
        }
    }
    
`;

const Header = ({genreList }) => {
    const [gernesOpen, setGernesOpen] = useState(false);
    const [mobileMenuOpen ,setMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useMobile(useMobile());

    useEffect(()=>{
        console.log(isMobile);
        if(isMobile){

        }else{
            setMobileMenuOpen(false);
        }
    },[useMobile()]);

    const genresClickHandler = () =>{
        if(gernesOpen){
            setGernesOpen(false);
        }else{
            setGernesOpen(true);
        }
    }

    const menuClickHandler = () =>{
        console.log("실행");
        if(mobileMenuOpen){
            setMobileMenuOpen(false);
        }else{
            setMobileMenuOpen(true);
        }
    }

    return (
        <>
            <HeaderWrapper>
                <HeaderBox>
                    <div className={mobileMenuOpen ? "menuBtn open" : "menuBtn" }
                    onClick={isMobile ? menuClickHandler: ()=>{}}>
                        <ul className="LinkList">
                            <li><Link to="/home">홈</Link></li>
                            <li><Link to="/upcoming">개봉예정작</Link></li>
                            <li><Link to="/popular">명작</Link></li>
                            <li className={gernesOpen ? "genres on" :"genres"} onClick={genresClickHandler}>
                                장르
                                <Genres list={genreList}/>
                            </li>
                        </ul>
                    </ div>
                    <SearchBox>
                        <Link to="/search"></Link>
                    </SearchBox>
                </HeaderBox>
            </HeaderWrapper>
            <Padding/>
        </>
    )
}

export default Header;