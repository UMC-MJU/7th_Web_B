import ModalButton from "./ModalButton";
import styled from "styled-components";

const Modal = ({ children }) => {
  return (
    <ModalContainer onClick={(e) => {}}>
      <Modall>
        {children}
        <ModalButton />
      </Modall>
    </ModalContainer>
  );
};

export default Modal;

const ModalContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modall = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;
