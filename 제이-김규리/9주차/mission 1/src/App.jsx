import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import Item from './components/Item';
import {CartIcon} from './constants/icons';
import {clearCart} from './redux/cartSlice'
import ModalPortal from './components/modal/ModalPortal';
import Modal from './components/modal/Modal';

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
  background-color: white;
  color: red;
  border-color: red;
  border-radius: 5px;
  cursor: pointer;
`;

const Footer = styled.div`
  display: flex; 
  flex-direction: column;
  align-items: center;
`;

function App() {
  const data = useSelector(state => state.cart)
  const {isOpen} = useSelector((store) => store.modal)
  const dispatch = useDispatch();
  
  //console.log(data)
  const list = data.items;
  const totalCount = data.totalCount;
  const totalPrice = data.totalPrice;
  
  return (
    <div style={{padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      
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
      </main>

      <Footer>
        <PriceBox>
          <p style={{fontWeight: 'bold'}}>총 가격</p>
          <p style={{fontWeight: 'bold'}}>￦ {totalPrice}</p>
        </PriceBox>
        <ClearButton onClick={() => dispatch(clearCart())}>장바구니 초기화</ClearButton>
      </Footer>
      
    </div>
  )
}

export default App
