import React from "react";
import {Button, Card, Table} from "react-bootstrap";
import {Item, TransactionDto} from "../../data/dto/TransactionDto";
import {type} from "os";

type Props={
    transactionDto: TransactionDto|undefined
    value:Item
}

export default function TransactionProductCard(props:Props) {

    const renderCard = ():JSX.Element =>{
        return (<Card style={{ minHeight:"19rem",maxWidth: '50rem',margin:"1rem 1rem 2rem 1rem",display:"flex",flexDirection:"row"}}>

                <div style={{minHeight:"100%",maxWidth:"30%",display:"flex",alignItems:"center"}}>
                    <Card.Img variant="top"
                              style={{maxHeight:"100%",maxWidth:"100%"}}
                              src={`${props.value.product.image_url}`}/>
                </div>
                <div style={{maxWidth:"70%"}}>
                    <Card.Body>
                        <Card.Title>{props.value.product.name}</Card.Title>
                        <hr/>
                        <Card.Text>{props.value.product.description}</Card.Text>
                        <Card.Text>貨物編號: {props.value.product.pid}</Card.Text>
                        <Card.Text>結算數量: {props.value.quantity}</Card.Text>
                        <Card.Text>單件價格: ＄HKD {props.value.product.price.toLocaleString("en")}</Card.Text>
                        <Card.Text>價格: $ HKD {props.value.subtotal.toLocaleString("en")}</Card.Text>
                        {/*<Button variant="primary">Go somewhere</Button>*/}
                    </Card.Body>
                </div>
            </Card>
        )
    }

    return(

        // <Card style={{ width: '50rem',margin:"0.75rem",display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
        //     <div>
        //         <Card.Img variant="top"
        //                   style={{maxHeight:"20rem",maxWidth:"20rem"}}
        //                   src="https://hk.portal-pokemon.com/play/resources/pokedex/img/pm/d0ee81f16175c97770192fb691fdda8da1f4f349.png" />
        //     </div>
        //     <div>
        //         <Card.Body>
        //             <Card.Title>小火龍</Card.Title>
        //             <hr/>
        //             <Card.Text>商品簡介:</Card.Text>
        //             <Card.Text>貨物編號:</Card.Text>
        //             <Card.Text>結算數量:</Card.Text>
        //             <Card.Text>單件價格:</Card.Text>
        //             <Card.Text>價格:</Card.Text>
        //             {/*<Button variant="primary">Go somewhere</Button>*/}
        //         </Card.Body>
        //     </div>
        // </Card>
        renderCard()
    )

}


// 貨物編號	小精靈虛擬卡片	寵物小精靈	商品簡介	商品簡介	結算數量	價格