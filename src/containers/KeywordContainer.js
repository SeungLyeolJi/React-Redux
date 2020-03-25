import React, {useState,useEffect } from 'react';
import ListContainer from "./ListContainer";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {keywordChange, isScrollChange, modeChange} from "../modules/list";
import {moviesApi} from "../api";
import withModeChange from "../assets/withModeChange";

const KeywordContainer = ({ match, history, keyword, keywordChange}) => {
    const [parsedId,] = useState(parseInt(match.params.id));
    const [keywordName,setKeywordName] = useState(null);

    /*useEffect 사용하는 props 변수들은 []안에 넣어서 명시해야지 종속성 에러 발생 x*/
    useEffect(()=>{
        /*훅에 props에 들어가는 부분을 넣어도 종속성 경고 발생*/
        if( isNaN(parsedId)){
            return history.push("/");
        }

        if(keyword !== parsedId){
            keywordChange(parsedId);
        }
        const getKeyword = async() => {
            let tmp = await moviesApi.getKeyword(parsedId);
            tmp =  tmp.data.name;
            setKeywordName(tmp);
        };
        getKeyword();
    },[keywordName,parsedId,history,keyword, keywordChange]);



    return (
        <>
            <div className="descriptionLogo">
                keyword : {keywordName === null ? <></> : keywordName}
            </div>
            <ListContainer
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

