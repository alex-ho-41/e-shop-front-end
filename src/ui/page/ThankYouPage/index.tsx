import TopNavBar from "../../component/TopNavBar";
import {Button, Card} from "react-bootstrap";
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular, solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {Link, useNavigate} from "react-router-dom";

export default function ThankYouPage() {
    const [hover, setHover] = useState<boolean>(false)
    const navigate = useNavigate();

    return(<div>
        <TopNavBar/>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
            <Link to={"/"}>
                <div style={{}}>
                    <img style={{width:"52.5rem"}} src={"https://e1.pxfuel.com/desktop-wallpaper/136/567/desktop-wallpaper-thank-you-alola-pokemon-alola-sun-and-moon.jpg"}/>
                </div>
            </Link>

            <Button variant="outline-dark" style={{width:"55%"}} onMouseOver={()=>setHover(true)} onMouseLeave={()=>setHover(false)} onClick={()=>navigate("/")}>
                    <FontAwesomeIcon icon={solid("house")} bounce size="2xl" style={hover?{color: "white"}:{color:"black"}} />
            </Button>

        </div>



    </div>)
}