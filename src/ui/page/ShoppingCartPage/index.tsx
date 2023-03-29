import TopNavBar from "../../component/TopNavBar";
import ShoppingCartTable from "../../component/ShoppingCartTable";
import {Button, Container} from "react-bootstrap";
import React, {createContext, useContext, useEffect, useState} from "react";
import {CartItemDto} from "../../../data/dto/CartItemDto";
import {Link, useNavigate, useParams} from "react-router-dom";
import CartItemApi from "../../../api/CartItemApi";
import {CartItemDtoStatus} from "../../../data/dto/CartItemDtoStatus";
import {userContext} from "../../../App";
import {TransactionDto} from "../../../data/dto/TransactionDto";
import TransactionApi from "../../../api/TransactionApi";
import LoadingSpinner from "../../component/LoadingSpinner";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import './style.css'


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
    const [hover, setHover] = useState<boolean>(false)

    const user = useContext(userContext)

    const checkIsLogined = ()=>{
        if(user===null){
            navigate("/login")
        }else {
            getAllCartItems()
        }
    }

    const fetchCartItemFunction: CartItemProvider = {
        patchCartItemDto: async (pid: number, quantity: number):Promise<void> => {
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

    const renderShoppingCartPage = ()=>{
        if(cartItemDtos && cartItemDtos.length>0){
            return(<Container style={{marginTop:"1rem", overflowX:"auto"}}>
                <h1>購物車</h1>
                <hr/>
                <div>
                    <ShoppingCartTable cartItemDtos={cartItemDtos}/>
                </div>
            </Container>)
        }else if(cartItemDtos && cartItemDtos.length===0){
            return(<Container style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",height:"80svh",marginTop:"1rem"}}>
                <h1>帶走你心愛的小精靈 😊</h1>
                <div>
                    <Link to={"/product/allProduct"}>

                    <img src={"https://hk.portal-pokemon.com/play/resources/pokedex/img/pm/af204c2381a4d78eae3f801521137bbf63ffd944.png"}
                         style={{maxHeight:"30rem"}}/>
                    <img src={"https://hk.portal-pokemon.com/play/resources/pokedex/img/pm/47549471dc54feb8acd4b3de3a27ea8e9e9fd25c.png"}
                         style={{maxHeight:"30rem"}}/>
                    </Link>
                </div>
                <div>
                    <Link to={"/product/allProduct"}>
                        <Button onMouseOver={()=>{setHover(true)}}
                                onMouseLeave={()=>{setHover(false)}}
                                onClick={()=>{navigate("/")}}
                                variant={"outline-dark"}
                                style={{height:"2.8rem", width:"25rem"}}
                                >
                            <FontAwesomeIcon icon={solid("puzzle-piece")} bounce size="2xl" style={hover?{color: "white"}:{color:"black"}} />
                        </Button>

                    </Link>
                </div>
            </Container>)
        }else{
            return <Container style={{marginTop:"1rem"}}>
                <LoadingSpinner/>
            </Container>

        }
    }


    useEffect(() => {
        checkIsLogined()
        getAllCartItems()
    }, [])


    return (<div id={"shopping-cart-page-container"}>
        <TopNavBar/>
        <cartItemDtoContext.Provider value={fetchCartItemFunction}>
            {renderShoppingCartPage()}
        </cartItemDtoContext.Provider>
    </div>)
}