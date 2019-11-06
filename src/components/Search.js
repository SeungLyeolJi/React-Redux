import React from 'react';
import styled from "styled-components";
import searchIcon from "../assets/img/search.png";
import List from "../components/Item";
import Loading from "../components/Loading";
import nextArrow from "../assets/img/right-arrow.png";
import prevArrow from "../assets/img/left-arrow.png";
import firstArrow from "../assets/img/first-arrow.png";
import lastArrow from "../assets/img/last-arrow.png";

const SearchBox = styled.div`
    width:100%;
    max-width : 545px ;
    margin: 0 auto;
    padding: 40px;
    box-sizing:border-box;
    form {
        position:relative;
        display: inline-block;
        width:100%;
    }
    .SearchInputBox{
        .SearchInput{
            padding-left : 20px;
            width: calc(100% - 45px);
            height: 45px;
            padding-right:60px;
            box-sizing : border-box;
            font-size: 18px;
        }
    }
    .SearchSubmit{
        position:absolute;right:0;top:0;
        width: 45px;
        height: 45px;
        background: #444;
        border: none;
        text-align: center;
        line-height: 35px;
        color: white;
        :after{
            background:url(${searchIcon}) no-repeat center;background-size:100% auto;
        }
    }
    @media (max-width : 599px){
        width : 100%;
        .SearchInputBox{
            .SearchInput{   
                width : 100%;
            }
        }
    }
`;

const ListBox = styled.div`
    margin:0 auto;
    width : 1310px
    @media ( max-width: 1309px ) {
        width: 1048px;
    }
    @media ( max-width: 1047px ) {
        width: 786px;
    }
    @media ( max-width: 785px ) {
        width: 524px;
    }
    @media ( max-width: 523px ) {
        width: 262px;
    }
}
`;

const PagiNation =styled.div`
    .circle {
        padding: 0px 5px;
        cursor: pointer;
        font-weight: 600;
        color: #444;
        line-height: 30px;
        width: 30px;
        height: 30px;
        border-radius: 15px;
        display: inline-block;
        text-align: center;
        margin: 0
    }
    .currCircle {
        color: red;
    }
    .pagiNationUl {
        text-align: center;
        padding: 25px 0 30px;
    
    .arrow{
        display: inline-block;
    }
    .arrow img{
        width: 20px;
        height: 20px;
        top: 7.5px;
        position: relative;
        margin: 3px;
        cursor: pointer;
    }
`;

const SearchLogo = styled.div`
    text-transform: capitalize;
    font-size: 20px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    width: 300px;
    font-weight: 500;
    margin-bottom: 15px;
`;

const SearchWrapper = styled.div`
    .errorLogo, .notFound{
        text-align :center;
        margin-top: 30px;
        font-size : 18px;
     }
       
`;

const Search = ({keyword, result, error, isLoading, onSubmit, onChange, nextPage, prevPage, clickPage, currPage, maxPage, firstPage, lastPage, prevKeyword}) =>{
    const getPagiNation=()=>{
        let pagiNation = [];
        let limit = 1;
        for(let re = currPage <= 5 ? 1 : currPage-4 ; re <= maxPage ; re++){
            if(limit > 9)
                return pagiNation;
            if(re === currPage){
                pagiNation.push(<li onClick={clickPage}  className="circle currCircle" key={`circle${re}`}>{re}</li>)
            }else{
                pagiNation.push(<li onClick={clickPage} className="circle" key={`circle${re}`}>{re}</li>)
            }
            limit++;
        }
        return pagiNation;
    }

    return(
        <SearchWrapper>
            <SearchBox>
                <form>
                    <div className="SearchInputBox">
                        <input type="text" className="SearchInput" value={keyword} onChange={onChange}></input>
                    </div>
                    <input className="SearchSubmit" placeholder="Search Text Input" value="검색" onClick={onSubmit} type="submit"></input>
                </form>
            </SearchBox>
            {isLoading === true ? 
            <Loading/>  
                : result !== null && result.length !== 0
                ? 
                <>
                    <SearchLogo>
                        search : {prevKeyword}
                    </SearchLogo>
                    <ListBox>
                        <ul>
                            <List list={result}/> 
                        </ul>
                    </ListBox>
                    <PagiNation>
                        <ul className="pagiNationUl">
                            <li className="arrow" onClick={firstPage}>
                                <img src={firstArrow} alt="frist arrow"></img>
                            </li>
                            <li className="arrow" onClick={prevPage}>
                                <img src={prevArrow} alt="prev arrow"></img>
                            </li>
                            {getPagiNation()}
                            <li className="arrow" onClick={nextPage}>
                                <img src={nextArrow} alt="next arrow"></img>
                            </li>
                            <li className="arrow" onClick={lastPage}>
                            <img src={lastArrow} alt="last arrow"></img>
                            </li>
                        </ul>
                    </PagiNation>
                </>
                    :
                    result !== null && result.length === 0 ?
                        <div className="notFound">
                            {prevKeyword === "" ? "값을 입력하세요" : "'"+prevKeyword+"'을 찾을 수 없습니다"}
                        </div>
                        :
                        <div className="errorLogo">
                            {error}
                        </div>
            }
        </SearchWrapper>
    )
}

export default Search;