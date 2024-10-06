import { Outlet } from "react-router-dom";
import ApproachNavbar from "../components/ApproachNavbar";
import styled from "styled-components";
import SideBar from "../components/SideBar";
const RootLayout = () => {
  return (
    <>
      <ApproachNavbar />
      <SidebarAndPage>
        <SideBar />
        <Outlet />
      </SidebarAndPage>
    </>
  );
};

export default RootLayout;

const SidebarAndPage = styled.div`
  display: flex;
  flex-direction: row;
`;
