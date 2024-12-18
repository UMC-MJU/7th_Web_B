import {Link} from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
    font-size: 12px;
    font-weight: ${props => props.fontWeight || 'normal'};
`;

export default StyledLink;


