import React, {useState, useEffect} from "react";
import {moviesApi} from "../api";
import Item from "../components/Item";
import List from "../components/List";
import Loading from "../components/Loading";
import {connect} from 'react-redux';
import {modeChange, pageChange, scrollyChange, isScrollChange} from "../modules/list";
import {bindActionCreators} from "redux";

const ListContainer = (props) => {
    const [isLoading, setIsLoading] = useState(true); //로딩여부
    const [isScroll, setIsScroll] = useState(false); //스크롤여부
    const [isChange, setIsChange] = useState(false); //변경여부
    const [content, setContent] = useState([]); //콘텐츠 담을 변수
    const [page, setPage] = useState(1); //페이지
    const [scrollY, setScrollY] = useState(0); //스크롤 해야될 Y값



    const handleScroll = () => {
        const {innerHeight} = window; //화면 높이
        const {scrollHeight} = document.body; //전체 스크롤 가능 길이
        // IE에서는 document.documentElement 를 사용.
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;//스크롤 위치
        //전체 스크롤은 화면 높이를 포함해서 화면 높이를 뺴고 현재 스크롤 위치를 뺌
        if (scrollHeight - innerHeight - scrollTop < 1) {
            setPage(page + 1);
        }
    };

    const getMoviesList = async(page) =>{
        const mode = props.mode;
        let movies;
        if(mode !== null){
            try{
                if(mode=== "nowPlaying" ){
                    movies = await moviesApi.nowPlaying(page);
                }else if(mode === "topRated"){
                    movies = await moviesApi.topRated(page);
                }else if(mode === "genreListView"){
                    movies = await moviesApi.genreListView(props.genreId, page);
                }else if(mode === "keywordListView"){
                    movies = await moviesApi.keywordListView(props.keywordId,page);
                }else if(mode === "upComing"){
                    movies = await moviesApi.upcoming(page);
                }
                movies =  movies.data.results;
            }catch(e){
                console.log(e);
                movies = null;
            }
        }else{
            console.log("mode : "+null);
        }
        return movies;
    };

    const clickHandler = () =>{
        props.scrollyChange(window.scrollY);
        props.pageChange(this.state.page);
    };

    const listPush = async () =>{
        let list = null;
        let tmpContent  = content;
        for (let re = props.page; re <= page; ++re) {
            list = await getMoviesList(re);
            console.log(list);
            await tmpContent.push(<Item key={re} list={list} clickHandler={clickHandler}/>);
            setContent(tmpContent);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        listPush();
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    useEffect(() => {
        listPush();
        if (document.getElementById("notice") !== null) {
            let notice = document.getElementById("notice");
            notice.style.display = "block";
            setTimeout(() => {
                notice.style.display = "none";
            }, 800);
        }
    }, [page]);

    useEffect(()=>{
        console.log(isLoading);
        console.log(content);
    },[isLoading]);

    return(
        <>
            {
                isLoading === true ?
                    <Loading/>
                    :
                    <List content={content}/>
            }
        </>
    )
};

const mapStateToProps = ({list}) => ({
    mode: list.mode,
    page: list.page,
    scrollY: list.scrolly,
    isScroll: list.isScroll,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    modeChange, pageChange, scrollyChange, isScrollChange,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ListContainer);

