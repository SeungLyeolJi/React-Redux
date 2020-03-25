import React, {useEffect, useState} from 'react';
import ListContainer from "./ListContainer";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {isScrollChange, modeChange, genreChange} from "../modules/list";
import {moviesApi} from "../api";
import withModeChange from "../assets/withModeChange";
import Loading from "../components/Loading";

const GenreListContainer = ({match, history, genre, genreChange}) => {
    const parsedId = parseInt(match.params.id);
    const [genreName, setGenreName] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    /*useEffect 사용하는 props 변수들은 []안에 넣어서 명시해야지 종속성 에러 발생 x*/
    useEffect(() => {
        let getGenre = async () => {
            let genres = await moviesApi.genreList();
            genres = genres.data.genres;
            let tmp = genres.filter(item => item.id === parsedId)[0].name;
            setGenreName(tmp);
            setIsLoading(false);
        };
        getGenre();
        if (genre !== parsedId) {
            genreChange(parsedId);
            setIsLoading(true);
            window.scrollTo(0,0);
        }
    }, [parsedId, genre, genreChange]);

    /*훅에 props에 들어가는 부분을 넣어도 종속성 경고 발생*/
    if (isNaN(parsedId)) {
        return history.push("/");
    }

    return (
        <>
            <div className="descriptionLogo">
                Genre : {genreName === null ? <></> : genreName}
            </div>
            {isLoading ? <Loading/> :
                <ListContainer
                genreId={parsedId}
                />
            }
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

//withModeChange에 기본 적으로 보내야하는 props => mode, newMode modeChange, isScrollChange
//withModeChange는 newMode로 기존 mode와 비교해 스크롤 및 스크롤 여부 결정
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withModeChange(GenreListContainer));
