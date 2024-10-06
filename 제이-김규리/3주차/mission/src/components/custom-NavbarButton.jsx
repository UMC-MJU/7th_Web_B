import styled from "styled-components";

const StyledNavbarButton = styled.button`
    background-color: ${props => props.backgroundColor || 'black'};
    border-radius: 8px;
    height: 32px;
    width: 70px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export default StyledNavbarButton;