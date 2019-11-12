import React,{useEffect} from 'react';
import {modeChange, isScrollChange} from "../modules/list";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ListContainer from "../containers/ListContainer";
import withModeChange from "../assets/withModeChange";

const HomeContainer = () => {
    return (
        <>
            <div className="descriptionLogo">
                상영작
            </div>
            <ListContainer/>
        </>
    )
}

const mapStateToProps = ({list}) => ({
    mode: list.mode,
    newMode: "nowPlaying",
});
const mapDispatchToProps = dispatch => bindActionCreators(
    {modeChange, isScrollChange}, dispatch
);

//withModeChange에 기본 적으로 보내야하는 props => mode, newMode modeChange, isScrollChange
//withModeChange는 newMode로 기존 mode와 비교해 스크롤 및 스크롤 여부 결정
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withModeChange(HomeContainer));
