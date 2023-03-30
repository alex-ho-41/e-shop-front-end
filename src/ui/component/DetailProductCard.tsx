import React, {useContext, useState} from "react";
import {Button, Card, Container} from "react-bootstrap";
import {CategoryMapping, ProductDetailDto} from "../../data/dto/ProductDetailDto";
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
}

export default function DetailProductCard(props:Props) {
    const [showToast, setShowToast] = useState<boolean>(false);
    const toggleShowToast = () => setShowToast(!showToast)
    const changeHover = ()=> setHover(false)

    const [count,setCount] = useState<number>(1);
    const [hover, setHover] = useState<boolean>(false)
    const navigate = useNavigate();
    const user = useContext(userContext);
    const [countForToast,setCountForToast] = useState<number>(0);
    const addCartItemByPidAndQuantity = async ()=>{
        setShowToast(true)
        try{
            if(user && props.productDetailDto){
                const data = await CartItemApi.addCartItem(props.productDetailDto.pid,count)
                setCountForToast(count)

            }else{
                navigate("/login")
            }
        }catch (e){
            console.log(e)
            navigate("/error")
        }
    }



    let categoryMapping:CategoryMapping = {
        "fire":"火",
        "water":"水",
        "electric":"電",
        "grass":"草",
        "fly":"飛行",
        "fairy":"妖精",
        "ground":"地面",
        "ice":"冰",
        "normal":"普通",
        "psychic":"超能力",
        "dragon":"龍"
    }

    let renderCategoryColor = ()=>{
        if(!props.productDetailDto){
            return
        }
        //@ts-ignore
        let cate = props.productDetailDto.category as string

        if (cate==="fire"){
            return <div style={{width:"2rem",height:"1rem",background:"red",borderRadius:"25px"}}></div>
        }else if(cate === "water"){
            return <div style={{width:"2rem",height:"1rem",background:"rgb(61 136 208)",borderRadius:"25px"}}></div>
        }else if(cate ==="grass"){
            return <div style={{width:"2rem",height:"1rem",background:"green",borderRadius:"25px"}}></div>
        }else if(cate ==="electric"){
            return <div style={{width:"2rem",height:"1rem",background:"yellow",borderRadius:"25px"}}></div>
        }else if(cate ==="dragon"){
            return <div style={{width:"2rem",height:"1rem",background:"purple",borderRadius:"25px"}}></div>
        }else if(cate ==="normal"){
            return <div style={{width:"2rem",height:"1rem",background:"grey",borderRadius:"25px"}}></div>
        }else if(cate ==="fairy"){
            return <div style={{width:"2rem",height:"1rem",background:"rgb(221 123 168)",borderRadius:"25px"}}></div>
        }else if(cate==="fly"){
            return <div style={{width:"2rem",height:"1rem",background:"rgb(136 186 212)",borderRadius:"25px"}}></div>
        }else if(cate==="ice"){
            return <div style={{width:"2rem",height:"1rem",background:"rgb(82 180 233)",borderRadius:"25px"}}></div>
        }else if(cate ==="ground"){
            return <div style={{width:"2rem",height:"1rem",background:"rgb(197 163 83)",borderRadius:"25px"}}></div>
        }else {
            return <div style={{width:"2rem",height:"1rem",background:"rgb(207 125 196)",borderRadius:"25px"}}></div>
        }
    }




    let renderButtonContainer = ()=>{
        if(!props.productDetailDto){
            return
        }

        if(props.productDetailDto.stock && !showToast){
           return <div id="buttons-container">
                <Selector stock={props.productDetailDto?.stock} count={count} setCount={setCount} />
                <Button id="product-detail-shopping-cart-button"
                        variant={"outline-dark"}
                        onMouseOver={()=> setHover(true)}
                        onMouseLeave={()=> setHover(false)}
                        onClick={addCartItemByPidAndQuantity}
                ><FontAwesomeIcon icon={solid("cart-arrow-down")} size="xl" shake style={hover?{color: "#FFFFFF",transition:"none"}:{color:"#000000"} }/></Button>
            </div>
        }else if(!props.productDetailDto.stock) {
            return <div id="buttons-container">
                <Selector stock={props.productDetailDto?.stock} count={count} setCount={setCount}/>
                <Button id="product-detail-shopping-cart-button"
                        variant={"outline-dark"}
                        disabled><FontAwesomeIcon icon={solid("circle-xmark")} shake size="xl" style={{color: "#ff0000",}} /></Button>
            </div>
        }else {
            return(<div id="buttons-container">
                        <Selector stock={props.productDetailDto?.stock} count={count} setCount={setCount}/>
                        <Button id="product-detail-shopping-cart-button"
                                variant={"outline-dark"}
                                disabled>
                            <FontAwesomeIcon icon={solid("circle-check")} beatFade size="lg" style={{color: "#00ff1e",}} />
                        </Button>
                    </div>
                )
        }

    }
    let renderCategory = ()=>{
        if(props.productDetailDto){
            //@ts-ignore
            return categoryMapping[props.productDetailDto.category];
        } else{
            return null;
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
                    <Card.Subtitle>屬性: {renderCategory()} {renderCategoryColor()}</Card.Subtitle>
                    <Card.Text>
                        {props.productDetailDto?.description}
                    </Card.Text>
                    <Card.Text>貨物號碼: # {props.productDetailDto?.pid}</Card.Text>
                    <Card.Text>價錢 : ${props.productDetailDto?.price.toLocaleString('en-US')}</Card.Text>
                    <Card.Text>貨存 : {props.productDetailDto?.stock}</Card.Text>
                    {renderButtonContainer()}
                </Card.Body>
            </Card>
            <AddToCartSuccessToast show={showToast} toggleShow={toggleShowToast} name={props.productDetailDto?.name}
            count={countForToast} setHover={changeHover}/>
        </Container>
    )




}