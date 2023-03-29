import TopNavBar from "../../component/TopNavBar";
import backgound from "https://e1.pxfuel.com/desktop-wallpaper/75/774/desktop-wallpaper-pokemon-anniversary-dark-pokemon.jpg"
import {Button, Card} from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
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
                    <img style={{width:"50rem"}} src={"https://e1.pxfuel.com/desktop-wallpaper/136/567/desktop-wallpaper-thank-you-alola-pokemon-alola-sun-and-moon.jpg"}/>
                </div>
            </Link>


            <Button variant="outline-dark" style={{width:"52%"}} onMouseOver={()=>setHover(true)} onMouseLeave={()=>setHover(false)} onClick={()=>navigate("/")}>
                    <FontAwesomeIcon icon={solid("house")} bounce size="2xl" style={hover?{color: "white"}:{color:"black"}} />
            </Button>

        </div>



    </div>)
}