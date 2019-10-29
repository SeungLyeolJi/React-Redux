import React, {useEffect} from 'react';
import {isScrollChange, modeChange} from "../modules/list";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ListContainer from "../containers/ListContainer"

const UpCommingContainer = ({modeChange, isScrollChange, mode}) => {
    useEffect(() => {
        if (mode !== "upComing"){
            modeChange("upComing");
            isScrollChange(false);
            window.scrollTo(0, 0);
        } else {
            isScrollChange(true);
        }
    }, []);
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
});
const mapDispatchToProps = dispatch => bindActionCreators({modeChange, isScrollChange}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UpCommingContainer);
