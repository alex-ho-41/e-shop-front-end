import {useNavigate, useParams} from "react-router-dom";
import TopNavBar from "../../component/TopNavBar";
import React, {createContext, useContext, useEffect, useState} from "react";
import {TransactionDto} from "../../../data/dto/TransactionDto";
import {userContext} from "../../../App";
import TransactionApi from "../../../api/TransactionApi";
import {Container} from "react-bootstrap";
import TransactionProductCard from "../../component/TransactionProductCard";
import PaymentDetailCard from "../../component/PaymentDetailCard";
import LoadingSpinner from "../../component/LoadingSpinner";
import {TransactionStatusDto} from "../../../data/dto/TransactionStatusDto";
import './style.css'

type Params = {
    transactionId: string | undefined
}


export default function CheckOutPage() {
    const params = useParams<Params>();
    const user = useContext(userContext);
    const navigate = useNavigate();
    const [transactionDto, setTransactionDto] = useState<TransactionDto | undefined>(undefined)

    const getTransactionByTid = async () => {
        try {
            if (user && params.transactionId) {
                const data = await TransactionApi.getTransactionByTid(params.transactionId)
                setTransactionDto(data);
            }
        } catch (e) {
            console.log(params.transactionId)
            console.log("transactionId not exist");
            navigate("/error")
        }
    }


    useEffect(() => {
        getTransactionByTid()
    }, [params.transactionId])

    const renderCheckOutPage = ()=>{
        if(transactionDto){
            return(<Container>
                    <h1 style={{margin: "1rem"}}>結算總覽</h1>
                    <hr/>
                    <div id={"payment-container"} style={{display: "flex",flexWrap:"wrap"}}>
                        <div style={{ width: "60%"}}>
                            {
                                transactionDto.item.map((value) => {
                                    return <TransactionProductCard value={value} transactionDto={transactionDto}/>
                                })
                            }
                        </div>
                        <div style={{display: "flex", flexWrap: "wrap", width: "40%"}}>
                            <PaymentDetailCard transactionDto={transactionDto}/>
                        </div>
                    </div>
                </Container>


            )
        }else {
            return <Container style={{marginTop:"1rem"}}>
                <LoadingSpinner/>
            </Container>
        }
    }


    return (<div id={"checkout-page-container"}>
        <TopNavBar/>
        {renderCheckOutPage()}
    </div>)

}