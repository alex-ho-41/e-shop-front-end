import TopNavBar from "../../component/TopNavBar";
import {Container} from "react-bootstrap";
import ProductCardGroup from "../../component/ProductCardGroup";
import './style.css';
import {useContext, useEffect, useState} from "react";
import {ProductListDto} from "../../../data/dto/ProductListDto";
import {ProductApi} from "../../../api/ProductApi";
import LoadingSpinner from "../../component/LoadingSpinner";
import {useNavigate} from "react-router-dom";
import {CartItemDtoStatus} from "../../../data/dto/CartItemDtoStatus";
import CartItemApi from "../../../api/CartItemApi";
import {userContext} from "../../../App";

export default function ProductListingPage() {
    const [data, setData] = useState<ProductListDto[] | undefined>(undefined);
    const [cartItemDtoStatus, setCartItemDtoStatus] = useState<CartItemDtoStatus|undefined>(undefined)
    const user = useContext(userContext)
    const navigate = useNavigate();

    const addCartItem = async (pid:number, quantity:number) =>{
        try{
            if(user){
                let data = await CartItemApi.addCartItem(pid,quantity)
                setCartItemDtoStatus(data)
            }else {
                navigate("/login")
            }
        }catch (e) {
            navigate("/error")
        }
    }


    let fetchApi = async () => {
        try {
            setData(undefined);
            const dtos = await ProductApi.getAllProduct()
            setData(dtos)
        }catch (e){
            navigate("/error")
        }

    }

    useEffect(() => {
        fetchApi()
    }, [])

    return (<div>
        <TopNavBar/>
        <Container className={"main-table-container"}>
            { data?
                data.map((value) => {
                    return <ProductCardGroup addCartItem={addCartItem} value={value} key={value.pid}/>}):<LoadingSpinner/>
            }
            {/*<LoadingSpinner/>*/}
        </Container>
    </div>)

}