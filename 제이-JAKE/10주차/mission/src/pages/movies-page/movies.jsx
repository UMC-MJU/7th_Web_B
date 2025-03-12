import styled from "styled-components";
import StyledTxt from "../../components/custom-Txt";
import {Link} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../apis/axios-instance";
import { useRef } from "react";

const StyledImgLink = styled(Link)`
    display: inline-block;
    position: relative;
    width: 23.4%;
    aspect-ratio: 2 / 1;
    border-radius: 10px;
    overflow: hidden; /* 자식 요소가 부모 요소를 벗어나지 않도록 설정 */
    margin: 15px;    
    margin-left: 0;
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
    width: 90%;
    display: flex;
    flex-wrap: wrap;
`;

const OverlayText = styled.div`
    position: absolute; // 부모요소가 relative
    bottom: 5px; /* 부모 요소의 하단에서 10px 위로 이동 */
    left: 5px; 
    color: white;
    font-size: 15px;
    font-weight: bold;
    background: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
    padding: 7px 12px;
    border-radius: 5px;
`;

const StyledArticleContainer = styled.div`
    width: 90%;
    marginTop: 10px;
    aspect-ratio: 4 / 1;
    position: relative;
    margin-top: 30px;
    margin-bottom: 20px;
`;

const StyledArticleImgContainer = styled.div`
    height: 400px; 
    display: flex;
    overflow-x: auto; 
    overflow-y: hidden; 
    justify-content: flex-start; 
    padding: 10px; 
    scroll-behavior: smooth;

    /* 스크롤바 숨기기 */
    ::-webkit-scrollbar {
        display: none; /* 웹킷 브라우저에서 스크롤바 숨김 */
    }
    -ms-overflow-style: none;  /* IE, Edge에서 스크롤바 숨김 */
    scrollbar-width: none; /* Firefox에서 스크롤바 숨김 */
`;

const AddTxt = styled.p`
    color: #d5d5d5;
    font-size: 12px;
    margin-bottom: 8px;
    &:hover {
        color: white;
    }
`;
const AddLink = styled(Link)`
    width: 36px;
    display: flex;
    position: absolute;
    right: 25px;
    top: 10px;
`;

const TrendingImgLink = styled(Link)`
    flex: 0 0 auto; /* 자식 요소 크기가 줄어들지 않도록 설정 */
    width: 260px; /* 고정된 너비 */
    height: auto; /* 높이는 이미지 비율에 따라 자동 조정 */
    border-radius: 10px;
    overflow: hidden;
    margin: 0 10px; /* 자식 요소 간 좌우 여백 */
`;


const TrendingImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;  /* 이미지가 부모 요소의 크기에 맞추어지도록 설정 */
    transition: transform 0.3s ease; /* 마우스 호버 시 이미지 확대 효과 */ 
    ${TrendingImgLink}:hover & {
        transform: scale(1.05); /* 호버 시 이미지 확대 */
    }
`;


const StyledButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    border: none;
    color: white;
    font-size: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 10;
`;

const LeftButton = styled(StyledButton)`
    left: 10px;
`;

const RightButton = styled(StyledButton)`
    right: 10px;
`;
const useGetTrending = async () => {
    const { data } = await axiosInstance.get(`/trending/movie/day?language=ko-KR&page=1`);
    return data;
};

const Movies = () => {
    const { data: trendingMovies, isPending, isError } = useQuery({
        queryFn: useGetTrending,
        queryKey: ["movies", "trending"],
    });

    const scrollRef = useRef(null);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
    };
    
    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    };


    if (isPending) {
        return <p style={{ color: "white" }}>로딩 중입니다...</p>;
    }

    if (isError) {
        return <p style={{ color: "white" }}>에러 발생</p>;
    }

    return(
        <StyledContainer>
            <StyledArticleContainer>
                <p style={{color: 'white', display: 'inline', fontWeight: 'bold', fontSize: '25px', marginLeft: '30px'}}>트렌드</p>
                <AddLink to={'/movies/trending'}>
                    <AddTxt>더보기</AddTxt>
                </AddLink>
                <StyledArticleImgContainer ref={scrollRef}>
                    {trendingMovies?.results?.slice(0, 10).map((movie) => (
                        <TrendingImgLink key={movie.id} to={`/movies/${movie.id}`}>
                            <TrendingImg
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                        </TrendingImgLink>
                    ))}
                </StyledArticleImgContainer>
                <LeftButton onClick={scrollLeft}>&lt;</LeftButton>
                <RightButton onClick={scrollRight}>&gt;</RightButton>
            </StyledArticleContainer>

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
