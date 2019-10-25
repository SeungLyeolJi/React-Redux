import React from 'react';
import {modeChange} from "../modules/list";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ListContainer from "../containers/ListContainer"

const HomeContainer=({modeChange})=>{
    modeChange("nowPlaying");
    window.scrollTo(0,0);   
        return(
        <>
            <div className="descriptionLogo">
                상영작
            </div>
            <ListContainer/>
        </>
    )
}
const mapDispatchToProps = dispatch => bindActionCreators({modeChange}, dispatch);

//mapStateToProps 안 쓸 때는 null 해야 경고창 안뜸
export default connect(
    null,
    mapDispatchToProps,
)(HomeContainer);
