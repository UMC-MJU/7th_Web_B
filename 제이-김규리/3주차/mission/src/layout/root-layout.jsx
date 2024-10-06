import {Outlet} from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import SideBar from "../components/sidebar.jsx";
import styled from "styled-components";

const StyledWrapper = styled.div`
    display: flex;
`;

const RootLayout = () => {
    return (
        <>
            <Navbar/>
            <StyledWrapper>
                <SideBar/>
            
            {/* 자식 라우트가 이 위치에서 렌더링 */}
                <Outlet/>
            </StyledWrapper>
        </>
    );
};

export default RootLayout;
