import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import {increase, decrease, removeItem, clearCart, calculateTotals} from '../redux/cartSlice'
import {ChevronUp, ChevronDown} from '../constants/icons'

const Container = styled.div`
    display: flex;
    margin-bottom: 25px;
    align-items: center;
    justify-content: center;
`;
const Img = styled.img`
    width: 100px;
    height: 100px;
    margin-right: 15px;
`;

const Price = styled.p`
    color: grey;
    font-weight: 500;
    margin-top: 0;
`;
const Txt = styled.p`
    margin-bottom: 5px;
`;

const IconButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;

`;

export default function Item() {
    const data = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const list = data.items;

    /* console.log("data: " ,data);
    console.log("list: " ,list); */

    // list가 변경될 때 마다 총 수량과 총 가격 다시 계산
    useEffect(() => {
        dispatch(calculateTotals(data));
        console.log("data: ", data);
      }, [dispatch, list]);
    
    const listView = list.map((item) => (
        <Container key={item.id}>
            <Img src={item.img} />
            <div style={{width: '500px', marginRight: '10px'}}>
                <Txt>{item.title} | {item.singer}</Txt>
                <Price>￦ {item.price}</Price>
            </div>
            <div style={{width: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <IconButton onClick={() => dispatch(increase(item.id))}>
                    {<ChevronUp/>}
                </IconButton>
                <p style={{marginTop: '5px', marginBottom: '5px', color: 'blue'}}>{item.amount}</p>
                <IconButton 
                    onClick={() => {
                        console.log(item.amount)
                        item.amount === 1
                            ? dispatch(removeItem(item.id)) 
                            : dispatch(decrease(item.id))
                    }}
                >
                    {<ChevronDown/>}
                </IconButton>
            </div>
        </Container>
    ))

    
  return (
    <div style={{marginTop: '50px'}}>
        {listView}
    </div>

    )
}