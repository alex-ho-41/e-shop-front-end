import {Button} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

export default function ProductsButton(){
    const [hover,setHover] = useState<boolean>(false)

    return(
        <Link to={"/product/allProduct"}>
                <FontAwesomeIcon onMouseOver={()=>setHover(true)} onMouseLeave={()=>setHover(false)} icon={solid("gamepad")} bounce size="2xl" style={hover?{color: "white"}:{color:"black"}} />
        </Link>)

}