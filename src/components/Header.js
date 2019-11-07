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
        display: none;
        background-image: none;
        @media (max-width : 768px){
            display: block; position: absolute;background-image : url(${menu});background-size: 100% auto;display : block;cursor: pointer;width: 36px;height: 36px;top: 17px;background-color: black;border: none;
        }
        
    }
    .LinkList{
        >li{  
            cursor: pointer;background : rgb(20,20,20);padding: 5px;height: 36px;width: 120px;line-height: 35px;font-size: 17px;color: white;text-align: center;float: left;top: 12px;position: relative;
            a,button{display:block;}
            &.genres button{
                  line-height: 36px;
                  border: none;
                  background-color: transparent;
                  color: #fff;
                  font-size: 17px; 
                  width: 100%;
                  &:hover{color:red;}
            }
            &:hover {
                color : red;
            }
        }
        .on{
          .genreUl{ 
          display: inline-table;
        }
      }
    }
         @media (max-width : 768px){
             .LinkList{
                position: absolute;top: 40px;display: none;
             }
        }
    .LinkList.open{
      display: block;
      position: fixed;
      width: 100%;
      left: 0;
      top: 55px;
      background: rgb(20,20,20);
      .on .genreUl{
        padding-left: 0;
        padding-right: 0;
        top: 35px;
        border : none;
        box-shadow: none;
        width: 100%;
        li{
          border: none;
          margin-left: 0px;             
          margin-right: 0px;
          width: 50%;        
           @media (max-width : 360px){
             font-size: 4vw;
             line-height: 6vw;
           }
          &:hover{
            color: red;
          }
        }
      }
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
    const [isMobile] = useMobile(useMobile());

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
        if(mobileMenuOpen){
            setMobileMenuOpen(false);
            console.log("실행");
        }else{
            setMobileMenuOpen(true)
            console.log("실행");
        }
    }

    return (
        <>
            <HeaderWrapper>
                <HeaderBox>
                    <button className="menuBtn" onClick={isMobile ? menuClickHandler: ()=>{}}/>
                    <ul className={`LinkList ${mobileMenuOpen ? "open" : ""}`}>
                        <li><Link to="/home">홈</Link></li>
                        <li><Link to="/upcoming">개봉예정작</Link></li>
                        <li><Link to="/popular">명작</Link></li>
                        <li className={gernesOpen ? "genres on" :"genres"} >
                            <button onClick={genresClickHandler}>장르</button>
                            <Genres list={genreList}/>
                        </li>
                    </ul>
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