import React, {useState,useEffect } from 'react';
import ListContainer from "./ListContainer";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {keywordChange, isScrollChange, modeChange} from "../modules/list";
import {moviesApi} from "../api";
import withModeChange from "../assets/withModeChange";

const KeywordContainer = ({ match, history, keyword, keywordChange}) => {
    const parsedId = parseInt(match.params.id);
    const [keywordName,setKeywordName] = useState(null);
    const [blockingScroll, setBlockingScroll] = useState(false);

    //여기서 스크롤 해도 List에서 setting으로 스크롤 내리는듯
    useEffect(()=>{
        console.log(keyword,parsedId);
        if(keyword !== parsedId){
            keywordChange(parsedId);
            setBlockingScroll(true);
        }
        getkeyword();
    },[keywordName]);

    //useEffect에 아래 if문을 넣으면 history 및 parsedI가 없어서 종속성 문제 발생
    if( isNaN(parsedId)){
        return history.push("/");
    }

    const getkeyword = async() => {
        let tmp = await moviesApi.getKeyword(parsedId);
        tmp =  tmp.data.name;
        setKeywordName(tmp);
    };    

    return (
        <>
            <div className="descriptionLogo">
                keyword : {keywordName === null ? <></> : keywordName}
            </div>
            <ListContainer
                blockingScroll = {blockingScroll ? blockingScroll : undefined }
                keywordId={parsedId}
            />
        </>
    );
};
const mapStateToProps = ({list}) => ({
    mode: list.mode,
    keyword : list.keyword,
    newMode : "keywordListView",
});
const mapDispatchToProps = dispatch => bindActionCreators(
    {modeChange, isScrollChange, keywordChange}, dispatch
);

//withModeChange에 기본 적으로 보내야하는 props => mode, newMode modeChange, isScrollChange
//withModeChange는 newMode로 기존 mode와 비교해 스크롤 및 스크롤 여부 결정
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withModeChange(KeywordContainer));

