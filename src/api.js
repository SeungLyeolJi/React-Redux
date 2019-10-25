import axios from "axios"

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    params: {
        api_key: "6f26edc26d6ed9d164d9bc332258be3f",
        language: "ko-KR"
    }
});

//movieApi 객체에 기능을 속성으로 주고 export
export const moviesApi = {
    nowPlaying: page => api.get("discover/movie",{
        params: {
            page: page,
        }
    }),
    movieDetail: id => api.get(`movie/${id}&append_to_response=videos`, {
        params: {
            // api_key: "6f26edc26d6ed9d164d9bc332258be3f",
            append_to_response: "videos"
        }
    }),
    topRated: page => api.get("movie/top_rated",{
        params: {
            page: page
        }
    }),
    search: (term,page = 1) => api.get("search/movie",{
        params: {
            // api_key: "6f26edc26d6ed9d164d9bc332258be3f",
            query: term, 
            page : page
        }
    }),
    genreList: ()=> api.get("genre/movie/list"),
    genreListView : (id, page = 1) => api.get("/discover/movie",{
        params:{
            with_genres : id,
            page : page,
        }
    }),
    keywordList : id => api.get(`movie/${id}/keywords`),
    keywordListView : (id, page = 1) => api.get(`keyword/${id}/movies`),
    getKeyword : id => api.get(`keyword/${id}`),
    upcoming : page => api.get("movie/upcoming",{
        params : {
            page : page
        }
    })
};