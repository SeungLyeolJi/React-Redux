import React from 'react';
import {isScrollChange, modeChange} from "../modules/list";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ListContainer from "../containers/ListContainer";
import withModeChange from "../assets/withModeChange";

const UpCommingContainer = () => {
    return (
        <>
            <div className="descriptionLogo">
                개봉예정작
            </div>
            <ListContainer/>
        </>
    )
}
const mapStateToProps = ({list}) => ({
    mode: list.mode,
    newMode : "upComing",
});
const mapDispatchToProps = dispatch => bindActionCreators(
    {modeChange, isScrollChange}, dispatch
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withModeChange(UpCommingContainer));
