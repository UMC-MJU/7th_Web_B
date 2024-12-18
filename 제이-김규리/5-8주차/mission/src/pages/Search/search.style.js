import styled from 'styled-components';

const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: 'center'
`;

const SearchInput = styled.input`
    width: 90%;
    height: 45px;
    border-radius: 8px;
    border-color: white;
    box-sizing: border-box;
    padding-left: 12px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
`;

const SearchButton = styled.button`
    width: 10%;
    height: 45px;
    border-color: #e7545b;
    border-radius: 8px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    box-sizing: border-box;
    background-color: #e7545b;
    color: white; 
    cursor: pointer;
    transition: opacity 0.2s ease; 
    &:hover{
        opacity: 0.8;
    }
`;

export {SearchContainer, SearchInput, SearchButton};
// 여러개를 내보낼 때는 default를 사용하면 안됨