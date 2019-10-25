import React, {useState} from 'react';
import ListContainer from "./ListContainer";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {modeChange} from "../modules/list";
import {moviesApi} from "../api";

const GenreListContainer = ({ match, history, modeChange}) => {
    const pathId = match.params.id;
    const parsedId = parseInt(pathId);
    const [genre,setGenre] = useState(null);
    
    //useEffect에 아래 if문을 넣으면 history 및 parsedI가 없어서 종속성 문제 발생
    if( isNaN(parsedId)){
        return history.push("/");
    }

    const getGenre = async() => {
        let genres = await moviesApi.genreList();
        genres =  genres.data.genres;
        let tmp = genres.filter(item => item.id === parsedId)[0].name;
        setGenre(tmp);
    };    
    
    
    window.scrollTo(0,0);   
    modeChange("genreListView");
    getGenre();
    return (
        <>
            <div className="descriptionLogo">
                Genre : {genre === null ? <></> : genre }
            </div>
            <ListContainer
                genreId={parsedId}
            />
        </>
    );
};

const mapDispatchToProps = dispatch => bindActionCreators({modeChange}, dispatch);

export default connect(
    null,
    mapDispatchToProps,
)(GenreListContainer);

