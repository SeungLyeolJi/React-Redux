import React from 'react';
import ListContainer from "../containers/ListContainer"
import {isScrollChange, modeChange} from "../modules/list";
import {connect} from 'react-redux';
import withModeChange from "../assets/withModeChange";
import {bindActionCreators} from "redux";

const PopularContainer = () => {
    return (
        <>
            <div className="descriptionLogo">
                명작
            </div>
            <ListContainer/>
        </>
    )
}

const mapStateToProps = ({list}) => ({
    mode: list.mode,
    newMode: "topRated",
});
const mapDispatchToProps = dispatch => bindActionCreators(
    {modeChange, isScrollChange}, dispatch
);

//withModeChange에 기본 적으로 보내야하는 props => mode, modeChange, isScrollChange
//withModeChange는 페이지가 바뀌면 scroll을 0으로 해주고 모드가 같으면 list의 isScroll을 true로 변경
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withModeChange(PopularContainer));
