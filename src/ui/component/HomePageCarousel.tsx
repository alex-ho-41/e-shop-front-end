import React, {useState} from "react";
import {Carousel} from "react-bootstrap";
import ProductsButton from "./ProductsButton";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import './style/carouselStyle.css';

export default function HomePageCarousel() {
    const [hover,setHover] = useState<boolean>(false)

    return(<Carousel fade controls={false}>
        <Carousel.Item>
            <Link to={"/product/allProduct"}>
                <img
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1665041982909-8a86864a1e49?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    alt="First slide"
                />
            </Link>

            <Carousel.Caption>
                <h3>虛擬小精靈卡片，與朋友暢快地對戰 🎮</h3>
                <ProductsButton/>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <Link to={"/product/allProduct"}>
            <img
                className="d-block w-100"
                src="https://images.unsplash.com/photo-1665042055535-c871b6ed4215?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt="Second slide"
            />
            </Link>
            <Carousel.Caption>
                <h3>享受快樂的時光！🥰</h3>
                <ProductsButton/>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <Link to={"/product/allProduct"}>
            <img
                className="d-block w-100"
                src="https://images.unsplash.com/photo-1678736424903-a80e2c7f9d31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt="Third slide"
            />
            </Link>
            <Carousel.Caption>
                <h3>為生活帶來美好！🥳</h3>
                <Link to={"/product/allProduct"}>
                    <FontAwesomeIcon onMouseOver={()=>setHover(true)} onMouseLeave={()=>setHover(false)} icon={solid("gamepad")} bounce size="2xl" style={hover?{color: "black"}:{color:"white"}} />
                </Link>
            </Carousel.Caption>
        </Carousel.Item>
    </Carousel>)
}