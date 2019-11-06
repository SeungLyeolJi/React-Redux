import { createGlobalStyle } from "styled-components";
const globalStyles = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
    }
    a{
        color: inherit;
        text-decoration: none;
    }
    li{
        list-style: none;
    }
    html, div#root, .wrapper {
        height: 100%;
    }
    body {
        font-family: "맑은 고딕", 돋움, Dotum, "sans-serif";
        height:100%;
        overflow-x:hidden;
    }
    .descriptionLogo {
        text-transform: capitalize;
        text-align: center;
        padding: 25px 0;
        background: #222;
        font-size: 25px;
        color: white;
        font-weight: 500;
        @media (max-width : 699px ){
            font-size: 19px;
            padding: 20px 0;
        }
    }
 `;
export default globalStyles;