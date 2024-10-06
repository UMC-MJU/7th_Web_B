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
        <Outlet />
      </SidebarAndPage>
    </Screen>
  );
};

export default RootLayout;

const Screen = styled.div`
  height: 100vh; /* 전체 화면 높이 */
  width: 100vw; /* 전체 화면 너비 */
  background-color: black;
`;

const SidebarAndPage = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 60px); /* 네비바 높이만큼 빼기 */
`;
