import {Button, Container, Form, Image, Nav, Navbar, NavDropdown} from "react-bootstrap";
import React, {useContext, useEffect, useRef, useState} from "react";
import './style/topNavBarStyle.css'
import logo from './logo.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular, solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {Link, useNavigate} from "react-router-dom";
import {userContext} from "../../App";
import FirebaseAuthService from "../../authService/FirebaseAuthService";

export default function TopNavBar() {
    const [hover, setHover] = useState<boolean>(false)
    const navigate = useNavigate();
    const user = useContext(userContext);

    const toComponentB = (search: string | null) => { // for passing the value to the searching page
        navigate("/search", {state: {input: search}})
    }

    let handleOnSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        toComponentB(formData.get("searchInput-bar") as string)
    }

    const renderLoginBox = () => {
        if (user) {
            return (<>
                <b style={{color: "white"}}>{user.email}</b>
                <Button variant={"outline-light"} style={{margin: "1rem"}} onClick={() => {
                    FirebaseAuthService.handleSignOut();
                    navigate("/login");
                }
                }
                        onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                    <FontAwesomeIcon icon={solid("right-from-bracket")} size="sm"
                                     style={hover ? {color: "#000000"} : {color: "#ffffff"}}/>
                </Button>
            </>)
        } else {
            return <Link style={{textDecoration: "none", display: "flex"}} to={'/login'}>
                <Button variant="outline-light">Login</Button>
            </Link>
        }
    }

    const renderShoppingCartIcon = () => {
        if (user) {
            return <Link to={"/shoppingcart"}>
                <Button variant={"outline-dark"} onMouseOver={() => {
                    setHover(true)
                }}
                        onMouseLeave={() => {
                            setHover(false)
                        }}>
                    <FontAwesomeIcon id="cart-shopping-icon" beat icon={solid("cart-shopping")} size="xl"/></Button>
            </Link>
        } else {
            return <Link to={"/login"}>
                <Button variant={"outline-dark"} onMouseOver={() => {
                    setHover(true)
                }}
                        onMouseLeave={() => {
                            setHover(false)
                        }}>
                    <FontAwesomeIcon id="cart-shopping-icon" beat icon={solid("cart-shopping")} size="xl"/></Button>
            </Link>
        }
    }


    return (<Navbar id={"nav-bar-container"} collapseOnSelect expand="sm" bg="dark" variant="dark" className="nav-bar"
                    sticky="top">
        <Container>
            <Link style={{textDecoration: "none"}} to="/">
                <Navbar.Brand style={{display: "flex", alignItems: "center"}}>
                    <div id={"logo"}/>
                    <div/>
                    Amazing Pokie</Navbar.Brand>
            </Link>

            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>

            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#/product/allProduct">Products</Nav.Link>
                    {/*<Nav.Link href="#pricing">Pricing</Nav.Link>*/}
                    {/*<NavDropdown title="Dropdown" id="collasible-nav-dropdown">*/}
                    {/*    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
                    {/*    <NavDropdown.Item href="#action/3.2">*/}
                    {/*        Another action*/}
                    {/*    </NavDropdown.Item>*/}
                    {/*    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
                    {/*    <NavDropdown.Divider/>*/}
                    {/*    <NavDropdown.Item href="#action/3.4">*/}
                    {/*        Separated link*/}
                    {/*    </NavDropdown.Item>*/}
                    {/*</NavDropdown>*/}

                    <Form className="d-flex" style={{display: "flex", alignItems: "center",marginLeft:"1rem"}} onSubmit={handleOnSubmit}>
                        <Form.Control
                            type="text"
                            placeholder="Search"
                            name="searchInput-bar"
                            className="me-2 rounded-pill"
                            aria-label="Search"
                        >
                        </Form.Control>
                        <Button type="submit" variant="grey"><FontAwesomeIcon id="search-icon"
                                                                              icon={solid("magnifying-glass")}
                                                                              size="xl"/></Button>
                    </Form>
                </Nav>
                <Nav style={{display: "flex", alignItems: "center"}}>
                    {renderShoppingCartIcon()}
                    {renderLoginBox()}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>)

}