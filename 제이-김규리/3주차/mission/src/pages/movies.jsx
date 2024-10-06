import styled from "styled-components";
import StyledTxt from "../components/custom-Txt";
import {Link} from "react-router-dom";

const StyledImgLink = styled(Link)`
    display: inline-block;
    position: relative;
    width: 300px;
    height: 150px;
    border-radius: 10px;
    overflow: hidden; /* 자식 요소가 부모 요소를 벗어나지 않도록 설정 */
    margin: 10px;    
`;

const StyledImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;  /* 이미지가 부모 요소의 크기에 맞추어지도록 설정 */
    transition: transform 0.3s ease; /* 마우스 호버 시 이미지 확대 효과 */ 
    ${StyledImgLink}:hover & {
        transform: scale(1.05); /* 호버 시 이미지 확대 */
    }
`;

const StyledContainer = styled.div`
    display: block;
`;

const StyledImgContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const OverlayText = styled.div`
    position: absolute;
    bottom: 5px; /* 부모 요소의 하단에서 10px 위로 이동 */
    left: 5px; 
    color: white;
    font-size: 15px;
    font-weight: bold;
    background: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
    padding: 7px 12px;
    border-radius: 5px;
`;

const Movies = () => {
    return(
        <StyledContainer>
            <StyledTxt>카테고리</StyledTxt>
            <StyledImgContainer>
                <StyledImgLink to={'/movies/now-playing'}>
                    <StyledImg src="https://images.unsplash.com/photo-1727365181028-bb484d1811d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQ4fGhtZW52UWhVbXhNfHxlbnwwfHx8fHw%3D"/>
                    <OverlayText>현재 상영중인</OverlayText>
                </StyledImgLink>
                <StyledImgLink to={'/movies/popular'}>
                    <StyledImg src="https://images.unsplash.com/photo-1727987099250-84b3038724c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDN8aG1lbnZRaFVteE18fGVufDB8fHx8fA%3D%3D"/>
                    <OverlayText>인기있는</OverlayText>
                </StyledImgLink>
                <StyledImgLink to={'/movies/top-rated'}>
                    <StyledImg src="https://images.unsplash.com/photo-1727976823180-314b097d2572?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwfGhtZW52UWhVbXhNfHxlbnwwfHx8fHw%3D"/>
                    <OverlayText>높은 평가를 받은</OverlayText>
                </StyledImgLink>
                <StyledImgLink to={'/movies/up-coming'}>
                    <StyledImg src="https://images.unsplash.com/photo-1727976822548-d097770638f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDh8aG1lbnZRaFVteE18fGVufDB8fHx8fA%3D%3D"/>
                    <OverlayText>개봉 예정중인</OverlayText>
                </StyledImgLink>
                   
            </StyledImgContainer>
        </StyledContainer>
    );
}

export default Movies;
