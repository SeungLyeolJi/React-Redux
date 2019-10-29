import React, {useEffect} from 'react';
import {isScrollChange, modeChange} from "../modules/list";
import { connect } from 'react-redux';
import ListContainer from "../containers/ListContainer"
import { bindActionCreators } from 'redux';

const PopularContainer = ({modeChange, isScrollChange, mode})=>{
    useEffect(() => {
        if (mode !== "topRated"){
            modeChange("topRated");
            isScrollChange(false);
            window.scrollTo(0, 0);
        } else {
            isScrollChange(true);
        }
    }, []);
    return(
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
});
const mapDispatchToProps = dispatch => bindActionCreators({modeChange, isScrollChange}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PopularContainer);
