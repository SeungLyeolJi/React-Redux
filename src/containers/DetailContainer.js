import React, { useState, useEffect } from 'react';
import { moviesApi } from "../api";
import Detail from "../components/Detail";

const DetailContainer = ({ match, history }) => {
    const pathId = match.params.id;
    const parsedId = parseInt(pathId);
    const [result, setResult] = useState(null);
    const [isError, setIsError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [keywordList, setkeywordList] = useState(null);

    /*유튜브 iframe 의 쿠기 값이 크롬 권장에 따라 SameSite = Lax 일텐데 그것을 SameSite = none; Secure 로 해야됨 */
    useEffect(() => {   
        if( isNaN(parsedId)){
            return history.push("/");
        }
        const handleContent = async () => {
            try{
                const res = await moviesApi.movieDetail(parsedId);
                setResult(res.data);
                const keyword = await moviesApi.keywordList(parsedId);
                setkeywordList(keyword.data.keywords);
            } catch {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };
        handleContent();
    }, [history,parsedId]);

    return (
        <Detail
            result={result}
            isError={isError}
            isLoading={isLoading}
            history={history}
            postId = {parsedId}
            keywordList={keywordList}
        />
    );
};

export default DetailContainer;
