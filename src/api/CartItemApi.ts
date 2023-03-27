import FirebaseAuthService from "../authService/FirebaseAuthService";
import axios from "axios";
import {CartItemDto} from "../data/dto/CartItemDto";
import {ProductDetailDto} from "../data/dto/ProductDetailDto";
import {CartItemDtoStatus} from "../data/dto/CartItemDtoStatus";

namespace CartItemApi{

    const baseUrl = "http://localhost:8080"

     export const getAllCartItems = async () => {
        try {
            const accessToken = await FirebaseAuthService.getAccessToken();
            if(accessToken){
                const config = {headers: {Authorization:`Bearer ${accessToken}`}}
                const response = await axios.get(`${baseUrl}/cart`, config)
                console.log("getAllCartItems - Api")
                return response.data

            }
        }catch (e){
            console.error(e)
            throw e
        }
     }

    export const addCartItem = async (pid:number,quantity:number) => {
        const accessToken = await FirebaseAuthService.getAccessToken();
            if(accessToken){
                try {
                    const config = {headers: {Authorization:`Bearer ${accessToken}`}}
                    const response = await axios.put(`${baseUrl}/cart/${pid}/${quantity}`,{}, config)
                    console.log("addCartItems - Api")
                    return response.data
                }catch (e){
                    console.log("catch e")
                    throw e;
                }

            }else {
                console.log("catch ERROR")
                throw new Error();
            }
    }

    export const patchCartItem = async (pid:number, quantity:number):Promise<CartItemDto>=>{
        try{
            const accessToken = await FirebaseAuthService.getAccessToken();
            if(accessToken){
                const config = {headers:{Authorization: `Bearer ${accessToken}`}}
                const response = await axios.patch(`${baseUrl}/cart/${pid}/${quantity}`,{}, config)
                console.log("patchCartItem - Api")
                return response.data
            }
            else{ // null is not error
                throw new Error();
            }
        }catch (e) {
            console.log(e)
            throw e;
        }
    }

    export const deleteCartItem = async (pid:number):Promise<CartItemDtoStatus>=>{
        try{
            const accessToken = await FirebaseAuthService.getAccessToken();
            if(accessToken){
                const config = {headers:{Authorization: `Bearer ${accessToken}`}}
                const response = await axios.delete(`${baseUrl}/cart/${pid}`,config)
                console.log("deleteCartItem - Api")
                return response.data
            }else {
                throw new Error();
            }
        }catch (e){
            throw e;
        }
    }
}

export default CartItemApi;