import React,{useEffect,useState} from 'react';
import empty from "../assets/img/empty.png"
import Loading from "./Loading";
import {Link} from "react-router-dom";
import "../assets/scss/detail.scss";

import starIcon from "../assets/img/star.png";

const Detail = ({result, isError, isLoading, history, keywordList}) => {
    const [score, setScore] = useState(0);

    useEffect(()=>{
        console.log(result);
        if(result !== null ){
            setScore(result.vote_average*10);
        }
    }, [result]);


    const starStyle = {
        backgroundImage : `url(${starIcon})`
    };
    const perStyle = {
        width: `${score}%`,
        backgroundImage : `url(${starIcon})`
    };

    return (
        <div className="detailBox">
            {
                isLoading ?
                    (
                        <Loading/>
                    )
                    :
                    (
                        isError ?
                            (
                                <div className="notFound">
                                    콘텐츠를 찾을 수 없습니다.
                                    <div className="img">
                                        404 error
                                    </div>
                                </div>
                            )
                            :
                            (
                                <div className="movieInfoBox">
                                    <div className="movieMainInfo">
                                        {result.poster_path !== null ?
                                            <img src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                                                 alt={result.title}/> : <img src={empty} alt="empty"/>
                                        }
                                        <div className="movieMainInfoText">
                                            <p className="title">
                                                {result.title}
                                            </p>
                                            <p className="originTitle">
                                                {
                                                    result.original_title
                                                }
                                            </p>
                                            <div className="rank">
                                                <div className="star" style={starStyle}>
                                                    <div className="per" style={perStyle}/>
                                                </div>
                                                <p className="text"><span>{result.vote_average}</span> / 10</p>
                                            </div>

                                            <p className="genres">
                                                장르 :
                                                {
                                                    result.genres.map(genre =>
                                                        <span key={genre.id}>
                                                    <Link to={`/genreList/${genre.id}`}>
                                                        {genre.name}
                                                    </Link>
                                                </span>)
                                                }
                                            </p>
                                            <p>
                                                나라 : {
                                                result.production_countries[0] == null ? "알 수 없음" : result.production_countries[0].name
                                            }
                                            </p>
                                            <p>
                                                개봉일 : {result.release_date}
                                            </p>
                                            <p>
                                                상영시간 : {result.runtime} 분
                                            </p>
                                        </div>
                                    </div>
                                    {result.tagline === "" ? <></> : <span className="tagline">{result.tagline}</span>}
                                    <div className="overview">
                                        {result.overview}
                                    </div>
                                    <div className="movieYoutubeBox">
                                        {
                                            result.videos.results.map(item => {
                                                    return (
                                                        <div key={item.id}>
                                                            <div className="videoLabel">{item.name}
                                                            </div>
                                                            <iframe src={`https://www.youtube.com/embed/${item.key}`}
                                                                    title={item.name} key={item.id}/>
                                                        </div>
                                                    )
                                                }
                                            )
                                        }
                                    </div>
                                    <div className="keywordList">
                                        {keywordList.length !== 0 ? <p>관련 태그</p> : <></>}
                                        {
                                            keywordList.map((item) => {
                                                return <Link to={`/keywordList/${item.id}`} key={item.id}>
                                                    <span>
                                                        {item.name}
                                                    </span>
                                                </Link>
                                            })
                                        }
                                    </div>
                                </div>
                            )
                    )
            }
        </div>
    )
};

export default Detail;