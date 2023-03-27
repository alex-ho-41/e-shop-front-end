import TopNavBar from "../../component/TopNavBar";
import ShoppingCartTable from "../../component/ShoppingCartTable";
import {Container} from "react-bootstrap";
import React, {createContext, useContext, useEffect, useState} from "react";
import {CartItemDto} from "../../../data/dto/CartItemDto";
import {useNavigate, useParams} from "react-router-dom";
import CartItemApi from "../../../api/CartItemApi";
import {CartItemDtoStatus} from "../../../data/dto/CartItemDtoStatus";
import {userContext} from "../../../App";
import {TransactionDto} from "../../../data/dto/TransactionDto";
import TransactionApi from "../../../api/TransactionApi";


export const cartItemDtoContext = createContext<CartItemProvider | undefined>(undefined);

export type CartItemProvider = {
    patchCartItemDto: (pid: number, quantity: number) => Promise<void>,
    deleteCartItem: (pid: number) => Promise<void>;
    createTransaction: ()=>Promise<void>,
    transactionDto: TransactionDto|undefined;

}

export default function ShoppingCartPage() {
    const [cartItemDtos, setCartItemDtos] = useState<CartItemDto[] | undefined>(undefined);
    const [transactionDto, setTransactionDto] = useState<TransactionDto|undefined>(undefined);
    const navigate = useNavigate();

    const user = useContext(userContext)

    const checkIsLogined = ()=>{
        if(user===null){
            navigate("/login")
        }else {
            getAllCartItems()
        }
    }

    const fetchCartItemFunction: CartItemProvider = {
        patchCartItemDto: async (pid: number, quantity: number) => {
            try {
                const data: CartItemDto = await CartItemApi.patchCartItem(pid, quantity)
                if (cartItemDtos) {
                    setCartItemDtos(cartItemDtos.map((value) => {
                        if (value.pid === data.pid) {
                            value = data
                        }
                        return value
                    }))
                }
            } catch (e) {
                navigate("/error")
            }
        }, deleteCartItem: async (pid: number) => {
            try {
                const data: CartItemDtoStatus = await CartItemApi.deleteCartItem(pid)
                if (data && cartItemDtos) {
                    setCartItemDtos(cartItemDtos.filter((value) => {
                        return value.pid !== pid
                    }))
                }
            } catch (e) {
                navigate("/error")
            }
        }, createTransaction:async ()=>{
            try{
                let data = await TransactionApi.createTransaction()
                setTransactionDto(data);
                navigate(`/checkout/${data.tid}`)
            }catch (e) {
                console.log("ShoppingCartPage createTransactionError")
                navigate("/error")
            }
        }, transactionDto:transactionDto
    }

    const getAllCartItems = async () => {
        try {
            const data = await CartItemApi.getAllCartItems()
            setCartItemDtos(data)
        } catch (e) {
            navigate("/error")
        }
    }




    useEffect(() => {
        checkIsLogined()
        getAllCartItems()
    }, [])


    return (<div>
        <TopNavBar/>
        <cartItemDtoContext.Provider value={fetchCartItemFunction}>
            <Container style={{marginTop:"1rem", overflowX:"auto"}}>
                <h1>購物車</h1>
                <hr/>
                <div>
                    <ShoppingCartTable cartItemDtos={cartItemDtos}/>
                </div>
            </Container>
        </cartItemDtoContext.Provider>
    </div>)
}