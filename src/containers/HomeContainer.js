import React,{useEffect} from 'react';
import {modeChange, isScrollChange} from "../modules/list";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ListContainer from "../containers/ListContainer";

const HomeContainer = ({modeChange, isScrollChange, mode}) => {
    useEffect(()=>{
        if (mode !== "nowPlaying") {
            modeChange("nowPlaying");
            isScrollChange(false);
            window.scrollTo(0, 0);
        } else {
            isScrollChange(true);
        }
    },[]);

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
});
const mapDispatchToProps = dispatch => bindActionCreators({modeChange, isScrollChange}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomeContainer);
