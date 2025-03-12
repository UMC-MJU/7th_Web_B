import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import InfoContainer from "../info-container";
import useGetDetail from '../../../hooks/queries/useGetDetail';
import {Link, Outlet} from "react-router-dom";
import { useEffect } from "react";

const StyledBannerContainer = styled.div`
    width: 100%;
    height: 350px;
    border-radius: 5px;
    position: relative;
    display: inline-block;
    overflow: hidden;
    margin-top: 10px;
`;

const StyledImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
`;

const StyledMenu = styled.div`
    width: 125px;
    border-bottom: ${(props) => (props.isActive ? "2px solid white" : "none")};
    cursor: pointer;
    p {
        color: ${(props) => (props.isActive ? "white" : "gray")};
        font-weight: bold;
        text-align: center;
    }
`;

const DetailPage = () => {
    const {movieId} = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    // const {data: movie, isLoading, isError} = useCustomFetch(`/movie/${movieId}?language=ko-KR&page=1`);
    // const {data: credits, isLoading: isCreditLoading, isError: isCreditError} = useCustomFetch(`/movie/${movieId}/credits?language=ko-KR&page=1`);

    const { data, isPending, isError } = useQuery({
        queryFn: () => useGetDetail({ movieId }),
        queryKey: ['movieDetail', movieId],
    });

    useEffect(() => {
        if (location.pathname === `/movies/${movieId}`) {
            navigate(`content_info`);
        }
    }, [location.pathname, movieId, navigate]);
    

    console.log(data);
    if(isPending){
        return <div>
            <h1 style={{color: 'white'}}>로딩 중 입니다..</h1>
        </div>
    }

    // 요청실패, 데이터 객체 확인, 내부 데이터 속성 확인 !!!!!!!!
    if(isError){
        return <div>
        <h1 style={{color: 'white'}}>에러 발생</h1>
    </div>
    }


    // const cast = credits.data.cast;
    // const director = credits.data.crew;

    const { movie } = data;


    return(
        <div>
            
            <StyledBannerContainer>
                <StyledImg src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}/>
                {/* <h1 style={{color: 'white'}}>Movie Detail for ID: {movieId}</h1> */}
                <InfoContainer movie={movie}/>
            </StyledBannerContainer>
            <div>
                <div style={{ width: '250px', display: 'flex', justifySelf: 'center', marginBottom: '30px', marginTop: '20px'}}>
                    <StyledMenu isActive={location.pathname.endsWith("content_info")}>
                        <StyledLink to={`content_info`}>
                            <p>콘텐츠 정보</p>
                        </StyledLink>
                    </StyledMenu>
                    <StyledMenu isActive={location.pathname.endsWith("related_content")}>
                        <StyledLink to={`related_content`}>
                            <p>추천 콘텐츠</p>
                        </StyledLink>
                    </StyledMenu>
                </div>
                <Outlet/>
            </div>
        </div>
    );
}

export default DetailPage;