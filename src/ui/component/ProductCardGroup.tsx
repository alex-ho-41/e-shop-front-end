import React, {useContext, useState} from "react";
import {Button, Card, CardImg, Container, Spinner} from "react-bootstrap";
import './style/productCardGroupStyle.css'
import {ProductListDto} from "../../data/dto/ProductListDto";
import LoadingSpinner from "./LoadingSpinner";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {Link, useNavigate} from "react-router-dom";
import {userContext} from "../../App";
import AddToCartSuccessToast from "./AddToCartSuccessToast";

type Props = {
    value: ProductListDto
    addCartItem: (pid: number, quantity: number) => void
}


export default function ProductCardGroup(props: Props) {
    const user = useContext(userContext);
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState<boolean>(false);
    const [hover, setHover] = useState<boolean>(false);
    const toggleShowToast = () => setShowToast(!showToast)
    const changeHover = ()=> setHover(false)


    let renderButton = () => {
        if(props.value.has_stock && !showToast) {
            return (
                <Button variant="outline-dark"
                        onMouseOver={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        style={{width: "100px"}}
                        onClick={() => {
                            if (user) {
                                props.addCartItem(props.value.pid, 1);
                                setShowToast(true)
                            } else {
                                navigate("/login")
                            }
                        }
                        }><FontAwesomeIcon icon={solid("cart-arrow-down")} shake size="lg"
                                           style={hover ? {color: "white"} : {color: "black"}}/></Button>
            )
        }else if(!props.value.has_stock){
            return (
                    <Button disabled
                            style={{width:"100px"}}
                            variant="outline-dark">
                        <FontAwesomeIcon icon={solid("circle-xmark")} shake size="lg" style={{color: "#ff0000",}} />
                    </Button>
                )
        }else {
            return (<Button disabled
                            style={{width:"100px"}}
                            variant="outline-dark">
                <FontAwesomeIcon icon={solid("circle-check")} beatFade size="lg" style={{color: "#00ff1e",}} />
            </Button>)
        }
    }

    let renderCategory = ()=>{
        let cate = props.value.category
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

    let renderCard = () => {
        return props.value ?
            <Card id="product-card-group-container" className={"card-container shadow p-3 mb-5 bg-white rounded"}>
                <Card.Body>
                    <Card.Title>{props.value.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Category {renderCategory()}
                    </Card.Subtitle>
                    <CardImg src={`${props.value.image_url}`} style={{aspectRatio: "1/1"}}/>
                    <Card.Text> 貨物號碼 : #{props.value.pid}</Card.Text>
                    <Card.Text style={{display: "flex"}}> 貨存 : {props.value.has_stock ?
                        <div style={{marginLeft: "1rem"}}><FontAwesomeIcon icon={solid("circle")}
                                                                           style={{color: "#c9ffc2",}}/> 有</div> :
                        <div style={{marginLeft: "1rem"}}><FontAwesomeIcon icon={solid("circle")}
                                                                           style={{color: "#ff0000",}}/> 沒有
                        </div>}</Card.Text>
                    <Card.Text> 價錢 : ${props.value.price.toLocaleString('en-US')}</Card.Text>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <Link to={`/product/${props.value.pid}`}>
                            <Button variant="outline-dark">更多資料</Button>
                        </Link>
                        {renderButton()}
                    </div>
                    <AddToCartSuccessToast show={showToast} toggleShow={toggleShowToast} name={props.value.name} setHover={changeHover}
                                           count={1}/>
                </Card.Body>
            </Card> :
            <LoadingSpinner/>

    }


    return (
        renderCard()
    )

}