import React, {useEffect, useState} from 'react';
import ListContainer from "./ListContainer";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {isScrollChange, modeChange, genreChange} from "../modules/list";
import {moviesApi} from "../api";
import withModeChange from "../assets/withModeChange";

const GenreListContainer = ({match, history, genre, genreChange}) => {
    const parsedId = parseInt(match.params.id);
    const [genreName, setGenreName] = useState(null);
    const [blockingScroll, setBlockingScroll] = useState(false);

    //여기서 스크롤 해도 List에서 setting으로 스크롤 내리는듯
    useEffect(() => {
        let getGenre = async () => {
            let genres = await moviesApi.genreList();
            genres = genres.data.genres;
            let tmp = genres.filter(item => item.id === parsedId)[0].name;
            setGenreName(tmp);
        };
        getGenre();
        if (genre !== parsedId) {
            genreChange(parsedId);
            window.scroll(0,0);
            setBlockingScroll(true);
        }
    }, [parsedId])

    //useEffect에 아래 if문을 넣으면 history 및 parsedI가 없어서 종속성 문제 발생
    if (isNaN(parsedId)) {
        return history.push("/");
    }

    return (
        <>
            <div className="descriptionLogo">
                Genre : {genreName === null ? <></> : genreName}
            </div>
            <ListContainer
                blockingScroll = {blockingScroll ? blockingScroll : undefined }
                genreId={parsedId}
            />
        </>
    );
};
const mapStateToProps = ({list}) => ({
    mode: list.mode,
    genre: list.genre,
    newMode: "genreListView",
});
const mapDispatchToProps = dispatch => bindActionCreators(
    {modeChange, isScrollChange, genreChange}, dispatch
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withModeChange(GenreListContainer));
