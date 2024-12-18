import StyledLink from "./custom-Link";
import styled from "styled-components";
import StyledSidebarButton from "./custom-SidebarButton";
import { IoSearch} from "react-icons/io5";
import { BiSolidMovie } from "react-icons/bi";

const StyledAside = styled.aside`
    display: flex;
    flex-direction: column;
    width: 10%;
    height: 500px;
    padding-right: 40px;
`;

const SideBar = () => {
    return (
        <StyledAside>
            <StyledSidebarButton>
                <IoSearch color="white"/>
                <StyledLink to={'/search'} fontWeight={'bold'}>찾기</StyledLink>
            </StyledSidebarButton>
            <StyledSidebarButton>
                <BiSolidMovie color="white"/>
                <StyledLink to={'/movies'} fontWeight={'bold'}>영화</StyledLink>
            </StyledSidebarButton>
        </StyledAside>
    );
}

export default SideBar;