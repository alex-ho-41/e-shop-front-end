import TopNavBar from "../../component/TopNavBar";
import {Container} from "react-bootstrap";
import DetailProductCard from "../../component/DetailProductCard";
import {useContext, useEffect, useState} from "react";
import {ProductDetailDto} from "../../../data/dto/ProductDetailDto";
import {useNavigate, useParams} from "react-router-dom";
import {ProductApi} from "../../../api/ProductApi";
import LoadingSpinner from "../../component/LoadingSpinner";
import DetailProductLoadingSpinner from "../../component/DetailProductLoadingSpinner";
import CartItemApi from "../../../api/CartItemApi";
import {userContext} from "../../../App";
import {CartItemDto} from "../../../data/dto/CartItemDto";
import AddToCartSuccessToast from "../../component/AddToCartSuccessToast";

type Params = {
    productId: string | undefined
}

export default function ProductDetailPage() {
    const [productDetailDto, setProductDetailProductDto] = useState<ProductDetailDto | undefined>(undefined)
    const params = useParams<Params>();
    const navigate = useNavigate();


    let getProductByPid = async () => {
        try {
            setProductDetailProductDto(undefined)
            if (params.productId) {
                const data = await ProductApi.getProductDetail(params.productId)
                setProductDetailProductDto(data)
            }
        } catch (e) {
            console.log(e)
            navigate("/error")
        }
    }


    useEffect(() => {
        getProductByPid()
    }, [params.productId])


    return (<div>
        <TopNavBar/>
        <Container>
            {productDetailDto ? <DetailProductCard  productDetailDto={productDetailDto}/> :
                <DetailProductLoadingSpinner/>}
            {/*<DetailProductLoadingSpinner/>*/}
        </Container>
    </div>)

}