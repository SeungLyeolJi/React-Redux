import React, {useState, useEffect} from "react";
import {moviesApi} from "../api";
import Header from "../components/Header";
import {useMobile} from "../hooks";
import searchIcon from "../assets/img/search.png";
import xIcon from "../assets/img/x.png";
import menuIcon from "../assets/img/menu.png";
import {isLoginChange, tokenChange} from "../modules/user";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

const HeaderContainer = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [genreList, setGenreList] = useState([]);
    const [gernesOpen, setGernesOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMobile] = useMobile(useMobile());

    const searchStyle = {
        backgroundImage: `url(${searchIcon})`
    };
    const xIconStyle = {
        backgroundImage: `url(${xIcon})`
    };
    const menuStyle = {
        backgroundImage: `url(${menuIcon})`
    };

    useEffect(() => {
        getGenreList();
    }, []);

    useEffect(() => {
        if (!isMobile) {
            setMobileMenuOpen(false);
            if (mobileMenuOpen && gernesOpen) {
                setGernesOpen(false);
            }
        }
        if (isMobile) {
            if (!mobileMenuOpen && gernesOpen) {
                setGernesOpen(false);
            }
        }
    }, [useMobile()]);

    const getGenreList = async () => {
        let genres = await moviesApi.genreList();
        genres = genres.data.genres;
        setGenreList(genres);
        setIsLoading(false);
    };

    const genresClickHandler = () => {
        if (gernesOpen) {
            setGernesOpen(false);
        } else {
            setGernesOpen(true);
        }
    };

    const menuClickHandler = () => {
        if (mobileMenuOpen) {
            setMobileMenuOpen(false);
        } else {
            setMobileMenuOpen(true);
        }
    };

    const menuClose = () => {
        if (mobileMenuOpen) {
            setMobileMenuOpen(false);
        }
        if (gernesOpen) {
            setGernesOpen(false);
        }
    };

    const logoutHandler = (e) => {
        //alert은 값을 반환하지 않음
        if(!alert("로그아웃 하셨습니다.")){
            props.isLoginChange(false);
            props.tokenChange("");
            e.preventDefault();
        }
    };

    return (
        <>
            {isLoading === true ? <></> :
                <Header genreList={genreList} menuClose={menuClose} logoutHandler={logoutHandler}
                        menuClickHandler={menuClickHandler} genresClickHandler={genresClickHandler} isMobile={isMobile}
                        mobileMenuOpen={mobileMenuOpen}
                        xIconStyle={xIconStyle} menuStyle={menuStyle} searchStyle={searchStyle}
                        gernesOpen={gernesOpen} isLogin = {props.isLogin}/>}
        </>
    )
};

const mapStateToProps = ({user}) => ({
    isLogin : user.isLogin
});
const mapDispatchToProps = dispatch => bindActionCreators(
    {isLoginChange, tokenChange}, dispatch
);
export default connect(
    mapStateToProps,
    mapDispatchToProps()
)(HeaderContainer);

