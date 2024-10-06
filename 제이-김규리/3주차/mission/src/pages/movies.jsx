import styled from "styled-components";
import StyledTxt from "../components/custom-Txt";

const StyledImg = styled.img`
    margin: 10px;
    border-radius: 8px;
    width: 303px;
    height: 150px;
`;

const StyledContainer = styled.div`
    display: block;
`;

const StyledImgContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const Movies = () => {
    return(
        <StyledContainer>
            <StyledTxt>카테고리</StyledTxt>
            <StyledImgContainer>
                <StyledImg src="https://images.unsplash.com/photo-1727365181028-bb484d1811d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQ4fGhtZW52UWhVbXhNfHxlbnwwfHx8fHw%3D"/>
                <StyledImg src="https://images.unsplash.com/photo-1727987099250-84b3038724c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDN8aG1lbnZRaFVteE18fGVufDB8fHx8fA%3D%3D"/>
                <StyledImg src="https://images.unsplash.com/photo-1727976823180-314b097d2572?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwfGhtZW52UWhVbXhNfHxlbnwwfHx8fHw%3D"/>
                <StyledImg src="https://images.unsplash.com/photo-1727976822548-d097770638f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDh8aG1lbnZRaFVteE18fGVufDB8fHx8fA%3D%3D"/>
            </StyledImgContainer>
        </StyledContainer>
    );
}

export default Movies;
