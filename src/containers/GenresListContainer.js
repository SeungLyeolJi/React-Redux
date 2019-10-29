import React, {useEffect, useState} from 'react';
import ListContainer from "./ListContainer";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {isScrollChange, modeChange, genreChange} from "../modules/list";
import {moviesApi} from "../api";

const GenreListContainer = ({ match, history, modeChange, isScrollChange, mode, genre, genreChange}) => {
    const parsedId = parseInt(match.params.id);
    const [genreName,setGenreName] = useState(null);

    useEffect(()=>{
        if (mode !== "genreListView"){
            modeChange("genreListView");
            isScrollChange(false);
            window.scrollTo(0, 0);
        } else {
            isScrollChange(true);
            if(genre !== parsedId){
                genreChange(parsedId);
                window.scrollTo(0, 0);
            }
        }
    },[parsedId])


    //useEffect에 아래 if문을 넣으면 history 및 parsedI가 없어서 종속성 문제 발생
    if( isNaN(parsedId)){
        return history.push("/");
    }

    const getGenre = async() => {
        let genres = await moviesApi.genreList();
        genres =  genres.data.genres;
        let tmp = genres.filter(item => item.id === parsedId)[0].name;
        setGenreName(tmp);
    };

    getGenre();
    return (
        <>
            <div className="descriptionLogo">
                Genre : {genreName === null ? <></> : genreName }
            </div>
            <ListContainer
                genreId={parsedId}
            />
        </>
    );
};
const mapStateToProps = ({list}) => ({
    mode : list.mode,
    genre : list.genre,
});
const mapDispatchToProps = dispatch => bindActionCreators({modeChange, isScrollChange, genreChange}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GenreListContainer);
