import React, {useState } from 'react';
import ListContainer from "./ListContainer";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {modeChange} from "../modules/list";
import {moviesApi} from "../api";

const KeywordContainer = ({ match, history, modeChange}) => {
    const [keyword,setKeyword] = useState(null);
    const parsedId = parseInt(match.params.id);

    //useEffect에 아래 if문을 넣으면 history 및 parsedI가 없어서 종속성 문제 발생
    if( isNaN(parsedId)){
        return history.push("/");
    }

    const getkeyword = async() => {
        let tmp = await moviesApi.getKeyword(parsedId);
        tmp =  tmp.data.name;
        setKeyword(tmp);
    };    
    
    window.scrollTo(0,0);   
    modeChange("keywordListView");
    getkeyword();
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
const mapDispatchToProps = dispatch => bindActionCreators({modeChange}, dispatch);

//store변수를 안 쓸경우 null 보내야지 경고창이 안뜸
export default connect(
    null,
    mapDispatchToProps,
)(KeywordContainer);

