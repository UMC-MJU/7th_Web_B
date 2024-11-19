import { createGlobalStyle } from "styled-components";
import SejongGeulggot from "../assets/fonts/SejongGeulggot.ttf";

const GlobalStyle = createGlobalStyle`
 @font-face {
        font-family: 'SejongGeulggot';
        src: local('SejongGeulggot'), local('SejongGeulggot');
        font-style: normal;
        src: url(${SejongGeulggot}) format('truetype');
  }
`;

export default GlobalStyle;
