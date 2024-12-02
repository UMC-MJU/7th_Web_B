import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import Item from './components/Item';
import {CartIcon} from './constants/icons';
import ModalPortal from './components/modal/ModalPortal';
import Modal from './components/modal/Modal';
import { openModal } from './redux/modalSlice';

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: blue;
  margin-bottom: 60px
`;

const CountBox = styled.div`
  position: absolute;
  background-color: #118ab2;
  width: 20px;
  height: 20px;
  display: flex;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  right: -15px;
  top: -5px;
`;

const PriceBox = styled.div`
  border-top: 2px solid lightgrey;
  display: flex;
  justify-content: space-between;
  width: 645px;
  margin-top: 30px;
  margin-bottom: 20px;
`;

const ClearButton = styled.button`
  padding: 10px;
  padding-top: 6px;
  padding-bottom: 6px;
  margin-bottom: 20px;
  background-color: white;
  color: red;
  border-color: red;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease; /* 부드러운 애니메이션 효과 */

  &:hover {
    background-color: rgba(255, 0, 0, 0.2); /* 살짝 빨간색 배경 */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* 회색 그림자 */
  }
`;

const Footer = styled.div`
  display: flex; 
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 검정 배경으로 어두워짐 */
  z-index: 5; /* 모달 뒤에 렌더링 */
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
  transition: opacity 0.3s ease; /* 부드러운 전환 효과 */
`;

function App() {
  const data = useSelector(state => state.cart)
  const {isOpen} = useSelector((store) => store.modal)
  const dispatch = useDispatch();
  
  //console.log(data)
  const list = data.items;
  const totalCount = data.totalCount;
  const totalPrice = data.totalPrice;
  
  
  const preventScroll = () => {
    const currentScrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.top = `-${currentScrollY}px`; 
    document.body.style.overflowY = 'scroll'; // 스크롤바 보존
    //document.body.style.filter = "blur(5px)";
    return currentScrollY;
  };

  const allowScroll = (prevScrollY) => {
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      //document.body.style.filter = "";
      window.scrollTo(0, prevScrollY);
  };
  // 모달이 열렸을 때 스크롤을 못하게 함
  useEffect(() => {
      if (isOpen) {
        const prevScrollY = preventScroll();
        return () => {
          allowScroll(prevScrollY);
        };
      }
  }, [isOpen]);
    return (
      <>
      {isOpen && <Overlay isOpen={isOpen} />} {/* 어두운 흐림 배경 */}
        <Container isOpen={isOpen}>
          <Header>
            <p style={{color: 'white', fontWeight: 'bold', fontSize: '20px'}}>UMC PlayList</p>
            <div style={{position: 'relative'}}>
              <div style={{width: '20px'}}>
                <CartIcon />
              </div>
              <CountBox>
                <p style={{color: 'white', margin: '0', fontSize: '15px'}}>{totalCount}</p>
              </CountBox>
            </div>
          </Header>
          <h1>당신이 선택한 음반</h1>

          <main>
            <Item/>
            {isOpen && 
              <ModalPortal>
                <Modal>
                  <h4>담아두신 모든 음반을 삭제하시겠습니까?</h4>
                </Modal>
              </ModalPortal>
            }
          </main>

          {totalCount > 0 ? (
          <Footer>
            <PriceBox>
              <p style={{fontWeight: 'bold'}}>총 가격</p>
              <p style={{fontWeight: 'bold'}}>￦ {totalPrice}</p>
            </PriceBox>
            <ClearButton onClick={() => dispatch(openModal())}>장바구니 초기화</ClearButton>
          </Footer>
          ) : (
            <h4>고객님이 좋아하는 음반을 담아보세요~!</h4>
          )}
          
        </Container>
      </>
  )
}

export default App
