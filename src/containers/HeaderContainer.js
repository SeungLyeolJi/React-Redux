import React,{useState, useEffect} from "react";
import {moviesApi} from "../api";
import Header from "../components/Header";

const GenresContainer=()=>{
    const [isLoading, setIsLoading] = useState(true);
    const [genreList, setGenreList] = useState([]);

    useEffect(()=>{
        getGenreList();
    },[]);

    const getGenreList = async() => {
        let genres = await moviesApi.genreList();
        genres =  genres.data.genres;
        setGenreList(genres);
        setIsLoading(false);
    };    

    return (
        <>
            {isLoading === true ? <></> : <Header genreList={genreList}/>}            
        </>
    )
};

export default GenresContainer;