import {ProductListDto} from "../data/dto/ProductListDto";
import axios from "axios";
import {ProductDetailDto} from "../data/dto/ProductDetailDto";
import getEnvConfig from "../config/Config.js";



export namespace ProductApi{
    const baseUrl = getEnvConfig().baseUrl;

    export async function getAllProduct():Promise<ProductListDto[]>{
        try {
            const response = await axios.get(`${baseUrl}/public/product`);
            return response.data
        }catch (e){
            console.error(e)
            throw e
        }

    }

    export async function getProductDetail(pid:string):Promise<ProductDetailDto>{
        try{
            const response = await axios.get(`${baseUrl}/public/product/${pid}`);
            return (response.data)
        }catch (e){
            console.log(e)
            throw e
        }
    }

}