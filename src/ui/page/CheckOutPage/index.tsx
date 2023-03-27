import {useNavigate, useParams} from "react-router-dom";
import TopNavBar from "../../component/TopNavBar";
import {useContext, useEffect, useState} from "react";
import {TransactionDto} from "../../../data/dto/TransactionDto";
import {userContext} from "../../../App";
import TransactionApi from "../../../api/TransactionApi";

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
            if (params.transactionId) {
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
    },[])


    return (<div>
        <TopNavBar/>
        <h1>TransactionPage {params.transactionId}</h1>
    </div>)

}