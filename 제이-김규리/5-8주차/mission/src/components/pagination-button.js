import styled from "styled-components";

const PaginationButton = styled.button`
    padding: 10px 20px;
    margin: 5px;
    background-color: ${({ disabled }) => (disabled ? "#555" : "#007bff")};
    color: ${({ disabled }) => (disabled ? "#ccc" : "#fff")};
    border: none;
    border-radius: 4px;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    &:hover {
        background-color: ${({ disabled }) => (disabled ? "#555" : "#0056b3")};
    }
`;

export default PaginationButton;