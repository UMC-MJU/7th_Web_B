import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar.jsx";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      {/*RootLayout 아래의 자식 경로에 해당하는 컴포넌트들을 동적으로
      렌더링합니다. */}
    </>
  );
};

export default RootLayout;
