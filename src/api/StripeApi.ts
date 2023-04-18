import getEnvConfig from "../config/Config.js";
import FirebaseAuthService from "../authService/FirebaseAuthService";
import axios from "axios";

export const baseUrl = getEnvConfig().baseUrl;

namespace StripeApi{
    export const payTransaction = async (tid:string) => {
        try {
            const accessToken = await FirebaseAuthService.getAccessToken();
            if(accessToken){
                const config = {headers: {Authorization:`Bearer ${accessToken}`}}
                const response = await axios.post(`${baseUrl}/create-checkout-session/${tid}`,{}, config)
                console.log("payStripeTransaction - Api")
                return response.data
            }
        }catch (e){
            console.error(e)
            throw e
        }
    }

}

export default StripeApi