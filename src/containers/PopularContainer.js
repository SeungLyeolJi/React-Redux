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

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withModeChange(PopularContainer));
