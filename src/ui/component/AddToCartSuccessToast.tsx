import React, {useState} from "react";
import {Toast, ToastContainer} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular} from "@fortawesome/fontawesome-svg-core/import.macro";
import moment from "moment";
import {Link} from "react-router-dom";

type Props = {
    show: boolean,
    toggleShow: ()=> void,
    name:string|undefined
    count:number


}

export default function AddToCartSuccessToast(props:Props) {


    return(
        <ToastContainer>
            <Toast show={props.show} onClose={props.toggleShow} style={{position:"fixed",top:"90px",right:"20px",zIndex:"1"}}>
                <Toast.Header>
                    <strong className="me-auto"><FontAwesomeIcon icon={regular("envelope")} beatFade size="lg" style={{color: "#000000",}} /> 消息</strong>
                    <small>{moment().format("DD/MM/YYYY HH:mm:ss")}</small>
                </Toast.Header>
                <Toast.Body>{`${props.count} 隻 ${props.name} 已加入購物車`} <Link to="/shoppingcart">按此前往 購物車</Link></Toast.Body>
            </Toast>
        </ToastContainer>


    )


}

