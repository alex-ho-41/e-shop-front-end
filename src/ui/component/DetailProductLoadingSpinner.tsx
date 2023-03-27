import { Card, Container} from "react-bootstrap";
import React from "react";
import './style/detailProductLoadingSpinner.css'
import img from './logo.png'

export default function DetailProductLoadingSpinner() {

    return(<Container>
        <Container id="detail-product-container">
            <Card id="card-image-container" className={"shadow p-3 mb-5 bg-white rounded pulse"}>
                <img src={img} style={{maxHeight:"21rem",maxWidth:"21rem"}}/>
            </Card>

            <Card id="card-info" className={"shadow p-3 mb-5 bg-white rounded pulse"}>
                <img src={img} style={{maxHeight:"21rem",maxWidth:"21rem"}}/>
            </Card>
        </Container>
    </Container>)
    
}