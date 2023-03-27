import React, {useState} from "react";
import {Toast} from "react-bootstrap";

type Props = {
    show: boolean,
    toggleShow: ()=> void,
}

export default function AddToCartSuccessToast(props:Props) {
    return(
        <Toast show={props.show} onClose={props.toggleShow} style={{position:"fixed",bottom:"20px",}}>
            <Toast.Header>
                <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                />
                <strong className="me-auto">Bootstrap</strong>
                <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast>

    )

}