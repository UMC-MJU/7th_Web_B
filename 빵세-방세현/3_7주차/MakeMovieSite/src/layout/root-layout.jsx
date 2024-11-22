import { Outlet } from "react-router-dom";
import ApproachNavbar from "../components/ApproachNavbar";
import styled from "styled-components";
import SideBar from "../components/SideBar";
const RootLayout = () => {
  return (
    <Screen>
      <ApproachNavbar />
      <SidebarAndPage>
        <SideBar />
        <OutletWrapper>
          <Outlet />
        </OutletWrapper>
      </SidebarAndPage>
    </Screen>
  );
};

export default RootLayout;

const Screen = styled.div`
  height: 100vh; /* 전체 화면 높이 */
  width: 100vw; /* 전체 화면 너비 */
  background-color: black;
  overflow: auto; /* 내용이 넘칠 경우 스크롤 가능 */
`;

const SidebarAndPage = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 70px); /* 네비바 높이만큼 빼기 */
  overflow: auto;
`;

const OutletWrapper = styled.div`
  flex-grow: 1; /* Outlet의 크기에 따라 자동으로 크기 조정 */
  width: 80%; /* outlet의 최대 너비를 설정해줘서 사이드바를 침범하지 않도록 설정*/
  overflow: auto; /* 내용이 넘칠 경우 스크롤 가능 */
  display: flex;
`;
// 비율 설정해야 함
