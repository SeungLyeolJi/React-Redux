import React from "react";
import {moviesApi} from "../api";
import Item from "../components/Item";
import List from "../components/List";
import Loading from "../components/Loading";
import { connect } from 'react-redux';
import {modeChange, pageChange, scrollyChange, isScrollChange} from "../modules/list";
import {bindActionCreators} from "redux";

class ListContainer extends React.Component{
    state = {
        isLoading : true,
        page : 1,
        content : [],
        isChange : false,
        scrollY : 0,
        isScroll : false,
    };

    getMoviesList = async(page) => {
        const mode = this.props.mode;
        let movies;
        if(mode !== null){
            try{
                if(mode=== "nowPlaying" ){
                    movies = await moviesApi.nowPlaying(page);
                }else if(mode === "topRated"){
                    movies = await moviesApi.topRated(page);
                }else if(mode === "genreListView"){
                    movies = await moviesApi.genreListView(this.props.genreId, page);
                }else if(mode === "keywordListView"){
                    movies = await moviesApi.keywordListView(this.props.keywordId,page);
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
    }

    setContent = async()=>{
        let content = [];
        let re =1
        for( ; re <= this.state.page ; ++re){
            content.push(<Item key={re} list={await (this.getMoviesList(re))} clickHandler={this.clickHandler}></Item>);
        }
        this.setState({isLoading : false, content});
    }

    setting = async() =>{
        await this.setContent();
        if(  this.state.isScroll === true ){
            window.scrollTo(0, this.state.scrollY)
            this.setState({isScroll : false});
        }
    }

    clickHandler = () =>{
        const props = this.props;
        props.scrollyChange(window.scrollY);
        props.pageChange(this.state.page);
    }

    //componentwillreceiveprops 대신에 사용
    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.isScroll){
            nextProps.isScrollChange(false);
            return ({page : nextProps.page, scrollY: nextProps.scrolly, isScroll : true});
        }
        if(nextProps.genreId !== null && prevState.isChange !== true){
           return ({isChange : true})
        }else if(nextProps.genreId !== null && prevState.isChange !== false){
            return ({isChange : false})
        }
    }

    componentDidMount(){
        this.setting();
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        const { innerHeight } = window; //화면 높이
        const { scrollHeight } = document.body; //전체 스크롤 가능 길이
        // IE에서는 document.documentElement 를 사용.
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;//스크롤 위치
        //전체 스크롤은 화면 높이를 포함해서 화면 높이를 뺴고 현재 스크롤 위치를 뺌
        if (scrollHeight - innerHeight - scrollTop < 1) {
            const notice = document.getElementById("notice");
            if(notice !== null){
                notice.style.display = "block";
                setTimeout(()=>{
                    notice.style.display = "none";
                },800);
                this.setState({
                    page : this.state.page+1
                })
                this.setContent();
            }
        }
    };

    render(){
        if(this.state.isChange){
            this.setContent();
        }
        const {isLoading, content} = this.state;


        return (
            <>
                {
                    isLoading === true ?
                    <Loading/>
                    :
                    <List content={content}/>
                }
            </>
        );
    }
}

const mapStateToProps = ({list}) => ({
    mode : list.mode,
    page : list.page,
    scrolly : list.scrolly,
    isScroll : list.isScroll,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    modeChange, pageChange, scrollyChange, isScrollChange,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ListContainer);

