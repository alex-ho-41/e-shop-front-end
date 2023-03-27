import React from "react";
import {Button, Card, CardImg, Container, ProgressBar, Spinner} from "react-bootstrap";
import './style/loadingSpinnerStyle.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {Link} from "react-router-dom";
import img from './logo.png'

export default function LoadingSpinner(){


    return(
        <Container style={{display:"flex",justifyContent:"center",flexWrap:"wrap",alignItems:"center"}}>
            {Array.from({length:8}).map(()=>{
                return <Card id="product-card-group-container" style={{height:"500px",width:"300px",display:"flex",alignItems:"center",justifyContent:"center"}} className={"card-container shadow p-3 mb-5 bg-white rounded pulse"}>
                        <img id={"img"} src={img}/>
                </Card>
            })}

        </Container>

        )
}