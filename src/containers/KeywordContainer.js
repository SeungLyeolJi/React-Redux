import React, {useState,useEffect } from 'react';
import ListContainer from "./ListContainer";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {genreChange, isScrollChange, modeChange} from "../modules/list";
import {moviesApi} from "../api";
import withModeChange from "../assets/withModeChange";

const KeywordContainer = ({ match, history}) => {
    const parsedId = parseInt(match.params.id);
    const [keyword,setKeyword] = useState(null);
    const [keywordId, setKeywordId] = useState(null);

    useEffect(()=>{
        console.log("parsed ID : "+parsedId+ " keyword : "+keyword);
        if(keyword !== parsedId){
            console.log("아이디가 다르다");
            getkeyword();
            window.scrollTo(0,0);
        }
    },[keyword]);

    //useEffect에 아래 if문을 넣으면 history 및 parsedI가 없어서 종속성 문제 발생
    if( isNaN(parsedId)){
        return history.push("/");
    }

    const getkeyword = async() => {
        let tmp = await moviesApi.getKeyword(parsedId);
        tmp =  tmp.data.name;
        setKeyword(tmp);
    };    

    return (
        <>
            <div className="descriptionLogo">
                keyword : {keyword === null ? <></> : keyword }
            </div>
            <ListContainer
                keywordId={parsedId}
            />
        </>
    );
};
const mapStateToProps = ({list}) => ({
    mode: list.mode,
    newMode: "keywordListView",
});
const mapDispatchToProps = dispatch => bindActionCreators(
    {modeChange, isScrollChange, genreChange}, dispatch
);

//store변수를 안 쓸경우 null 보내야지 경고창이 안뜸
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withModeChange(KeywordContainer));

