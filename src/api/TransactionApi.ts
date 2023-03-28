import FirebaseAuthService from "../authService/FirebaseAuthService";
import axios from "axios";
import {TransactionDto} from "../data/dto/TransactionDto";
import {TransactionStatusDto} from "../data/dto/TransactionStatusDto";

export const baseUrl = "http://localhost:8080"

namespace TransactionApi{

    export const createTransaction = async ():Promise<TransactionDto> =>{
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

    export const getTransactionByTid = async (tid: string):Promise<TransactionDto> =>{
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

    export const payTransactionByTid = async (tid: string):Promise<TransactionStatusDto>  =>{
        try {
            const accessToken = await FirebaseAuthService.getAccessToken();
            if(accessToken) {
                const config = {headers: {Authorization: `Bearer ${accessToken}`}}
                const response = await axios.patch(`${baseUrl}/transaction/${tid}/pay`,null, config)
                console.log("payTransactionByTid - Api")
                return response.data
            }else {
                throw new Error;
            }
        }catch (e) {
            throw e;
        }
    }

    export const finishTransactionByTid = async (tid: string):Promise<TransactionDto> =>{
        try {
            const accessToken = await FirebaseAuthService.getAccessToken();
            if(accessToken) {
                const config = {headers: {Authorization: `Bearer ${accessToken}`}}
                const response = await axios.patch(`${baseUrl}/transaction/${tid}/finish`,null, config)
                console.log("finishTransactionByTid - Api")
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