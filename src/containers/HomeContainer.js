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

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withModeChange(HomeContainer));
