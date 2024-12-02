import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/cartSlice";
import { closeModal } from "../../redux/modalSlice";
import styled from "styled-components";

const Button = styled.button`
    background-color: white;
    padding: 15px;
    padding-top: 3px;
    padding-bottom: 3px;
    border-radius: 5px;
    cursor: pointer;
    color: ${(props) => props.color || "blue"}; 
    border-color: ${(props) => props.color || "blue"};
    transition: all 0.2s ease; /* 부드러운 애니메이션 효과 */

    &:hover {
        background-color: ${(props) => props.hoverColor || "rgba(0, 0, 255, 0.2)"};
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* 회색 그림자 */
    }
`;

const ButtonBox = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 80px;
    padding-top: 0;
    padding-bottom: 30px;
    width: 240px;
`;
const ModalButton = () => {
    const dispatch = useDispatch();
    return(
        <ButtonBox className="btn-container">
            <Button
                type="button"
                className="btn confirm-btn"
                onClick={() => {
                    dispatch(clearCart());
                    dispatch(closeModal());
                }}
            >
                네
            </Button>
            <Button
                type="button"
                className="btn clear-btn"
                onClick={() => {
                    dispatch(closeModal());
                }}
                color="red"
                hoverColor="rgba(255, 0, 0, 0.2)"
            >
                아니요
            </Button>
        </ButtonBox>
    );
}

export default ModalButton;