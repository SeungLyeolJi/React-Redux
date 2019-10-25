import React from 'react';
import {modeChange} from "../modules/list";
import { connect } from 'react-redux';
import ListContainer from "../containers/ListContainer"
import { bindActionCreators } from 'redux';

const PopularContainer = ({modeChange})=>{
    modeChange("topRated");
    window.scrollTo(0,0);
    return(
        <>
            <div className="descriptionLogo">
                명작
            </div>
            <ListContainer/>                        
        </>
    )
}

const mapDispatchToProps = dispatch => bindActionCreators({modeChange}, dispatch);

export default connect(
    null,
    mapDispatchToProps,
)(PopularContainer);
