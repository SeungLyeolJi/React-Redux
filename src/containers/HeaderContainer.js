import React,{useState, useEffect} from "react";
import {moviesApi} from "../api";
import Header from "../components/Header";

const GenresContainer=(props)=>{
    const [isLoading, setIsLoading] = useState(true);
    const [genreList, setGenreList] = useState([]);

    console.log(props);
    useEffect(()=>{
        getGenreList();

    },[]);

    const getGenreList = async() => {
        let genres = await moviesApi.genreList();
        genres =  genres.data.genres;
        setGenreList(genres);
        setIsLoading(false);
    };    

    window.scrollTo(0,0);
    return (
        <>
            {isLoading === true ? <></> : <Header genreList={genreList}/>}            
        </>
    )
}

export default GenresContainer;