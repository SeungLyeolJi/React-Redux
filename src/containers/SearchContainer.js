import React, {useState, useEffect} from 'react';
import Search from "../components/Search";
import {moviesApi} from "../api";
import { pageChange, keywordChange } from "../modules/search";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';

const SearchContainer = ({Pkeyword, Ppage, pageChange, keywordChange}) => {
    const [keyword, setKeyword] = useState(Pkeyword);
    const [page, setPage] = useState(Ppage);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [maxPage, setMaxPage] = useState(1);
    const [prevKeyword, setPrevKeyword] = useState(keyword);

    useEffect(()=>{
        if( keyword !== "" ) {
            console.log("store page : " + Ppage + " state page : " + page);
            console.log("store keyword : " + Pkeyword + " state keyword : " + keyword);
            if(Ppage !== page){
                console.log("페이지 변경 : ",Ppage,page);
                pageChange(page);
            }
            else{
                keywordChange(prevKeyword);
            }
            handleContent(page);
        }
    },[prevKeyword, page]);

    const onSubmit = e => {
        e.preventDefault();
        if( keyword !== "" ){
            handleContent(page);
            setPrevKeyword(keyword);
        }
    };

    const onChange = e => {
        setKeyword(e.target.value);
    };

    const handleContent = async (targetPage) => {
        setIsLoading(true);
        try{
            const res = await moviesApi.search(keyword, targetPage);
            setResult(res.data.results);
            setMaxPage(res.data.total_pages);
            setPage(targetPage);
        } catch {
            setError("에러 발생");
        } finally {
            setIsLoading(false);
        }
    };
    //state 값이 늦게 적용 되므로 미리 값 바꿈
    const prevPage = ()=>{
        if(page !== 1){
            setPage(page-1);
            handleContent(page-1);
        }
    }
    const nextPage = ()=>{
        if(page !== maxPage){
            setPage(page+1);
            handleContent(page+1);
        }
    }
    const firstPage = () =>{
        if(page !== 1){
            setPage(1);
            handleContent(1);
        }
    }
    const lastPage = () =>{
        if(page !== maxPage){
            setPage(maxPage);
            handleContent(maxPage);    
        }
    }
    const clickPage = e=>{
        setPage(parseInt(e.target.innerText));
        handleContent(parseInt(e.target.innerText));
    }
    window.scrollTo(0,0);
    return (
        <>
            <Search
                keyword={keyword}
                result={result}
                error={error}
                isLoading={isLoading}
                onSubmit={onSubmit}
                onChange={onChange}
                nextPage={nextPage}
                prevPage={prevPage}
                lastPage={lastPage}
                firstPage={firstPage}
                clickPage={clickPage}
                currPage={page}
                maxPage={maxPage}
                prevKeyword={prevKeyword}
            />
        </>
    );
};

const mapStateToProps = ({search}) => ({
    Pkeyword : search.keyword,
    Ppage : search.page,
});
const mapDispatchToProps = dispatch => bindActionCreators({pageChange, keywordChange}, dispatch);
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchContainer);
