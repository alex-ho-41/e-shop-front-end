import React, {useContext, useState} from "react";
import {Button, Table} from "react-bootstrap";
import {CartItemDto} from "../../data/dto/CartItemDto";
import CartItemTableRow from "./CartItemTableRow";
import LoadingSpinner from "./LoadingSpinner";
import {cartItemDtoContext} from "../page/ShoppingCartPage";
import {useNavigate, useParams} from "react-router-dom";
import {userContext} from "../../App";
type Params = {
    transactionId: string | undefined
}

type Props = {
    cartItemDtos: CartItemDto[] | undefined
}

export default function ShoppingCartTable(props: Props) {
    const navigate = useNavigate()
    const shoppingCartPage = useContext(cartItemDtoContext);
    const user = useContext(userContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const renderTotal = () => { // calculate the total price of all products
        if (props.cartItemDtos) {
            let sum = props.cartItemDtos.reduce((accumulator, object) => {
                return accumulator + object.cart_quantity * object.price;
            }, 0)
            return sum.toLocaleString('en-US')
        }
    }

    const renderTransactionButton = ()=>{
        if(!isLoading){
            return(<td><Button variant={"outline-dark"} onClick={()=>{
                if(shoppingCartPage){
                    setIsLoading(true)
                    shoppingCartPage.createTransaction();
                }else {
                    navigate(`/`)
                }
            }
            }>前往結帳</Button></td>)
        }else {
            return (<td><Button disabled variant={"outline-dark"}>前往中。。 </Button></td>)
        }
    }

    const renderTotalBar = () =>{
        if(props.cartItemDtos && props.cartItemDtos.length>0) {
            return (
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>合計：</td>
                    <td>HKD ${renderTotal()}</td>
                    {renderTransactionButton()}
                    <td></td>
                </tr>
            )
        } else {
            return <></>;
        }
    }




return (<Table striped>
    <thead>
    <tr>
        <th>貨物編號</th>
        <th>小精靈虛擬卡片</th>
        <th>寵物小精靈</th>
        <th>購物車數量</th>
        <th>價格</th>
        <th>存貨</th>
        <th>清除貨物</th>
    </tr>
    </thead>
    <tbody>

    {
        props.cartItemDtos ?
            props.cartItemDtos.map((value) => {
                return <CartItemTableRow cartItem={value}/>
            }) : <LoadingSpinner/>

    }

    {renderTotalBar()}


    </tbody>
</Table>)

}