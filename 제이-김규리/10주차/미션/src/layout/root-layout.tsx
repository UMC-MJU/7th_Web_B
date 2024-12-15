import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import SideBar from "../components/sidebar";
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
`;

const OutletWrapper = styled.div`
  width: 90%;
`;

const RootLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <StyledWrapper>
        <SideBar />
        <OutletWrapper>
          {/* 자식 라우트가 이 위치에서 렌더링 */}
          <Outlet />
        </OutletWrapper>
      </StyledWrapper>
    </>
  );
};

export default RootLayout;
