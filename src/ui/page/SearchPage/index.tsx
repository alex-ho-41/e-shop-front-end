import {useContext, useEffect, useState} from "react";
import {ProductListDto} from "../../../data/dto/ProductListDto";
import {useLocation, useNavigate} from "react-router-dom";
import {ProductApi} from "../../../api/ProductApi";
import TopNavBar from "../../component/TopNavBar";
import {Container} from "react-bootstrap";
import ProductCardGroup from "../../component/ProductCardGroup";
import LoadingSpinner from "../../component/LoadingSpinner";
import '../ProductListingPage/style.css'
import {CartItemDtoStatus} from "../../../data/dto/CartItemDtoStatus";
import {userContext} from "../../../App";
import CartItemApi from "../../../api/CartItemApi";

export default function SearchPage() {
    const [productListDtos, setProductListDtosData] = useState<ProductListDto[] | undefined>(undefined);
    const {state} = useLocation();
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
            setProductListDtosData(undefined);
            const dtos = await ProductApi.getAllProduct()
            setProductListDtosData(dtos)
        } catch (e) {
            navigate("/error")
        }

    }

    useEffect(() => {
        fetchApi()
    }, [])


    return (<div>
        <TopNavBar/>
        <Container className={"main-table-container"}>
            {productListDtos ?
                productListDtos.filter(dto=>{return dto.name.includes(state.input)}).map((value) => {
                    return <ProductCardGroup addCartItem={addCartItem} value={value} key={value.pid}/>
                }) : <LoadingSpinner/>
            }
        </Container>
    </div>)
}