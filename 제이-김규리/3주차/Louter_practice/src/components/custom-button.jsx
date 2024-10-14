import styled from "styled-components";

const CustomButton = () => {
    return(
        <>
        <FirstStyledSweetPotato color={'pink'}>
            고구마
        </FirstStyledSweetPotato>
        <FirstStyledSweetPotato>
            고구마
        </FirstStyledSweetPotato>
        </>
    );
};

export default CustomButton;

const FirstStyledSweetPotato = styled.button`
    // color props가 전달되지 않은 경우에는 purple을 기본으로 활용
    background-color: ${props => props.color || 'purple'};
    border: none;
    border-radius: 10px;
    padding: 20px;
    cursor: pointer;
    color: white;
`
