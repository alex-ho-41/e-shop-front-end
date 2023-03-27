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
    const toggleShowToast = () => setShowToast(!showToast)


    let renderCard = () => {
        return props.value ?
            <Card id="product-card-group-container" className={"card-container shadow p-3 mb-5 bg-white rounded"}>
                <Card.Body>
                    <Card.Title>{props.value.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Category</Card.Subtitle>
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
                            <Button variant="outline-primary">更多資料</Button>
                        </Link>
                        <Button variant="outline-primary" onClick={() => {
                            if (user) {
                                props.addCartItem(props.value.pid, 1);
                                setShowToast(true)
                            } else {
                                navigate("/login")
                            }

                        }
                        }>加入購物車</Button>
                    </div>
                    <AddToCartSuccessToast show={showToast} toggleShow={toggleShowToast} name={props.value.name}
                                           count={1}/>
                </Card.Body>
            </Card> :
            <LoadingSpinner/>

    }


    return (
        renderCard()
    )

}