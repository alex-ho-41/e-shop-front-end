import TopNavBar from "../../component/TopNavBar";
import {Button, Container, Form} from "react-bootstrap";
import './style.css'
import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import FirebaseAuthService from "../../../authService/FirebaseAuthService";
import {FacebookLoginButton, GoogleLoginButton} from "react-social-login-buttons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [hover,setHover] = useState<boolean>(false);
    const [isLoginFailed, setIsLoginFailed] = useState<boolean>(false);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    }

    const handleOnsubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        let loginResult = await FirebaseAuthService.handleSignInWithEmailAndPassword(email, password);
        if (loginResult) {
            navigate(-1);
        } else {
            setIsLoginFailed(true);
        }
    }

    const handleGoogleLogin = async ()=>{
        let loginResult = await FirebaseAuthService.handleSignInWithGoogle();
        if (loginResult) {
            navigate(-1);
        }
    }

    const handleFaceBookLogin = async ()=>{
        let loginResult = await FirebaseAuthService.handleSignInWithFaceBook()
        if (loginResult) {
            navigate(-1);
        }
    }


    let renderContainer = (
        <Container id={"login-container"}>
            <Form id={"login-form"} onSubmit={handleOnsubmit} className={"shadow"}>
                <div>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Type your email" onChange={handleEmailChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>

                        <Form.Control type="password" placeholder="Type your password" onChange={handlePasswordChange}/>
                        {isLoginFailed && <Form.Text style={{color: "red"}}>
                            Login Fail. Please try again!
                        </Form.Text>}
                        <Button id={"login-form-button"} variant="outline-dark" type="submit"
                                onMouseOver={()=>setHover(true)}
                                onMouseLeave={()=>setHover(false)}>
                            <FontAwesomeIcon icon={solid("dragon")} bounce size="xl" style={hover?{color: "#ffffff"}:{color: "#000000"}} />
                        </Button>
                    </Form.Group>
                </div>


                <div>

                    <hr/>
                    <GoogleLoginButton onClick={handleGoogleLogin} />
                    <FacebookLoginButton onClick={handleFaceBookLogin}/>
                </div>

            </Form>
        </Container>
    )

    return (<div id={"login-page"}>
        <TopNavBar/>
        {renderContainer}
    </div>)


}