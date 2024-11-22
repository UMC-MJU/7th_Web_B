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
  overflow-y: auto; /* 세로 스크롤 가능 */
  overflow-x: hidden; /* 가로 스크롤 방지 *
`;

const SidebarAndPage = styled.div`
  display: flex;
  flex-direction: row;
`;

const OutletWrapper = styled.div`
  flex-grow: 1; /* Outlet의 크기에 따라 자동으로 크기 조정 */
  width: 80%; /* outlet의 최대 너비를 설정해줘서 사이드바를 침범하지 않도록 설정*/
  // overflow: hidden; /* 내용이 넘칠 경우 스크롤 방지 */
  display: flex;
`;
// 비율 설정해야 함
