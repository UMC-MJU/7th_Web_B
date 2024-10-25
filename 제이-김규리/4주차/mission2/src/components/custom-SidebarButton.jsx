import styled from "styled-components";

const StyledSidebarButton = styled.button`
    background-color: ${props => props.backgroundColor || 'black'};
    border-radius: 8px;
    height: 32px;
    width: 60px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    margin-left: 5px;
`;

export default StyledSidebarButton;