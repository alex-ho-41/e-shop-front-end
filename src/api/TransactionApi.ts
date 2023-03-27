import FirebaseAuthService from "../authService/FirebaseAuthService";
import axios from "axios";

export const baseUrl = "http://localhost:8080"

namespace TransactionApi{

    export const createTransaction = async () =>{
        try{
            const accessToken = await FirebaseAuthService.getAccessToken();
            if(accessToken) {
                const config = {headers: {Authorization: `Bearer ${accessToken}`}}
                const response = await axios.post(`${baseUrl}/transaction/prepare`, null, config)
                console.log("createTransaction - Api")
                return response.data
            }else {
                console.log("createTransaction - ERROR")
                throw new Error;
            }
        }catch (e) {
            console.log("createTransaction - throw e")
            throw e;
        }
    }

    export const getTransactionByTid = async (tid: string) =>{
        try {
            const accessToken = await FirebaseAuthService.getAccessToken();
            if(accessToken) {
                const config = {headers: {Authorization: `Bearer ${accessToken}`}}
                const response = await axios.get(`${baseUrl}/transaction/${tid}`, config)
                console.log("getTransactionByTid - Api")
                return response.data
            }else {

                throw new Error;
            }
        }catch (e) {
            throw e;
        }
    }
}

export default TransactionApi;