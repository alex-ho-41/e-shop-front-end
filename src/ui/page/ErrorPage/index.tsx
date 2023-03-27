import TopNavBar from "../../component/TopNavBar";
import {Button, Container} from "react-bootstrap";
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useNavigate} from "react-router-dom";
import './style.css'

export default function ErrorPage() {

    const[hover,setHover] = useState<boolean>(false);
    const navigate = useNavigate();

    return(<div>
        <TopNavBar/>
        <Container id="main-container">
            <h1>Page Not found!</h1>
            <h6>The page you're looking for can't be found.</h6>
            <div id={"img-container"}>
                <img id="error-img-1" src={"https://cdn-icons-png.flaticon.com/512/189/189001.png?w=1060&t=st=1679555251~exp=1679555851~hmac=a0ce8f4bae2923a4e122ab89038f0765922b69b833f2aeaf13145193c11e80dc"}/>
                <img id="error-img-2" src={"https://cdn-icons-png.flaticon.com/512/528/528098.png?w=1060&t=st=1679541259~exp=1679541859~hmac=d95ed7e55a206f5432f370135c196d7d684d401b31cb330febbd588a61c92d45"}/>
                <img id="error-img-3" src={"https://cdn-icons-png.flaticon.com/512/189/189000.png?w=1060&t=st=1679555414~exp=1679556014~hmac=083ba924fc4df09ac3a19c8e403e42457dddd99a5d866f94dce2a2f3a66bed06"}/>
            </div>

            <Button onMouseOver={()=>{setHover(true)}}
                    onMouseLeave={()=>{setHover(false)}}
                    onClick={()=>{navigate("/")}}
                variant={"outline-dark"}
                    id="back-home-button"><FontAwesomeIcon icon={solid("house")} bounce size="2xl" style={hover?{color: "#ffffff"}:{color: "#000000"}} /></Button>

        </Container>

    </div>)

}