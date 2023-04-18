import {Toast, ToastContainer} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular} from "@fortawesome/fontawesome-svg-core/import.macro";
import moment from "moment/moment";
import {Link} from "react-router-dom";
import React from "react";

type Props ={
    show: boolean,
    toggleShow: ()=>void

}


export default function Disclaimer(props:Props) {


    return(<div>

        <ToastContainer>
            <Toast show={props.show} onClose={()=>{props.toggleShow()}} style={{position:"fixed",top:"90px",right:"20px",zIndex:"1"}}>
                <Toast.Header>
                    <strong className="me-auto"><FontAwesomeIcon icon={regular("envelope")} beatFade size="lg" style={{color: "#000000",}} /> Disclaimer</strong>
                    {/*<small>{moment().format("DD/MM/YYYY HH:mm:ss")}</small>*/}
                </Toast.Header>
                <Toast.Body>The information in this website is intended solely for the personal non-commercial use of the user who accepts full responsibility for its use.  While we have taken every precaution to insure that the content of this site is both current and accurate, errors can occur.</Toast.Body>

                   <Toast.Body>The information contained in this site is general in nature and should not be considered to be legal, tax, accounting, consulting or any other professional advice.  In all cases you should consult with professional advisors familiar with your particular factual situation for advice concerning specific matters before making any decisions.</Toast.Body>
            </Toast>
        </ToastContainer>


    </div>)
}