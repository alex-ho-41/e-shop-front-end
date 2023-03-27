import React, {useContext, useState} from "react";
import {Button, Card, Container} from "react-bootstrap";
import {ProductDetailDto} from "../../data/dto/ProductDetailDto";
import './style/detailProductCardStyle.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import Selector from "./Selector";
import CartItemApi from "../../api/CartItemApi";
import {useNavigate} from "react-router-dom";
import {userContext} from "../../App";
import AddToCartSuccessToast from "./AddToCartSuccessToast";

type Props ={
    productDetailDto: ProductDetailDto|undefined
    // setShowToast: (showToast:boolean) => void;
    // toggoleShowToast: ()=> void
}

export default function DetailProductCard(props:Props) {
    const [showToast, setShowToast] = useState<boolean>(false);
    const toggoleShowToast = () => setShowToast(!showToast)

    const [count,setCount] = useState<number>(1);
    const [hover, setHover] = useState<boolean>(false)
    const navigate = useNavigate();
    const user = useContext(userContext);
    const [cartItemDtoStatus, setCartItemDtoStatus]= useState<boolean>(false);
    const [countForToast,setCountForToast] = useState<number>(0);
    const addCartItemByPidAndQuantity = async ()=>{
        try{
            if(user && props.productDetailDto){
                const data = await CartItemApi.addCartItem(props.productDetailDto.pid,count)
                setCartItemDtoStatus(data)
                setCountForToast(count)
                setShowToast(true)

            }else{
                navigate("/login")
            }
        }catch (e){
            console.log(e)
            navigate("/error")
        }
    }


    let renderButtonContainer = ()=>{
        if(!props.productDetailDto){
            return
        }

        if(props.productDetailDto.stock){
           return <div id="buttons-container">
                <Selector stock={props.productDetailDto?.stock} count={count} setCount={setCount} />
                <Button id="product-detail-shopping-cart-button"
                        variant={"outline-dark"}
                        onMouseOver={()=> setHover(true)}
                        onMouseLeave={()=> setHover(false)}
                        onClick={addCartItemByPidAndQuantity}
                ><FontAwesomeIcon icon={solid("cart-arrow-down")} size="xl" style={hover?{color: "#FFFFFF",transition:"none"}:{color:"#000000"} }/></Button>
            </div>
        }else {
            return <div id="buttons-container">
                <Selector stock={props.productDetailDto?.stock} count={count} setCount={setCount}/>
                <Button id="product-detail-shopping-cart-button"
                        variant={"outline-dark"}
                        onMouseOver={()=> setHover(true)}
                        onMouseLeave={()=> setHover(false)}
                        disabled
                ><FontAwesomeIcon icon={solid("circle-xmark")} shake size="xl" style={{color: "#ff0000",}} /></Button>
            </div>
        }

    }

    return(
        <Container id="detail-product-container">
            <Card id="card-image-container" className={"shadow p-3 mb-5 bg-white rounded"}>
                <Card.Img variant="top" src={`${props.productDetailDto?.image_url}`} />
            </Card>

            <Card id="card-info" className={"shadow p-3 mb-5 bg-white rounded"}>
                <Card.Body id="card-info-body">
                    <Card.Title>{props.productDetailDto?.name}</Card.Title>
                    <Card.Text>
                        {props.productDetailDto?.description}
                    </Card.Text>
                    <Card.Text>貨物號碼: # {props.productDetailDto?.pid}</Card.Text>
                    <Card.Text>價錢 : ${props.productDetailDto?.price.toLocaleString('en-US')}</Card.Text>
                    <Card.Text>貨存 : {props.productDetailDto?.stock}</Card.Text>
                    {renderButtonContainer()}
                </Card.Body>
            </Card>
            <AddToCartSuccessToast show={showToast} toggleShow={toggoleShowToast} name={props.productDetailDto?.name}
            count={countForToast}/>
        </Container>
    )




}