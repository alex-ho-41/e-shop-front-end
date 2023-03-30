import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import React, {useContext, useState} from "react";
import {TransactionDto} from "../../data/dto/TransactionDto";
import {userContext} from "../../App";
import TransactionApi from "../../api/TransactionApi";
import {useNavigate} from "react-router-dom";
import moment from "moment";

type Props = {
    transactionDto: TransactionDto | undefined
}
export default function PaymentDetailCard(props: Props) {
    const user = useContext(userContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const handleOnclick = async ()=>{
        try {
            if(props.transactionDto){
                setIsLoading(true)
                let transactionStatusDto = await TransactionApi.payTransactionByTid(props.transactionDto.tid.toString())
                console.log(transactionStatusDto)
                if(transactionStatusDto){
                    let dto = await TransactionApi.finishTransactionByTid(props.transactionDto.tid.toString())
                    console.log(dto)
                    navigate("/thankyou")
                }
            }
        }catch (e) {
            navigate("/error")

        }finally {
            setIsLoading(false)
        }

    }

    const renderPaymentButton = ()=>{
        if(!isLoading){
            return(<Button variant="outline-dark"
                           type="submit"
                           onClick={handleOnclick}>
                確定付費
            </Button>)
        }else {
            return(<Button disabled variant="outline-dark"
                            type="submit">
                        付費中。。
                    </Button>)

        }
    }

    return (

        <div style={{width: '100%', margin: "1rem"}}>
            <Card style={{marginBottom: "2rem"}}>
                <Card.Body>
                    <Card.Title style={{marginBottom: "1rem"}}>用戶資料</Card.Title>
                    <Card.Text> {user?.email}</Card.Text>
                </Card.Body>
            </Card>
            <Card style={{marginBottom: "2rem"}}>
                <Card.Body>
                    <Card.Title style={{marginBottom: "1rem"}}>貨物總覽</Card.Title>
                    <Card.Text> 價錢合計：{`HKD ＄${props.transactionDto?.total.toLocaleString("en")}`}</Card.Text>
                    <Card.Text> 結算時間：{props.transactionDto?.date_time}</Card.Text>
                    <Card.Text> 帳單狀態：{props.transactionDto?.status}</Card.Text>
                </Card.Body>
            </Card>

            <Card style={{marginBottom: "2rem"}}>
                <Card.Body>
                    <Card.Title style={{marginBottom: "1rem"}}>送貨方法</Card.Title>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>收取卡片方法</Form.Label>
                            <Form.Select>
                                <option>電子郵件</option>
                                <option>遊戲兌換碼</option>
                                <option>PDF檔案收取</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>

            <Card>
                <Card.Body>
                    <Card.Title style={{marginBottom: "1rem"}}>支付方法</Card.Title>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Select style={{marginBottom: "1rem"}}>
                                <option>信用卡 (VISA/MASTER)</option>
                                <option>實體店現金支付</option>
                                <option>銀聯</option>
                                <option>PayMe</option>
                                <option>支付寶 香港 (AlipayHK)</option>
                                <option>微信支付 (WeChat Pay)</option>
                            </Form.Select>
                            <Form.Group/>

                            <Form.Group style={{marginBottom: "1.5rem"}}>
                                <Form.Label>信用卡號碼</Form.Label>
                                <Form.Control type="email" placeholder="信用卡號碼"/>
                            </Form.Group>


                            <Row className="mb-3 ">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>有效限期</Form.Label>
                                    <Form.Control type="email" placeholder="e.g. 10/27"/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>安全碼</Form.Label>
                                    <Form.Control type="password" placeholder="CVC"/>
                                </Form.Group>
                            </Row>

                            {renderPaymentButton()}
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>

        </div>
    )

}