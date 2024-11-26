import ModalButton from "./ModalButton";
import styled from "styled-components";

const ModalContainer = styled.aside`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    bottom: 450px;
    z-index: 10;
`;

const ModalBox = styled.div`
    width: 400px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
`;
const Modal = ({children}) => {
    return (
        <ModalContainer className="modal-container" onClick={(e) => {}} >
            <ModalBox className="modal">
                {children}
                <ModalButton/>
            </ModalBox>
        </ModalContainer>
    )
}

export default Modal;