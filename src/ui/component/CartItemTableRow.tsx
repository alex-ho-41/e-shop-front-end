import React, {useContext, useEffect, useState} from "react";
import {CartItemDto} from "../../data/dto/CartItemDto";
import {Button} from "react-bootstrap";
import LoadingSpinner from "./LoadingSpinner";
import {useNavigate} from "react-router-dom";
import {cartItemDtoContext} from "../page/ShoppingCartPage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular, solid} from "@fortawesome/fontawesome-svg-core/import.macro";

type Props = {
    cartItem: CartItemDto | undefined
}

export default function CartItemTableRow(props: Props) {
    const navigate = useNavigate();
    const [hover, setHover] = useState<boolean>(false);
    const shoppingCartPage = useContext(cartItemDtoContext)
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const handleMinus = () => {
        if (props.cartItem && props.cartItem.cart_quantity > 1) {
            console.log("-")
            const quantity = props.cartItem.cart_quantity - 1
            const pid = props.cartItem.pid
            if (shoppingCartPage) {
                shoppingCartPage.patchCartItemDto(pid, quantity)
            }
        }

    }

    const handlePlus = () => {
        if (props.cartItem && props.cartItem.stock > props.cartItem.cart_quantity) {
            console.log("+")
            const quantity = props.cartItem.cart_quantity + 1
            const pid = props.cartItem.pid
            if (shoppingCartPage) {
                shoppingCartPage.patchCartItemDto(pid, quantity)
            }
        }
    }

    const handleDelete = async () => {
        setIsLoading(true)
        try {
            if (props.cartItem && shoppingCartPage) {
                await shoppingCartPage.deleteCartItem(props.cartItem.pid)
            }
        } catch (e) {
            console.log(e)
        } finally {
            setHover(false);
            setIsLoading(false)
        }

    }


    const renderSelector = () => {
        if (props.cartItem) {
            return <td>
                <div style={{display: "flex", alignItems: "center"}}>
                    <Button variant={"outline-dark"} onClick={handleMinus}>-</Button>
                    <div style={{width: "2rem", textAlign: "center"}}>{props.cartItem.cart_quantity}</div>
                    <Button variant={"outline-dark"} onClick={handlePlus}>+</Button>
                </div>
            </td>
        }
    }

    const renderDeleteButton = () => {
        if (!isLoading) {
            return (<td><Button variant={"outline-dark"}
                // disabled={isLoading}
                                onMouseDown={handleDelete}
                                onMouseOver={() => setHover(true)}
                                onMouseLeave={() => setHover(false)}>
                <FontAwesomeIcon icon={regular("trash-can")} size="xl"
                                 style={hover ? {color: "white"} : {color: "black"}}/></Button></td>)
        } else {
            return (<td><Button variant={"outline-dark"}
                                disabled>
                <FontAwesomeIcon icon={solid("circle-check")} beatFade size="lg" style={{color: "#00ff1e",}} /></Button>
            </td>)
        }
    }

    const renderTable = () => {
        if (props.cartItem) {
            return <tr>
                <td>{props.cartItem.pid}</td>
                <td><img style={{width: "10rem"}} src={props.cartItem.image_url}/></td>
                <td>{props.cartItem.name}</td>
                {renderSelector()}
                <td>HKD ${(props.cartItem.cart_quantity * props.cartItem.price).toLocaleString('en-US')}</td>
                <td>{props.cartItem.stock}</td>
                {renderDeleteButton()}
            </tr>
        } else {
            return <LoadingSpinner/>
        }
    }

    return (renderTable())
}